# Next.js Landing Page Boilerplate

Minimal Next.js landing page with Tailwind CSS, SEO, and Formspree integration.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npm run deploy
```

## Setup Instructions

### 1. Formspree Setup
1. Go to [Formspree.io](https://formspree.io)
2. Create a new form
3. Copy the Form ID (8 characters after `/f/`)
4. Add it to your `.env.local` file:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your Form ID
   NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here
   ```

### 2. Customize Content
Edit `pages/index.js` to update:
- Headlines and copy
- Meta tags for SEO
- Company information
- Social media links

### 3. Add Images
Place your images in the `public` folder:
- `favicon.ico` (32x32px)
- `og-image.jpg` (1200x630px for social sharing)

### 4. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Features

- ✅ **Responsive design** with Tailwind CSS
- ✅ **SEO optimized** with meta tags
- ✅ **Email capture** with Formspree
- ✅ **Smooth scrolling** navigation
- ✅ **Loading states** and error handling
- ✅ **Mobile-first** design
- ✅ **Fast performance** out of the box

## File Structure

```
├── pages/
│   ├── _app.js          # App wrapper
│   └── index.js         # Main landing page
├── styles/
│   └── globals.css      # Global styles
├── public/
│   └── favicon.ico      # Favicon
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind config
└── next.config.js       # Next.js config
```

## Customization

### Colors
Update the color scheme in `pages/index.js`:
```javascript
// Change from blue to your brand colors
className="bg-gradient-to-br from-blue-600 to-purple-700"
```

### Typography
Add custom fonts in `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
},
```

### Analytics
Add Google Analytics or other tracking:
```javascript
// In pages/_app.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  
  useEffect(() => {
    // Add your analytics code here
  }, [router.events])
  
  return <Component {...pageProps} />
}
```

## Performance Tips

- Images are automatically optimized by Next.js
- Tailwind CSS is purged in production
- Built-in code splitting for fast loading
- Static generation for better SEO

## Support

For issues or questions, check the [Next.js documentation](https://nextjs.org/docs).

---

Built with ❤️ using Next.js and Tailwind CSS