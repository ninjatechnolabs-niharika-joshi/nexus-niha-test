import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import './TravelDocs.css'

// ─── ADD / REPLACE YOUR PDF FILES HERE ────────────────────────────────────
// Place PDF files in  public/docs/  (e.g. public/docs/brochure.pdf)
// Then set  file: '/docs/brochure.pdf'
// Use any public URL or local path starting with '/'
const documents = [
  {
    id: 1,
    icon: '📘',
    title: 'WanderLust Travel Brochure 2024',
    description:
      'Our complete guide to every destination we offer — packages, pricing, itineraries, and what makes each place truly special. Perfect to share with friends and family.',
    category: 'Brochure',
    pages: '32 pages',
    size: '4.2 MB',
    file: '/docs/brochure.pdf',
    downloadName: 'wanderlust-brochure-2024.pdf',
    color: '#FF6B35',
  },
  {
    id: 2,
    icon: '🎒',
    title: 'Ultimate Packing Checklist',
    description:
      'A destination-by-destination packing guide covering beach holidays, city breaks, mountain treks, and safaris. Never forget essentials again.',
    category: 'Travel Guide',
    pages: '12 pages',
    size: '1.8 MB',
    file: '/docs/packing-checklist.pdf',
    downloadName: 'packing-checklist.pdf',
    color: '#2196F3',
  },
  {
    id: 3,
    icon: '🛡️',
    title: 'Travel Insurance & Safety Guide',
    description:
      'Everything you need to know about travel insurance, emergency contacts, health precautions, and staying safe on your WanderLust adventure.',
    category: 'Safety',
    pages: '18 pages',
    size: '2.5 MB',
    file: '/docs/travel-safety-guide.pdf',
    downloadName: 'travel-safety-guide.pdf',
    color: '#4CAF50',
  },
]
// ──────────────────────────────────────────────────────────────────────────

export default function TravelDocs() {
  return (
    <div className="docs-page">
      {/* Hero */}
      <div className="page-hero" aria-label="Travel Documents">
        <div className="page-hero-content">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Travel Documents
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Download guides, checklists, and brochures to plan your perfect trip
          </motion.p>
        </div>
      </div>

      <div className="container">
        {/* Stats row */}
        <AnimatedSection variant="fadeUp">
          <div className="docs-stats">
            <div className="docs-stat">
              <span className="docs-stat-num">3</span>
              <span className="docs-stat-label">Free Resources</span>
            </div>
            <div className="docs-stat">
              <span className="docs-stat-num">PDF</span>
              <span className="docs-stat-label">Format</span>
            </div>
            <div className="docs-stat">
              <span className="docs-stat-num">Free</span>
              <span className="docs-stat-label">No Sign-up</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Document Cards */}
        <div className="docs-grid">
          {documents.map((doc, i) => (
            <AnimatedSection key={doc.id} variant="fadeUp" delay={i * 0.12}>
              <div className="doc-card">
                {/* Top accent bar */}
                <div className="doc-card-bar" style={{ background: doc.color }} />

                <div className="doc-card-body">
                  {/* Icon + category */}
                  <div className="doc-card-header">
                    <div className="doc-icon" style={{ background: `${doc.color}18` }}>
                      <span>{doc.icon}</span>
                    </div>
                    <span className="doc-category" style={{ color: doc.color, background: `${doc.color}14` }}>
                      {doc.category}
                    </span>
                  </div>

                  <h3 className="doc-title">{doc.title}</h3>
                  <p className="doc-desc">{doc.description}</p>

                  {/* Meta */}
                  <div className="doc-meta">
                    <span>📄 {doc.pages}</span>
                    <span>💾 {doc.size}</span>
                    <span>🔓 Free</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="doc-actions">
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-btn doc-btn-preview"
                    aria-label={`Preview ${doc.title}`}
                  >
                    👁 Preview
                  </a>
                  <a
                    href={doc.file}
                    download={doc.downloadName}
                    className="doc-btn doc-btn-download"
                    style={{ background: doc.color }}
                    aria-label={`Download ${doc.title}`}
                  >
                    ⬇ Download
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Info note */}
        <AnimatedSection variant="fadeUp">
          <div className="docs-note">
            <span className="docs-note-icon">💡</span>
            <div>
              <strong>Using your own PDFs?</strong> Drop your files into the{' '}
              <code>public/docs/</code> folder and update the{' '}
              <code>documents</code> array in{' '}
              <code>src/pages/TravelDocs.jsx</code> with the new paths.
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
