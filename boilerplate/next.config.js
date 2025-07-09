/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export to allow SSR
  images: {
    domains: ['css.pakeaja.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Compress output
  compress: true,
  // Generate static HTML
  generateEtags: false,
  // Disable x-powered-by header
  poweredByHeader: false,
  // Strict mode for better performance
  reactStrictMode: true,
  
  // Redirects for multi-domain architecture
  async redirects() {
    return [
      {
        source: '/app',
        destination: 'https://css.pakeaja.com',
        permanent: false,
      },
      {
        source: '/login',
        destination: 'https://css.pakeaja.com/login',
        permanent: false,
      },
      {
        source: '/dashboard',
        destination: 'https://css.pakeaja.com/dashboard',
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig