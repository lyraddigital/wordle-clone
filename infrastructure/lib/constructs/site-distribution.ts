import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";
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
    });
  }
}
