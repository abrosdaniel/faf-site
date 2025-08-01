import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "back.f-a-f.ru",
      },
    ],
  },
};

export default nextConfig;
