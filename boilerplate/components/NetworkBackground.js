import { useEffect, useRef, useState } from 'react'

const NetworkBackground = ({ className = '' }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let particles = []
    let connections = []

    // Responsive particle count
    const getParticleCount = () => {
      const width = window.innerWidth
      if (width < 768) return 25 // Mobile
      if (width < 1024) return 40 // Tablet
      return 60 // Desktop
    }

    // Particle class
    class Particle {
      constructor() {
        this.reset()
        // Ensure particles always have some initial velocity
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        // Make sure velocity is not too small
        if (Math.abs(this.vx) < 0.2) this.vx = 0.2 * (this.vx > 0 ? 1 : -1)
        if (Math.abs(this.vy) < 0.2) this.vy = 0.2 * (this.vy > 0 ? 1 : -1)
        this.opacity = Math.random() * 0.3 + 0.7
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 3 + 2
      }

      update() {
        // Apply very light friction to keep particles moving
        this.vx *= 0.995
        this.vy *= 0.995
        
        // Add small random drift to keep particles moving organically
        this.vx += (Math.random() - 0.5) * 0.02
        this.vy += (Math.random() - 0.5) * 0.02
        
        // Mouse interaction
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          this.vx += dx * force * 0.005
          this.vy += dy * force * 0.005
        }
        
        // Ensure minimum velocity to keep particles moving
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (currentSpeed < 0.2) {
          // Give a small boost in a random direction
          const angle = Math.random() * Math.PI * 2
          this.vx += Math.cos(angle) * 0.3
          this.vy += Math.sin(angle) * 0.3
        }
        
        // Cap maximum velocity
        const maxVelocity = 2
        if (currentSpeed > maxVelocity) {
          this.vx = (this.vx / currentSpeed) * maxVelocity
          this.vy = (this.vy / currentSpeed) * maxVelocity
        }
        
        // Update position
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges with less damping to maintain movement
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -0.9
          this.x = Math.max(0, Math.min(canvas.width, this.x))
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -0.9
          this.y = Math.max(0, Math.min(canvas.height, this.y))
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        
        // Get CSS variable for current theme
        const nodeColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--network-node').trim() || '#60a5fa'
        
        ctx.fillStyle = nodeColor
        ctx.globalAlpha = this.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = []
      const particleCount = getParticleCount()
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // Draw connections between nearby particles
    const drawConnections = () => {
      connections = []
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            connections.push({
              p1: particles[i],
              p2: particles[j],
              distance: distance
            })
          }
        }
      }

      // Draw connections
      connections.forEach(conn => {
        const opacity = 1 - (conn.distance / 120)
        
        ctx.beginPath()
        ctx.moveTo(conn.p1.x, conn.p1.y)
        ctx.lineTo(conn.p2.x, conn.p2.y)
        
        // Get CSS variable for current theme
        const connectionColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--network-connection').trim() || '#cbd5e1'
        
        ctx.strokeStyle = connectionColor
        ctx.globalAlpha = opacity * 0.6
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.globalAlpha = 1
      })
    }

    // Animation loop
    const animate = () => {
      if (!isVisible) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      // Draw connections
      drawConnections()
      
      animationRef.current = requestAnimationFrame(animate)
    }

    // Resize canvas
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      console.log('Canvas resized:', canvas.width, 'x', canvas.height)
      
      // Reset particles on resize
      particles.forEach(particle => particle.reset())
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    // Initialize with delay to ensure DOM is ready
    setTimeout(() => {
      resizeCanvas()
      initParticles()
      animate()
    }, 100)

    // Event listeners
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible])

  // Pause animation when not visible (performance optimization)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto'
      }}
    />
  )
}

export default NetworkBackground