import { JSDOM } from "jsdom";

function normalizeURL(url) {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.host}${urlObj.pathname}`;
  if (fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
}

function getURLsFromHTML(document, baseUrl) {
  const htmlDocument = new JSDOM(document);
  const anchors = htmlDocument.window.document.querySelectorAll("a");
  const urls = [];
  for (let anchor of anchors) {
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

async function fetchHtmlFromUrl(url) {
  const response = await fetch(url);
  try {
    if (response.status >= 400) {
      throw new Error("The page is not accessible at the moment");
    }
    if (!response.headers.get("content-type").includes("text/html")) {
      console.error(url);
      throw new Error("This is not an HTML page");
    }
    const text = await response.text();
    return text;
  } catch (err) {
    console.error(err);
    return "";
  }
}

async function crawlPage(baseUrl, currentUrl = baseUrl, pages = {}) {
  if (new URL(baseUrl).hostname !== new URL(currentUrl).hostname) {
    return pages;
  }
  let normalizedCurrentUrl = normalizeURL(currentUrl);
  if (pages[normalizedCurrentUrl]) {
    pages[normalizedCurrentUrl] += 1;
    return pages;
  } else {
    pages[normalizedCurrentUrl] = 1;
  }
  const text = await fetchHtmlFromUrl(currentUrl);
  const urls = getURLsFromHTML(text, baseUrl);
  for (let url of urls) {
    pages = await crawlPage(baseUrl, url, pages);
  }
  return pages;
}
export { normalizeURL, getURLsFromHTML, crawlPage };
