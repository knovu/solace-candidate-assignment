/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Optimizes bundle size by loading only the modules that you are actually using.
    // See for info: https://chakra-ui.com/docs/get-started/frameworks/next-app#optimize-bundle
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default nextConfig;
