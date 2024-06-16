function normalizeURL(endpoint) {
  const url = new URL(endpoint);
  return (url.hostname + url.pathname).replace(/\/$/, "");
}

export { normalizeURL };
