import { useState } from 'react'
import Head from 'next/head'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Use environment variable for form ID
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'YOUR_FORM_ID'
      
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          source: 'landing-page',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <>
      <Head>
        <title>Your Landing Page - Convert More Visitors</title>
        <meta name="description" content="Your compelling landing page description that converts visitors into customers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:title" content="Your Landing Page - Convert More Visitors" />
        <meta property="og:description" content="Your compelling landing page description that converts visitors into customers." />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yourdomain.com/" />
        <meta property="twitter:title" content="Your Landing Page - Convert More Visitors" />
        <meta property="twitter:description" content="Your compelling landing page description that converts visitors into customers." />
        <meta property="twitter:image" content="https://yourdomain.com/og-image.jpg" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Amazing Headline Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              A compelling subheadline that explains your value proposition clearly
            </p>
            <button 
              onClick={() => document.getElementById('signup').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Now
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
                <p className="text-gray-600">Lightning-fast performance that your users will love</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
                <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">Built with attention to detail and quality craftsmanship</p>
              </div>
            </div>
          </div>
        </section>

        {/* Email Signup Section */}
        <section id="signup" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of satisfied customers. No credit card required.
              </p>
              
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Get Started'}
                  </button>
                </div>
                
                {status === 'success' && (
                  <p className="text-green-600 mt-4 font-semibold">
                    Success! Check your email for next steps.
                  </p>
                )}
                
                {status === 'error' && (
                  <p className="text-red-600 mt-4 font-semibold">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
              
              <p className="text-sm text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  )
}