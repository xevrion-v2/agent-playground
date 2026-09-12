/**
 * Unit tests for the CORS configuration helper.
 */

import assert from "node:assert/strict";
import {
  parseAllowedOrigins,
  isOriginAllowed,
  buildCorsOptions,
  CORS_ENV_VAR
} from "./corsConfig";

// Test 1: Parse single origin
{
  const result = parseAllowedOrigins("https://example.com");
  assert.deepEqual(result.allowedOrigins, ["https://example.com"]);
  assert.equal(result.allowAll, false);
}

// Test 2: Parse multiple comma-separated origins
{
  const result = parseAllowedOrigins("https://example.com,https://api.example.com");
  assert.deepEqual(result.allowedOrigins, ["https://example.com", "https://api.example.com"]);
}

// Test 3: Parse origins with whitespace
{
  const result = parseAllowedOrigins("  https://example.com ,  https://api.example.com  ");
  assert.deepEqual(result.allowedOrigins, ["https://example.com", "https://api.example.com"]);
}

// Test 4: Parse undefined input
{
  const result = parseAllowedOrigins(undefined);
  assert.deepEqual(result.allowedOrigins, []);
  assert.equal(result.allowAll, false);
}

// Test 5: Parse null input
{
  const result = parseAllowedOrigins(null);
  assert.deepEqual(result.allowedOrigins, []);
}

// Test 6: Parse empty string
{
  const result = parseAllowedOrigins("");
  assert.deepEqual(result.allowedOrigins, []);
}

// Test 7: Parse whitespace-only string
{
  const result = parseAllowedOrigins("   ");
  assert.deepEqual(result.allowedOrigins, []);
}

// Test 8: Parse wildcard origin
{
  const result = parseAllowedOrigins("*");
  assert.deepEqual(result.allowedOrigins, ["*"]);
  assert.equal(result.allowAll, true);
}

// Test 9: Deduplicate origins
{
  const result = parseAllowedOrigins("https://example.com,https://example.com,https://api.example.com");
  assert.deepEqual(result.allowedOrigins, ["https://example.com", "https://api.example.com"]);
}

// Test 10: Normalize trailing slashes
{
  const result = parseAllowedOrigins("https://example.com/,https://api.example.com//");
  assert.deepEqual(result.allowedOrigins, ["https://example.com", "https://api.example.com"]);
}

// Test 11: Filter out empty entries between commas
{
  const result = parseAllowedOrigins("https://example.com,,https://api.example.com,");
  assert.deepEqual(result.allowedOrigins, ["https://example.com", "https://api.example.com"]);
}

// Test 12: isOriginAllowed returns true for allowed origin
{
  const config = parseAllowedOrigins("https://example.com");
  assert.equal(isOriginAllowed(config, "https://example.com"), true);
}

// Test 13: isOriginAllowed returns false for disallowed origin
{
  const config = parseAllowedOrigins("https://example.com");
  assert.equal(isOriginAllowed(config, "https://evil.com"), false);
}

// Test 14: isOriginAllowed returns true when wildcard is present
{
  const config = parseAllowedOrigins("*");
  assert.equal(isOriginAllowed(config, "https://anything.com"), true);
}

// Test 15: isOriginAllowed returns false for undefined origin (non-wildcard)
{
  const config = parseAllowedOrigins("https://example.com");
  assert.equal(isOriginAllowed(config, undefined), false);
}

// Test 16: isOriginAllowed normalizes trailing slash in request origin
{
  const config = parseAllowedOrigins("https://example.com");
  assert.equal(isOriginAllowed(config, "https://example.com/"), true);
}

// Test 17: buildCorsOptions returns object with origin function
{
  const options = buildCorsOptions("https://example.com");
  assert.equal(typeof options.origin, "function");
  assert.ok(Array.isArray(options.methods));
  assert.ok(options.credentials === true);
}

// Test 18: buildCorsOptions origin callback allows matching origin
{
  const options = buildCorsOptions("https://example.com");
  options.origin("https://example.com", (err, allow) => {
    assert.equal(err, null);
    assert.equal(allow, true);
  });
}

// Test 19: buildCorsOptions origin callback rejects non-matching origin
{
  const options = buildCorsOptions("https://example.com");
  options.origin("https://evil.com", (err, allow) => {
    assert.equal(err, null);
    assert.equal(allow, false);
  });
}

// Test 20: buildCorsOptions origin callback allows no origin (server-to-server)
{
  const options = buildCorsOptions("https://example.com");
  options.origin(undefined, (err, allow) => {
    assert.equal(err, null);
    assert.equal(allow, true);
  });
}

// Test 21: CORS_ENV_VAR constant is correct
{
  assert.equal(CORS_ENV_VAR, "CORS_ALLOWED_ORIGINS");
}

// Test 22: Parse origins with ports
{
  const result = parseAllowedOrigins("http://localhost:3000,http://localhost:8080");
  assert.deepEqual(result.allowedOrigins, ["http://localhost:3000", "http://localhost:8080"]);
}

console.log("All 22 CORS config tests passed!");
