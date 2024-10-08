import { Effect, PolicyStatement, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Aws, Duration } from "aws-cdk-lib";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { CfnIPSet, CfnWebACL } from "aws-cdk-lib/aws-wafv2";
import {
  Distribution,
  Function,
  FunctionCode,
  FunctionEventType,
  FunctionRuntime,
  HeadersFrameOption,
  HeadersReferrerPolicy,
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
import { Construct } from "constructs";

import { SITE_ROOT_DOMAIN } from "../constants/constants";
import { DomainProps } from "../props/domain-props";

export type SiteDistributionProps = DomainProps & {
  siteBucket: IBucket;
  includeWAF: boolean;
  allowedIPSet: string;
};

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
          orStatement: {
            statements: [
              {
                ipSetReferenceStatement: {
                  arn: whiteListIPSet.attrArn,
                },
              },
              {
                byteMatchStatement: {
                  searchString: "/_next",
                  fieldToMatch: {
                    uriPath: {},
                  },
                  positionalConstraint: "STARTS_WITH",
                  textTransformations: [
                    {
                      priority: 1,
                      type: "NONE",
                    },
                  ],
                },
              },
              {
                byteMatchStatement: {
                  searchString: "favicon.ico",
                  fieldToMatch: {
                    uriPath: {},
                  },
                  positionalConstraint: "ENDS_WITH",
                  textTransformations: [
                    {
                      priority: 0,
                      type: "NONE",
                    },
                  ],
                },
              },
            ],
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

    const viewerRequestLambda = new Function(this, "VRF", {
      code: FunctionCode.fromFile({
        filePath: "./lambda/path-rewriter-handler.js",
      }),
      runtime: FunctionRuntime.JS_2_0,
    });

    const cspHeadersPolicy = new ResponseHeadersPolicy(
      this,
      "ResponseHeadersPolicy",
      {
        securityHeadersBehavior: {
          contentSecurityPolicy: {
            contentSecurityPolicy: `default-src 'self' 'unsafe-inline'${
              !props.includeWAF
                ? `; script-src 'self' www.googletagmanager.com 'unsafe-inline'; connect-src www.google-analytics.com`
                : ""
            }`,
            override: true,
          },
          strictTransportSecurity: {
            accessControlMaxAge: Duration.days(365),
            override: true,
          },
          contentTypeOptions: {
            override: true,
          },
          frameOptions: {
            frameOption: HeadersFrameOption.SAMEORIGIN,
            override: true,
          },
          xssProtection: {
            protection: true,
            modeBlock: true,
            override: true,
          },
          referrerPolicy: {
            referrerPolicy:
              HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
            override: true,
          },
        },
        customHeadersBehavior: {
          customHeaders: [
            {
              header: "Permissions-Policy",
              value: "",
              override: true,
            },
          ],
        },
      }
    );

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
        responseHeadersPolicy: cspHeadersPolicy,
      },
      webAclId: webACL?.attrArn,
      defaultRootObject: "index.html",
      domainNames: [domainName],
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/not-authorized.html",
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: "/404.html",
        },
      ],
      httpVersion: HttpVersion.HTTP2,
      priceClass: PriceClass.PRICE_CLASS_ALL,
      sslSupportMethod: SSLMethod.SNI,
    });

    props.siteBucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["s3:ListBucket"],
        resources: [props.siteBucket.bucketArn],
        principals: [new ServicePrincipal("cloudfront.amazonaws.com")],
        conditions: {
          StringEquals: {
            "AWS:SourceArn": `arn:${Aws.PARTITION}:cloudfront::${Aws.ACCOUNT_ID}:distribution/${this.instance.distributionId}`,
          },
        },
      })
    );
  }
}
