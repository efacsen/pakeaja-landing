import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import NetworkBackground from '../components/NetworkBackground'
import ThemeToggle from '../components/ThemeToggle'
import ComingSoonHero from '../components/ComingSoonHero'
import WhatsAppChat from '../components/WhatsAppChat'
import FeatureShowcase from '../components/FeatureShowcase'
import WaitlistSignup from '../components/WaitlistSignup'
import Confetti from '../components/Confetti'

export default function ComingSoonCombinedPage() {
  const [mounted, setMounted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const waitlistRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleWaitlistSuccess = (position) => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  // Prevent hydration mismatch
  if (!mounted) return null

  return (
    <>
      <Confetti active={showConfetti} />
      
      <Head>
        <title>Pake Aja Dulu - Aplikasi Aplikator Cat Pertama di Indonesia</title>
        <meta name="description" content="Aplikasi manajemen proyek cat pertama di Indonesia. Solusi lengkap untuk tracking proyek, invoice otomatis, dan AI assistant. Coming Soon Q1 2024!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pakeaja.com/" />
        <meta property="og:title" content="PakeAja - Coming Soon | Aplikasi Manajemen Proyek Cat" />
        <meta property="og:description" content="Aplikasi manajemen proyek cat pertama di Indonesia. Coming Soon Q1 2024!" />
        <meta property="og:image" content="https://www.pakeaja.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="PakeAja - Coming Soon" />
        <meta property="twitter:description" content="Aplikasi manajemen proyek cat pertama di Indonesia. Coming Soon Q1 2024!" />
        <meta property="twitter:image" content="https://www.pakeaja.com/og-image.jpg" />
      </Head>

      <div className="bg-primary min-h-screen">
        {/* Network Background */}
        <div className="fixed inset-0 z-0">
          <NetworkBackground />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 glass" style={{ borderRadius: '0 0 0.5rem 0.5rem' }}>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">P A D</span>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">Pake Aja Dulu</h1>
                  <p className="text-xs text-tertiary hidden sm:block">Aplikasi Aplikator Cat Pertama di Indonesia</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4 my-2">
                <ThemeToggle />
                <button
                  className="btn-primary h-10 px-4 py-2 ml-2 text-sm sm:text-base rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
                >
                  <span className="flex items-center gap-1 sm:gap-2">
                    <span className="hidden sm:inline">Join Waitlist</span>
                    <span className="sm:hidden">Join</span>
                    <span className="text-base sm:text-lg">🚀</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="relative z-10">
          <ComingSoonHero onJoinWaitlist={scrollToWaitlist} />
        </div>

        {/* WhatsApp Chat Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-secondary/30 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-primary">
                Ini Percakapan Nyata di Grup WA Aplikator
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                Keluhan yang sama dari Sabang sampai Merauke. Saatnya ada solusi!
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <WhatsAppChat />
            </div>
            
            <div className="text-center mt-6 sm:mt-8">
              <p className="text-base sm:text-lg text-secondary px-4 sm:px-0">
                <strong className="text-accent">Familiar dengan masalah ini?</strong> Kami punya solusinya! 👇
              </p>
            </div>
          </div>
        </section>

        {/* Feature Showcase */}
        <section className="py-12 sm:py-16 md:py-20 relative z-10">
          <FeatureShowcase />
        </section>

        {/* Waitlist Signup */}
        <div ref={waitlistRef} className="relative z-10">
          <WaitlistSignup onSuccess={handleWaitlistSuccess} />
        </div>

        {/* Footer */}
        <footer className="bg-tertiary border-t border-primary py-8 sm:py-12 md:py-16 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-lg">P A D</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-primary">Pake Aja Dulu</h4>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
                <p className="text-sm sm:text-base text-secondary">Coming Soon 2025</p>
              </div>
              
              <p className="text-tertiary text-xs sm:text-sm">
                Made with ❤️<br/>
                Dibuat oleh Aplikator untuk Aplikator
              </p>
              
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-tertiary mb-3 sm:mb-4">
                  <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-accent transition-colors">Contact</a>
                </div>
                
                <p className="text-xs sm:text-sm text-tertiary">
                  © 2024 PakeAja. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}