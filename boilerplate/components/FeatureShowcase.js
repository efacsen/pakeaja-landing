import { useState, useEffect, useRef } from 'react'
import { ChartIcon, CalculatorIcon, TrendingIcon, UsersIcon, StarIcon } from './Icons'
import AIShowcase from './AIShowcase'

const FeatureShowcase = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef(null)
  const aiCardRef = useRef(null)

  const features = [
    {
      id: 'project-management',
      title: 'Manajemen Proyek',
      subtitle: 'Kelola Proyek Gak Pake Ribet',
      icon: ChartIcon,
      description: 'Sistem manajemen proyek yang lengkap untuk mengatur semua aspek pekerjaan kamu. Praktis dan mudah digunakan!',
      points: [
        'Anggaran Proyek Terintegrasi - tinggal input, auto hitung!',
        'Timeline Visual yang kece (Gantt Chart, Kanban, Kalender)',
        'Pelacakan Material Real-time - tau persis stok dimana',
        'Laporan Site Digital - gak perlu tulis manual',
        'Dokumen Digital lengkap (BAST, BAP, QA Checklist, Invoice)'
      ],
      color: 'bg-blue-500'
    },
    {
      id: 'material-calculator',
      title: 'Kalkulator & Manajemen Material',
      subtitle: 'Hitung Kebutuhan Material Anti Salah',
      icon: CalculatorIcon,
      description: 'Sistem kalkulasi material yang sangat akurat dan database lengkap untuk semua kebutuhan proyek cat kamu. Tidak akan salah hitung lagi!',
      points: [
        'Kalkulator Kebutuhan Material - akurat sampai detail',
        'Kalkulator Biaya Coating - langsung tau total biaya',
        'Riwayat Harga Material - pantau fluktuasi harga',
        'Database TDS Material - lengkap dari A sampai Z'
      ],
      color: 'bg-green-500'
    },
    {
      id: 'sales-reporting',
      title: 'Laporan Tim Sales',
      subtitle: 'Pantau Performa Tim Sales yang Kece',
      icon: TrendingIcon,
      description: 'Sistem pelaporan dan tracking yang komprehensif untuk tim sales dan aktivitas canvassing. Semua data jelas, performa meningkat!',
      points: [
        'Laporan harian via webapp/mobile - sangat praktis',
        'Kanban otomatis untuk setiap tahap sales - rapi dan terorganisir',
        'Dashboard KPI Tim Sales - performa real-time',
        'Riwayat canvassing Google Maps - tracking lokasi lengkap'
      ],
      color: 'bg-orange-500'
    },
    {
      id: 'client-portal',
      title: 'Portal Client',
      subtitle: 'Akses Khusus yang Bikin Client Happy',
      icon: UsersIcon,
      description: 'Berikan akses khusus untuk client dalam tracking dan monitoring proyek mereka. Client menjadi lebih percaya dan puas!',
      points: [
        'Pelacakan pengiriman material - client tahu kapan datang',
        'Tracking progress proyek - update real-time',
        'Monitoring pekerjaan maintenance - after sales yang excellent',
        'Sistem klaim garansi - mudah dan jelas',
        'Visibilitas tahap invoice - transparansi penuh'
      ],
      color: 'bg-purple-500'
    },
    {
      id: 'ai-assistant',
      title: 'Asisten AI',
      subtitle: 'Asisten Bisnis yang Jagoan!',
      icon: StarIcon,
      description: 'Asisten pintar yang akan membantu kamu menjawab pertanyaan seputar bisnis, memberikan insight berkualitas dari data perusahaan kamu. Tinggal tanya, langsung dijawab!',
      points: [
        'Tanya apapun soal bisnis kamu, langsung dijawab',
        'Analisis data tanpa ribet lagi',
        'Ambil keputusan berdasarkan data real perusahaan',
        'Cari dokumen proyek, TDS, invoice dalam satu chat'
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

  // --- Mobile carousel scroll handler ---
  const handleMobileScroll = () => {
    if (!carouselRef.current) return
    const scrollLeft = carouselRef.current.scrollLeft
    const cardWidth = carouselRef.current.firstChild?.offsetWidth || 1
    const newIndex = Math.round(scrollLeft / cardWidth)
    if (newIndex !== activeTab) setActiveTab(newIndex)
  }

  // Function to horizontally center the AI card in the carousel
  const scrollToAICard = () => {
    if (!carouselRef.current || !aiCardRef.current) return;
    const carousel = carouselRef.current;
    const card = aiCardRef.current;
    const carouselRect = carousel.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const scrollLeft = carousel.scrollLeft + (cardRect.left - carouselRect.left) - (carouselRect.width / 2 - cardRect.width / 2);
    carousel.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }

  // Mobile carousel scroll-to-index
  useEffect(() => {
    // Removed scrollIntoView to prevent auto-scroll to top after swipe or dot click
  }, [activeTab, isMobile])

  return (
    <div className={className}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
            Apa yang Sedang Kami Bangun untuk Kamu
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Solusi lengkap untuk semua masalah yang kamu alami dalam bisnis aplikator cat
          </p>
        </div>

        {/* MOBILE: Horizontal Carousel with Snap */}
        {isMobile ? (
          <>
            {/* Top Dot Indicators */}
            <div className="flex justify-center gap-2 mb-4">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === activeTab ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                  onClick={() => setActiveTab(idx)}
                  aria-label={`Go to feature ${idx + 1}`}
                />
              ))}
            </div>
            <div
              ref={carouselRef}
              className="flex flex-row overflow-x-auto snap-x snap-mandatory -mx-4 px-2 pb-4 no-scrollbar"
              style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
              onScroll={handleMobileScroll}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="min-w-[85vw] max-w-[85vw] mr-4 snap-center flex-shrink-0"
                  style={{ scrollSnapAlign: 'center', minHeight: '75vh' }}
                >
                  <div ref={feature.id === 'ai-assistant' ? aiCardRef : undefined} className="p-8 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-2xl dark:bg-gray-900/70 dark:border-white/10 h-full flex flex-col justify-between" style={{ minHeight: '75vh' }}>
                    {feature.id === 'ai-assistant' ? (
                      <AIShowcase scrollToAICard={scrollToAICard} />
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-2">
                          <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center shadow-lg`}>
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                            <p className="text-xs text-gray-700 dark:text-gray-300">{feature.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-base text-gray-900 dark:text-white leading-relaxed">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2">
                              <span className="inline-block w-4 h-4 mt-1 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-blue-500 dark:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              </span>
                              <span className="text-gray-900 dark:text-white text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom Dot Indicators */}
            <div className="flex justify-center gap-2 mt-2">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === activeTab ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
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
              <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-2xl dark:bg-gray-900/70 dark:border-white/10 my-2">
                <div className="flex gap-2">
                  {features.map((feature, index) => (
                    <button
                      key={feature.id}
                      onClick={() => setActiveTab(index)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center my-2 ${
                        activeTab === index
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-600 shadow-lg dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-400'
                          : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50 border-2 border-transparent dark:text-gray-300'
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
                    <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-2xl dark:bg-gray-900/70 dark:border-white/10">
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
                                <h3 className="text-2xl font-bold text-black dark:text-white mb-1">
                                  {feature.title}
                                </h3>
                                <p className="text-black dark:text-gray-300">
                                  {feature.subtitle}
                                </p>
                              </div>
                            </div>
                            <p className="text-lg text-black dark:text-gray-100 leading-relaxed">
                              {feature.description}
                            </p>
                            <div className="space-y-3">
                              {feature.points.map((point, pointIndex) => (
                                <div 
                                  key={pointIndex} 
                                  className="flex items-start gap-3 group"
                                >
                                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5 group-hover:bg-blue-200 dark:bg-blue-800 dark:group-hover:bg-blue-700 transition-colors">
                                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <span className="text-black dark:text-white leading-relaxed">
                                    {point}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Feature Visual */}
                          <div className="relative">
                            <div className="glass-card p-6 rounded-xl bg-blue-50 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700">
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg ${feature.color} flex items-center justify-center`}>
                                    <feature.icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="h-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                                      <div 
                                        className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-1000"
                                        style={{ width: `${(index + 1) * 20}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-gray-900/60 rounded-lg">
                                      <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900"></div>
                                      <div className="flex-1">
                                        <div className="h-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                                          <div 
                                            className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
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