import { useState } from 'react'

const WaitlistSignup = ({ onSuccess }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [validationState, setValidationState] = useState('empty')
  const [hint, setHint] = useState('')
  const [position, setPosition] = useState(0)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!email || email.length === 0) {
      setValidationState('empty')
      setHint('🚀 Masukkan email untuk notifikasi launch')
      return false
    }
    
    if (!email.includes('@')) {
      setValidationState('invalid')
      setHint('🤔 Hmm, kayaknya lupa @ nya')
      return false
    }
    
    if (!emailRegex.test(email)) {
      setValidationState('invalid')
      setHint('😅 Format emailnya belum bener nih')
      return false
    }
    
    setValidationState('valid')
    setHint('✨ Perfect! Siap untuk notifikasi launch')
    return true
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    validateEmail(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateEmail(email)) return

    setStatus('loading')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newPosition = Math.floor(Math.random() * 50) + 501
      setPosition(newPosition)
      setStatus('success')
      
      // Trigger confetti
      onSuccess?.(newPosition)
      
      // Reset form
      setEmail('')
      setValidationState('empty')
      setHint('')
      
    } catch (error) {
      setStatus('error')
    }
  }

  const getInputClasses = () => {
    let classes = 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-primary'
    
    switch (validationState) {
      case 'invalid':
        classes += ' border-danger text-danger focus:border-danger focus:ring-danger/20'
        break
      case 'valid':
        classes += ' border-success text-success focus:border-success focus:ring-success/20'
        break
      default:
        classes += ' border-secondary text-primary focus:border-accent-primary focus:ring-accent-primary/20'
    }
    
    return classes
  }

  const getMascotEmoji = () => {
    switch (validationState) {
      case 'invalid': return '🤨'
      case 'valid': return '🎉'
      default: return '📧'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-accent-primary/10 to-success/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-success/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass p-8 md:p-12 rounded-2xl">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-accent-primary/10 text-accent-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
                <span>Early Bird Access</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Jadi yang Pertama Tahu!
              </h3>
              <p className="text-lg text-secondary">
                Dapatkan notifikasi saat PakeAja siap launch + 
                <strong className="text-accent"> akses prioritas eksklusif</strong> untuk early adopters
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              {/* First row - 3 items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 justify-items-center">
                <div className="flex items-center justify-center gap-3 p-3 bg-secondary/30 rounded-lg text-center">
                  <div className="w-8 h-8 bg-accent-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-accent-primary">⚡</span>
                  </div>
                  <span className="text-sm text-secondary">Priority Access</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-3 bg-secondary/30 rounded-lg text-center">
                  <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                    <span className="text-success">🧪</span>
                  </div>
                  <span className="text-sm text-secondary">Beta Features First</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-3 bg-secondary/30 rounded-lg text-center">
                  <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                    <span className="text-warning">👥</span>
                  </div>
                  <span className="text-sm text-secondary">Early Adopter Community</span>
                </div>
              </div>
              
              {/* Second row - 2 items centered */}
              <div className="flex justify-center gap-4">
                <div className="flex items-center justify-center gap-3 p-3 bg-secondary/30 rounded-lg text-center">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-500">💬</span>
                  </div>
                  <span className="text-sm text-secondary">Direct Dev Feedback</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-3 bg-secondary/30 rounded-lg text-center">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                    <span className="text-indigo-500">💰</span>
                  </div>
                  <span className="text-sm text-secondary">Special Launch Discount</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="nama@email.com"
                  className={getInputClasses()}
                  disabled={status === 'loading'}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl">
                  {getMascotEmoji()}
                </div>
              </div>

              {/* Validation hint */}
              {hint && (
                <p className={`text-sm transition-all duration-300 ${
                  validationState === 'valid' ? 'text-success' : 
                  validationState === 'invalid' ? 'text-danger' : 
                  'text-tertiary'
                }`}>
                  {hint}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || validationState !== 'valid'}
                className="w-full btn-primary py-4 text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Daftar...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>Notify Me When Ready</span>
                    <span className="text-xl">🚀</span>
                  </span>
                )}
              </button>
            </form>

            {/* Success Message */}
            {status === 'success' && (
              <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg text-center animate-slideIn">
                <div className="text-2xl mb-2">🎉</div>
                <p className="text-success font-semibold">
                  Yeay! Kamu di posisi #{position} dalam waitlist!
                </p>
                <p className="text-sm text-success/80 mt-1">
                  Cek email untuk konfirmasi dan bonus content eksklusif
                </p>
              </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
              <div className="mt-6 p-4 bg-danger/10 border border-danger/20 rounded-lg text-center animate-shake">
                <p className="text-danger font-semibold">
                  Oops! Ada masalah. Coba lagi ya!
                </p>
              </div>
            )}

            {/* Try MVP CTA */}
            <div className="mt-8 pt-6 border-t border-secondary/20">
              <div className="text-center space-y-4">
                <p className="text-sm text-secondary">
                  Atau coba versi MVP kami sekarang:
                </p>
                <a
                  href="https://css.pakeaja.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/10 hover:bg-secondary/20 text-secondary hover:text-primary border border-secondary/30 rounded-lg transition-all duration-300 group"
                  onClick={() => {
                    // Track MVP button click
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'mvp_app_click', {
                        event_category: 'navigation',
                        event_label: 'waitlist_section'
                      });
                    }
                  }}
                >
                  <span>Try MVP App</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                
                <p className="text-xs text-tertiary">
                  🔒 Email aman, tidak akan di-spam. Unsubscribe kapan saja.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WaitlistSignup