#!/bin/bash

# Next.js Landing Page Deploy Script
# Quick deployment to Vercel

echo "🚀 Deploying to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Build and deploy
echo "Building project..."
npm run build

echo "Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo "Your landing page is now live."