# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
**Pake Aja Landing Page** - A high-converting landing page for Indonesian construction professionals (paint applicators, contractors, architects, designers). Primary goal is converting visitors to free signups with eventual premium upsell.

## Quick Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Deployment
```bash
git push origin main # Auto-deploys to Vercel
vercel --prod       # Manual production deployment
vercel              # Preview deployment
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 (App Router) - Chosen for Vercel optimization and SEO
- **Styling**: Tailwind CSS + shadcn/ui - Rapid development with 3-day timeline
- **Auth/DB**: Supabase - Quick setup, generous free tier
- **Language**: TypeScript - Type safety for rapid development
- **i18n**: next-intl - Indonesian primary, English secondary

### Key Patterns

1. **Component Structure**
   - All components in `components/` directory
   - UI primitives from shadcn/ui in `components/ui/`
   - Page sections in `components/sections/`
   - Consistent naming: `ComponentName.tsx`

2. **Routing Structure**
   ```
   app/
     (marketing)/     # Public pages (no auth required)
     (auth)/         # Auth flow pages
     (dashboard)/    # Future: logged-in user area
   ```

3. **State Management**
   - Auth state via Supabase + React Context
   - Form state via React Hook Form + Zod
   - No complex state management needed for landing page

4. **API Integration**
   - Supabase client in `lib/supabase/`
   - API routes in `app/api/` for server-side operations
   - Environment variables for configuration

## Indonesian Market Considerations

### Language & Copy
- Primary language: Bahasa Indonesia
- Use informal but professional tone ("Pake Aja" style)
- Avoid complex English terms without translation
- Key terms:
  - Paint Applicator = Aplikator Cat
  - Contractor = Kontraktor
  - Architect = Arsitek
  - Designer = Desainer

### Design Patterns
- Mobile-first (majority access via mobile)
- WhatsApp-style UI elements familiar to users
- Bold colors, clear CTAs
- Trust signals important (testimonials, local examples)

### Performance
- Optimize for 3G/4G connections
- Lazy load images below fold
- Minimize JavaScript bundles
- Use Vercel edge network for Indonesian users

## Conversion Optimization

### Landing Page Must-Haves
1. **Above-the-fold CTA** - "Mulai Gratis" (Start Free)
2. **Value proposition** - Clear, benefit-focused
3. **Social proof** - Indonesian testimonials
4. **Feature comparison** - Free vs Premium
5. **Trust signals** - Security badges, user count

### Signup Flow
- Keep it simple: email + password only
- Option for Google signup
- No credit card for free tier
- Clear onboarding after signup

## Common Tasks

### Adding New Sections
```typescript
// 1. Create component in components/sections/
// 2. Import in app/(marketing)/page.tsx
// 3. Follow existing section patterns
```

### Updating Translations
```typescript
// Edit files in locales/id/ and locales/en/
// Use TypeScript autocomplete for keys
```

### Testing Conversions
```typescript
// Use Vercel Analytics for A/B testing
// Track events: signup_started, signup_completed
```

## Important Files

- `app/(marketing)/page.tsx` - Homepage
- `components/sections/Hero.tsx` - Main hero section
- `lib/supabase/client.ts` - Supabase configuration
- `locales/id/common.json` - Indonesian translations
- `tailwind.config.ts` - Design system configuration

## Development Priorities (3-Day Sprint)

1. **Day 1**: Get hero section live with signup CTA
2. **Day 2**: Complete all sections, implement auth
3. **Day 3**: Polish, test, deploy

## Testing Checklist
- [ ] Mobile responsive (320px - 768px)
- [ ] Desktop responsive (1024px+)
- [ ] Forms work on mobile keyboards
- [ ] Images optimized and lazy loaded
- [ ] Indonesian copy reviewed
- [ ] Signup flow tested end-to-end
- [ ] Analytics tracking confirmed

## Deployment Notes
- Vercel auto-deploys from main branch
- Preview deploys for all PRs
- Environment variables set in Vercel dashboard
- Domain already configured: www.pakeaja.com

---
Remember: Focus on shipping a working landing page that converts. Perfect is the enemy of done, especially with a 3-day timeline.