import { JSDOM } from "jsdom";
function normalizeURL(endpoint) {
  const url = new URL(endpoint);
  return (url.hostname + url.pathname).replace(/\/$/, "");
}

function getURLsFromHTML(document, baseUrl) {
  const htmlDocument = new JSDOM(document);
  const anchors = htmlDocument.window.document.querySelectorAll("a");
  const urls = [];
  for (let anchor of anchors) {
    // if (anchor.href.startsWith("http") || anchor.href.startsWith("www")) {
    //   urls.push(anchor.href);
    // } else {
    //   urls.push(baseUrl + anchor.href);
    // }
    if (anchor.hasAttribute("href")) {
      let href = anchor.getAttribute("href");

      try {
        // convert any relative URLs to absolute URLs
        href = new URL(href, baseUrl).href;
        urls.push(href);
      } catch (err) {
        console.log(`${err.message}: ${href}`);
      }
    }
  }
  return urls;
}

export { normalizeURL, getURLsFromHTML };
