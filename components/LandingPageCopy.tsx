// Landing Page Copy Component with Indonesian content for paint contractors
// This file contains all the copy as a TypeScript component for easy integration

export const LandingPageCopy = {
  hero: {
    headline: "Beres Tanpa Ribet, Cuan Lancar!",
    subheadline: "Atur proyek cat dari HP. Client bayar cepat, bisnis makin profesional.",
    cta: "Cobain Gratis",
    trustIndicator: "Udah dipake 500+ aplikator cat se-Indonesia"
  },

  painPoints: {
    sectionHeader: "Masih Begini Cara Kerjanya?",
    points: [
      {
        id: 'whatsapp-chaos',
        icon: '💬',
        headline: "Chat Proyek Ilang di WhatsApp",
        description: "Scroll sampe pegel nyari ukuran ruangan client 2 minggu lalu. Info penting ketimbun chat grup RT."
      },
      {
        id: 'payment-delays',
        icon: '💸',
        headline: "Nungguin DP Sampe Berjenggot",
        description: "Client bilang 'besok transfer'. Besoknya lupa. Lu yang rugi beli material duluan."
      },
      {
        id: 'unprofessional-quotes',
        icon: '📝',
        headline: "Penawaran Cuma di Kertas Buram",
        description: "Nulis tangan di bon warung. Client mikir 'ini tukang beneran apa bukan ya?'"
      }
    ]
  },

  solutions: {
    sectionHeader: "Upgrade Jadi Aplikator Profesional",
    points: [
      {
        id: 'organized-projects',
        icon: '📱',
        headline: "Semua Proyek Rapi di Satu Aplikasi",
        description: "Gak perlu scroll WhatsApp lagi. Foto, ukuran, warna cat, semua tersimpan rapi per client."
      },
      {
        id: 'fast-payment',
        icon: '⚡',
        headline: "Invoice Digital, Duit Cepet Masuk",
        description: "Kirim invoice resmi langsung ke HP client. Ada tombol bayar online, gak pake alesan lagi."
      },
      {
        id: 'professional-image',
        icon: '⭐',
        headline: "Penawaran Keren Bikin Client Percaya",
        description: "Template penawaran profesional dengan logo usaha. Client langsung yakin sama kualitas kerja lu."
      }
    ]
  },

  emailCapture: {
    headline: "Buruan, Slot Gratis Terbatas!",
    subheadline: "Khusus 100 aplikator pertama dapet akses gratis selamanya",
    inputPlaceholder: "Email aktif Anda",
    buttonText: "Daftar Sekarang",
    loadingText: "Bentar ya...",
    successMessage: "Mantap! Cek email buat aktifasi 👍",
    privacyNote: "Tenang, email lu aman. Gak bakal di-spam.",
    noCreditCard: "⚡ Gak perlu kartu kredit • Langsung pake"
  },

  navigation: {
    features: "Fitur",
    pricing: "Harga",
    testimonials: "Testi",
    login: "Masuk"
  },

  footer: {
    tagline: "Dibuat oleh aplikator, untuk aplikator",
    copyright: `© ${new Date().getFullYear()} PakeAja. All rights reserved.`
  },

  socialProof: {
    banner: "Join 500+ aplikator yang udah naik level 🚀"
  },

  testimonials: [
    {
      quote: "Dulu client ngejar-ngejar minta update. Sekarang tinggal share link progress. Hemat waktu banget!",
      name: "Pak Budi",
      location: "Jakarta Selatan",
      role: "Aplikator Cat Professional"
    },
    {
      quote: "Invoice digital bikin pembayaran cepet. Gak ada lagi alesan 'lupa transfer' dari client.",
      name: "Mas Agus",
      location: "Surabaya",
      role: "Aplikator Cat Professional"
    },
    {
      quote: "Penawaran jadi keliatan profesional. Client lebih percaya, order makin banyak!",
      name: "Pak Dedi",
      location: "Bandung",
      role: "Aplikator Cat Professional"
    }
  ],

  faq: [
    {
      question: "Gratis beneran?",
      answer: "Iya, gratis buat 100 aplikator pertama. Selamanya. Gak ada biaya tersembunyi."
    },
    {
      question: "Ribet gak pakenya?",
      answer: "Gampang banget! Kayak pake WhatsApp aja. 5 menit langsung paham."
    },
    {
      question: "Client harus install app?",
      answer: "Gak perlu! Client tinggal buka link dari HP mereka. Simple."
    },
    {
      question: "Data aman gak?",
      answer: "Aman 100%. Data di-encrypt dan backup otomatis tiap hari."
    },
    {
      question: "Bisa buat berapa proyek?",
      answer: "Unlimited! Mau 10 atau 100 proyek, bebas aja."
    }
  ],

  notifications: {
    newProject: "✅ Proyek baru dari Client",
    paymentReceived: "💰 Payment received:",
    clientApproved: "📸 Client approved color selection",
    reminder: "⏰ Reminder: Start project tomorrow"
  },

  quickActions: {
    sendQuote: "Kirim Penawaran 📤",
    updateProgress: "Update Progress 📸",
    requestPayment: "Minta Pembayaran 💵",
    viewCalendar: "Lihat Kalender 📅"
  },

  // Alternative headlines for A/B testing
  alternativeHeadlines: [
    "Aplikator Cat Jadi Profesional!",
    "Gak Pusing, Cuan Mulus!",
    "Kerja Rapi, Duit Masuk Cepat!"
  ],

  // Value propositions
  valueProps: {
    timeSaved: "Hemat 5 jam per minggu",
    fasterPayment: "Dibayar 3x lebih cepat",
    moreProjects: "Handle 2x lebih banyak proyek"
  },

  // Call to actions variants
  ctaVariants: {
    primary: "Cobain Gratis",
    secondary: "Daftar Sekarang",
    tertiary: "Mulai Gratis",
    quaternary: "Yuk Mulai!"
  }
};

// Helper function to get random testimonial
export const getRandomTestimonial = () => {
  const testimonials = LandingPageCopy.testimonials;
  return testimonials[Math.floor(Math.random() * testimonials.length)];
};

// Helper function to get formatted currency
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// WhatsApp message templates
export const whatsappTemplates = {
  welcome: "Halo! Selamat datang di PakeAja 👋",
  projectUpdate: "Update proyek: {projectName} - {status}",
  paymentReminder: "Reminder: Invoice {invoiceNumber} jatuh tempo hari ini",
  thankYou: "Terima kasih! Pembayaran {amount} sudah diterima ✅"
};

export default LandingPageCopy;