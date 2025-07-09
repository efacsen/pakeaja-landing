import { useEffect, useRef } from 'react'

const Confetti = ({ active }) => {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const animationRef = useRef(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Confetti colors
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
    
    // Create confetti particles
    const createConfetti = () => {
      particles.current = []
      const particleCount = 100
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          vx: (Math.random() - 0.5) * 15,
          vy: (Math.random() - 0.5) * 15 - 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 4,
          gravity: 0.3,
          opacity: 1,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.current = particles.current.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += particle.gravity
        particle.opacity -= 0.02
        particle.rotation += particle.rotationSpeed
        
        if (particle.opacity <= 0) return false
        
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        ctx.fillStyle = particle.color
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        ctx.restore()
        
        return true
      })
      
      if (particles.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    createConfetti()
    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default Confetti