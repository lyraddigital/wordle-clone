import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { CfnIPSet, CfnWebACL } from "aws-cdk-lib/aws-wafv2";
import {
  Distribution,
  HttpVersion,
  IDistribution,
  PriceClass,
  SSLMethod,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";

import { SITE_ROOT_DOMAIN } from "../constants/constants";
import { DomainProps } from "../props/domain-props";

export interface SiteDistributionProps extends DomainProps {
  siteBucket: IBucket;
  includeWAF: boolean;
  allowedIPSet: string;
}

export class SiteDistribution extends Construct {
  public instance: IDistribution;

  constructor(parent: Construct, id: string, props: SiteDistributionProps) {
    super(parent, id);

    const domainName = props.subDomain
      ? `${props.subDomain}.${SITE_ROOT_DOMAIN}`
      : SITE_ROOT_DOMAIN;

    const certificate = new Certificate(this, "WebsiteCertificate", {
      domainName: domainName,
      validation: CertificateValidation.fromDns(),
    });

    if (props.includeWAF) {
      const whiteListIPSet = new CfnIPSet(this, "IPSet", {
        name: "WhiteListIPSet",
        addresses: [props.allowedIPSet],
        ipAddressVersion: "IPV4",
        scope: "CLOUDFRONT",
      });

      const whiteListIPSetRuleProperty: CfnWebACL.RuleProperty = {
        priority: 0,
        name: "WhiteListIPSet-Rule",
        action: {
          allow: {},
        },
        statement: {
          ipSetReferenceStatement: {
            arn: whiteListIPSet.attrArn,
          },
        },
        visibilityConfig: {
          cloudWatchMetricsEnabled: true,
          metricName: "WhiteListIPSet-Rule",
          sampledRequestsEnabled: true,
        },
      };

      new CfnWebACL(this, "WebACL", {
        defaultAction: { block: {} },
        visibilityConfig: {
          cloudWatchMetricsEnabled: true,
          metricName: `WAF-${domainName}`,
          sampledRequestsEnabled: false,
        },
        scope: "CLOUDFRONT",
        rules: [whiteListIPSetRuleProperty],
      });
    }

    this.instance = new Distribution(this, "WebsiteDistribution", {
      certificate,
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(props.siteBucket),
        compress: true,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "index.html",
      domainNames: [domainName],
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
      httpVersion: HttpVersion.HTTP2,
      priceClass: PriceClass.PRICE_CLASS_ALL,
      sslSupportMethod: SSLMethod.SNI,
    });
  }
}
