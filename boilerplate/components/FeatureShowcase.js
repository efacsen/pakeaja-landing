import { useState, useEffect, useRef } from 'react'
import { ChartIcon, CalculatorIcon, TrendingIcon, UsersIcon, StarIcon } from './Icons'
import AIShowcase from './AIShowcase'

const FeatureShowcase = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef(null)

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
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile carousel scroll-to-index
  useEffect(() => {
    if (isMobile && carouselRef.current) {
      const card = carouselRef.current.children[activeTab]
      card?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }
  }, [activeTab, isMobile])

  return (
    <div className={className}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
            Apa yang Sedang Kami Bangun
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Solusi lengkap untuk semua masalah yang kalian alami
          </p>
        </div>

        {/* MOBILE: Horizontal Carousel with Snap */}
        {isMobile ? (
          <>
            <div
              ref={carouselRef}
              className="flex flex-row overflow-x-auto snap-x snap-mandatory -mx-4 px-2 pb-4 no-scrollbar"
              style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="min-w-[85vw] max-w-[85vw] mr-4 snap-center flex-shrink-0"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <div className="glass-card p-6 rounded-2xl h-full flex flex-col justify-between shadow-lg">
                    {feature.id === 'ai-assistant' ? (
                      <AIShowcase />
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-2">
                          <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center shadow-lg`}>
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                            <p className="text-xs text-gray-500">{feature.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-base text-gray-700 leading-relaxed">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2">
                              <span className="inline-block w-4 h-4 mt-1 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              </span>
                              <span className="text-gray-900 text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-2">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === activeTab ? 'bg-blue-600' : 'bg-gray-300'}`}
                  onClick={() => setActiveTab(idx)}
                  aria-label={`Go to feature ${idx + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          // DESKTOP: Tabbed Layout (unchanged)
          <>
            <div className="flex justify-center mb-8">
              <div className="glass-card p-2 rounded-xl">
                <div className="flex gap-2">
                  {features.map((feature, index) => (
                    <button
                      key={feature.id}
                      onClick={() => setActiveTab(index)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center ${
                        activeTab === index
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-600 shadow-lg'
                          : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50 border-2 border-transparent'
                      }`}
                    >
                      <feature.icon className="w-5 h-5 mr-2" />
                      {feature.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className={`flex transition-transform duration-500 ease-out justify-center`}>
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`w-full flex-shrink-0 ${index !== activeTab ? 'hidden' : ''}`}
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
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                  {feature.title}
                                </h3>
                                <p className="text-gray-500">
                                  {feature.subtitle}
                                </p>
                              </div>
                            </div>
                            <p className="text-lg text-gray-700 leading-relaxed">
                              {feature.description}
                            </p>
                            <div className="space-y-3">
                              {feature.points.map((point, pointIndex) => (
                                <div 
                                  key={pointIndex} 
                                  className="flex items-start gap-3 group"
                                >
                                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 group-hover:bg-blue-200 transition-colors">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <span className="text-gray-900 leading-relaxed">
                                    {point}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Feature Visual */}
                          <div className="relative">
                            <div className="glass-card p-6 rounded-xl bg-blue-50">
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg ${feature.color} flex items-center justify-center`}>
                                    <feature.icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="h-2 bg-blue-100 rounded-full">
                                      <div 
                                        className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                        style={{ width: `${(index + 1) * 20}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                                      <div className="w-4 h-4 rounded-full bg-blue-100"></div>
                                      <div className="flex-1">
                                        <div className="h-2 bg-blue-100 rounded-full">
                                          <div 
                                            className="h-full bg-blue-600 rounded-full"
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
          </>
        )}
      </div>
    </div>
  )
}

export default FeatureShowcase