import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Enable SWC Minify (optional)
  webpack(config) {
    // Disable caching for debugging the issue
    config.cache = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
