import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  allowedDevOrigins: ['192.168.29.143'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return [
      { source: '/how', destination: '/how-we-learn', permanent: true },
    ];
  },
};

export default nextConfig;
