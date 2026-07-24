import nextConfig from "./next.config.mjs";

if (nextConfig.poweredByHeader !== false) {
  throw new Error("poweredByHeader should be false");
}
console.log("✓ poweredByHeader is false");
