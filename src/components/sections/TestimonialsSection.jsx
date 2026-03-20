import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import testimonials from '../../data/testimonials'
import StarRating from '../ui/StarRating'

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = () => {
    setDirection(1)
    setCurrentIndex(i => (i + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrentIndex(i => (i - 1 + testimonials.length) % testimonials.length)
  }

  const testimonial = testimonials[currentIndex]

  return (
    <section
      style={{
        padding: '5rem 0',
        background: 'var(--bg-secondary)',
      }}
      aria-label="Customer testimonials"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>What Our Travelers Say</h2>
          <p>Real experiences from real adventurers who trusted us with their dream vacations</p>
        </motion.div>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Main Testimonial */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'var(--card-bg)',
                borderRadius: 'var(--radius-xl)',
                padding: '3rem',
                border: '1px solid var(--border)',
                boxShadow: '0 8px 32px var(--shadow)',
                textAlign: 'center',
                position: 'relative',
              }}
              role="article"
              aria-label={`Testimonial from ${testimonial.name}`}
            >
              {/* Quote mark */}
              <div
                aria-hidden="true"
                style={{
                  fontSize: '5rem',
                  lineHeight: 0.8,
                  color: 'var(--primary)',
                  opacity: 0.2,
                  fontFamily: 'Georgia, serif',
                  position: 'absolute',
                  top: '1.5rem',
                  left: '2rem',
                }}
              >
                "
              </div>

              {/* Stars */}
              <div style={{ marginBottom: '1.5rem' }}>
                <StarRating rating={testimonial.rating} size={24} />
              </div>

              {/* Text */}
              <blockquote style={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: 'var(--text)',
                fontStyle: 'italic',
                marginBottom: '2rem',
                position: 'relative',
                zIndex: 1,
              }}>
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <img
                  src={testimonial.avatar}
                  alt={`Photo of ${testimonial.name}`}
                  style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.0625rem' }}>{testimonial.name}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    📍 {testimonial.location}
                  </div>
                  <div style={{ color: 'var(--primary)', fontSize: '0.8125rem', fontWeight: 600 }}>
                    ✈️ {testimonial.destination}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '2px solid var(--border)',
                background: 'var(--card-bg)',
                cursor: 'pointer',
                fontSize: '1.25rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
                color: 'var(--text)',
              }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.color = 'var(--primary)' }}
              onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text)' }}
            >
              ‹
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '0.5rem' }} role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                  style={{
                    width: i === currentIndex ? 24 : 8,
                    height: 8,
                    borderRadius: 9999,
                    background: i === currentIndex ? 'var(--primary)' : 'var(--border)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '2px solid var(--border)',
                background: 'var(--card-bg)',
                cursor: 'pointer',
                fontSize: '1.25rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
                color: 'var(--text)',
              }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.color = 'var(--primary)' }}
              onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text)' }}
            >
              ›
            </button>
          </div>
        </div>

        {/* Mini cards row */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '3rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'thin',
          }}
        >
          {testimonials.slice(0, 5).map((t, i) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -4 }}
              onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
              style={{
                flex: '0 0 200px',
                background: i === currentIndex ? 'var(--primary)' : 'var(--card-bg)',
                border: `1px solid ${i === currentIndex ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <img src={t.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} aria-hidden="true" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: i === currentIndex ? 'white' : 'var(--text)' }}>{t.name}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: i === currentIndex ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)', lineHeight: 1.4 }}>
                {t.text.slice(0, 80)}...
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
