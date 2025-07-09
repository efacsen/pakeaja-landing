/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Compress output
  compress: true,
  // Generate static HTML
  generateEtags: false,
  // Disable x-powered-by header
  poweredByHeader: false,
  // Strict mode for better performance
  reactStrictMode: true,
}

module.exports = nextConfig