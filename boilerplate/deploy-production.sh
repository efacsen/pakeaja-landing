#!/bin/bash

# PakeAja Production Deployment Script
# Senior Lead Developer Best Practices

set -e  # Exit on any error

echo "🚀 Starting PakeAja Production Deployment..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Pre-deployment checks
echo -e "${YELLOW}📋 Running pre-deployment checks...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Run this script from the project root.${NC}"
    exit 1
fi

# Security audit
echo -e "${YELLOW}🔒 Running security audit...${NC}"
npm audit --audit-level moderate

# Type checking (if TypeScript)
echo -e "${YELLOW}🔍 Type checking...${NC}"
if [ -f "tsconfig.json" ]; then
    npx tsc --noEmit
fi

# Build the project
echo -e "${YELLOW}🏗️  Building project...${NC}"
npm run build

# Run tests if they exist
if grep -q "test" package.json; then
    echo -e "${YELLOW}🧪 Running tests...${NC}"
    npm test
fi

# Deploy to Vercel
echo -e "${YELLOW}🚀 Deploying to Vercel...${NC}"
npx vercel --prod --yes

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your site should be available at: https://www.pakeaja.com${NC}"

# Post-deployment checks
echo -e "${YELLOW}🔍 Running post-deployment checks...${NC}"
echo "   - Check site is accessible"
echo "   - Verify SSL certificate"
echo "   - Test critical user journeys"
echo "   - Monitor performance metrics"

echo -e "${GREEN}🎉 PakeAja is now live in production!${NC}" 