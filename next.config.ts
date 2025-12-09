import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Reduce bundle size by optimizing imports from heavy libs
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
