import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'
import './Contact.css'

const officeLocations = [
  { flag: '🇺🇸', city: 'New York', country: 'USA', address: '123 Travel Lane, Manhattan, NY 10001' },
  { flag: '🇬🇧', city: 'London', country: 'United Kingdom', address: '45 Explorer Street, Covent Garden, WC2E 8RF' },
  { flag: '🇫🇷', city: 'Paris', country: 'France', address: '12 Rue de la Aventure, 75008 Paris' },
  { flag: '🇦🇺', city: 'Sydney', country: 'Australia', address: '88 Harbour View Rd, Sydney NSW 2000' },
]

function validate(data) {
  const errors = {}
  if (!data.firstName?.trim()) errors.firstName = 'First name is required'
  if (!data.lastName?.trim()) errors.lastName = 'Last name is required'
  if (!data.email?.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email'
  if (!data.subject?.trim()) errors.subject = 'Subject is required'
  if (!data.message?.trim()) errors.message = 'Message is required'
  else if (data.message.length < 10) errors.message = 'Message must be at least 10 characters'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', subject: '', message: '', newsletter: false
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const newErrors = validate({ ...form, [name]: form[name] })
    setErrors(prev => ({ ...prev, [name]: newErrors[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const allTouched = Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)
    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      {/* Hero */}
      <div className="page-hero" aria-label="Contact Us">
        <div className="page-hero-content">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Get In Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            We'd love to hear from you. Let's plan your next adventure!
          </motion.p>
        </div>
      </div>

      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <AnimatedSection variant="fadeLeft">
            <div className="contact-info">
              <h2>Let's Talk Travel</h2>
              <p>
                Have a destination in mind? Ready to plan your dream trip? Or just want to learn more about what WanderLust offers? Our travel experts are here to help.
              </p>

              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-card-icon" aria-hidden="true">📞</div>
                  <div className="contact-card-body">
                    <h4>Call Us</h4>
                    <p><a href="tel:+18005551234">+1 (800) 555-1234</a><br />Mon–Fri, 9am–6pm EST</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon" aria-hidden="true">✉️</div>
                  <div className="contact-card-body">
                    <h4>Email Us</h4>
                    <p><a href="mailto:hello@wanderlust.com">hello@wanderlust.com</a><br />We reply within 24 hours</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon" aria-hidden="true">💬</div>
                  <div className="contact-card-body">
                    <h4>Live Chat</h4>
                    <p>Chat with us online<br />Available 24/7</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon" aria-hidden="true">📍</div>
                  <div className="contact-card-body">
                    <h4>Visit Us</h4>
                    <p>123 Travel Lane, Manhattan<br />New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection variant="fadeRight">
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              <p>Fill out the form and we'll get back to you within 24 hours.</p>

              {submitted ? (
                <motion.div
                  className="form-success-msg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="alert"
                  aria-live="polite"
                >
                  <span aria-hidden="true">🎉</span>
                  <span>Thank you! Your message has been sent. We'll get back to you soon!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">
                        First Name <span className="required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className={`form-input${errors.firstName ? ' error' : touched.firstName && !errors.firstName ? ' success' : ''}`}
                        placeholder="John"
                        value={form.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                        aria-invalid={!!errors.firstName}
                      />
                      {errors.firstName && <p id="firstName-error" className="form-error" role="alert">{errors.firstName}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">
                        Last Name <span className="required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className={`form-input${errors.lastName ? ' error' : touched.lastName && !errors.lastName ? ' success' : ''}`}
                        placeholder="Doe"
                        value={form.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                        aria-invalid={!!errors.lastName}
                      />
                      {errors.lastName && <p id="lastName-error" className="form-error" role="alert">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email <span className="required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`form-input${errors.email ? ' error' : touched.email && !errors.email ? ' success' : ''}`}
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={!!errors.email}
                        autoComplete="email"
                      />
                      {errors.email && <p id="email-error" className="form-error" role="alert">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone (optional)</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-input"
                        placeholder="+1 (555) 123-4567"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject <span className="required" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className={`form-input${errors.subject ? ' error' : ''}`}
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Trip Booking</option>
                      <option value="information">Destination Information</option>
                      <option value="support">Customer Support</option>
                      <option value="complaint">Feedback / Complaint</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <p id="subject-error" className="form-error" role="alert">{errors.subject}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message <span className="required" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className={`form-input${errors.message ? ' error' : touched.message && !errors.message ? ' success' : ''}`}
                      rows={5}
                      placeholder="Tell us about your dream trip..."
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                      aria-invalid={!!errors.message}
                      style={{ resize: 'vertical', minHeight: '120px' }}
                    />
                    <p id="message-hint" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      {form.message.length}/500 characters
                    </p>
                    {errors.message && <p id="message-error" className="form-error" role="alert">{errors.message}</p>}
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: 500 }}>
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={form.newsletter}
                        onChange={handleChange}
                        aria-label="Subscribe to newsletter"
                        style={{ width: 18, height: 18, accentColor: 'var(--primary)' }}
                      />
                      Subscribe to our travel newsletter for exclusive deals
                    </label>
                  </div>

                  <Button type="submit" loading={loading} fullWidth size="lg">
                    {loading ? 'Sending...' : 'Send Message ✈️'}
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Map */}
      <section className="contact-map">
        <div className="container">
          <AnimatedSection variant="fadeUp">
            <div className="map-container" aria-label="Office location map placeholder">
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))',
                  backgroundImage: `url("https://picsum.photos/seed/map/1200/400")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.3
                }}
                aria-hidden="true"
              />
              <div className="map-placeholder">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }} aria-hidden="true">📍</div>
                <h3>Find Our Office</h3>
                <p>123 Travel Lane, Manhattan, New York, NY 10001</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block', marginTop: '1rem',
                    padding: '0.625rem 1.5rem',
                    background: 'var(--gradient-primary)',
                    color: 'white', borderRadius: '9999px',
                    fontWeight: 600, fontSize: '0.9375rem',
                    textDecoration: 'none',
                  }}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Office Locations */}
      <section className="office-locations" aria-labelledby="offices-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header">
            <h2 id="offices-heading">Our Global Offices</h2>
          </AnimatedSection>
          <div className="office-grid">
            {officeLocations.map((office, i) => (
              <AnimatedSection key={office.city} variant="fadeUp" delay={i * 0.1}>
                <div className="office-card">
                  <div className="office-flag" aria-hidden="true">{office.flag}</div>
                  <div className="office-city">{office.city}</div>
                  <div className="office-country">{office.country}</div>
                  <div className="office-address">{office.address}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
