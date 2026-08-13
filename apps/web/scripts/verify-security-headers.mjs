import assert from "node:assert/strict";
import nextConfig from "../next.config.mjs";

const configuredHeaders = await nextConfig.headers();

assert.equal(configuredHeaders.length, 1);
assert.equal(configuredHeaders[0].source, "/:path*");

const headers = new Map(
  configuredHeaders[0].headers.map(({ key, value }) => [key, value])
);

assert.equal(headers.get("X-Frame-Options"), "DENY");
assert.equal(headers.get("X-Content-Type-Options"), "nosniff");
assert.equal(headers.get("Referrer-Policy"), "strict-origin-when-cross-origin");
assert.equal(
  headers.get("Permissions-Policy"),
  "camera=(), microphone=(), geolocation=()"
);
