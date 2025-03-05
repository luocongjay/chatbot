import type { NextConfig } from "next";

const rewrites = async () => [
  {
    source: "/api/:slug*",
    destination: `${process.env.NEXT_PUBLIC_API}/api/:slug*`,
  },
];

const nextConfig: NextConfig = {
  experimental: {
    // ppr: true,
  },
  output: process.env.NODE_ENV === "development" ? undefined : "export",
  rewrites,
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
    ],
  },
};

export default nextConfig;
