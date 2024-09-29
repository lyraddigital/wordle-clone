import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { IDistribution } from "aws-cdk-lib/aws-cloudfront";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";

export interface SiteDeploymentProps {
  bucket: IBucket;
  sourceCodeFolder: string;
  distribution: IDistribution;
}

export class SiteDeployment extends Construct {
  constructor(parent: Construct, id: string, props: SiteDeploymentProps) {
    super(parent, id);

    new BucketDeployment(this, "DeployWebsite", {
      sources: [Source.asset(props.sourceCodeFolder)],
      destinationBucket: props.bucket,
      distribution: props.distribution,
      distributionPaths: ["/*"],
    });
  }
}
