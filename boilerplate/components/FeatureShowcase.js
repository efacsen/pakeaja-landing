import { useState, useEffect, useRef } from 'react'
import { ChartIcon, CalculatorIcon, TrendingIcon, UsersIcon, StarIcon } from './Icons'
import AIShowcase from './AIShowcase'

const FeatureShowcase = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const features = [
    {
      id: 'project-management',
      title: 'Manajemen Proyek',
      subtitle: 'Kelola Proyek dengan Sistem Lengkap',
      icon: ChartIcon,
      description: 'Sistem manajemen proyek yang lengkap untuk mengatur semua aspek pekerjaan aplikator cat.',
      points: [
        'Anggaran Proyek Terintegrasi',
        'Timeline Visual (Gantt Chart, Kanban, Kalender)',
        'Pelacakan Material Real-time',
        'Laporan Site Digital',
        'Dokumen Digital (BAST, BAP, QA Checklist, Invoice)'
      ],
      color: 'bg-blue-500'
    },
    {
      id: 'material-calculator',
      title: 'Kalkulator & Manajemen Material',
      subtitle: 'Hitung Kebutuhan Material dengan Akurat',
      icon: CalculatorIcon,
      description: 'Sistem kalkulasi material yang akurat dan database lengkap untuk semua kebutuhan proyek cat.',
      points: [
        'Kalkulator Kebutuhan Material',
        'Kalkulator Biaya Coating',
        'Riwayat Harga Material',
        'Database TDS Material'
      ],
      color: 'bg-green-500'
    },
    {
      id: 'sales-reporting',
      title: 'Laporan Tim Sales',
      subtitle: 'Pantau Performa Tim Sales & KPI',
      icon: TrendingIcon,
      description: 'Sistem pelaporan dan tracking yang komprehensif untuk tim sales dan aktivitas canvassing.',
      points: [
        'Laporan harian melalui webapp/mobile',
        'Kanban otomatis untuk setiap tahap sales',
        'Dashboard KPI Tim Sales',
        'Riwayat canvassing Google Maps'
      ],
      color: 'bg-orange-500'
    },
    {
      id: 'client-portal',
      title: 'Portal Client',
      subtitle: 'Akses Khusus untuk Client',
      icon: UsersIcon,
      description: 'Berikan akses khusus untuk client dalam tracking dan monitoring proyek mereka.',
      points: [
        'Pelacakan pengiriman material',
        'Tracking progress proyek',
        'Monitoring pekerjaan maintenance',
        'Sistem klaim garansi',
        'Visibilitas tahap invoice'
      ],
      color: 'bg-purple-500'
    },
    {
      id: 'ai-assistant',
      title: 'Asisten AI',
      subtitle: 'Asisten Perusahaan yang Pintar',
      icon: StarIcon,
      description: 'Asisten pintar yang akan membantu menjawab pertanyaan seputar informasi yang berada di perusahaan, memberikan insight bisnis perusahaan kamu dengan data yang ada.',
      points: [
        'Tanya semua hal yang berhubungan dengan bisnis perusahaan kamu',
        'Data Analisis tidak perlu repot lagi',
        'Ambil keputusan berdasarkan real data perusahaan kamu',
        'Cari Dokumen proyek, TDS hingga invoice dalam satu chatroom'
      ],
      color: 'bg-indigo-500'
    }
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && activeTab < features.length - 1) {
      setActiveTab(activeTab + 1)
    }
    if (isRightSwipe && activeTab > 0) {
      setActiveTab(activeTab - 1)
    }
  }

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % features.length)
  }

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + features.length) % features.length)
  }

  return (
    <div className={`${className}`}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Apa yang Sedang Kami Bangun
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Solusi lengkap untuk semua masalah yang kalian alami
          </p>
        </div>

        {/* Desktop Tabs */}
        {!isMobile && (
          <div className="flex justify-center mb-8">
            <div className="glass-card p-2 rounded-xl">
              <div className="flex gap-2">
                {features.map((feature, index) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center ${
                      activeTab === index
                        ? 'bg-accent-primary/10 text-accent-primary border-2 border-accent-primary shadow-lg'
                        : 'text-secondary hover:text-primary hover:bg-secondary/50 border-2 border-transparent'
                    }`}
                  >
                    <feature.icon className="w-5 h-5 mr-2" />
                    {feature.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Swipe Navigation */}
        {isMobile && (
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevTab}
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
              disabled={activeTab === 0}
            >
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex gap-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeTab ? 'bg-accent-primary' : 'bg-secondary'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTab}
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
              disabled={activeTab === features.length - 1}
            >
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Feature Content */}
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          style={{ touchAction: isMobile ? 'pan-x' : 'auto' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex flex-row transition-transform duration-500 ease-out ${
              isMobile ? '' : 'justify-center'
            }`}
            style={{
              transform: isMobile ? `translateX(-${activeTab * 100}%)` : 'none'
            }}
          >
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`min-w-full w-full flex-shrink-0 ${
                  !isMobile && index !== activeTab ? 'hidden' : ''
                }`}
              >
                <div className="glass-card p-8 rounded-2xl">
                  {feature.id === 'ai-assistant' ? (
                    <AIShowcase />
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Feature Info */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center shadow-lg`}>
                            <feature.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-primary mb-1">
                              {feature.title}
                            </h3>
                            <p className="text-secondary">
                              {feature.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-lg text-secondary leading-relaxed">
                          {feature.description}
                        </p>

                        <div className="space-y-3">
                          {feature.points.map((point, pointIndex) => (
                            <div 
                              key={pointIndex} 
                              className="flex items-start gap-3 group"
                            >
                              <div className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center mt-0.5 group-hover:bg-accent-primary/30 transition-colors">
                                <svg className="w-4 h-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-primary leading-relaxed">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Feature Visual */}
                      <div className="relative">
                        <div className="glass-card p-6 rounded-xl bg-secondary/30">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg ${feature.color} flex items-center justify-center`}>
                                <feature.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="h-2 bg-accent-primary/20 rounded-full">
                                  <div 
                                    className="h-full bg-accent-primary rounded-full transition-all duration-1000"
                                    style={{ width: `${(index + 1) * 20}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center gap-3 p-2 bg-primary/50 rounded-lg">
                                  <div className="w-4 h-4 rounded-full bg-accent-primary/20"></div>
                                  <div className="flex-1">
                                    <div className="h-2 bg-secondary/30 rounded-full">
                                      <div 
                                        className="h-full bg-secondary rounded-full"
                                        style={{ width: `${Math.random() * 80 + 20}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Tab Indicators */}
        {isMobile && (
          <div className="flex justify-center mt-6 gap-2">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === index
                    ? 'bg-accent-primary text-white'
                    : 'bg-secondary/50 text-secondary hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-2">
                  <feature.icon className="w-4 h-4" />
                  <span>{feature.title}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FeatureShowcase