#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { InfrastructureStack } from "../lib/infrastructure-stack";

const app = new cdk.App();
const DEPLOYMENT_REGION = "us-east-1";

new InfrastructureStack(app, "DevelopmentWordleStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: DEPLOYMENT_REGION,
  },
  includeWAF: true,
});

new InfrastructureStack(app, "TestingWordleStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: DEPLOYMENT_REGION,
  },
  includeWAF: true,
});

new InfrastructureStack(app, "WordleStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: DEPLOYMENT_REGION,
  },
  includeWAF: false,
});
