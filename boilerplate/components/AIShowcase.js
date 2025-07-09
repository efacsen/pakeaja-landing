import { useState, useEffect, useRef } from 'react'
import { 
  ChartIcon, CalculatorIcon, UsersIcon, DocumentIcon, CurrencyIcon,
  CheckCircleIcon, XCircleIcon, ClockIcon, BellIcon, PhoneIcon,
  ExclamationIcon, LightBulbIcon, CalendarIcon, TrophyIcon, StarIcon
} from './Icons'
import { StatusBadge, DataCard, ProgressBar, ActionButton, LoadingSkeleton } from './AIComponents'

const SUGGESTED_QUESTIONS = [
  'Berapa liter cat buat proyek Gudang Peluru Bandung?',
  'Cek margin material A bulan ini dong!',
  'Cari dokumen TDS material A',
  'Kapan Invoice Proyek D jatuh tempo ya?',
  'Berapa sales team yang udah capai target bulan ini?',
]
const MOCK_ANSWERS = {
  'Berapa liter cat buat proyek Gudang Peluru Bandung?': 'Siap bro! Proyek Gudang Peluru Bandung area exterior 5100m², pakai Material A dengan daya sebar 10m²/liter dan 2 lapis. Jadi butuh sekitar 1020 liter. Udah termasuk loss factor ya! 👍',
  'Cek margin material A bulan ini dong!': 'Mantap nih! Material A margin rata-rata 28.5% di bulan Februari, naik dari Januari yang 24.5%. Ada kenaikan 4% - lumayan banget tuh buat cuan! 💰',
  'Cari dokumen TDS material A': 'Ketemu bro! Ini dokumen TDS untuk material "Cat A": [Download TDS.pdf] - tinggal klik aja ya! 📄',
  'Kapan Invoice Proyek D jatuh tempo ya?': 'Cek dulu ya bro... Invoice proyek D nomor INV-3232 jatuh tempo 20 April 2024. Dari 3 invoice yang dikirim, 2 udah dibayar, 1 belum. Jangan lupa follow up ya! 📅',
  'Berapa sales team yang udah capai target bulan ini?': 'Oke nih! Dari 5 sales team, 3 udah capai target: Andi Santoso (108%), Sari Wijaya (102%), dan Budi Hartono (115%). Yang belum: Deni Kurnia (87%) dan Maya Putri (94%). Semangat terus! 💪'
}

const AIShowcase = (props) => {
  const [hasMounted, setHasMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const mobileChatEndRef = useRef(null)
  const [showQuestions, setShowQuestions] = useState(true)
  useEffect(() => {
    setHasMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile chat demo state
  const [mobileMessages, setMobileMessages] = useState([
    { sender: 'ai', text: 'Halo bro! Gue asisten AI PakeAja. Mau tanya apa nih? Pilih pertanyaan di bawah atau ketik sendiri!' }
  ])
  const [mobileIsTyping, setMobileIsTyping] = useState(false)
  const handleMobileQuestion = (q) => {
    setMobileMessages((msgs) => [...msgs, { sender: 'user', text: q }])
    setMobileIsTyping(true)
    setTimeout(() => {
      setMobileMessages((msgs) => [...msgs, { sender: 'ai', text: MOCK_ANSWERS[q] || 'Waduh, gue belum tau jawaban yang ini bro. Coba tanya yang lain deh!' }])
      setMobileIsTyping(false)
    }, 1200)
    setTimeout(() => {
      mobileChatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      if (props.scrollToAICard) props.scrollToAICard()
    }, 0)
    setShowQuestions(false)
  }

  // --- Desktop: Original Showcase ---
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const messagesEndRef = useRef(null)
  const chatRoomRef = useRef(null)

  const scrollToBottom = () => {
    // Only scroll if the chat room is visible and we're near the bottom
    if (chatRoomRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRoomRef.current
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      
      // Only auto-scroll if user is near the bottom or it's a new conversation
      if (isNearBottom || messages.length <= 1) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Add initial AI greeting
    setMessages([{
      id: 1,
      type: 'ai',
      text: 'Halo bro! Gue AI Assistant PakeAja. Siap bantu lu dengan pertanyaan seputar bisnis aplikator cat. Mau tanya apa nih? Pilih pertanyaan di bawah atau ketik sendiri!',
      timestamp: new Date()
    }])
  }, [])

  const aiExamples = [
    {
      icon: ChartIcon,
      question: "Cek margin material A bulan ini dong!",
      response: {
        type: "cards",
        material: {
          code: "Material A",
          name: "Cat Dekoratif",
          type: "Premium"
        },
        comparison: [
          {
            metric: "Margin",
            january: { value: 24.5, unit: "%" },
            february: { value: 28.5, unit: "%" },
            change: { value: +4.0, unit: "%", status: "up" }
          },
          {
            metric: "Volume Terjual",
            january: { value: 450, unit: "liter" },
            february: { value: 520, unit: "liter" },
            change: { value: +70, unit: "liter", status: "up" }
          },
          {
            metric: "Revenue",
            january: { value: 13200000, unit: "Rp" },
            february: { value: 15200000, unit: "Rp" },
            change: { value: +2000000, unit: "Rp", status: "up" }
          }
        ],
        insight: "Mantap bro! Material A (Cat Dekoratif) naik margin dari 24.5% di Januari jadi 28.5% di Februari, plus volume penjualan naik 15.6%. Ini sih cuan banget!"
      }
    },
    {
      icon: CalculatorIcon,
      question: "Berapa liter cat buat proyek Gudang Peluru Bandung?",
      response: {
        type: "calculation",
        project: "Gudang Peluru Bandung",
        details: {
          area: "5100 m²",
          type: "Cat Eksterior Gudang",
          coating: "2 lapis"
        },
        materials: [
          { 
            name: "Material A (Cat Interior)",
            code: "INT-001",
            coverage: "11 m²/L",
            area: "100 m²",
            calculation: "(100 m² × 2 lapis) ÷ 11 m²/L = 18.2L",
            amount: "19 liter",
            withLoss: "21 liter",
            packaging: [
              { size: "20L", qty: 1, unit: "Pail" },
              { size: "1L", qty: 1, unit: "Kaleng" }
            ]
          },
          { 
            name: "Material B (Cat Eksterior)",
            code: "EXT-002", 
            coverage: "10 m²/L",
            area: "80 m²",
            calculation: "(80 m² × 2 lapis) ÷ 10 m²/L = 16L",
            amount: "16 liter",
            withLoss: "18 liter",
            packaging: [
              { size: "20L", qty: 1, unit: "Pail" }
            ]
          },
          { 
            name: "Primer",
            code: "PRM-003",
            coverage: "12 m²/L",
            area: "180 m²",
            calculation: "(180 m² × 1 lapis) ÷ 12 m²/L = 15L",
            amount: "15 liter",
            withLoss: "17 liter",
            packaging: [
              { size: "20L", qty: 1, unit: "Pail" }
            ]
          },
          { name: "Total", amount: "50 liter", withLoss: "56 liter" }
        ],
        withLossFactor: {
          total: "56 liter",
          cost: "Rp 6.800.000"
        },
        packagingSizes: [
          "1L (Kaleng)",
          "5L (Galon)", 
          "20L (Pail)"
        ],
        recommendation: "Saran gue: tambahin 5 liter ekstra buat touch-up ya bro, biar aman!"
      }
    },
    {
      icon: UsersIcon,
      question: "Berapa sales team yang udah capai target bulan ini?",
      response: {
        type: "performance",
        month: "Maret 2024",
        achievers: [
          { name: "Andi Santoso", revenue: "Rp 45.200.000", target: 108 },
          { name: "Sari Wijaya", revenue: "Rp 38.700.000", target: 102 },
          { name: "Budi Hartono", revenue: "Rp 42.100.000", target: 115 }
        ],
        belowTarget: [
          { name: "Deni Kurnia", revenue: "Rp 28.400.000", target: 87 },
          { name: "Maya Putri", revenue: "Rp 31.200.000", target: 94 }
        ],
        summary: {
          achievedCount: 3,
          totalCount: 5,
          percentage: 60,
          topPerformer: "Budi Hartono"
        }
      }
    },
    {
      icon: DocumentIcon,
      question: "Cari dokumen BAST proyek C dong!",
      response: {
        type: "documents",
        documents: [
          {
            id: "BAST-001-2024",
            project: "Rumah Pak Joko",
            date: "15 Maret 2024",
            status: "completed",
            statusText: "Selesai",
            size: "2.4 MB"
          },
          {
            id: "BAST-002-2024",
            project: "Kantor PT ABC",
            date: "22 Maret 2024",
            status: "pending",
            statusText: "Pending tanda tangan",
            size: "1.8 MB"
          },
          {
            id: "BAST-003-2024",
            project: "Ruko Budi Santoso",
            date: "28 Maret 2024",
            status: "processing",
            statusText: "Draft",
            size: "1.2 MB"
          }
        ]
      }
    },
    {
      icon: CurrencyIcon,
      question: "Kapan Invoice Proyek D jatuh tempo ya?",
      response: {
        type: "invoices",
        invoices: [
          { id: "INV-001", client: "Pak Joko", amount: "Rp 5.200.000", dueDate: "30 Mar", status: "paid", statusText: "Paid" },
          { id: "INV-002", client: "PT ABC", amount: "Rp 12.800.000", dueDate: "5 Apr", status: "pending", statusText: "Pending" },
          { id: "INV-003", client: "Bu Sari", amount: "Rp 8.400.000", dueDate: "15 Apr", status: "overdue", statusText: "Overdue" },
          { id: "INV-004", client: "Pak Budi", amount: "Rp 6.700.000", dueDate: "20 Apr", status: "pending", statusText: "Pending" }
        ],
        summary: {
          overdue: 1,
          overdueAmount: "Rp 8.400.000",
          pending: 2,
          pendingAmount: "Rp 19.500.000",
          total: "Rp 33.100.000"
        }
      }
    }
  ]

  const handleQuestionClick = (example, index) => {
    setSelectedQuestion(index)
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: example.question,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)
    
    // Ensure chat room is scrolled properly
    if (chatRoomRef.current) {
      // Scroll to show the latest message
      setTimeout(() => {
        chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight
      }, 100)
    }

    // Simulate AI typing and response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: example.response,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const renderResponse = (response) => {
    switch (response.type) {
      case 'cards':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <ChartIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Margin Analysis - Perbandingan Januari & Februari 2024</h4>
            </div>
            
            {/* Material Info Card */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 dark:text-white">{response.material.code}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{response.material.name} • {response.material.type}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <DocumentIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            {/* Comparison Table - Mobile Responsive */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bulan</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Margin (%)</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Volume (liter)</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {/* January Row */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">Januari</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">24.5</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">450</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">Rp 13.200.000</td>
                    </tr>
                    {/* February Row */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">Februari</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">28.5</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">520</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-900 dark:text-white">Rp 15.200.000</td>
                    </tr>
                    {/* Change Row */}
                    <tr className="bg-gray-50 dark:bg-gray-900">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">Perubahan</td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          +4.0
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          +70
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          +2.000.000
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Cards */}
              <div className="sm:hidden p-4 space-y-4">
                {/* January */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Januari</h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Margin</div>
                      <div className="font-medium">24.5%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Volume</div>
                      <div className="font-medium">450L</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Revenue</div>
                      <div className="font-medium text-xs">Rp 13.2jt</div>
                    </div>
                  </div>
                </div>
                
                {/* February */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Februari</h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Margin</div>
                      <div className="font-medium">28.5%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Volume</div>
                      <div className="font-medium">520L</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Revenue</div>
                      <div className="font-medium text-xs">Rp 15.2jt</div>
                    </div>
                  </div>
                </div>
                
                {/* Changes */}
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Perubahan</h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-green-600 dark:text-green-400 text-xs">Margin</div>
                      <div className="font-medium text-green-600 dark:text-green-400">+4.0%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-600 dark:text-green-400 text-xs">Volume</div>
                      <div className="font-medium text-green-600 dark:text-green-400">+70L</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-600 dark:text-green-400 text-xs">Revenue</div>
                      <div className="font-medium text-green-600 dark:text-green-400 text-xs">+2jt</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <LightBulbIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700 dark:text-gray-300">{response.insight}</p>
            </div>
            
            {/* Navigation Button */}
            <div className="mt-4 flex justify-end">
              <ActionButton 
                icon={() => (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
                text="Go to Material Analysis"
                variant="primary"
                size="sm"
                onClick={() => console.log('Navigate to Material Analysis')}
              />
            </div>
          </div>
        )
      
      case 'calculation':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CalculatorIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Kalkulasi Proyek - {response.project}</h4>
            </div>
            
            {/* Detail Proyek - Full Width */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
              <h5 className="font-semibold text-base text-gray-900 dark:text-white mb-4">Detail Proyek:</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex justify-between items-center md:block">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Luas Area</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white md:block md:mt-1">{response.details.area}</span>
                </div>
                <div className="flex justify-between items-center md:block">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Jenis</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white md:block md:mt-1">{response.details.type}</span>
                </div>
                <div className="flex justify-between items-center md:block">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Coating</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white md:block md:mt-1">{response.details.coating}</span>
                </div>
              </div>
            </div>

            {/* Kebutuhan Material - Full Width */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
              <h5 className="font-semibold text-base text-gray-900 dark:text-white mb-4">Kebutuhan Material:</h5>
              <div className="space-y-4">
                {response.materials.filter(m => m.name !== 'Total').map((material, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    {/* Mobile-First Layout */}
                    <div className="space-y-4">
                      {/* Material Info */}
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{material.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{material.code}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
                          <div><span className="font-medium">Daya Sebar:</span> {material.coverage}</div>
                          <div><span className="font-medium">Area:</span> {material.area}</div>
                        </div>
                      </div>
                      
                      {/* Calculation */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        {/* Calculation Details */}
                        <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Kalkulasi:</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mb-3 break-words">{material.calculation}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Kebutuhan:</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{material.amount}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">+ 10% Loss Factor:</p>
                            <p className="text-sm font-bold text-green-600 dark:text-green-400">{material.withLoss}</p>
                          </div>
                        </div>
                        
                        {/* Packaging Required */}
                        {material.packaging && (
                          <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
                            <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2">Packaging yang dibutuhkan:</p>
                            <div className="flex flex-wrap gap-2">
                              {material.packaging.map((pkg, pkgIndex) => (
                                <div key={pkgIndex} className="inline-flex items-center text-xs bg-white dark:bg-blue-900/30 px-2 py-1 rounded border border-blue-200 dark:border-blue-800">
                                  <span className="font-medium">{pkg.qty}× {pkg.size} {pkg.unit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Available Package Sizes - Bottom on mobile */}
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Ukuran Kemasan Tersedia:</p>
                        <div className="grid grid-cols-3 gap-1 text-xs text-gray-600 dark:text-gray-400">
                          {response.packagingSizes.map((size, sizeIndex) => (
                            <div key={sizeIndex}>• {size}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Total Summary */}
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total Kebutuhan</p>
                      <p className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">50 liter</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total + Loss Factor</p>
                      <p className="text-sm sm:text-lg font-bold text-green-600 dark:text-green-400">56 liter</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Estimasi Biaya</p>
                      <p className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">Rp 6.8jt</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total Packaging</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">3× 20L + 1× 1L</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recommendation - Full Width */}
            <div className="bg-orange-600 dark:bg-orange-700 p-5 rounded-lg">
              <div className="flex items-start gap-3">
                <LightBulbIcon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Rekomendasi:</p>
                  <p className="text-sm text-white/90">{response.recommendation}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Button */}
            <div className="mt-4 flex justify-end">
              <ActionButton 
                icon={() => (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
                text={`Go to ${response.project}`}
                variant="primary"
                size="sm"
                onClick={() => console.log(`Navigate to ${response.project}`)}
              />
            </div>
          </div>
        )
      
      case 'performance':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <UsersIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Performance - {response.month}</h4>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-base text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  Target Achievers
                </h5>
                <div className="space-y-3">
                  {response.achievers.map((person, index) => (
                    <div key={index} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-1">
                        <span className="font-medium text-gray-900 dark:text-white">{person.name}</span>
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">{person.revenue}</span>
                      </div>
                      <ProgressBar value={person.target} max={100} label="Target" color="green" className="text-xs" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-base text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                  <XCircleIcon className="w-5 h-5" />
                  Below Target
                </h5>
                <div className="space-y-3">
                  {response.belowTarget.map((person, index) => (
                    <div key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-1">
                        <span className="font-medium text-gray-900 dark:text-white">{person.name}</span>
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">{person.revenue}</span>
                      </div>
                      <ProgressBar value={person.target} max={100} label="Target" color="red" className="text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <ChartIcon className="w-4 h-4" />
                  Summary
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {response.summary.achievedCount} dari {response.summary.totalCount} sales mencapai target ({response.summary.percentage}%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <TrophyIcon className="w-4 h-4 text-yellow-500" />
                  Top Performer
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{response.summary.topPerformer}</span>
              </div>
            </div>
            
            {/* Navigation Button */}
            <div className="mt-4 flex justify-end">
              <ActionButton 
                icon={() => (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
                text="Go to Sales Dashboard"
                variant="primary"
                size="sm"
                onClick={() => console.log('Navigate to Sales Dashboard')}
              />
            </div>
          </div>
        )
      
      case 'documents':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <DocumentIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Dokumen BAST - Proyek C</h4>
            </div>
            
            <div className="space-y-3">
              {response.documents.map((doc, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DocumentIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-base text-gray-900 dark:text-white">[{doc.id}]</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{doc.project}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-500">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            {doc.date}
                          </span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={doc.status} text={doc.statusText} className="text-xs" />
                  </div>
                  
                  <div className="flex gap-2">
                    <ActionButton icon={DocumentIcon} text="Lihat" variant="primary" size="sm" />
                    {doc.status === 'pending' && (
                      <ActionButton icon={BellIcon} text="Reminder" variant="secondary" size="sm" />
                    )}
                    {doc.status === 'processing' && (
                      <ActionButton icon={DocumentIcon} text="Edit" variant="secondary" size="sm" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Filter:</span> Proyek C | Status: Semua | Bulan: Maret
            </div>
            
            {/* Navigation Button */}
            <div className="mt-4 flex justify-end">
              <ActionButton 
                icon={() => (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
                text="Go to Project C Documents"
                variant="primary"
                size="sm"
                onClick={() => console.log('Navigate to Project C Documents')}
              />
            </div>
          </div>
        )
      
      case 'invoices':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CurrencyIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Invoice Proyek D - Due Date Tracker</h4>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <th className="text-left py-3 px-3 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Inv ID</th>
                    <th className="text-left py-3 px-3 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="text-left py-3 px-3 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                    <th className="text-center py-3 px-3 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="text-center py-3 px-2 sm:px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {response.invoices.map((invoice, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 px-3 sm:px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{invoice.id}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">{invoice.client}</p>
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.amount}
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-sm text-gray-600 dark:text-gray-400">
                        {invoice.dueDate}
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-center">
                        <StatusBadge status={invoice.status} text={invoice.statusText} className="text-xs" />
                      </td>
                      <td className="py-3 px-2 sm:px-3 text-center">
                        {invoice.status === 'pending' && (
                          <button className="p-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors">
                            <BellIcon className="w-4 h-4" />
                          </button>
                        )}
                        {invoice.status === 'overdue' && (
                          <button className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                            <PhoneIcon className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ExclamationIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="font-semibold text-base text-red-800 dark:text-red-200">Alert</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {response.summary.overdue} invoice overdue
                </p>
                <p className="text-sm font-medium text-red-800 dark:text-red-200 mt-1">
                  {response.summary.overdueAmount}
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClockIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="font-semibold text-base text-yellow-800 dark:text-yellow-200">Pending</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {response.summary.pending} invoices pending
                </p>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mt-1">
                  {response.summary.pendingAmount}
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CurrencyIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-base text-blue-800 dark:text-blue-200">Total Outstanding</span>
                </div>
                <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{response.summary.total}</p>
              </div>
            </div>
            
            {/* Navigation Button */}
            <div className="mt-4 flex justify-end">
              <ActionButton 
                icon={() => (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
                text="Go to Project D Invoices"
                variant="primary"
                size="sm"
                onClick={() => console.log('Navigate to Project D Invoices')}
              />
            </div>
          </div>
        )
      
      default:
        return <div>Response type not found</div>
    }
  }

  const TypingIndicator = () => (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">AI lagi mikir...</span>
    </div>
  )

  if (!hasMounted) return null
  if (isMobile) {
    return (
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 flex flex-col min-h-[340px]">
        <div className="font-bold text-lg text-blue-700 mb-2 text-center">Coba Tanya AI PakeAja, Bro!</div>
        <div className="flex-1 overflow-y-auto mb-3" style={{ maxHeight: 220 }}>
          {mobileMessages.map((msg, i) => (
            <div key={i} className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span role="img" aria-label="AI">🤖</span>
                </div>
              )}
              <div className={`px-4 py-2 rounded-xl text-sm max-w-[75%] ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'}`}>{msg.text}</div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center ml-2 font-bold">U</div>
              )}
            </div>
          ))}
          {mobileIsTyping && (
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <span role="img" aria-label="AI">🤖</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm animate-pulse">Lagi mikir...</div>
            </div>
          )}
          <div ref={mobileChatEndRef} />
        </div>
        <div className="flex flex-col items-center mt-2">
          {showQuestions && (
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  className="px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium transition-colors border border-blue-200"
                  onClick={() => handleMobileQuestion(q)}
                  disabled={mobileIsTyping}
                  aria-label={`Pilih pertanyaan: ${q}`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <button
            className="mt-1 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-700 text-lg shadow border border-gray-200"
            onClick={() => setShowQuestions((v) => !v)}
            aria-label={showQuestions ? 'Tutup pertanyaan' : 'Buka pertanyaan'}
            disabled={mobileIsTyping}
          >
            {showQuestions ? '✕' : '❓'}
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-3 text-center">Demo AI aja ya bro. Jawaban bersifat simulasi.</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg flex flex-col">
      {/* Full Width Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <StarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Asisten AI Kece</h3>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Asisten Bisnis yang Jagoan!</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Asisten pinter yang bakal bantu lu jawab pertanyaan seputar bisnis, kasih insight kece dari data perusahaan lu. Tinggal tanya aja, langsung dijawab!
          </p>
          
          {/* Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Tanya apapun soal bisnis lu, langsung dijawab</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Analisis data gak pake ribet lagi</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Ambil keputusan berdasarkan data real perusahaan</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Cari dokumen proyek, TDS, invoice dalam satu chat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Room */}
      <div ref={chatRoomRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[90%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              {/* Avatar */}
              <div className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {message.type === 'user' ? 'U' : <StarIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                </div>
                
                {/* Message Bubble */}
                <div className={`rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}>
                  {message.text && <p className="text-sm">{message.text}</p>}
                  {message.content && (
                    <div className="mt-3">
                      {renderResponse(message.content)}
                    </div>
                  )}
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <StarIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <TypingIndicator />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Question Suggestions */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Pilih pertanyaan bro:</p>
        <div className="flex flex-wrap gap-2">
          {aiExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(example, index)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                selectedQuestion === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
              }`}
            >
              <example.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{example.question}</span>
              <span className="sm:hidden">Q{index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
export default AIShowcase
