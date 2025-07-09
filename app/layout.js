import './globals.css'

export const metadata = {
  title: 'PakeAja - Aplikasi Manajemen Proyek Cat Profesional',
  description: 'Atur proyek cat dari HP. Client bayar cepat, bisnis makin profesional. Gratis untuk 100 aplikator pertama!',
  keywords: 'aplikator cat, manajemen proyek, invoice digital, contractor paint, indonesia',
  openGraph: {
    title: 'PakeAja - Beres Tanpa Ribet, Cuan Lancar!',
    description: 'Atur proyek cat dari HP. Client bayar cepat, bisnis makin profesional.',
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.pakeaja.com',
    siteName: 'PakeAja',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PakeAja - Aplikasi Manajemen Proyek Cat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PakeAja - Aplikasi Manajemen Proyek Cat',
    description: 'Atur proyek cat dari HP. Client bayar cepat, bisnis makin profesional.',
    images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#1e40af',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Inline critical CSS for faster rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Inter, system-ui, -apple-system, sans-serif; }
            .hero-gradient { background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); }
          `
        }} />
      </head>
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}