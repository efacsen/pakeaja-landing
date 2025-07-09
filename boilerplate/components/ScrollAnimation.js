import { useEffect, useRef, useState } from 'react'

const ScrollAnimation = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.8,
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay)
        }
      },
      { threshold }
    )

    const element = elementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [delay, threshold, hasAnimated])

  return (
    <div
      ref={elementRef}
      className={`
        transition-all ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${className}
      `}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: isVisible ? '0s' : `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

export default ScrollAnimation