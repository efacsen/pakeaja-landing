# Environment Configuration Guide

## Required Environment Variables for Production

Set these in your Vercel dashboard under Project Settings > Environment Variables:

### App Configuration
```
NEXT_PUBLIC_APP_URL=https://www.pakeaja.com
NEXT_PUBLIC_APP_NAME=PakeAja
```

### Analytics & Tracking
```
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=
NEXT_PUBLIC_HOTJAR_ID=
```

### Email Service
```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

### Feature Flags
```
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Security & Monitoring
```
SENTRY_DSN=https://your-sentry-dsn
VERCEL_ANALYTICS_ID=your-vercel-analytics-id
```

## Local Development
Create a `.env.local` file with the same variables for local testing. 