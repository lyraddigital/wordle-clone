const hasExtension = /(.+)\.[a-zA-Z0-9]{2,5}$/;
const isHtmlFile = /[.]html$/;

function handler(event) {
  const uri =
    event && event.request && event.request.uri
      ? event.request.uri.toLowerCase().replace(/^\//, "")
      : "";

  if (uri && uri !== "/") {
    if (!uri.match(hasExtension)) {
      event.request.uri = `/${uri.replace(/\/$/, "")}.html`;
    } else if (uri.match(isHtmlFile)) {
      // return a 404. We don't want .html files being returned explicitly
      event.request.uri = "/404.html";
    }
  } else if (event.request) {
    event.request.uri = "/index.html";
  }

  return event.request;
}
