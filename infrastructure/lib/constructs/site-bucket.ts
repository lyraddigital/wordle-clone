import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";
import { BlockPublicAccess, Bucket, IBucket } from "aws-cdk-lib/aws-s3";

import { SITE_ROOT_DOMAIN } from "../constants/constants";
import { DomainProps } from "../props/domain-props";

export class SiteBucket extends Construct {
  public readonly instance: IBucket;

  constructor(parent: Construct, id: string, domainProps: DomainProps) {
    super(parent, id);

    this.instance = new Bucket(this, "WebsiteBucket", {
      bucketName: `${domainProps.subDomain}.${SITE_ROOT_DOMAIN}`,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });
  }
}
