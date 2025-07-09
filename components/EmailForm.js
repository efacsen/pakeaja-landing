'use client'

import { useState } from 'react'

export default function EmailForm({ 
  formId, 
  placeholder = "Email aktif Anda", 
  buttonText = "Daftar Sekarang",
  className = ""
}) {
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
      // Use environment variable or prop for form ID
      const actualFormId = process.env.NEXT_PUBLIC_FORMSPREE_ID || formId
      
      const response = await fetch(`https://formspree.io/f/${actualFormId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          source: 'pakeaja-newsletter',
          language: 'indonesian',
          timestamp: new Date().toISOString(),
          timezone: 'Asia/Jakarta',
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : ''
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
        
        // Track conversion for Indonesian market
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'newsletter_signup', {
            event_category: 'lead_generation',
            event_label: 'email_form',
            value: 1,
            currency: 'IDR'
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
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="form-input flex-1"
          required
          disabled={isSubmitting}
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="btn btn-primary sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isSubmitting ? 'Submitting...' : buttonText}
        >
          {isSubmitting ? 'Bentar ya...' : buttonText}
        </button>
      </div>
      
      {submitStatus === 'success' && (
        <div className="text-success-600 font-semibold bg-success-50 p-3 rounded-lg border border-success-200 animate-fade-in" role="alert">
          ✅ Mantap! Cek email buat aktifasi akun gratis kamu 👍
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="text-red-600 font-semibold bg-red-50 p-3 rounded-lg border border-red-200 animate-fade-in" role="alert">
          ❌ Waduh, ada error. Pastikan email kamu benar dan coba lagi ya!
        </div>
      )}
    </form>
  )
}