# ARCHITECTURE: Pake Aja Landing Page

## Overview
High-converting landing page for Indonesian construction professionals, optimized for mobile-first experience and rapid deployment on Vercel.

## Tech Stack

### Frontend Framework
**Next.js 14 (App Router)**
- Server-side rendering for SEO
- Optimized for Vercel deployment
- Built-in image optimization
- Incremental Static Regeneration for dynamic content

### Styling
**Tailwind CSS + shadcn/ui**
- Rapid UI development
- Consistent design system
- Mobile-first responsive utilities
- Tree-shakeable for performance

### Authentication & Database
**Supabase**
- Quick auth setup with magic links
- PostgreSQL for user data
- Row Level Security for data protection
- Generous free tier

### Hosting & Deployment
**Vercel**
- Automatic deployments from Git
- Edge network for Indonesian users
- Built-in analytics
- Environment variable management

### Additional Tools
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Framer Motion**: Smooth animations
- **Next-SEO**: SEO management
- **next-intl**: Internationalization (Indonesian/English)

## Project Structure

```
pakeaja-landing/
├── app/                    # Next.js app directory
│   ├── (marketing)/       # Public pages
│   │   ├── page.tsx       # Homepage
│   │   ├── pricing/       # Pricing page
│   │   └── features/      # Features page
│   ├── (auth)/           # Auth pages
│   │   ├── login/        # Login page
│   │   └── signup/       # Signup page
│   ├── api/              # API routes
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   ├── sections/        # Page sections
│   └── forms/           # Form components
├── lib/                 # Utilities
│   ├── supabase/       # Supabase client
│   └── utils/          # Helper functions
├── public/             # Static assets
│   └── images/         # Optimized images
└── locales/           # Translation files
    ├── id/            # Indonesian
    └── en/            # English
```

## Key Design Decisions

### 1. Mobile-First Approach
- All components designed for mobile screens first
- Touch-friendly interface elements
- Optimized for 3G/4G connections
- Minimal JavaScript for faster loads

### 2. Conversion Optimization
- Above-the-fold CTA placement
- Social proof sections
- Trust signals (testimonials, stats)
- Simplified signup process

### 3. Indonesian Market Focus
- Bahasa Indonesia as primary language
- Local payment methods ready (future)
- Cultural design preferences
- WhatsApp integration ready

### 4. Performance Strategy
- Static generation where possible
- Image optimization with next/image
- Font subsetting for Indonesian characters
- CDN distribution via Vercel

## Component Architecture

### Core Components

1. **Hero Section**
   - Headline in Bahasa Indonesia
   - Subheadline with value prop
   - Primary CTA (Start Free)
   - Hero image/illustration

2. **Features Grid**
   - Icon-based feature cards
   - Mobile-responsive grid
   - Benefit-focused copy
   - Visual hierarchy

3. **Pricing Table**
   - Free vs Premium comparison
   - Clear feature differentiation
   - Prominent upgrade CTA
   - Price in IDR

4. **Social Proof**
   - Customer testimonials
   - Usage statistics
   - Company logos
   - Trust badges

5. **Signup Flow**
   - Email/password or Google
   - Progressive disclosure
   - Clear value reminders
   - Success confirmation

## State Management
- React Context for auth state
- Local state for UI interactions
- Supabase real-time subscriptions
- Form state with React Hook Form

## API Design
- Next.js API routes for server functions
- Supabase client for data operations
- Edge functions for performance
- Webhook endpoints for integrations

## Security Considerations
- Environment variables for secrets
- CORS configuration
- Rate limiting on API routes
- Input validation with Zod
- SQL injection prevention via Supabase

## SEO Strategy
- Static meta tags for main pages
- Structured data for rich snippets
- XML sitemap generation
- Indonesian keyword optimization
- Open Graph tags for social sharing

## Deployment Pipeline
1. Push to main branch
2. Vercel automatic deployment
3. Preview deployments for PRs
4. Environment-based configuration
5. Automatic SSL and CDN

## Future Considerations
- PWA capabilities
- Offline support
- Push notifications
- A/B testing framework
- Advanced analytics integration

---
Last Updated: 2025-07-08