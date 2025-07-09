import { useState, useEffect } from 'react'

const EmailInput = ({ value, onChange, onSubmit, status }) => {
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  const [validationState, setValidationState] = useState('empty')
  const [hint, setHint] = useState('')
  
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  useEffect(() => {
    validateEmail(value)
  }, [value])
  
  const validateEmail = (email) => {
    if (!email || email.length === 0) {
      setValidationState('empty')
      setHint('📧 Masukkan email aktif kamu')
      return
    }
    
    if (!email.includes('@')) {
      setValidationState('invalid')
      setHint('🤔 Hmm, kayaknya lupa @ nya')
      return
    }
    
    const parts = email.split('@')
    if (parts.length === 2 && parts[1].length === 0) {
      setValidationState('invalid')
      setHint('🏢 Tambah nama email provider (gmail, yahoo, dll)')
      return
    }
    
    if (!email.includes('.') || !emailRegex.test(email)) {
      setValidationState('invalid')
      setHint('😅 Format emailnya belum bener nih')
      return
    }
    
    setValidationState('valid')
    setHint('✨ Mantap! Email udah bener')
  }
  
  const getInputClasses = () => {
    let classes = 'input flex-1 transition-all duration-300 pr-12'
    
    if (touched && validationState === 'invalid') {
      classes += ' border-red-500 animate-shake ring-2 ring-red-200 dark:ring-red-800'
    } else if (validationState === 'valid') {
      classes += ' border-green-500 ring-2 ring-green-200 dark:ring-green-800'
    } else if (focused) {
      classes += ' ring-2 ring-accent-primary/30'
    }
    
    return classes
  }
  
  const getMascotEmoji = () => {
    switch (validationState) {
      case 'empty':
        return focused ? '👀' : '😴'
      case 'invalid':
        return '🤨'
      case 'valid':
        return '🥳'
      default:
        return '😊'
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validationState === 'valid') {
      onSubmit(e)
    } else {
      setTouched(true)
      // Trigger shake animation
      const input = e.target.querySelector('input')
      input.classList.add('animate-shake')
      setTimeout(() => {
        input.classList.remove('animate-shake')
      }, 500)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-3">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="email"
              value={value}
              onChange={(e) => {
                onChange(e)
                if (!touched && e.target.value.length > 0) {
                  setTouched(true)
                }
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="nama@email.com"
              className={getInputClasses()}
              required
            />
            
            {/* Mascot Emoji */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl transition-all duration-300">
              <span className={validationState === 'valid' ? 'animate-bounce' : ''}>
                {getMascotEmoji()}
              </span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading' || (touched && validationState !== 'valid')}
            className="btn-primary px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">🎨</span>
                <span>Bentar ya...</span>
              </span>
            ) : (
              'Daftar Sekarang'
            )}
          </button>
        </div>
        
        {/* Validation Hint */}
        {(touched || focused) && (
          <div className={`text-sm mt-2 transition-all duration-300 ${
            validationState === 'valid' ? 'text-green-600' : 
            validationState === 'invalid' ? 'text-red-600' : 
            'text-tertiary'
          }`}>
            {hint}
          </div>
        )}
      </div>
      
      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-6">
        <div className={`h-1.5 w-12 rounded-full transition-all duration-300 ${
          value.length > 0 ? 'bg-accent-primary' : 'bg-gray-300 dark:bg-gray-700'
        }`} />
        <div className={`h-1.5 w-12 rounded-full transition-all duration-300 ${
          value.includes('@') ? 'bg-accent-primary' : 'bg-gray-300 dark:bg-gray-700'
        }`} />
        <div className={`h-1.5 w-12 rounded-full transition-all duration-300 ${
          validationState === 'valid' ? 'bg-accent-primary animate-pulse' : 'bg-gray-300 dark:bg-gray-700'
        }`} />
      </div>
      
      {/* Success/Error Messages */}
      {status === 'success' && (
        <div className="text-green-600 font-semibold bg-green-100 dark:bg-green-900/30 p-4 rounded-lg mb-4 animate-slideIn">
          <div className="text-center">
            <div>✅ Mantap! Cek email buat aktifasi akun gratis kamu</div>
            <div className="text-sm mt-2 text-green-500">
              Selamat! Kamu aplikator ke-{Math.floor(Math.random() * 50) + 51}! 🏆
            </div>
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-red-600 font-semibold bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mb-4 animate-shake">
          ❌ Waduh, ada error. Coba lagi ya!
        </div>
      )}
    </form>
  )
}

export default EmailInput