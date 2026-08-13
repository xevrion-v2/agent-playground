/** @type {import("next").NextConfig} */
const nextConfig = {
  // Disable the X-Powered-By: Next.js response header
  // to prevent information disclosure about the framework.
  poweredByHeader: false,

  reactStrictMode: true,
};

module.exports = nextConfig;
