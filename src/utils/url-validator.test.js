const test = require("node:test");
const assert = require("node:assert/strict");
const { isValidUrl, extractDomain, isHttps } = require("./url-validator");

test("valid https url", () => {
  assert.equal(isValidUrl("https://example.com/path"), true);
});

test("valid http url", () => {
  assert.equal(isValidUrl("http://localhost:3000"), true);
});

test("invalid missing protocol", () => {
  assert.equal(isValidUrl("example.com"), false);
});

test("invalid empty", () => {
  assert.equal(isValidUrl(""), false);
});

test("invalid null", () => {
  assert.equal(isValidUrl(null), false);
});

test("invalid undefined", () => {
  assert.equal(isValidUrl(undefined), false);
});

test("invalid whitespace", () => {
  assert.equal(isValidUrl("   "), false);
});

test("invalid scheme", () => {
  assert.equal(isValidUrl("ftp://example.com"), false);
});

test("invalid garbage", () => {
  assert.equal(isValidUrl("not a url"), false);
});

test("extractDomain basic", () => {
  assert.equal(extractDomain("https://Example.COM/x"), "example.com");
});

test("extractDomain invalid", () => {
  assert.equal(extractDomain("bad"), null);
});

test("extractDomain with port", () => {
  assert.equal(extractDomain("http://localhost:8080"), "localhost");
});

test("extractDomain null", () => {
  assert.equal(extractDomain(null), null);
});

test("isHttps true", () => {
  assert.equal(isHttps("https://secure.test"), true);
});

test("isHttps false for http", () => {
  assert.equal(isHttps("http://insecure.test"), false);
});

test("isHttps false invalid", () => {
  assert.equal(isHttps("nope"), false);
});

test("isHttps null", () => {
  assert.equal(isHttps(null), false);
});

test("valid url with query", () => {
  assert.equal(isValidUrl("https://a.co?q=1"), true);
});

test("extractDomain subdomain", () => {
  assert.equal(extractDomain("https://api.service.io/v1"), "api.service.io");
});

test("trimmed url valid", () => {
  assert.equal(isValidUrl("  https://x.dev  "), true);
});

test("extractDomain trimmed", () => {
  assert.equal(extractDomain("  https://X.dev/  "), "x.dev");
});

test("isHttps trimmed", () => {
  assert.equal(isHttps("  https://x.dev  "), true);
});

test("invalid object input", () => {
  assert.equal(isValidUrl({}), false);
});

test("extractDomain empty string", () => {
  assert.equal(extractDomain(""), null);
});

test("isHttps empty string", () => {
  assert.equal(isHttps(""), false);
});

test("valid url hash", () => {
  assert.equal(isValidUrl("https://example.com/#top"), true);
});

test("extractDomain preserves punycode host", () => {
  assert.equal(extractDomain("https://xn--fiq228c.com"), "xn--fiq228c.com");
});
