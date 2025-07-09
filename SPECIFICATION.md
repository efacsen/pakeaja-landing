# Technical Specification: CSS.pakeaja.com Landing Page

## Executive Summary
CSS.pakeaja.com is a bilingual (Indonesian/English) educational platform focused on teaching CSS through interactive, locally-relevant examples. The landing page serves as the primary conversion funnel for free account signups and premium subscriptions.

## Business Objectives
- **Primary KPI**: Free account conversion rate > 5%
- **Secondary KPI**: Newsletter signup rate > 15%
- **Monetization**: Freemium model (Free tier + Premium at 99,000 IDR/month)
- **Target Audience**: Indonesian web developers, 70% mobile users (Android)

## User Stories & Acceptance Criteria

### 1. Hero Section Engagement
**As a** Indonesian developer visiting the site  
**I want to** see an impressive CSS animation immediately  
**So that** I understand this site teaches practical CSS skills

**Acceptance Criteria:**
- [ ] Animation loads within 1 second on 3G
- [ ] Animation is interactive (responds to mouse/touch)
- [ ] Includes Indonesian headline and English subtitle
- [ ] CTA button "Mulai Gratis" prominently displayed
- [ ] Animation works on mobile without lag

### 2. Interactive CSS Playground
**As a** curious developer  
**I want to** try CSS examples without signing up  
**So that** I can evaluate the quality of content

**Acceptance Criteria:**
- [ ] 3 interactive examples available without signup
- [ ] Live preview updates as user types
- [ ] Code syntax highlighting in editor
- [ ] Mobile-friendly editor interface
- [ ] Examples relevant to Indonesian websites (e.g., Tokopedia-style cards)
- [ ] "Fork to Account" CTA after interaction

### 3. Course Catalog Preview
**As a** potential learner  
**I want to** see available courses and their content  
**So that** I can decide if it's worth signing up

**Acceptance Criteria:**
- [ ] Display 6 course cards with titles in Indonesian
- [ ] Show course difficulty level (Pemula/Menengah/Mahir)
- [ ] Preview 3 lessons per course
- [ ] "Locked" indicator for premium content
- [ ] Estimated completion time per course
- [ ] Mobile horizontal scroll for course cards

### 4. Social Proof Section
**As a** skeptical visitor  
**I want to** see testimonials from Indonesian developers  
**So that** I trust the platform

**Acceptance Criteria:**
- [ ] 3 testimonials from real Indonesian developers
- [ ] Include name, role, and company
- [ ] Photo or avatar for each testimonial
- [ ] Mix of Bahasa Indonesia and English testimonials
- [ ] Links to their LinkedIn/GitHub profiles
- [ ] Carousel on mobile, grid on desktop

### 5. Pricing Comparison
**As a** price-conscious user  
**I want to** clearly understand free vs premium benefits  
**So that** I can make an informed decision

**Acceptance Criteria:**
- [ ] Two-column comparison table
- [ ] Price in IDR with "Gratis" and "Rp 99.000/bulan"
- [ ] At least 10 feature comparisons
- [ ] Visual indicators (checkmarks/crosses)
- [ ] Emphasis on premium value props
- [ ] Mobile-optimized vertical layout

### 6. Newsletter Capture
**As a** interested visitor  
**I want to** get free CSS tips without creating an account  
**So that** I can learn at my own pace

**Acceptance Criteria:**
- [ ] Lead magnet: "50 CSS Tricks untuk Developer Indonesia" (PDF)
- [ ] Email-only signup form
- [ ] Instant delivery confirmation
- [ ] GDPR-compliant consent checkbox
- [ ] Success message in Indonesian
- [ ] A/B test placement (header vs footer vs popup)

## Technical Architecture

### Frontend Stack
```
Framework: Next.js 14 (App Router)
- Server Components for performance
- Dynamic imports for code playground
- Incremental Static Regeneration

Styling: Tailwind CSS + Custom CSS
- Tailwind for rapid development
- Custom CSS for animations
- CSS Modules for playground examples

State Management:
- React Context for language switching
- Local Storage for playground saves
- Zustand for complex playground state

Code Editor: Monaco Editor (lazy loaded)
- Syntax highlighting
- Auto-completion
- Mobile touch support
```

### Backend Services
```
Authentication: Supabase Auth
- Email/password signup
- Google OAuth
- Magic links for passwordless

Database: Supabase (PostgreSQL)
- User profiles
- Saved playground sessions
- Newsletter subscribers
- Course progress tracking

CDN: Vercel Edge Network
- Automatic image optimization
- CSS/JS bundling
- Regional edge caching for Indonesia
```

### Third-party Integrations
```
Analytics: Google Analytics 4 + Vercel Analytics
Email: Resend (Indonesian IP support)
Payment: Xendit (future - Indonesian payment gateway)
Monitoring: Sentry for error tracking
```

## Component Architecture

### 1. Layout Components
```typescript
<RootLayout>
  <Header>
    <Logo />
    <Navigation />
    <LanguageToggle />
    <CTAButton />
  </Header>
  
  <main>
    {children}
  </main>
  
  <Footer>
    <NewsletterForm />
    <FooterLinks />
    <SocialLinks />
  </Footer>
</RootLayout>
```

### 2. Hero Section
```typescript
<HeroSection>
  <AnimatedBackground />
  <HeroContent>
    <Headline />
    <Subheadline />
    <CTAButton primary />
    <TrustIndicators />
  </HeroContent>
</HeroSection>
```

### 3. Interactive Playground
```typescript
<PlaygroundSection>
  <SectionHeader />
  <PlaygroundTabs>
    <Tab id="gradient-card" />
    <Tab id="floating-button" />
    <Tab id="responsive-nav" />
  </PlaygroundTabs>
  <PlaygroundEditor>
    <CodeEditor />
    <LivePreview />
  </PlaygroundEditor>
  <PlaygroundCTA />
</PlaygroundSection>
```

### 4. Course Catalog
```typescript
<CourseSection>
  <SectionHeader />
  <CourseGrid>
    {courses.map(course => (
      <CourseCard
        title={course.title}
        level={course.level}
        lessons={course.lessons}
        isPremium={course.isPremium}
      />
    ))}
  </CourseGrid>
</CourseSection>
```

### 5. Testimonials
```typescript
<TestimonialsSection>
  <SectionHeader />
  <TestimonialCarousel>
    {testimonials.map(testimonial => (
      <TestimonialCard
        quote={testimonial.quote}
        author={testimonial.author}
        role={testimonial.role}
        company={testimonial.company}
        avatar={testimonial.avatar}
      />
    ))}
  </TestimonialCarousel>
</TestimonialsSection>
```

### 6. Pricing Table
```typescript
<PricingSection>
  <SectionHeader />
  <PricingTable>
    <PricingColumn
      title="Gratis"
      price="0"
      features={freeFeatures}
      cta="Mulai Gratis"
    />
    <PricingColumn
      title="Premium"
      price="99.000"
      features={premiumFeatures}
      cta="Upgrade Sekarang"
      highlighted
    />
  </PricingTable>
</PricingSection>
```

## Data Models

### User Model
```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  language_preference: 'id' | 'en';
  subscription_status: 'free' | 'premium';
  created_at: Date;
  last_login: Date;
}
```

### Newsletter Subscriber
```typescript
interface NewsletterSubscriber {
  id: string;
  email: string;
  language: 'id' | 'en';
  lead_magnet_sent: boolean;
  subscribed_at: Date;
  utm_source?: string;
  utm_medium?: string;
}
```

### Playground Session
```typescript
interface PlaygroundSession {
  id: string;
  user_id?: string;
  example_id: string;
  html_code: string;
  css_code: string;
  last_modified: Date;
  is_forked: boolean;
  parent_id?: string;
}
```

### Course Model
```typescript
interface Course {
  id: string;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
  level: 'pemula' | 'menengah' | 'mahir';
  estimated_hours: number;
  is_premium: boolean;
  lessons: Lesson[];
  thumbnail_url: string;
  order: number;
}
```

## Performance Budget

### Critical Metrics
```
First Contentful Paint (FCP): < 1.5s on 3G
Largest Contentful Paint (LCP): < 2.5s on 3G
Total Blocking Time (TBT): < 200ms
Cumulative Layout Shift (CLS): < 0.1
Time to Interactive (TTI): < 3.5s on 3G
```

### Bundle Size Budget
```
HTML: < 10KB (compressed)
CSS: < 50KB (compressed)
JavaScript: < 100KB initial, < 200KB total
Images: < 200KB above fold, lazy load below
Fonts: < 50KB (subset for Indonesian chars)
Total Page Weight: < 500KB (initial load)
```

### Optimization Strategies
1. **Code Splitting**
   - Dynamic import for Monaco Editor
   - Route-based splitting for future pages
   - Component lazy loading below fold

2. **Image Optimization**
   - Next.js Image component with blur placeholders
   - WebP format with PNG fallback
   - Responsive images for different screens

3. **Font Optimization**
   - Preload critical fonts
   - Subset for Indonesian characters
   - Font-display: swap

4. **Caching Strategy**
   - Static assets: 1 year cache
   - API responses: 5 minute cache
   - HTML: Cache with revalidation

## SEO Strategy

### On-Page SEO
```
Title: "Belajar CSS Interaktif untuk Developer Indonesia | CSS.pakeaja"
Meta Description: "Tutorial CSS bahasa Indonesia dengan contoh interaktif. Mulai gratis, tingkatkan skill CSS untuk project web Indonesia. 🚀"

H1: "Belajar CSS dengan Cara Indonesia"
H2s: Feature sections (Playground, Courses, etc.)

URL Structure: https://css.pakeaja.com/
Canonical URL: Self-referencing
```

### Technical SEO
1. **Structured Data**
   ```json
   {
     "@type": "Course",
     "name": "CSS untuk Developer Indonesia",
     "provider": "Pake Aja",
     "description": "Kursus CSS interaktif...",
     "offers": {
       "@type": "Offer",
       "price": "0",
       "priceCurrency": "IDR"
     }
   }
   ```

2. **Meta Tags**
   - Open Graph for social sharing
   - Twitter Card meta tags
   - Alternate language tags (id/en)

3. **Performance SEO**
   - Core Web Vitals optimization
   - Mobile-friendly test pass
   - HTTPS enforcement

### Content SEO
1. **Target Keywords**
   - Primary: "belajar css indonesia"
   - Secondary: "tutorial css bahasa indonesia"
   - Long-tail: "cara membuat website responsive css"

2. **Internal Linking**
   - Link to course pages (future)
   - Cross-link playground examples
   - Footer links to key pages

## Testing Requirements

### Unit Testing
```typescript
// Component tests with React Testing Library
- Header navigation rendering
- Language toggle functionality
- Form validation (newsletter, signup)
- Playground code execution
- Price formatting (IDR)
```

### Integration Testing
```typescript
// API and database tests
- User signup flow
- Newsletter subscription
- Playground session saving
- Language preference persistence
- Analytics event tracking
```

### E2E Testing
```typescript
// Playwright tests for critical paths
- Complete signup flow
- Playground interaction
- Mobile responsive behavior
- Language switching
- Performance on slow connection
```

### Cross-browser Testing
- Chrome 70+ (primary)
- Firefox 60+
- Safari 12+
- Samsung Internet (Android)
- Chrome Mobile (Android)

### Accessibility Testing
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation
- Color contrast ratios
- Focus indicators

### Performance Testing
- Lighthouse CI in build pipeline
- WebPageTest for real device testing
- 3G throttling tests
- Bundle size monitoring

## Risk Assessment

### Technical Risks
1. **Monaco Editor on Mobile**
   - Mitigation: Simplified mobile editor fallback
   
2. **3G Performance Target**
   - Mitigation: Progressive enhancement, critical CSS

3. **Real-time Preview Performance**
   - Mitigation: Debounced updates, web workers

### Business Risks
1. **Low Conversion Rate**
   - Mitigation: A/B testing, quick iterations

2. **Content Localization Quality**
   - Mitigation: Native speaker review, community feedback

3. **Payment Integration (Future)**
   - Mitigation: Start with manual upgrades

## Implementation Timeline

### Phase 1: MVP (Days 1-3)
- Day 1: Setup, Hero, Basic Playground
- Day 2: Courses, Testimonials, Pricing
- Day 3: Newsletter, Polish, Deploy

### Phase 2: Enhancement (Week 2)
- Advanced playground features
- More interactive examples
- A/B testing setup
- Performance optimization

### Phase 3: Growth (Week 3-4)
- User accounts
- Saved sessions
- Email automation
- Premium features

---
Last Updated: 2025-07-08