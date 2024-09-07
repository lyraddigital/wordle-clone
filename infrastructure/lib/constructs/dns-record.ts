import { Construct } from "constructs";
import { IDistribution } from "aws-cdk-lib/aws-cloudfront";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

import { SITE_ROOT_DOMAIN } from "../constants";
import { DomainProps } from "../props/domain-props";

export interface DNSRecordProps extends DomainProps {
  distribution: IDistribution;
}

export class DNSRecord extends Construct {
  constructor(parent: Construct, id: string, props: DNSRecordProps) {
    super(parent, id);

    const zone = HostedZone.fromLookup(this, "Zone", {
      domainName: SITE_ROOT_DOMAIN,
    });
    const domainName = props.subDomain
      ? `${props.subDomain}.${SITE_ROOT_DOMAIN}`
      : SITE_ROOT_DOMAIN;

    new ARecord(this, "WebiteAliasRecord", {
      recordName: domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(props.distribution)),
      zone,
    });
  }
}
