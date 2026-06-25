import type { NextConfig } from 'next';

// Set NEXT_PUBLIC_BASE_PATH=/tnp in CI for GitHub Pages (repo sub-path).
// Leave unset for Vercel / custom domain deployments.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
