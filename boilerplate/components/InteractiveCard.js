import { useState } from 'react'

const InteractiveCard = ({ 
  icon, 
  title, 
  description, 
  onClick, 
  className = '',
  variant = 'default' // 'default', 'pain-point', 'solution'
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantClasses = () => {
    switch (variant) {
      case 'pain-point':
        return 'border-red-200 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
      case 'solution':
        return 'border-green-200 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
      default:
        return 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
    }
  }

  return (
    <div
      className={`glass-card card cursor-pointer group ${getVariantClasses()} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.()
        }
      }}
    >
      {/* Icon Container */}
      <div className="flex items-center justify-center w-16 h-16 mb-4 mx-auto">
        <div 
          className={`
            w-full h-full rounded-full flex items-center justify-center
            transition-all duration-300
            ${isHovered ? 'scale-110' : 'scale-100'}
            ${variant === 'pain-point' ? 'bg-red-100 dark:bg-red-900/30' : ''}
            ${variant === 'solution' ? 'bg-green-100 dark:bg-green-900/30' : ''}
            ${variant === 'default' ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
          `}
        >
          {typeof icon === 'string' ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            icon
          )}
        </div>
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-secondary text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Hover Effect Overlay */}
      <div 
        className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 pointer-events-none
          ${variant === 'pain-point' ? 'bg-gradient-to-br from-red-500/5 to-red-600/5' : ''}
          ${variant === 'solution' ? 'bg-gradient-to-br from-green-500/5 to-green-600/5' : ''}
          ${variant === 'default' ? 'bg-gradient-to-br from-blue-500/5 to-blue-600/5' : ''}
        `}
      />

      {/* Pulse Effect on Hover */}
      <div 
        className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 pointer-events-none
          ${variant === 'pain-point' ? 'shadow-lg shadow-red-500/10' : ''}
          ${variant === 'solution' ? 'shadow-lg shadow-green-500/10' : ''}
          ${variant === 'default' ? 'shadow-lg shadow-blue-500/10' : ''}
        `}
      />
    </div>
  )
}

// Feature Card Component
export const FeatureCard = ({ icon, title, description, className = '' }) => (
  <InteractiveCard
    icon={icon}
    title={title}
    description={description}
    variant="solution"
    className={className}
  />
)

// Pain Point Card Component
export const PainPointCard = ({ icon, title, description, className = '' }) => (
  <InteractiveCard
    icon={icon}
    title={title}
    description={description}
    variant="pain-point"
    className={className}
  />
)

// Animated Number Card
export const StatsCard = ({ number, label, icon, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div 
      className={`glass-card card text-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
    >
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3">
        <div className="w-full h-full rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-accent mb-1">
        {number}
      </div>
      <div className="text-secondary text-sm">
        {label}
      </div>
    </div>
  )
}

export default InteractiveCard