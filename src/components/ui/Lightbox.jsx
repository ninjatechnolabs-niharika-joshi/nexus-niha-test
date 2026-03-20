import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Lightbox.css'

export default function Lightbox({ isOpen, images, currentIndex, onClose, onNext, onPrev, onSelect }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen || !images?.length) return null

  const current = images[currentIndex]

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Image ${currentIndex + 1} of ${images.length}`}
      >
        <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">✕</button>

        <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous image">‹</button>

        <motion.div
          className="lightbox-container"
          onClick={e => e.stopPropagation()}
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={typeof current === 'string' ? current : current.src}
            alt={typeof current === 'string' ? `Gallery image ${currentIndex + 1}` : (current.alt || `Gallery image ${currentIndex + 1}`)}
            className="lightbox-image"
          />

          <p className="lightbox-counter">
            {currentIndex + 1} / {images.length}
            {typeof current === 'object' && current.caption && (
              <> — {current.caption}</>
            )}
          </p>

          {images.length > 1 && (
            <div className="lightbox-thumbnails" role="list">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={typeof img === 'string' ? img : img.src}
                  alt={`Thumbnail ${i + 1}`}
                  className={`lightbox-thumb${i === currentIndex ? ' active' : ''}`}
                  onClick={() => onSelect && onSelect(i)}
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && onSelect && onSelect(i)}
                />
              ))}
            </div>
          )}
        </motion.div>

        <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next image">›</button>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
