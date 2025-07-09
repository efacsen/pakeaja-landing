import { CheckCircleIcon, XCircleIcon, ClockIcon } from './Icons'

// Status Badge Component
export const StatusBadge = ({ status, text, className = '' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
      case 'paid':
      case 'completed':
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-800 dark:text-green-200',
          border: 'border-green-200 dark:border-green-800',
          icon: CheckCircleIcon
        }
      case 'error':
      case 'overdue':
      case 'failed':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-800 dark:text-red-200',
          border: 'border-red-200 dark:border-red-800',
          icon: XCircleIcon
        }
      case 'pending':
      case 'processing':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          text: 'text-yellow-800 dark:text-yellow-200',
          border: 'border-yellow-200 dark:border-yellow-800',
          icon: ClockIcon
        }
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-800',
          text: 'text-gray-800 dark:text-gray-200',
          border: 'border-gray-200 dark:border-gray-700',
          icon: null
        }
    }
  }

  const styles = getStatusStyles()
  const Icon = styles.icon

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${styles.bg} ${styles.text} ${styles.border} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {text}
    </span>
  )
}

// Data Card Component
export const DataCard = ({ icon: Icon, title, value, subtitle, trend, className = '' }) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600 dark:text-green-400'
    if (trend === 'down') return 'text-red-600 dark:text-red-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {Icon && (
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
            )}
            <h4 className="font-medium text-gray-900 dark:text-gray-100">{title}</h4>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {trend === 'up' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
              )}
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

// Progress Bar Component
export const ProgressBar = ({ value, max = 100, label, showPercentage = true, color = 'blue', className = '' }) => {
  const actualPercentage = (value / max) * 100
  const barWidth = Math.min(actualPercentage, 100) // Cap bar width at 100%
  
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-green-500 dark:bg-green-400'
      case 'red':
        return 'bg-red-500 dark:bg-red-400'
      case 'yellow':
        return 'bg-yellow-500 dark:bg-yellow-400'
      default:
        return 'bg-blue-500 dark:bg-blue-400'
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>}
          {showPercentage && <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{actualPercentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${getColorClasses()}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  )
}

// Action Button Component
export const ActionButton = ({ icon: Icon, text, onClick, variant = 'primary', size = 'sm', className = '' }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
      case 'secondary':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-600'
      case 'success':
        return 'bg-green-500 hover:bg-green-600 text-white border-green-500'
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 text-white border-red-500'
      default:
        return 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'px-2 py-1 text-xs'
      case 'sm':
        return 'px-3 py-1.5 text-sm'
      case 'md':
        return 'px-4 py-2 text-base'
      default:
        return 'px-3 py-1.5 text-sm'
    }
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 font-medium rounded-md border transition-colors ${getVariantClasses()} ${getSizeClasses()} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </button>
  )
}

// Loading Skeleton Component
export const LoadingSkeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  )
}