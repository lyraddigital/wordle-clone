import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { CfnIPSet, CfnWebACL } from "aws-cdk-lib/aws-wafv2";
import {
  Distribution,
  Function,
  FunctionCode,
  FunctionEventType,
  HttpVersion,
  IDistribution,
  PriceClass,
  ResponseHeadersPolicy,
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

    let webACL: CfnWebACL | undefined;

    if (props.includeWAF) {
      const whiteListIPSet = new CfnIPSet(this, "IPSet", {
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

      webACL = new CfnWebACL(this, "WebACL", {
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

    // const cacheControlHeaderPolicy = new ResponseHeadersPolicy(
    //   this,
    //   "CacheControlHeaderPolicy",
    //   {
    //     comment:
    //       "Cache-Control policy for optimizing caching static content on the client side",
    //     customHeadersBehavior: {
    //       customHeaders: [
    //         {
    //           header: "Cache-Control",
    //           value: "private, max-age=86400",
    //           override: true,
    //         },
    //       ],
    //     },
    //   }
    // );

    const viewerRequestLambda = new Function(this, "VRF", {
      code: FunctionCode.fromFile({
        filePath: "./lambda/path-rewriter-handler.js",
      }),
    });

    this.instance = new Distribution(this, "WebsiteDistribution", {
      certificate,
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(props.siteBucket),
        compress: true,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            eventType: FunctionEventType.VIEWER_REQUEST,
            function: viewerRequestLambda,
          },
        ],
      },
      webAclId: webACL?.attrArn,
      defaultRootObject: "index.html",
      domainNames: [domainName],
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/404.html",
        },
      ],
      httpVersion: HttpVersion.HTTP2,
      priceClass: PriceClass.PRICE_CLASS_ALL,
      sslSupportMethod: SSLMethod.SNI,
    });
  }
}
