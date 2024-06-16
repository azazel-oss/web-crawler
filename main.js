function normalizeURL(url) {
  const regex = /https?:\/\/(?<name>[a-zA-z.\/]*[^\/])\/?$/;
  const { name } = regex.exec(url).groups;
  return name;
}

console.log(normalizeURL("https://blog.boot.dev/path/"));
