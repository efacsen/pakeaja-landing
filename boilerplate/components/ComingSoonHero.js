import { useState, useEffect } from 'react'

const ComingSoonHero = ({ onJoinWaitlist }) => {
  const [currentText, setCurrentText] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const texts = [
    "Aplikasi Manajemen Proyek Cat dan Coating",
    "Kalkulasi Kebutuhan Cat",
    "Generate Coating Cost",
    "Database TDS Material",
    "Reporting Harian Sales", 
    "AI Assistant untuk Aplikator",
    "Solusi untuk Semua Masalah Kalian"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false)
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % texts.length)
        setIsTyping(true)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Main Heading */}
          <div className="fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-primary leading-tight">
              <span className="block mb-1 sm:mb-2 text-lg sm:text-xl md:text-2xl lg:text-4xl">Pertama di Indonesia:</span>
              <span 
                className={`text-accent transition-all duration-500 block ${
                  isTyping ? 'opacity-100' : 'opacity-50'
                }`}
                style={{ minHeight: '1.2em' }}
              >
                {texts[currentText]}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-secondary max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Era baru untuk Solusi lengkap yang akan mengubah cara kerja aplikator cat dan coating di Indonesia. 
              <strong className="text-accent"> Selamanya.</strong>
            </p>



          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-success/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-warning/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
    </section>
  )
}

export default ComingSoonHero