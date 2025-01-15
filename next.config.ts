import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: `${process.env.NEXT_PUBLIC_API}/api/:slug*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
};

export default nextConfig;
