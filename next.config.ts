import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["cdn.weatherapi.com"],
  },
};

export default nextConfig;
