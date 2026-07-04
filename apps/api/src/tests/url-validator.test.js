import assert from "node:assert/strict";
import { test } from "node:test";

import { extractDomain, isHttps, isValidUrl } from "../utils/url-validator.js";

test("rejects null input as invalid", () => {
  assert.equal(isValidUrl(null), false);
});

test("rejects empty string as invalid", () => {
  assert.equal(isValidUrl(""), false);
});

test("rejects whitespace-only input as invalid", () => {
  assert.equal(isValidUrl("   "), false);
});

test("rejects malformed urls", () => {
  assert.equal(isValidUrl("not a url"), false);
});

test("rejects bare hostnames without a scheme", () => {
  assert.equal(isValidUrl("example.com"), false);
});

test("accepts https urls", () => {
  assert.equal(isValidUrl("https://example.com"), true);
});

test("accepts http urls", () => {
  assert.equal(isValidUrl("http://example.com"), true);
});

test("extracts an empty domain from null input", () => {
  assert.equal(extractDomain(null), "");
});

test("extracts an empty domain from empty input", () => {
  assert.equal(extractDomain(""), "");
});

test("extracts an empty domain from malformed urls", () => {
  assert.equal(extractDomain("not a url"), "");
});

test("extracts the hostname from an https url", () => {
  assert.equal(extractDomain("https://example.com/path"), "example.com");
});

test("extracts the hostname with a subdomain and port", () => {
  assert.equal(extractDomain("https://api.example.com:8080/path"), "api.example.com");
});

test("extracts the hostname from a url with query and hash", () => {
  assert.equal(extractDomain("https://example.com/path?x=1#hash"), "example.com");
});

test("extracts the hostname from a url with credentials", () => {
  assert.equal(extractDomain("https://user:pass@example.com/path"), "example.com");
});

test("extracts the hostname from ftp urls", () => {
  assert.equal(extractDomain("ftp://files.example.com/download"), "files.example.com");
});

test("rejects null input as non-https", () => {
  assert.equal(isHttps(null), false);
});

test("rejects empty string as non-https", () => {
  assert.equal(isHttps(""), false);
});

test("rejects malformed urls as non-https", () => {
  assert.equal(isHttps("not a url"), false);
});

test("accepts https urls as secure", () => {
  assert.equal(isHttps("https://example.com"), true);
});

test("rejects http urls as non-https", () => {
  assert.equal(isHttps("http://example.com"), false);
});

test("rejects ftp urls as non-https", () => {
  assert.equal(isHttps("ftp://example.com"), false);
});

test("trims whitespace before validating", () => {
  assert.equal(isValidUrl("  https://example.com  "), true);
});

test("trims whitespace before extracting the domain", () => {
  assert.equal(extractDomain("  https://example.com/path  "), "example.com");
});

test("trims whitespace before checking https", () => {
  assert.equal(isHttps("  https://example.com  "), true);
});

test("accepts uppercase schemes", () => {
  assert.equal(isValidUrl("HTTPS://example.com"), true);
});

test("extracts the domain from uppercase schemes", () => {
  assert.equal(extractDomain("HTTPS://example.com"), "example.com");
});

test("reports uppercase https schemes as secure", () => {
  assert.equal(isHttps("HTTPS://example.com"), true);
});
