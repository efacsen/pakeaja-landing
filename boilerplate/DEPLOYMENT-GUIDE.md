# 🚀 Vercel Deployment Guide - PakeAja Landing Page

## **📋 Pre-Deployment Checklist**

### **✅ Required Before Deploy**
- [ ] Environment variables configured
- [ ] Domain DNS settings ready
- [ ] Analytics tracking IDs obtained
- [ ] Email service (Formspree) configured
- [ ] SSL certificates planned
- [ ] Error monitoring set up

## **🔧 Step 1: Environment Setup**

### **Create Environment Variables**
```bash
# Create .env.local for local development
cp environment.config.md .env.local
```

### **Required Environment Variables**
```env
# App Configuration
NEXT_PUBLIC_APP_URL=https://www.pakeaja.com
NEXT_PUBLIC_APP_NAME=PakeAja

# Analytics & Tracking
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=
NEXT_PUBLIC_HOTJAR_ID=

# Email Service
NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here

# Feature Flags
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Performance Monitoring
SENTRY_DSN=https://your-sentry-dsn
VERCEL_ANALYTICS_ID=your-vercel-analytics-id
```

## **🏗️ Step 2: Build & Test Locally**

### **Install Dependencies**
```bash
# Install all dependencies
npm install

# Run security audit
npm audit fix

# Test build process
npm run build

# Test production build locally
npm start
```

### **Performance Check**
```bash
# Install Lighthouse CLI for testing
npm install -g lighthouse

# Test performance (should score >90)
lighthouse http://localhost:3000 --only-category=performance
```

## **🌐 Step 3: Vercel Deployment**

### **Option A: Automatic (Recommended)**
```bash
# Connect GitHub repository to Vercel
# 1. Go to vercel.com/dashboard
# 2. Click "New Project"
# 3. Import from GitHub: pakeaja-landing/boilerplate
# 4. Configure settings as below
```

### **Option B: Manual CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Or use the production script
./deploy-production.sh
```

## **⚙️ Step 4: Vercel Configuration**

### **Project Settings in Vercel Dashboard**

#### **General Settings:**
- **Framework Preset:** Next.js
- **Root Directory:** `boilerplate`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

#### **Environment Variables:**
Add all variables from your `.env.local` to Vercel:
1. Go to Project Settings → Environment Variables
2. Add each variable for **Production**, **Preview**, and **Development**

#### **Domain Configuration:**
1. **Custom Domains:**
   - Add `www.pakeaja.com`
   - Add `pakeaja.com` (will redirect to www)
2. **SSL Certificate:** Automatic (Let's Encrypt)
3. **CNAME Records:**
   ```
   www.pakeaja.com → cname.vercel-dns.com
   pakeaja.com → 76.76.19.61 (A record)
   ```

## **🔒 Step 5: Security Configuration**

### **DNS Security (Cloudflare Recommended)**
```bash
# DNS records for enhanced security
# A record
pakeaja.com → 76.76.19.61

# CNAME record  
www.pakeaja.com → cname.vercel-dns.com

# Security headers (already in next.config.js)
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### **Content Security Policy (Optional)**
Update `next.config.js` to add CSP headers:
```javascript
{
  key: 'Content-Security-Policy',
  value: `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googleapis.com *.googletagmanager.com;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src 'self' blob: data: *.googleusercontent.com;
    font-src 'self' *.gstatic.com;
    connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com formspree.io;
    frame-src 'self' *.youtube.com *.vimeo.com;
  `.replace(/\\s{2,}/g, ' ').trim()
}
```

## **📊 Step 6: Analytics & Monitoring Setup**

### **Google Analytics 4**
1. Create GA4 property at analytics.google.com
2. Get Measurement ID (G-XXXXXXXXX)
3. Add to Vercel environment variables
4. Verify tracking in GA4 Real-time reports

### **Vercel Analytics (Built-in)**
```bash
# Enable in Vercel dashboard
# Project Settings → Analytics → Enable
```

### **Error Monitoring (Sentry)**
```bash
# Install Sentry
npm install @sentry/nextjs

# Configure Sentry (create sentry.client.config.js)
# Add DSN to environment variables
```

## **🚀 Step 7: Deploy & Verify**

### **Deployment Process**
```bash
# Final deployment
git add .
git commit -m "feat: production-ready configuration"
git push origin main

# Vercel will automatically deploy
# Check deployment status at vercel.com/dashboard
```

### **Post-Deployment Verification**

#### **Performance Testing:**
```bash
# Test production URL
lighthouse https://www.pakeaja.com --only-category=performance,accessibility,best-practices,seo

# Should achieve:
# Performance: >90
# Accessibility: >90  
# Best Practices: >90
# SEO: >90
```

#### **Functionality Testing:**
- [ ] Page loads correctly
- [ ] Theme toggle works
- [ ] Email signup functions
- [ ] All CTAs work properly
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

#### **SEO Verification:**
```bash
# Check meta tags
curl -s https://www.pakeaja.com | grep -i "<meta"

# Verify sitemap
curl https://www.pakeaja.com/sitemap.xml

# Check robots.txt
curl https://www.pakeaja.com/robots.txt
```

## **🔄 Step 8: Monitoring & Maintenance**

### **Regular Monitoring:**
- **Uptime:** Vercel provides 99.99% uptime
- **Performance:** Monitor Core Web Vitals
- **Analytics:** Check user behavior weekly
- **Errors:** Monitor Sentry dashboard

### **Automatic Updates:**
```bash
# Set up Dependabot (GitHub)
# Create .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/boilerplate"
    schedule:
      interval: "weekly"
```

### **Backup Strategy:**
- **Code:** GitHub repository (automatic)
- **Analytics:** Export monthly
- **Environment:** Document in password manager

## **🚨 Troubleshooting Common Issues**

### **Build Failures:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### **Environment Variable Issues:**
```bash
# Check in Vercel dashboard
# Redeploy after adding missing variables
vercel --prod
```

### **Domain Issues:**
```bash
# Verify DNS propagation
dig www.pakeaja.com
nslookup www.pakeaja.com
```

### **Performance Issues:**
```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

## **✅ Success Criteria**

### **Deployment is successful when:**
- [ ] Site loads at https://www.pakeaja.com
- [ ] All functionality works as expected
- [ ] Performance scores >90 on Lighthouse
- [ ] Analytics tracking confirmed
- [ ] Error monitoring active
- [ ] Mobile experience optimized
- [ ] SEO meta tags verified

---

## **📞 Support & Resources**

### **Documentation:**
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Performance Best Practices](https://web.dev/performance/)

### **Emergency Contacts:**
- Vercel Support: support@vercel.com
- Domain Provider: [Your registrar]
- Developer: [Your contact info]

---

**🎉 Congratulations! Your PakeAja landing page is now live and production-ready!** 