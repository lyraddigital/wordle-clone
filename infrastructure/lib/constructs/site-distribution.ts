import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";
import * as wafv2 from "aws-cdk-lib/aws-wafv2";
import {
  Distribution,
  HttpVersion,
  IDistribution,
  PriceClass,
  SSLMethod,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  CertificateValidation,
  DnsValidatedCertificate,
} from "aws-cdk-lib/aws-certificatemanager";

import { SITE_ROOT_DOMAIN } from "../constants/constants";
import { DomainProps } from "../props/domain-props";
import { HostedZone } from "aws-cdk-lib/aws-route53";

export interface SiteDistributionProps extends DomainProps {
  siteBucket: IBucket;
  allowedIPSet: string;
}

export class SiteDistribution extends Construct {
  public instance: IDistribution;

  constructor(parent: Construct, id: string, props: SiteDistributionProps) {
    super(parent, id);

    const zone = HostedZone.fromLookup(this, "Zone", {
      domainName: SITE_ROOT_DOMAIN,
    });

    const domainName = props.subDomain
      ? `${props.subDomain}.${SITE_ROOT_DOMAIN}`
      : SITE_ROOT_DOMAIN;

    const certificate = new DnsValidatedCertificate(
      this,
      "WebsiteCertificate",
      {
        domainName: domainName,
        validation: CertificateValidation.fromDns(),
        hostedZone: zone,
        region: "us-east-1",
      }
    );

    let webAcl: wafv2.CfnWebACL | undefined;

    if (props.allowedIPSet) {
      webAcl = new wafv2.CfnWebACL(this, "WebACL", {
        defaultAction: { block: {} },
        visibilityConfig: {
          cloudWatchMetricsEnabled: true,
          metricName: `WAF-${domainName}`,
          sampledRequestsEnabled: false,
        },
        scope: "REGIONAL",
      });
    }

    this.instance = new Distribution(this, "WebsiteDistribution", {
      certificate,
      defaultBehavior: {
        origin: new S3Origin(props.siteBucket),
        compress: true,
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
      webAclId: webAcl?.id,
    });
  }
}
