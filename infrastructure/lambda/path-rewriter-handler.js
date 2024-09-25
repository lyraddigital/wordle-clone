const hasExtension = /(.+)\.[a-zA-Z0-9]{2,5}$/;
const hasSlash = /\/$/;

function handler(event) {
  const uri = event.request.uri;

  if (uri && !uri.match(hasExtension) && !uri.match(hasSlash)) {
    event.request.uri = `${uri}.html`;
  }

  if (uri && !uri.match(hasExtension) && uri.match(hasSlash) && uri !== "/") {
    event.request.uri = `${uri}index.html`;
  }

  return event.request;
}
