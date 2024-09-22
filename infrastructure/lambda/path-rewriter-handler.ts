import { CloudFrontFunctionsEvent } from "aws-lambda";

const hasExtension = /(.+)\.[a-zA-Z0-9]{2,5}$/;
const hasSlash = /\/$/;

export default function handler(event: CloudFrontFunctionsEvent) {
  const uri = event.request.uri;

  if (uri && !uri.match(hasExtension) && !uri.match(hasSlash)) {
    event.request.uri = `${uri}/index.html`;
  }

  if (uri && !uri.match(hasExtension) && uri.match(hasSlash) && uri !== "/") {
    event.request.uri = `${uri}index.html`;
  }

  return event.request;
}
