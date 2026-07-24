import assert from "node:assert/strict";

import nextConfig from "../next.config.mjs";

const requiredHeaders = new Map([
  ["X-Frame-Options", "DENY"],
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=()"]
]);

assert.equal(typeof nextConfig.headers, "function", "next.config.mjs must define headers()");

const routes = await nextConfig.headers();
const allRoutes = routes.find((route) => route.source === "/:path*");

assert.ok(allRoutes, "security headers must apply to all routes");

const configuredHeaders = new Map(
  allRoutes.headers.map((header) => [header.key, header.value])
);

for (const [key, value] of requiredHeaders) {
  assert.equal(configuredHeaders.get(key), value, `${key} header is missing or incorrect`);
}

console.log("Security headers configuration is valid.");
