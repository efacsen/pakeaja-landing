# API Examples & Implementation Guide

## Authentication Flow

### 1. User Registration Flow
```typescript
// Step 1: Register new user
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "budi@example.com",
  "password": "SecurePass123!",
  "name": "Budi Santoso",
  "language": "id"
}

// Response (201 Created)
{
  "message": "Registrasi berhasil! Silakan cek email untuk verifikasi.",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "budi@example.com",
    "name": "Budi Santoso",
    "role": "free",
    "language": "id",
    "emailVerified": false,
    "createdAt": "2025-07-08T10:00:00Z"
  }
}

// Step 2: Email verification (from email link)
POST /api/v1/auth/verify-email
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Response (200 OK)
{
  "message": "Email berhasil diverifikasi!",
  "message_en": "Email successfully verified!"
}
```

### 2. Login Flow
```typescript
// Login request
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "budi@example.com",
  "password": "SecurePass123!"
}

// Response (200 OK)
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "budi@example.com",
    "name": "Budi Santoso",
    "role": "premium",
    "language": "id",
    "emailVerified": true,
    "subscription": {
      "status": "active",
      "expiresAt": "2025-08-08T10:00:00Z",
      "plan": "premium_monthly"
    }
  }
}

// Using the access token
GET /api/v1/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Token Refresh Flow
```typescript
// When access token expires
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Response (200 OK)
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

## Error Response Examples

### Authentication Error
```json
// 401 Unauthorized
{
  "code": "AUTH_002",
  "message": "Email atau password salah",
  "message_en": "Invalid email or password",
  "timestamp": "2025-07-08T10:00:00Z"
}
```

### Validation Error
```json
// 400 Bad Request
{
  "code": "VAL_001",
  "message": "Data tidak valid",
  "message_en": "Invalid data",
  "details": {
    "email": "Format email tidak valid",
    "password": "Password minimal 8 karakter"
  },
  "timestamp": "2025-07-08T10:00:00Z"
}
```

### Rate Limit Error
```json
// 429 Too Many Requests
{
  "code": "RATE_001",
  "message": "Terlalu banyak permintaan. Coba lagi nanti",
  "message_en": "Too many requests. Try again later",
  "details": {
    "retryAfter": 60,
    "limit": 100,
    "remaining": 0,
    "resetAt": "2025-07-08T10:01:00Z"
  },
  "timestamp": "2025-07-08T10:00:00Z"
}
```

## Tutorial Access Examples

### List Free Tutorials
```typescript
// Get tutorials for beginners
GET /api/v1/tutorials?difficulty=pemula&premium=false&page=1&limit=10

// Response (200 OK)
{
  "data": [
    {
      "id": "abc123",
      "slug": "css-basics-flexbox",
      "title": "Dasar-dasar CSS Flexbox",
      "title_en": "CSS Flexbox Basics",
      "description": "Pelajari cara menggunakan Flexbox untuk layout modern",
      "description_en": "Learn how to use Flexbox for modern layouts",
      "isPremium": false,
      "difficulty": "pemula",
      "estimatedMinutes": 15,
      "tags": ["flexbox", "layout", "responsive"],
      "createdAt": "2025-07-01T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### Access Premium Tutorial
```typescript
// Attempt to access premium content without subscription
GET /api/v1/tutorials/advanced-animations
Authorization: Bearer [free_user_token]

// Response (403 Forbidden)
{
  "code": "SUBS_001",
  "message": "Konten premium memerlukan langganan",
  "message_en": "Premium content requires subscription",
  "details": {
    "requiredPlan": "premium",
    "upgradeUrl": "https://www.pakeaja.com/pricing"
  },
  "timestamp": "2025-07-08T10:00:00Z"
}
```

## Code Playground Examples

### Save Code Example
```typescript
// Save user's code
POST /api/v1/code-examples
Authorization: Bearer [user_token]
Content-Type: application/json

{
  "title": "Tombol Gradient Keren",
  "htmlCode": "<button class=\"gradient-btn\">Klik Saya</button>",
  "cssCode": ".gradient-btn {\n  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n\n.gradient-btn:hover {\n  transform: translateY(-2px);\n}",
  "jsCode": null
}

// Response (201 Created)
{
  "id": "789xyz",
  "title": "Tombol Gradient Keren",
  "title_en": null,
  "description": null,
  "htmlCode": "<button class=\"gradient-btn\">Klik Saya</button>",
  "cssCode": ".gradient-btn {\n  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n\n.gradient-btn:hover {\n  transform: translateY(-2px);\n}",
  "jsCode": null,
  "isPremium": false,
  "category": "buttons",
  "difficulty": "pemula",
  "likes": 0,
  "views": 0
}
```

## Newsletter Subscription

### Subscribe with Lead Magnet
```typescript
// Subscribe to newsletter
POST /api/v1/newsletter/subscribe
Content-Type: application/json

{
  "email": "siti@example.com",
  "language": "id",
  "source": "landing-footer"
}

// Response (201 Created)
{
  "message": "Terima kasih! Cek email Anda untuk mendapatkan 50 CSS Tricks.",
  "leadMagnetUrl": "https://cdn.pakeaja.com/lead-magnets/50-css-tricks-indonesia.pdf"
}
```

## Payment Integration

### Upgrade to Premium
```typescript
// Initiate premium upgrade
POST /api/v1/subscription/upgrade
Authorization: Bearer [user_token]
Content-Type: application/json

{
  "plan": "premium_monthly",
  "paymentMethod": "e_wallet"
}

// Response (200 OK)
{
  "paymentUrl": "https://checkout.xendit.co/web/6489cd4a1b26b40d3a0f4d9e",
  "invoiceId": "INV-20250708-001",
  "expiresAt": "2025-07-08T11:00:00Z"
}
```

### Xendit Webhook Handler
```typescript
// Webhook from Xendit (payment success)
POST /api/v1/webhooks/xendit
X-CALLBACK-TOKEN: your_xendit_webhook_token
Content-Type: application/json

{
  "id": "579c8d61f23fa4ca35e52da4",
  "external_id": "INV-20250708-001",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "is_high": true,
  "payment_method": "E-WALLET",
  "status": "PAID",
  "merchant_name": "Pake Aja",
  "amount": 99000,
  "paid_amount": 99000,
  "bank_code": "OVO",
  "paid_at": "2025-07-08T10:30:00Z",
  "payer_email": "budi@example.com",
  "description": "Premium Monthly Subscription",
  "currency": "IDR",
  "payment_channel": "OVO",
  "payment_destination": "081234567890"
}

// Response (200 OK)
{
  "received": true
}
```

## Rate Limiting Headers

All API responses include rate limiting information:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1720432800
X-RateLimit-Reset-After: 3600
```

## API Versioning

### Current Version (v1)
```
https://api.pakeaja.com/v1/tutorials
```

### Future Version (v2)
```
https://api.pakeaja.com/v2/tutorials
```

Version changes will be announced 3 months in advance with migration guides.

## Implementation Notes

### JWT Token Structure
```typescript
// Access Token Payload
{
  "sub": "123e4567-e89b-12d3-a456-426614174000", // user id
  "email": "budi@example.com",
  "role": "premium",
  "iat": 1720425600,
  "exp": 1720429200
}

// Refresh Token Payload
{
  "sub": "123e4567-e89b-12d3-a456-426614174000",
  "type": "refresh",
  "iat": 1720425600,
  "exp": 1721030400 // 7 days
}
```

### Security Headers
```typescript
// Required headers for all API responses
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy": "default-src 'self'"
}
```

### CORS Configuration
```typescript
// Allowed origins
const allowedOrigins = [
  'https://www.pakeaja.com',
  'https://pakeaja.com',
  'https://staging.pakeaja.com',
  'http://localhost:3000' // development only
];

// Allowed methods
const allowedMethods = ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'];

// Allowed headers
const allowedHeaders = [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'Accept-Language'
];
```

---
Last Updated: 2025-07-08