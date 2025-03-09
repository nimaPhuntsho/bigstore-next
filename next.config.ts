import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
    // domains: ["cdn.dummyjson.com"], // Add the external domain here
  },
  webpack: (config) => {
    config.cache = {
      type: "memory", // Use memory cache instead of filesystem
    };
    return config;
  },
};

export default nextConfig;
