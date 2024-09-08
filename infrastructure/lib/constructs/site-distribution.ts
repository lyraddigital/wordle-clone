import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";
import {
  Distribution,
  HttpVersion,
  IDistribution,
  PriceClass,
  SSLMethod,
} from "aws-cdk-lib/aws-cloudfront";
import { S3StaticWebsiteOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  CertificateValidation,
  Certificate,
} from "aws-cdk-lib/aws-certificatemanager";

import { SITE_ROOT_DOMAIN } from "../constants/constants";
import { DomainProps } from "../props/domain-props";

export interface SiteDistributionProps extends DomainProps {
  siteBucket: IBucket;
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

    this.instance = new Distribution(this, "WebsiteDistribution", {
      // certificate: ViewerCertificate.fromAcmCertificate(certificate, {
      //   sslMethod: SSLMethod.SNI,
      //   securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2021,
      //   aliases: [domainName],
      // }),
      certificate,
      defaultBehavior: {
        origin: new S3StaticWebsiteOrigin(props.siteBucket),
        compress: true,
      },
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
