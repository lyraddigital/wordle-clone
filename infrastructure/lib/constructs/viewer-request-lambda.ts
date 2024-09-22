import { IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export class ViewerRequestLambda extends Construct {
  public lambda: IFunction;

  constructor(parent: Construct, id: string) {
    super(parent, id);

    this.lambda = new NodejsFunction(this, "ViewerRequestFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "../../lambda/path-rewriter-handler.ts"),
      bundling: {
        format: OutputFormat.ESM,
      },
    });
  }
}
