const hasExtension = /(.+)\.[a-zA-Z0-9]{2,5}$/;

function handler(event) {
  const uri = event.request?.uri?.replace(/^\//, "");

  if (uri && uri !== "/") {
    if (!uri.match(hasExtension)) {
      event.request.uri = `/${uri.replace(/\/$/, "")}.html`;
    }
  } else if (event.request) {
    event.request.uri = "/index.html";
  }

  return event.request;
}
