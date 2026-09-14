/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security: disable X-Powered-By header to avoid advertising framework
  poweredByHeader: false,
};

export default nextConfig;
