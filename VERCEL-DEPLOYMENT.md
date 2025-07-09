# 🚀 Vercel Deployment Guide for PakeAja Coming Soon

## Quick Deployment Steps

### 1. Choose Your Coming Soon Design
Open `boilerplate/pages/preview-mockups.html` in your browser to preview all 3 options:
- **Option 1**: Minimalist Coming Soon
- **Option 2**: App Preview Teaser  
- **Option 3**: Story-Driven Community (Recommended)

### 2. Prepare for Deployment

Once you've chosen your design:

```bash
# Navigate to boilerplate directory
cd boilerplate

# Copy your chosen design to index.html
# For example, if you choose option 3:
cp pages/coming-soon-3.html pages/index.html

# Or rename the current index.js to keep it
mv pages/index.js pages/index-full.js
```

### 3. Create Static HTML Export

Since the coming soon pages are standalone HTML:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Build the project (if using Next.js structure)
npm run build

# Or for pure HTML deployment, just use the pages folder
```

### 4. Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy (from boilerplate directory)
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: (your account)
# - Link to existing project: N
# - Project name: pakeaja-landing
# - Directory: ./pages (for HTML) or ./ (for Next.js)
# - Override settings: N
```

### 5. Configure Custom Domain

After deployment:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `pakeaja-landing` project
3. Go to "Settings" → "Domains"
4. Add domain: `www.pakeaja.com`
5. Add domain: `pakeaja.com` (redirect to www)

### 6. DNS Configuration

Add these records to your domain provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

## Environment Variables

If using Formspree in the full app later:
1. Go to Project Settings → Environment Variables
2. Add: `NEXT_PUBLIC_FORMSPREE_ID` = `your-form-id`

## Alternative: Direct HTML Deployment

For the simplest deployment of just the coming soon page:

```bash
# Create a new directory
mkdir pakeaja-coming-soon
cd pakeaja-coming-soon

# Copy your chosen HTML file
cp ../boilerplate/pages/coming-soon-3.html index.html

# Initialize and deploy
vercel --prod
```

## Post-Deployment Checklist

- [ ] Verify site loads at www.pakeaja.com
- [ ] Test email form submission
- [ ] Check mobile responsiveness  
- [ ] Verify countdown/animations work
- [ ] Set up Vercel Analytics (optional)
- [ ] Configure SEO meta tags if needed

## Switching Designs Later

To change the coming soon design:
1. Replace the `index.html` with another option
2. Run `vercel --prod` to redeploy
3. Changes will be live in ~30 seconds

## Monitoring

- Check waitlist signups in Formspree dashboard
- Monitor traffic in Vercel Analytics
- Set up alerts for high traffic

## Next Steps

When ready to launch the full app:
1. Move coming soon to `/coming-soon` route
2. Deploy full Next.js app to main route
3. Set up proper redirects
4. Maintain waitlist data

---

**Need help?** The Vercel dashboard has excellent documentation and support.