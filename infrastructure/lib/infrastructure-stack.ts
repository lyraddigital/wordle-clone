import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import { SiteBucket } from "./constructs/site-bucket";
import { SiteDistribution } from "./constructs/site-distribution";
import { DNSRecord } from "./constructs/dns-record";
import { SiteDeployment } from "./constructs/site-deployment";
import { DomainProps } from "./props/domain-props";

type InfrastructureStackProps = cdk.StackProps & {
  includeWAF: boolean;
};

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfrastructureStackProps) {
    super(scope, id, props);

    const subDomainName = new cdk.CfnParameter(this, "subDomainName", {
      type: "String",
      description:
        "The name of the sub domain that will be set as an alias record in Route53 and be used by Cloudfront.",
    });

    const allowedIPSet = new cdk.CfnParameter(this, "allowedIPSet", {
      type: "String",
      description:
        "The name of the IP Set that is allowed to view the site. If not set, then all ip addresses are allowed",
    });

    const subDomain = subDomainName.valueAsString;
    const domainProps: DomainProps = { subDomain };
    const siteBucket = new SiteBucket(this, "SiteBucket", domainProps);
    const distribution = new SiteDistribution(this, "SiteDistribution", {
      ...domainProps,
      siteBucket: siteBucket.instance,
      includeWAF: props.includeWAF,
      allowedIPSet: allowedIPSet.valueAsString,
    });
    new DNSRecord(this, "SiteDNSRecord", {
      ...domainProps,
      distribution: distribution.instance,
    });
    new SiteDeployment(this, "SiteDeployment", {
      bucket: siteBucket.instance,
      sourceCodeFolder: "../frontend-app/out",
      distribution: distribution.instance,
    });
  }
}
