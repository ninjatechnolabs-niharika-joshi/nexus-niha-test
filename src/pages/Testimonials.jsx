import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import StarRating from '../components/ui/StarRating'
import testimonials from '../data/testimonials'
import './Testimonials.css'

export default function Testimonials() {
  const [filterRating, setFilterRating] = useState(0)
  const [filterDest, setFilterDest] = useState('')

  const filtered = testimonials.filter(t => {
    if (filterRating && t.rating < filterRating) return false
    if (filterDest && !t.destination.toLowerCase().includes(filterDest.toLowerCase())) return false
    return true
  })

  return (
    <div className="testimonials-page">
      <div className="page-hero" aria-label="Testimonials page">
        <div className="page-hero-content">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Traveler Stories
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Real experiences from our global community of adventurers
          </motion.p>
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div className="testimonials-stats">
          {[
            { num: '10,000+', label: 'Happy Travelers' },
            { num: '4.9/5', label: 'Average Rating' },
            { num: '98%', label: 'Would Recommend' },
            { num: '50+', label: 'Destinations Reviewed' },
          ].map(s => (
            <AnimatedSection key={s.label} variant="scale">
              <div className="testimonial-stat-card">
                <div className="testimonial-stat-num">{s.num}</div>
                <div className="testimonial-stat-label">{s.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Filters */}
        <AnimatedSection variant="fadeUp">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <label htmlFor="filter-rating" style={{ fontSize: '0.875rem', fontWeight: 600, marginRight: '0.5rem' }}>
                Min Rating:
              </label>
              <select
                id="filter-rating"
                value={filterRating}
                onChange={e => setFilterRating(Number(e.target.value))}
                style={{ padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--bg)', color: 'var(--text)', cursor: 'pointer' }}
              >
                <option value={0}>All</option>
                <option value={4}>4+ stars</option>
                <option value={5}>5 stars only</option>
              </select>
            </div>
            <div>
              <label htmlFor="filter-dest" style={{ fontSize: '0.875rem', fontWeight: 600, marginRight: '0.5rem' }}>
                Destination:
              </label>
              <input
                id="filter-dest"
                type="text"
                placeholder="Filter by destination..."
                value={filterDest}
                onChange={e => setFilterDest(e.target.value)}
                style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.875rem' }}
              />
            </div>
          </div>
        </AnimatedSection>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          Showing {filtered.length} reviews
        </p>

        <div className="testimonials-grid">
          {filtered.map((t, i) => (
            <AnimatedSection key={t.id} variant="fadeUp" delay={i * 0.07}>
              <motion.article className="testimonial-card" whileHover={{ y: -4 }}>
                <div className="testimonial-trip-type" aria-label={`Trip type: ${t.tripType}`}>
                  {t.tripType}
                </div>
                <div className="testimonial-quote-icon" aria-hidden="true">"</div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <StarRating rating={t.rating} size={16} />
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <footer className="testimonial-footer">
                  <img src={t.avatar} alt={`${t.name}'s profile photo`} className="testimonial-avatar" />
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-location">📍 {t.location}</div>
                    <div className="testimonial-dest">✈️ {t.destination}</div>
                  </div>
                </footer>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
