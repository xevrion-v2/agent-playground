import assert from "node:assert/strict";

import nextConfig from "../next.config.mjs";

assert.equal(
  nextConfig.poweredByHeader,
  false,
  "Next.js poweredByHeader should be disabled for web responses."
);
