import { useState, useEffect } from 'react'

const WhatsAppChat = ({ className = '' }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showMessages, setShowMessages] = useState([])

  const messages = [
    {
      id: 1,
      sender: 'Budi Santoso',
      avatar: 'BS',
      time: '10:24',
      message: 'Bro, ada yang tau app buat manage proyek cat ga? Gw cape banget nulis manual terus 😩',
      type: 'text'
    },
    {
      id: 2,
      sender: 'Andi Wijaya',
      avatar: 'AW',
      time: '10:25',
      message: 'Sama sih, gw juga butuh. Client sering lupa bayar DP. Ada yang bilang bayar besok, besoknya ilang 😂',
      type: 'text'
    },
    {
      id: 3,
      sender: 'Sari Indah',
      avatar: 'SI',
      time: '10:26',
      message: 'Gw pengen banget ada yang bisa tracking progress project real-time. Capek koordinasi via WA mulu',
      type: 'text'
    },
    {
      id: 4,
      sender: 'Rizky Pratama',
      avatar: 'RP',
      time: '10:27',
      message: '🎤 Voice message (0:15)',
      type: 'voice',
      voiceText: 'Eh guys, gw udah coba berbagai cara tapi tetep aja ribet. Mau bikin invoice yang rapi susah banget'
    },
    {
      id: 5,
      sender: 'Maya Putri',
      avatar: 'MP',
      time: '10:28',
      message: 'Foto project gw sering ilang di chat. Susah banget kalau mau tunjukin progress ke client 📸',
      type: 'text'
    },
    {
      id: 6,
      sender: 'Denny Kurniawan',
      avatar: 'DK',
      time: '10:29',
      message: 'Gw udah kehilangan 10 juta lebih gara-gara client PHP. Kalau ada sistem yang bisa reminder otomatis pasti membantu banget',
      type: 'text'
    },
    {
      id: 7,
      sender: 'Lina Sari',
      avatar: 'LS',
      time: '10:30',
      message: 'Setuju banget! Gw juga pengen ada app yang bisa kasih estimasi biaya otomatis. Sering salah hitung soalnya 😅',
      type: 'text'
    },
    {
      id: 8,
      sender: 'PakeAja Team',
      avatar: 'PT',
      time: '10:31',
      message: 'Hai semua! Kami dengar keluhan kalian. Kami lagi develop solusi untuk semua masalah ini. Stay tuned! 🚀',
      type: 'text',
      isBot: true
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentMessageIndex < messages.length) {
        setIsTyping(true)
        
        setTimeout(() => {
          setIsTyping(false)
          setShowMessages(prev => [...prev, messages[currentMessageIndex]])
          setCurrentMessageIndex(prev => prev + 1)
        }, 1500)
      }
    }, 2000)

    return () => clearInterval(timer)
  }, [currentMessageIndex, messages.length])

  const formatTime = (time) => {
    return time
  }

  const getMessageBubbleClass = (message) => {
    const baseClass = 'max-w-[80%] p-3 relative mb-1'
    
    if (message.isBot) {
      return `${baseClass} bg-[#dcf8c6] dark:bg-[#056162] text-[#303030] dark:text-white rounded-lg rounded-br-sm ml-auto`
    } else {
      return `${baseClass} bg-white dark:bg-[#1f2937] text-[#303030] dark:text-white rounded-lg rounded-bl-sm shadow-sm`
    }
  }

  return (
    <div className={`bg-[#f0f0f0] dark:bg-[#111b21] rounded-2xl overflow-hidden shadow-lg ${className}`}>
      {/* WhatsApp Header */}
      <div className="bg-[#00a884] text-white p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-lg">👷</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">Aplikator Cat Indonesia</h3>
          <p className="text-sm opacity-90">573 members</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-3 bg-[#efeae2] dark:bg-[#0b141a] bg-opacity-50" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f0f0f0\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
        {/* Date separator */}
        <div className="text-center">
          <span className="bg-[#ffd90f] dark:bg-[#182229] px-3 py-1 rounded-lg text-xs text-[#667781] dark:text-[#8696a0] font-medium shadow-sm">
            Hari ini
          </span>
        </div>

        {/* Messages */}
        {showMessages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${message.isBot ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isBot && (
              <div className="w-8 h-8 bg-gradient-to-br from-[#00a884] to-[#00d4aa] rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-sm">
                {message.avatar}
              </div>
            )}
            
            <div className={`flex flex-col ${message.isBot ? 'items-end' : 'items-start'}`}>
              {!message.isBot && (
                <span className="text-xs text-[#667781] dark:text-[#8696a0] mb-1 px-1 font-medium">
                  {message.sender}
                </span>
              )}
              
              <div className={getMessageBubbleClass(message)}>
                {message.type === 'voice' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#00a884] dark:bg-[#056162] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 12c0-2.043-.777-3.908-2.05-5.314a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">{message.message}</div>
                      <div className="text-xs opacity-70 mt-1">
                        "{message.voiceText}"
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm leading-relaxed">
                    {message.message}
                  </div>
                )}
                
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs opacity-70">
                    {message.time}
                  </span>
                  {message.isBot && (
                    <div className="flex">
                      <svg className="w-3 h-3 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <svg className="w-3 h-3 opacity-70 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2 justify-start">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00a884] to-[#00d4aa] rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm">
              PT
            </div>
            <div className="bg-white dark:bg-[#1f2937] p-3 rounded-lg rounded-bl-sm shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#f0f0f0] dark:bg-[#1f2937] border-t border-[#e5e7eb] dark:border-[#374151] flex items-center gap-3">
        <button className="p-2 text-[#8696a0] hover:text-[#00a884] transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"/>
          </svg>
        </button>
        <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-full px-4 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Ketik pesan..."
            className="w-full bg-transparent text-[#303030] dark:text-white placeholder-[#8696a0] outline-none"
            disabled
          />
        </div>
        <button className="p-2 text-[#8696a0] hover:text-[#00a884] transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default WhatsAppChat