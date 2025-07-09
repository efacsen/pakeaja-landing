import { useState, useEffect } from 'react'
import Head from 'next/head'
import NetworkBackground from '../components/NetworkBackground'
import ThemeToggle from '../components/ThemeToggle'
import { FeatureCard, PainPointCard, StatsCard } from '../components/InteractiveCard'
import EmailInput from '../components/EmailInput'
import Confetti from '../components/Confetti'

export default function PakeAjaLandingPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mgvyjpvy'
      
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          source: 'pakeaja-landing-new',
          language: 'indonesian',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        // Reset status after 10 seconds
        setTimeout(() => {
          setStatus('idle')
        }, 10000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const scrollToSignup = () => {
    if (typeof document !== 'undefined') {
      document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Prevent hydration mismatch - render a minimal version during SSR
  if (!mounted) {
    return (
      <div className="bg-primary min-h-screen">
        <div className="container mx-auto px-6 md:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              Loading...
            </h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Confetti active={status === 'success'} />
      <Head>
        <title>PakeAja - Beres Tanpa Ribet, Cuan Lancar!</title>
        <meta name="description" content="Atur proyek cat dari HP. Client bayar cepat, bisnis makin profesional. Gratis untuk 100 aplikator pertama!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pakeaja.com/" />
        <meta property="og:title" content="PakeAja - Beres Tanpa Ribet, Cuan Lancar!" />
        <meta property="og:description" content="Atur proyek cat dari HP. Client bayar cepat, bisnis makin profesional." />
        <meta property="og:image" content="https://www.pakeaja.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="PakeAja - Aplikasi Manajemen Proyek Cat" />
        <meta property="twitter:description" content="Atur proyek cat dari HP. Client bayar cepat, bisnis makin profesional." />
        <meta property="twitter:image" content="https://www.pakeaja.com/og-image.jpg" />
      </Head>

      <div className="bg-primary min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 glass" style={{ borderRadius: '0 0 1rem 1rem' }}>
          <div className="container mx-auto px-6 md:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <h1 className="text-2xl font-bold text-primary">PakeAja</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button
                  onClick={scrollToSignup}
                  className="btn-primary px-5 sm:px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <span>Cobain Gratis</span>
                    <span className="text-lg">→</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <NetworkBackground />
          </div>
          
          <div className="container mx-auto px-6 md:px-8 py-20 relative" style={{ zIndex: 1 }}>
            <div className="max-w-4xl mx-auto text-center">
              <div className="fade-in-up">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
                  Beres Tanpa Ribet,
                  <br />
                  <span className="text-accent">Cuan Lancar!</span>
                </h2>
                
                <p className="text-xl md:text-2xl mb-8 text-secondary max-w-2xl mx-auto">
                  Atur proyek cat dari HP. Client bayar cepat, bisnis makin profesional.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <button 
                    onClick={scrollToSignup}
                    className="btn-primary text-lg px-8 py-4 rounded-lg float font-semibold shadow-lg"
                  >
                    Cobain Gratis
                  </button>
                  <p className="text-sm text-tertiary">
                    Udah dipake 500+ aplikator cat se-Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <StatsCard
                number="500+"
                label="Aplikator Terdaftar"
                icon={<span className="text-accent">👷</span>}
              />
              <StatsCard
                number="1000+"
                label="Proyek Selesai"
                icon={<span className="text-accent">🎨</span>}
              />
              <StatsCard
                number="99%"
                label="Kepuasan Client"
                icon={<span className="text-accent">⭐</span>}
              />
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Masih Begini Cara Kerjanya?
              </h3>
              <p className="text-secondary text-lg">
                Jangan biarkan cara kerja lama menghambat bisnis kamu
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <PainPointCard
                icon="💬"
                title="Chat Proyek Ilang di WhatsApp"
                description="Scroll sampe pegel nyari ukuran ruangan client 2 minggu lalu. Info penting ketimbun chat grup RT."
              />
              <PainPointCard
                icon="💸"
                title="Nungguin DP Sampe Berjenggot"
                description="Client bilang 'besok transfer'. Besoknya lupa. Lu yang rugi beli material duluan."
              />
              <PainPointCard
                icon="📝"
                title="Penawaran Cuma di Kertas Buram"
                description="Nulis tangan di bon warung. Client mikir 'ini tukang beneran apa bukan ya?'"
              />
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-24 bg-primary">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Upgrade Jadi Aplikator Profesional
              </h3>
              <p className="text-secondary text-lg">
                Solusi lengkap untuk bisnis cat yang modern
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <FeatureCard
                icon="📱"
                title="Semua Proyek Rapi di Satu Aplikasi"
                description="Foto, ukuran, warna cat, semua tersimpan rapi per client. Gak perlu scroll WhatsApp lagi."
              />
              <FeatureCard
                icon="⚡"
                title="Invoice Digital, Duit Cepet Masuk"
                description="Kirim invoice resmi langsung ke HP client. Ada tombol bayar online, gak pake alesan lagi."
              />
              <FeatureCard
                icon="⭐"
                title="Penawaran Keren Bikin Client Percaya"
                description="Template penawaran profesional dengan logo usaha. Client langsung yakin sama kualitas kerja lu."
              />
            </div>
          </div>
        </section>

        {/* Email Signup Section */}
        <section id="signup" className="py-24 bg-tertiary relative overflow-hidden">
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <NetworkBackground className="opacity-30" />
          </div>
          
          <div className="container mx-auto px-6 md:px-8 relative" style={{ zIndex: 1 }}>
            <div className="max-w-2xl mx-auto text-center">
              <div className="glass p-8 md:p-12 rounded-2xl">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                  Buruan, Slot Gratis Terbatas!
                </h3>
                <p className="text-lg text-secondary mb-8">
                  Khusus 100 aplikator pertama dapet akses gratis selamanya
                </p>
                
                <EmailInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onSubmit={handleSubmit}
                  status={status}
                />
                
                <div className="text-center">
                  <p className="text-sm text-tertiary mb-4">
                    Tenang, email lu aman. Gak bakal di-spam.
                  </p>
                  
                  <p className="text-sm font-semibold text-accent">
                    ⚡ Gak perlu kartu kredit • Langsung pake
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-tertiary border-t border-primary py-16">
          <div className="container mx-auto px-6 md:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <h4 className="text-xl font-bold text-primary">PakeAja</h4>
              </div>
              
              <p className="text-secondary mb-4">
                Dibuat oleh aplikator, untuk aplikator
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-tertiary">
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-accent transition-colors">Contact</a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-primary">
                <p className="text-sm text-tertiary">
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