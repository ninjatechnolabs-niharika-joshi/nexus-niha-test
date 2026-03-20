import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLightbox } from '../hooks/useLightbox'
import Lightbox from '../components/ui/Lightbox'
import AnimatedSection from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'
import destinations from '../data/destinations'
import './Gallery.css'

const allImages = destinations.flatMap(d => [
  ...d.gallery.map(img => ({ src: img, destination: d.name, category: d.category, continent: d.continent })),
])

const categories = ['All', 'Beach & Island', 'City & Culture', 'Adventure & Safari', 'Heritage & History']

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(12)

  const filtered = activeCategory === 'All' ? allImages : allImages.filter(img => img.category === activeCategory)
  const visible = filtered.slice(0, visibleCount)

  const { isOpen, currentIndex, open, close, next, prev } = useLightbox(visible)

  return (
    <div className="gallery-page">
      <div className="page-hero" aria-label="Gallery">
        <div className="page-hero-content">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Travel Gallery
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Visual stories from around the world
          </motion.p>
        </div>
      </div>

      <div className="container">
        <AnimatedSection variant="fadeUp" style={{ marginTop: '3rem' }}>
          <div className="gallery-filters" role="group" aria-label="Filter gallery by category">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => { setActiveCategory(cat); setVisibleCount(12) }}
                aria-pressed={activeCategory === cat}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '9999px', border: '2px solid var(--border)', background: activeCategory === cat ? 'var(--primary)' : 'transparent', color: activeCategory === cat ? 'white' : 'var(--text-secondary)', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit', fontSize: '0.9rem' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>
          Showing {visible.length} of {filtered.length} photos
        </p>

        <div className="gallery-grid">
          {visible.map((img, i) => (
            <motion.div
              key={`${img.src}-${i}`}
              className="gallery-item"
              onClick={() => open(i)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && open(i)}
              role="button"
              aria-label={`View photo of ${img.destination}`}
            >
              <img src={img.src} alt={`${img.destination} - ${img.category}`} loading="lazy" />
              <div className="gallery-item-overlay" aria-hidden="true">
                <span>🔍</span>
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                padding: '1rem 0.75rem 0.5rem',
                color: 'white',
                opacity: 0,
                transition: 'var(--transition)',
              }} aria-hidden="true">
                <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{img.destination}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="gallery-load-more">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount(c => c + 12)}
            >
              Load More Photos
            </Button>
          </div>
        )}
      </div>

      <Lightbox
        isOpen={isOpen}
        images={visible}
        currentIndex={currentIndex}
        onClose={close}
        onNext={next}
        onPrev={prev}
        onSelect={(i) => open(i)}
      />
    </div>
  )
}
