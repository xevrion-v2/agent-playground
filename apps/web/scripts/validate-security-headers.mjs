import assert from 'node:assert/strict';
import nextConfig, { securityHeaders } from '../next.config.mjs';

const requiredHeaders = new Map([
  ['X-Frame-Options', 'DENY'],
  ['X-Content-Type-Options', 'nosniff'],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['Permissions-Policy', 'camera=(), microphone=(), geolocation=()']
]);

assert.equal(typeof nextConfig.headers, 'function', 'nextConfig.headers must be defined');

const routes = await nextConfig.headers();
assert.equal(routes.length, 1, 'security headers should use one catch-all route');
assert.equal(routes[0].source, '/:path*', 'security headers should apply to all routes');

const configuredHeaders = new Map(routes[0].headers.map(({ key, value }) => [key, value]));

for (const [key, value] of requiredHeaders) {
  assert.equal(configuredHeaders.get(key), value, `${key} should be configured`);
}

assert.deepEqual(
  securityHeaders.map(({ key }) => key).sort(),
  [...requiredHeaders.keys()].sort(),
  'exported securityHeaders should match the validated set'
);

console.log('baseline security headers configured');
