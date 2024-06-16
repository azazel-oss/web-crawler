import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl";

describe("tests with http codes", () => {
  test("string that ends with /", () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe(
      "blog.boot.dev/path",
    );
  });
  test("string that doesn't end with /", () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe(
      "blog.boot.dev/path",
    );
  });
  test("string that have multiple /", () => {
    expect(normalizeURL("http://blog.boot.dev/path/another")).toBe(
      "blog.boot.dev/path/another",
    );
  });
});

describe("tests with https codes", () => {
  test("string that ends with /", () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
      "blog.boot.dev/path",
    );
  });
  test("string that doesn't end with /", () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe(
      "blog.boot.dev/path",
    );
  });
  test("string that have multiple /", () => {
    expect(normalizeURL("https://blog.boot.dev/path/another")).toBe(
      "blog.boot.dev/path/another",
    );
  });
});

describe("test processing the urls from the html body", () => {
  test("html body with single absolute url has length 1", () => {
    expect(
      getURLsFromHTML(
        `
<html>
    <body>
        <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
    </body>
</html>
`,
        "https://blogs.boot.dev",
      ),
    ).toHaveLength(1);
  });
  test("html body with single absolute url", () => {
    expect(
      getURLsFromHTML(
        `
<html>
    <body>
        <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
    </body>
</html>
`,
        "https://blogs.boot.dev",
      ),
    ).toContain("https://blog.boot.dev/");
  });
  test("html body with single relative url has length 1", () => {
    expect(
      getURLsFromHTML(
        `
      <html>
          <body>
              <a href="/path"><span>Go to Boot.dev</span></a>
          </body>
      </html>
`,
        "https://blogs.boot.dev",
      ),
    ).toHaveLength(1);
  });
  test("html body with single relative url", () => {
    expect(
      getURLsFromHTML(
        `
<html>
    <body>
        <a href="/path"><span>Go to Boot.dev</span></a>
    </body>
</html>
`,
        "https://blogs.boot.dev",
      ),
    ).toHaveLength(1);
    expect(
      getURLsFromHTML(
        `
<html>
    <body>
        <a href="/path"><span>Go to Boot.dev</span></a>
    </body>
</html>
`,
        "https://blogs.boot.dev",
      ),
    ).toContain("https://blogs.boot.dev/path");
  });
  test("html body with multiple urls", () => {
    expect(
      getURLsFromHTML(
        `
<html>
    <body>
        <a href="/path"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/path/another"><span>Go to Boot.dev</span></a>
    </body>
</html>
`,
        "https://blogs.boot.dev",
      ),
    ).toHaveLength(2);
    expect(
      getURLsFromHTML(
        `
<html>
    <body>
        <a href="/path"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/path/another"><span>Go to Boot.dev</span></a>
    </body>
</html>
`,
        "https://blogs.boot.dev",
      ),
    ).toContain("https://blog.boot.dev/path/another");
  });
});
