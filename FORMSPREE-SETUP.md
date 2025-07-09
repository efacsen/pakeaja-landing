# Formspree Integration Setup Guide

## Quick Setup Instructions

### 1. Get Your Form ID
1. Go to your Formspree dashboard
2. Find your "PakeAja Newsletter Signup" form
3. Copy the Form ID (8 characters after `/f/`)

### 2. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Form ID
NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here
```

### 3. Your Current Formspree Configuration
Based on your setup screenshot:
- ✅ **Project Name**: PakeAja Newsletter Signup
- ✅ **Timezone**: Asia/Jakarta
- ✅ **Domain Restriction**: pakeaja.com
- ✅ **Project ID**: 2777115145132833971

### 4. Form Integration Features
Your forms now include:

#### Enhanced Data Collection:
```javascript
{
  email: "user@example.com",
  source: "pakeaja-landing-hero",
  language: "indonesian",
  timestamp: "2025-07-08T10:30:00Z",
  timezone: "Asia/Jakarta",
  userAgent: "Mozilla/5.0..."
}
```

#### Indonesian User Experience:
- **Loading State**: "Bentar ya..." (Wait a moment...)
- **Success Message**: "✅ Mantap! Cek email buat aktifasi akun gratis kamu 👍"
- **Error Message**: "❌ Waduh, ada error. Pastikan email kamu benar dan coba lagi ya!"

#### Analytics Integration:
- Google Analytics event tracking
- Conversion tracking for Indonesian market
- Source attribution for marketing analysis

### 5. Testing Your Form

#### Local Testing:
```bash
npm run dev
# Visit http://localhost:3000
# Test form submission
```

#### Production Testing:
```bash
npm run build
npm run deploy
# Test on your live site
```

### 6. Form Validation
Enhanced email validation includes:
- Proper email format checking
- Indonesian-friendly error messages
- Better user feedback

### 7. Formspree Dashboard
Check your dashboard to see:
- Form submissions
- Email delivery status
- Analytics data
- Spam protection status

### 8. Security Features
- Domain restriction to pakeaja.com
- Email validation
- Source tracking
- Timezone logging for fraud prevention

### 9. Next Steps
1. **Add your Form ID** to `.env.local`
2. **Test form submission** locally
3. **Deploy to production** 
4. **Monitor submissions** in Formspree dashboard
5. **Set up email templates** (optional)

### 10. Troubleshooting

#### Common Issues:
- **Form not submitting**: Check Form ID in environment variables
- **Domain restriction error**: Ensure you're testing on pakeaja.com
- **Spam issues**: Enable reCAPTCHA in Formspree settings

#### Debug Mode:
Form errors are logged to console in development mode.

### 11. Advanced Features (Optional)
- **Email Templates**: Customize welcome emails
- **Webhooks**: Connect to other services
- **Export Data**: Download subscriber lists
- **A/B Testing**: Test different form placements

---

Your form is now optimized for Indonesian paint contractors with proper localization and tracking! 🚀