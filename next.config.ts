import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // Optional: Change the base path if your site is in a subdirectory
  // basePath: '/repository-name',
  // Optional: Add trailing slash
  trailingSlash: true,
};

export default nextConfig;
