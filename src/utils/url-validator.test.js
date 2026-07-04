const test = require("node:test");
const assert = require("node:assert/strict");

const { extractDomain, isHttps, isValidUrl } = require("./url-validator");

const validUrlCases = [
  ["accepts https URLs", "https://example.com", true],
  ["accepts http URLs", "http://example.com", true],
  ["accepts paths", "https://example.com/path?q=1", true],
  ["accepts localhost", "http://localhost:3000", true],
  ["rejects ftp URLs", "ftp://example.com", false],
  ["rejects missing protocol", "example.com", false],
  ["rejects empty strings", "", false],
  ["rejects null", null, false],
  ["rejects undefined", undefined, false],
];

for (const [name, input, expected] of validUrlCases) {
  test(`isValidUrl ${name}`, () => {
    assert.equal(isValidUrl(input), expected);
  });
}

const domainCases = [
  ["extracts a simple hostname", "https://example.com", "example.com"],
  ["drops ports", "http://localhost:3000/path", "localhost"],
  ["handles subdomains", "https://api.example.co.uk/v1", "api.example.co.uk"],
  ["returns empty for ftp URLs", "ftp://example.com", ""],
  ["returns empty for missing protocol", "example.com", ""],
  ["returns empty for empty input", "", ""],
  ["returns empty for null", null, ""],
  ["returns empty for undefined", undefined, ""],
  ["normalizes uppercase hostnames", "https://EXAMPLE.com", "example.com"],
];

for (const [name, input, expected] of domainCases) {
  test(`extractDomain ${name}`, () => {
    assert.equal(extractDomain(input), expected);
  });
}

const httpsCases = [
  ["detects https URLs", "https://example.com", true],
  ["rejects http URLs", "http://example.com", false],
  ["rejects ftp URLs", "ftp://example.com", false],
  ["rejects missing protocol", "example.com", false],
  ["rejects empty strings", "", false],
  ["rejects null", null, false],
  ["rejects undefined", undefined, false],
  ["accepts https with a port", "https://localhost:8443", true],
  ["accepts https with query params", "https://example.com/search?q=x", true],
];

for (const [name, input, expected] of httpsCases) {
  test(`isHttps ${name}`, () => {
    assert.equal(isHttps(input), expected);
  });
}
