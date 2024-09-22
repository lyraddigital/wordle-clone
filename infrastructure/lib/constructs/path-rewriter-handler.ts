import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export class PathRewriterLambda extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "../lambda/path-rewriter-handler.ts"),
      bundling: {
        format: OutputFormat.ESM,
      },
    });
  }
}
