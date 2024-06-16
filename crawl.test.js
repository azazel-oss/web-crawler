import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl";

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
