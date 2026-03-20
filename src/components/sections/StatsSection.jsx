import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const stats = [
  { value: 10000, suffix: '+', label: 'Happy Travelers', icon: '😊' },
  { value: 50, suffix: '+', label: 'Destinations', icon: '🌍' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: '⭐' },
  { value: 14, suffix: '', label: 'Years Experience', icon: '🏆' },
  { value: 500, suffix: '+', label: 'Tours Completed', icon: '✈️' },
  { value: 24, suffix: '/7', label: 'Support Available', icon: '🛎️' },
]

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const { ref, hasIntersected } = useIntersectionObserver()
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!hasIntersected || hasStarted.current) return
    hasStarted.current = true

    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [hasIntersected, target, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section
      style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, var(--secondary) 0%, #1a3a5c 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Company statistics"
    >
      {/* Decorative circles */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-150px', left: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Trusted by Travelers Worldwide
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem' }}>
            Numbers that speak for our commitment to excellence
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                textAlign: 'center',
                padding: '1.5rem 1rem',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} aria-hidden="true">
                {stat.icon}
              </div>
              <div style={{
                fontSize: '2.25rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.1,
                marginBottom: '0.5rem',
              }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9375rem', fontWeight: 500 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
