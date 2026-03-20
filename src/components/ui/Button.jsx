import { motion } from 'framer-motion'

const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: '600',
    fontSize: '0.9375rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '2px solid transparent',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
  },
  primary: {
    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
  },
  secondary: {
    background: 'linear-gradient(135deg, #004E89 0%, #1a6ea8 100%)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(0, 78, 137, 0.3)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--primary)',
    border: '2px solid var(--primary)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text)',
    border: '2px solid var(--border)',
  },
  accent: {
    background: 'linear-gradient(135deg, #1A936F 0%, #22b589 100%)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(26, 147, 111, 0.3)',
  },
  danger: {
    background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
  }
}

const sizes = {
  sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
  md: { padding: '0.75rem 1.5rem', fontSize: '0.9375rem' },
  lg: { padding: '1rem 2rem', fontSize: '1.0625rem' },
  xl: { padding: '1.125rem 2.5rem', fontSize: '1.125rem' },
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconRight,
  fullWidth,
  disabled,
  loading,
  onClick,
  type = 'button',
  as: Component,
  ...props
}) {
  const combinedStyle = {
    ...styles.base,
    ...styles[variant],
    ...sizes[size],
    ...(fullWidth && { width: '100%' }),
    ...(disabled && { opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' }),
  }

  const content = (
    <>
      {loading ? (
        <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
      ) : icon ? (
        <span aria-hidden="true">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && <span aria-hidden="true">{iconRight}</span>}
    </>
  )

  if (Component) {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        style={{ display: 'inline-block' }}
      >
        <Component style={combinedStyle} {...props}>
          {content}
        </Component>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      style={combinedStyle}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  )
}
