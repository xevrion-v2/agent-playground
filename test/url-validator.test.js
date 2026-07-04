const assert = require("node:assert/strict");
const test = require("node:test");

const { extractDomain, isHttps, isValidUrl } = require("../src/utils/url-validator");

test("isValidUrl accepts a plain http URL", () => {
  assert.equal(isValidUrl("http://example.com"), true);
});

test("isValidUrl accepts an https URL with path query and hash", () => {
  assert.equal(isValidUrl("https://example.com/docs?q=agent#top"), true);
});

test("isValidUrl accepts subdomains and ports", () => {
  assert.equal(isValidUrl("https://api.example.com:8443/v1"), true);
});

test("isValidUrl accepts localhost development URLs", () => {
  assert.equal(isValidUrl("http://localhost:3000"), true);
});

test("isValidUrl accepts IPv4 URLs", () => {
  assert.equal(isValidUrl("http://127.0.0.1:8080/health"), true);
});

test("isValidUrl trims surrounding whitespace", () => {
  assert.equal(isValidUrl("  https://example.com  "), true);
});

test("isValidUrl rejects empty strings", () => {
  assert.equal(isValidUrl(""), false);
});

test("isValidUrl rejects whitespace-only strings", () => {
  assert.equal(isValidUrl("   "), false);
});

test("isValidUrl rejects null", () => {
  assert.equal(isValidUrl(null), false);
});

test("isValidUrl rejects non-string inputs", () => {
  assert.equal(isValidUrl({ href: "https://example.com" }), false);
});

test("isValidUrl rejects relative paths", () => {
  assert.equal(isValidUrl("/dashboard"), false);
});

test("isValidUrl rejects javascript URLs", () => {
  assert.equal(isValidUrl("javascript:alert(1)"), false);
});

test("isValidUrl rejects ftp URLs", () => {
  assert.equal(isValidUrl("ftp://example.com/file.txt"), false);
});

test("isValidUrl rejects URLs with no hostname", () => {
  assert.equal(isValidUrl("https://"), false);
});

test("isValidUrl rejects malformed hostnames", () => {
  assert.equal(isValidUrl("https://exa mple.com"), false);
});

test("extractDomain returns the hostname", () => {
  assert.equal(extractDomain("https://example.com/path"), "example.com");
});

test("extractDomain lowercases the hostname", () => {
  assert.equal(extractDomain("https://EXAMPLE.COM"), "example.com");
});

test("extractDomain preserves useful subdomains", () => {
  assert.equal(extractDomain("https://api.example.com/v1"), "api.example.com");
});

test("extractDomain strips a trailing root dot", () => {
  assert.equal(extractDomain("https://example.com./docs"), "example.com");
});

test("extractDomain ignores path query hash and port", () => {
  assert.equal(extractDomain("https://example.com:9443/a?b=c#d"), "example.com");
});

test("extractDomain returns null for null", () => {
  assert.equal(extractDomain(null), null);
});

test("extractDomain returns null for invalid URLs", () => {
  assert.equal(extractDomain("not a url"), null);
});

test("isHttps returns true for https URLs", () => {
  assert.equal(isHttps("https://example.com"), true);
});

test("isHttps returns false for http URLs", () => {
  assert.equal(isHttps("http://example.com"), false);
});

test("isHttps returns false for invalid URLs", () => {
  assert.equal(isHttps("example.com"), false);
});

test("isHttps trims surrounding whitespace", () => {
  assert.equal(isHttps("  https://example.com  "), true);
});

test("url validator module exports the expected helpers", () => {
  assert.deepEqual(
    Object.keys(require("../src/utils/url-validator")).sort(),
    ["extractDomain", "isHttps", "isValidUrl"],
  );
});
