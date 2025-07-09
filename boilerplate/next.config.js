/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Use Vercel's dynamic rendering
  trailingSlash: false,
  
  // Image optimization
  images: {
    domains: ['pakeaja.com', 'www.pakeaja.com', 'css.pakeaja.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 hours
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
  
  // Performance optimization
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  
  // Redirects for SEO and cross-domain navigation
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
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
    ]
  },
}

module.exports = nextConfig