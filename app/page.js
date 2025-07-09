'use client'

import { useState } from 'react'
import Image from 'next/image'

// Copy content
const copy = {
  hero: {
    headline: "Beres Tanpa Ribet, Cuan Lancar!",
    subheadline: "Atur proyek cat dari HP. Client bayar cepat, bisnis makin profesional.",
    cta: "Cobain Gratis",
    trust: "Udah dipake 500+ aplikator cat se-Indonesia"
  },
  painPoints: {
    title: "Masih Begini Cara Kerjanya?",
    items: [
      {
        icon: "💬",
        title: "Chat Proyek Ilang di WhatsApp",
        desc: "Scroll sampe pegel nyari ukuran ruangan client 2 minggu lalu."
      },
      {
        icon: "💸",
        title: "Nungguin DP Sampe Berjenggot",
        desc: "Client bilang 'besok transfer'. Besoknya lupa. Lu yang rugi."
      },
      {
        icon: "📝",
        title: "Penawaran Cuma di Kertas Buram",
        desc: "Nulis tangan di bon warung. Client mikir 'ini tukang beneran?'"
      }
    ]
  },
  solutions: {
    title: "Upgrade Jadi Aplikator Profesional",
    items: [
      {
        icon: "📱",
        title: "Semua Proyek Rapi di Satu Aplikasi",
        desc: "Foto, ukuran, warna cat, semua tersimpan rapi per client."
      },
      {
        icon: "⚡",
        title: "Invoice Digital, Duit Cepet Masuk",
        desc: "Kirim invoice resmi. Ada tombol bayar online, gak pake alesan."
      },
      {
        icon: "⭐",
        title: "Penawaran Keren Bikin Client Percaya",
        desc: "Template profesional dengan logo usaha. Client langsung yakin."
      }
    ]
  },
  emailCapture: {
    headline: "Buruan, Slot Gratis Terbatas!",
    subheadline: "Khusus 100 aplikator pertama dapet akses gratis selamanya",
    placeholder: "Email aktif Anda",
    button: "Daftar Sekarang",
    privacy: "Tenang, email lu aman. Gak bakal di-spam.",
    noCreditCard: "⚡ Gak perlu kartu kredit • Langsung pake"
  }
}

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle')

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !validateEmail(email)) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Replace with your actual Formspree Form ID
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'YOUR_FORM_ID'
      
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          source: 'pakeaja-landing-hero',
          language: 'indonesian',
          timestamp: new Date().toISOString(),
          timezone: 'Asia/Jakarta'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
        
        // Track conversion event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'newsletter_signup', {
            event_category: 'engagement',
            event_label: 'hero_section',
            value: 1
          })
        }
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 safe-top safe-bottom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-white space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                {copy.hero.headline}
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 text-balance">
                {copy.hero.subheadline}
              </p>
              <div className="space-y-4">
                <button 
                  onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn btn-primary bg-white text-primary-700 hover:bg-gray-100 w-full sm:w-auto text-lg"
                >
                  {copy.hero.cta}
                </button>
                <p className="text-sm text-gray-300">
                  {copy.hero.trust}
                </p>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-contractor.webp"
                alt="Aplikator cat profesional"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">
            {copy.painPoints.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {copy.painPoints.items.map((item, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">
            {copy.solutions.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {copy.solutions.items.map((item, index) => (
              <div key={index} className="card border-2 border-primary-100 hover:border-primary-500 transition-colors">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-primary-700">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section id="signup" className="py-16 sm:py-20 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary-900">
              {copy.emailCapture.headline}
            </h2>
            <p className="text-lg text-primary-700 mb-8">
              {copy.emailCapture.subheadline}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={copy.emailCapture.placeholder}
                  className="form-input flex-1"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary sm:w-auto"
                >
                  {isSubmitting ? 'Bentar ya...' : copy.emailCapture.button}
                </button>
              </div>
              
              {submitStatus === 'success' && (
                <div className="text-success-600 font-semibold bg-success-50 p-3 rounded-lg border border-success-200">
                  ✅ Mantap! Cek email buat aktifasi akun gratis kamu 👍
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-red-600 font-semibold bg-red-50 p-3 rounded-lg border border-red-200">
                  ❌ Waduh, ada error. Cek email kamu dan coba lagi ya!
                </div>
              )}
              
              <p className="text-sm text-gray-600 mt-4">
                {copy.emailCapture.privacy}
              </p>
              <p className="text-sm font-semibold text-primary-700">
                {copy.emailCapture.noCreditCard}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 PakeAja. Dibuat oleh aplikator, untuk aplikator.
          </p>
        </div>
      </footer>
    </main>
  )
}