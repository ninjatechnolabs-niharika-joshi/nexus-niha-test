import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'
import destinations from '../data/destinations'
import './Booking.css'

const STEPS = [
  { id: 1, label: 'Destination' },
  { id: 2, label: 'Travelers' },
  { id: 3, label: 'Dates' },
  { id: 4, label: 'Confirm' },
]

const generateRef = () => 'WL' + Date.now().toString(36).toUpperCase().slice(-6)

export default function Booking() {
  const location = useLocation()
  const preSelected = location.state?.destination

  const [step, setStep] = useState(1)
  const [selectedDest, setSelectedDest] = useState(preSelected || null)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [contact, setContact] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [bookingRef] = useState(generateRef)

  const total = selectedDest ? selectedDest.price * (adults + children * 0.5) : 0

  const validate = () => {
    const e = {}
    if (step === 1 && !selectedDest) e.dest = 'Please select a destination'
    if (step === 3) {
      if (!checkIn) e.checkIn = 'Check-in date is required'
      if (!checkOut) e.checkOut = 'Check-out date is required'
      if (checkIn && checkOut && checkIn >= checkOut) e.checkOut = 'Check-out must be after check-in'
    }
    if (step === 4) {
      if (!contact.name.trim()) e.name = 'Full name is required'
      if (!contact.email.trim() || !/^\S+@\S+\.\S+$/.test(contact.email)) e.email = 'Valid email required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, 5)) }
  const back = () => setStep(s => Math.max(s - 1, 1))

  if (step === 5) {
    return (
      <div className="booking-page">
        <div className="container container-sm">
          <AnimatedSection variant="scale">
            <div className="booking-confirmation" role="main" aria-label="Booking confirmation">
              <span className="checkmark" aria-hidden="true">🎉</span>
              <h2>Booking Confirmed!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.0625rem' }}>
                Thank you, <strong>{contact.name}</strong>! Your trip to <strong>{selectedDest?.name}</strong> has been booked.
              </p>
              <div aria-label={`Booking reference: ${bookingRef}`}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Your booking reference</p>
                <div className="booking-ref">{bookingRef}</div>
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem', fontSize: '0.9375rem' }}>
                A confirmation email has been sent to <strong>{contact.email}</strong>.<br />
                Our team will contact you within 24 hours to finalize details.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button as={Link} to="/dashboard" variant="primary" icon="📊">Go to Dashboard</Button>
                <Button as={Link} to="/destinations" variant="outline" icon="🌍">Explore More</Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page">
      <div className="container">
        <AnimatedSection variant="fadeUp">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Book Your Trip</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Complete the steps below to confirm your adventure</p>
        </AnimatedSection>

        {/* Progress */}
        <AnimatedSection variant="fadeUp" delay={0.1}>
          <nav className="booking-progress" aria-label="Booking steps progress">
            {STEPS.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  className={`progress-step${step === s.id ? ' active' : ''}${step > s.id ? ' done' : ''}`}
                  aria-current={step === s.id ? 'step' : undefined}
                >
                  <div className="progress-step-circle">
                    {step > s.id ? '✓' : s.id}
                  </div>
                  <div className="progress-step-label">{s.label}</div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`progress-line${step > s.id ? ' done' : ''}`} aria-hidden="true" />
                )}
              </div>
            ))}
          </nav>
        </AnimatedSection>

        <div className="booking-content">
          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="booking-form-section">
                {/* Step 1: Destination */}
                {step === 1 && (
                  <div>
                    <h2>Choose Your Destination</h2>
                    <p>Select from our curated collection of destinations</p>
                    {errors.dest && <p style={{ color: '#ef4444', marginBottom: '1rem' }} role="alert">{errors.dest}</p>}
                    <div className="dest-select-grid">
                      {destinations.map(d => (
                        <button
                          key={d.id}
                          className={`dest-select-card${selectedDest?.id === d.id ? ' selected' : ''}`}
                          onClick={() => setSelectedDest(d)}
                          aria-pressed={selectedDest?.id === d.id}
                          aria-label={`Select ${d.name}, ${d.country} - from $${d.price}`}
                        >
                          <img src={d.heroImage} alt="" aria-hidden="true" className="dest-select-img" />
                          <div>
                            <div className="dest-select-name">{d.name}, {d.country}</div>
                            <div className="dest-select-price">From ${d.price?.toLocaleString()}</div>
                          </div>
                          {selectedDest?.id === d.id && <span style={{ marginLeft: 'auto', color: 'var(--primary)' }} aria-hidden="true">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Travelers */}
                {step === 2 && (
                  <div>
                    <h2>Traveler Details</h2>
                    <p>How many people are joining the adventure?</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                        <div>
                          <div style={{ fontWeight: 700 }}>Adults</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Age 13+</div>
                        </div>
                        <div className="traveler-counter">
                          <button className="counter-btn" onClick={() => setAdults(a => Math.max(1, a - 1))} aria-label="Decrease adults" disabled={adults <= 1}>−</button>
                          <span className="counter-value" aria-live="polite" aria-label={`${adults} adults`}>{adults}</span>
                          <button className="counter-btn" onClick={() => setAdults(a => Math.min(10, a + 1))} aria-label="Increase adults">+</button>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                        <div>
                          <div style={{ fontWeight: 700 }}>Children</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Age 2-12 (50% discount)</div>
                        </div>
                        <div className="traveler-counter">
                          <button className="counter-btn" onClick={() => setChildren(c => Math.max(0, c - 1))} aria-label="Decrease children" disabled={children <= 0}>−</button>
                          <span className="counter-value" aria-live="polite" aria-label={`${children} children`}>{children}</span>
                          <button className="counter-btn" onClick={() => setChildren(c => Math.min(8, c + 1))} aria-label="Increase children">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Dates */}
                {step === 3 && (
                  <div>
                    <h2>Travel Dates</h2>
                    <p>When would you like to travel?</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <label htmlFor="book-check-in" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9375rem' }}>
                          Departure Date *
                        </label>
                        <input
                          id="book-check-in"
                          type="date"
                          value={checkIn}
                          onChange={e => setCheckIn(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          style={{ width: '100%', padding: '0.75rem', border: `2px solid ${errors.checkIn ? '#ef4444' : 'var(--border)'}`, borderRadius: 'var(--radius)', background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem' }}
                          aria-required="true"
                          aria-describedby={errors.checkIn ? 'check-in-error' : undefined}
                        />
                        {errors.checkIn && <p id="check-in-error" style={{ color: '#ef4444', fontSize: '0.8125rem', marginTop: '0.25rem' }} role="alert">{errors.checkIn}</p>}
                      </div>
                      <div>
                        <label htmlFor="book-check-out" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9375rem' }}>
                          Return Date *
                        </label>
                        <input
                          id="book-check-out"
                          type="date"
                          value={checkOut}
                          onChange={e => setCheckOut(e.target.value)}
                          min={checkIn || new Date().toISOString().split('T')[0]}
                          style={{ width: '100%', padding: '0.75rem', border: `2px solid ${errors.checkOut ? '#ef4444' : 'var(--border)'}`, borderRadius: 'var(--radius)', background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem' }}
                          aria-required="true"
                          aria-describedby={errors.checkOut ? 'check-out-error' : undefined}
                        />
                        {errors.checkOut && <p id="check-out-error" style={{ color: '#ef4444', fontSize: '0.8125rem', marginTop: '0.25rem' }} role="alert">{errors.checkOut}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 4 && (
                  <div>
                    <h2>Your Details</h2>
                    <p>Almost there! We just need a few details to confirm your booking.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div>
                        <label htmlFor="contact-name" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9375rem' }}>Full Name *</label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="John Doe"
                          value={contact.name}
                          onChange={e => setContact(p => ({ ...p, name: e.target.value }))}
                          style={{ width: '100%', padding: '0.75rem 1rem', border: `2px solid ${errors.name ? '#ef4444' : 'var(--border)'}`, borderRadius: 'var(--radius)', background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem' }}
                          aria-required="true"
                          autoComplete="name"
                        />
                        {errors.name && <p style={{ color: '#ef4444', fontSize: '0.8125rem', marginTop: '0.25rem' }} role="alert">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="contact-email" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9375rem' }}>Email Address *</label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="john@example.com"
                          value={contact.email}
                          onChange={e => setContact(p => ({ ...p, email: e.target.value }))}
                          style={{ width: '100%', padding: '0.75rem 1rem', border: `2px solid ${errors.email ? '#ef4444' : 'var(--border)'}`, borderRadius: 'var(--radius)', background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem' }}
                          aria-required="true"
                          autoComplete="email"
                        />
                        {errors.email && <p style={{ color: '#ef4444', fontSize: '0.8125rem', marginTop: '0.25rem' }} role="alert">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="contact-phone" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9375rem' }}>Phone Number (optional)</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={contact.phone}
                          onChange={e => setContact(p => ({ ...p, phone: e.target.value }))}
                          style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem' }}
                          autoComplete="tel"
                        />
                      </div>
                      <div style={{ background: 'rgba(26,147,111,0.08)', border: '1px solid var(--accent)', borderRadius: 'var(--radius)', padding: '1rem' }}>
                        <p style={{ color: 'var(--accent)', fontSize: '0.875rem' }}>
                          🔒 Your payment information is encrypted. A 30% deposit will be charged to confirm your booking. No charges until you click "Confirm Booking."
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="booking-nav-btns">
                  {step > 1 && (
                    <Button variant="ghost" onClick={back} icon="←">Back</Button>
                  )}
                  <Button
                    variant="primary"
                    onClick={step === 4 ? () => { if (validate()) setStep(5) } : next}
                    icon={step === 4 ? '✓' : undefined}
                    iconRight={step < 4 ? '→' : undefined}
                    style={{ marginLeft: 'auto' }}
                  >
                    {step === 4 ? 'Confirm Booking' : 'Continue'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Summary */}
          <div>
            <AnimatedSection variant="fadeLeft">
              <div className="booking-summary" aria-label="Booking summary">
                <h3>Trip Summary</h3>

                {selectedDest ? (
                  <div>
                    <div style={{ display: 'flex', gap: '0.875rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
                      <img src={selectedDest.heroImage} alt={selectedDest.name} style={{ width: 70, height: 70, borderRadius: 'var(--radius)', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>{selectedDest.name}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{selectedDest.country}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600 }}>⭐ {selectedDest.rating}</div>
                      </div>
                    </div>

                    <div className="summary-item">
                      <span>Duration</span>
                      <span>{selectedDest.duration}</span>
                    </div>
                    <div className="summary-item">
                      <span>Adults ({adults})</span>
                      <span>${(selectedDest.price * adults).toLocaleString()}</span>
                    </div>
                    {children > 0 && (
                      <div className="summary-item">
                        <span>Children ({children})</span>
                        <span>${(selectedDest.price * children * 0.5).toLocaleString()}</span>
                      </div>
                    )}
                    {checkIn && <div className="summary-item"><span>Departure</span><span>{checkIn}</span></div>}
                    {checkOut && <div className="summary-item"><span>Return</span><span>{checkOut}</span></div>}
                    <div className="summary-item total">
                      <span>Total</span>
                      <span className="price">${total.toLocaleString()}</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                      Deposit due today: <strong style={{ color: 'var(--primary)' }}>${(total * 0.3).toLocaleString()}</strong>
                    </p>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">🗺️</div>
                    <p>Select a destination to see your trip summary</p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}
