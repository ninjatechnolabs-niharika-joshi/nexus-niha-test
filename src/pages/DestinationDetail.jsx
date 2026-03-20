import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLightbox } from '../hooks/useLightbox'
import Lightbox from '../components/ui/Lightbox'
import StarRating from '../components/ui/StarRating'
import AnimatedSection from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import destinations from '../data/destinations'
import testimonials from '../data/testimonials'
import './DestinationDetail.css'

export default function DestinationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const destination = destinations.find(d => d.slug === id || d.id === Number(id))

  const { isOpen, currentIndex, open, close, next, prev } = useLightbox(destination?.gallery || [])

  const [travelers, setTravelers] = useState(2)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  if (!destination) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <h2>Destination not found</h2>
        <Link to="/destinations" style={{ color: 'var(--primary)' }}>Back to destinations</Link>
      </div>
    )
  }

  const reviews = testimonials.filter(t => t.destination.toLowerCase().includes(destination.name.toLowerCase())).slice(0, 3)
  const similar = destinations.filter(d => d.id !== destination.id && d.category === destination.category).slice(0, 3)
  const total = destination.price * travelers

  const handleBook = (e) => {
    e.preventDefault()
    navigate('/booking', { state: { destination } })
  }

  return (
    <div className="dest-detail">
      {/* Hero */}
      <div className="dest-detail-hero" aria-label={`${destination.name} hero image`}>
        <img
          src={destination.heroImage}
          alt={`Scenic view of ${destination.name}, ${destination.country}`}
          className="dest-detail-hero-img"
        />
        <div className="dest-detail-hero-overlay" aria-hidden="true" />
        <div className="dest-detail-hero-content">
          <div className="container">
            <div>
              <motion.h1
                className="dest-detail-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {destination.name}
              </motion.h1>
              <motion.p
                className="dest-detail-tagline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {destination.tagline}
              </motion.p>
              <motion.div
                className="dest-detail-meta-pills"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="dest-meta-pill">📍 {destination.country}</span>
                <span className="dest-meta-pill">🕐 {destination.duration}</span>
                <span className="dest-meta-pill">💰 From ${destination.price?.toLocaleString()}</span>
                <span className="dest-meta-pill">⭐ {destination.rating} ({destination.reviews?.toLocaleString()} reviews)</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginTop: '1.5rem' }}>
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <Link to="/destinations">Destinations</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span aria-current="page">{destination.name}</span>
        </nav>

        <div className="dest-detail-layout">
          {/* Main */}
          <div className="dest-detail-main">
            {/* Gallery */}
            <AnimatedSection variant="fadeUp">
              <div className="dest-detail-section">
                <h2>Photo Gallery</h2>
                <div className="dest-detail-gallery" role="list">
                  {destination.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="gallery-thumb"
                      onClick={() => open(i)}
                      role="listitem"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && open(i)}
                      aria-label={`View gallery photo ${i + 1} of ${destination.gallery.length}`}
                    >
                      <img src={img} alt={`${destination.name} gallery photo ${i + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Description */}
            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div className="dest-detail-section">
                <h2>About {destination.name}</h2>
                <p className="dest-description">{destination.longDescription || destination.description}</p>
              </div>
            </AnimatedSection>

            {/* Highlights */}
            <AnimatedSection variant="fadeUp" delay={0.15}>
              <div className="dest-detail-section">
                <h2>Trip Highlights</h2>
                <ul className="highlights-list">
                  {destination.highlights.map(h => (
                    <li key={h} className="highlight-item">
                      <span aria-hidden="true">✨</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Climate */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
              <div className="dest-detail-section">
                <h2>Climate & Best Time</h2>
                <div className="climate-info">
                  <div className="climate-item">
                    <div className="climate-item-label">Climate</div>
                    <div className="climate-item-value">🌡️ {destination.climate}</div>
                  </div>
                  <div className="climate-item">
                    <div className="climate-item-label">Best Time to Visit</div>
                    <div className="climate-item-value">📅 {destination.bestTime}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Video */}
            {destination.video && (
              <AnimatedSection variant="fadeUp" delay={0.25}>
                <div className="dest-detail-section">
                  <h2>Experience Video</h2>
                  <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 8px 32px var(--shadow-md)' }}>
                    <video
                      controls
                      poster={destination.heroImage}
                      style={{ width: '100%', display: 'block' }}
                      aria-label={`Video showcasing ${destination.name}`}
                    >
                      <source src={destination.video} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Downloads */}
            <AnimatedSection variant="fadeUp" delay={0.3}>
              <div className="dest-detail-section">
                <h2>Travel Documents</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a
                    href="/brochure.pdf"
                    download={`${destination.name}-brochure.pdf`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.75rem 1.5rem', background: 'var(--secondary)', color: 'white',
                      borderRadius: '9999px', fontWeight: 600, textDecoration: 'none',
                      transition: 'var(--transition)',
                    }}
                    aria-label={`Download ${destination.name} travel brochure PDF`}
                  >
                    📄 Download Brochure
                  </a>
                  <a
                    href="/brochure.pdf"
                    download="packing-list.pdf"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.75rem 1.5rem', background: 'var(--accent)', color: 'white',
                      borderRadius: '9999px', fontWeight: 600, textDecoration: 'none',
                    }}
                    aria-label="Download packing list"
                  >
                    🎒 Packing List
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Reviews */}
            <AnimatedSection variant="fadeUp" delay={0.35}>
              <div className="dest-detail-section">
                <h2>Traveler Reviews</h2>
                {reviews.length > 0 ? (
                  <div className="reviews-list">
                    {reviews.map(r => (
                      <div key={r.id} className="review-item">
                        <div className="review-header">
                          <div className="review-author">
                            <img src={r.avatar} alt={`${r.name}'s profile photo`} />
                            <div>
                              <div className="review-author-name">{r.name}</div>
                              <div className="review-author-loc">📍 {r.location}</div>
                            </div>
                          </div>
                          <StarRating rating={r.rating} size={16} />
                        </div>
                        <p className="review-text">"{r.text}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                    No reviews yet for this destination.
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="dest-detail-sidebar">
            <AnimatedSection variant="fadeLeft">
              <div className="booking-widget" aria-label="Booking widget">
                <div className="booking-widget-price">
                  <div className="from">Starting from</div>
                  <div className="price">${destination.price?.toLocaleString()}</div>
                  <div className="per">per person</div>
                </div>

                <div className="booking-widget-rating">
                  <StarRating rating={destination.rating} size={18} />
                  <span style={{ fontWeight: 600 }}>{destination.rating}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    ({destination.reviews?.toLocaleString()} reviews)
                  </span>
                </div>

                <form className="booking-widget-form" onSubmit={handleBook} aria-label="Quick booking form">
                  <div className="booking-field">
                    <label htmlFor="check-in">Check-in Date</label>
                    <input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      onChange={e => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="booking-field">
                    <label htmlFor="check-out">Check-out Date</label>
                    <input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      onChange={e => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="booking-field">
                    <label htmlFor="travelers">Travelers</label>
                    <select id="travelers" value={travelers} onChange={e => setTravelers(Number(e.target.value))}>
                      {[1,2,3,4,5,6,7,8].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                      ))}
                    </select>
                  </div>
                  <div className="booking-total" aria-label={`Total price: $${total.toLocaleString()}`}>
                    <span>Total ({travelers} travelers)</span>
                    <span style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>${total.toLocaleString()}</span>
                  </div>
                  <Button type="submit" fullWidth size="lg" icon="✈️">
                    Book This Trip
                  </Button>
                  <p className="booking-note">
                    🔒 Secure booking · Free cancellation up to 30 days
                  </p>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Similar Destinations */}
        {similar.length > 0 && (
          <section aria-labelledby="similar-heading" style={{ paddingBottom: '5rem' }}>
            <AnimatedSection variant="fadeUp" className="section-header">
              <h2 id="similar-heading">Similar Destinations</h2>
              <p>You might also like these destinations</p>
            </AnimatedSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {similar.map((dest, i) => (
                <AnimatedSection key={dest.id} variant="fadeUp" delay={i * 0.1}>
                  <Card destination={dest} />
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={isOpen}
        images={destination.gallery}
        currentIndex={currentIndex}
        onClose={close}
        onNext={next}
        onPrev={prev}
        onSelect={(i) => open(i)}
      />
    </div>
  )
}
