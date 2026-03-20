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

// ─── ADD YOUR OWN VIDEOS HERE ──────────────────────────────────────────────
// Replace src with a local file path like '/videos/bali.mp4' or a URL
// Replace poster with a thumbnail image URL or local path like '/images/bali-thumb.jpg'
const galleryVideos = [
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://picsum.photos/seed/gv-bali/600/380',
    title: 'Bali Temples & Rice Terraces',
    destination: 'Bali, Indonesia',
    category: 'Beach & Island',
  },
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://picsum.photos/seed/gv-paris/600/380',
    title: 'Paris City Tour',
    destination: 'Paris, France',
    category: 'City & Culture',
  },
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://picsum.photos/seed/gv-safari/600/380',
    title: 'African Safari Adventure',
    destination: 'Kenya, Africa',
    category: 'Adventure & Safari',
  },
]
// ───────────────────────────────────────────────────────────────────────────

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

        {/* Videos Section */}
        <AnimatedSection variant="fadeUp">
          <div className="gallery-videos-heading">
            <h2>🎬 Travel Videos</h2>
            <p>Cinematic glimpses of our most stunning destinations</p>
          </div>
        </AnimatedSection>

        <div className="gallery-videos-grid">
          {galleryVideos.map((vid, i) => (
            <AnimatedSection key={i} variant="fadeUp" delay={i * 0.1}>
              <div className="gallery-video-card">
                <video
                  controls
                  poster={vid.poster}
                  preload="none"
                  aria-label={`${vid.title} - ${vid.destination}`}
                >
                  <source src={vid.src} type="video/mp4" />
                </video>
                <div className="gallery-video-info">
                  <div className="gallery-video-title">{vid.title}</div>
                  <div className="gallery-video-dest">📍 {vid.destination}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
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
