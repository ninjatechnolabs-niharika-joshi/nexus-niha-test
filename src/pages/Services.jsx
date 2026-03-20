import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/ui/AnimatedSection'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import './Services.css'

const services = [
  { id: 1, icon: '✈️', title: 'Custom Tour Packages', desc: 'Tailor-made itineraries crafted just for you. Tell us your dream destination and preferences, and we\'ll create a personalized travel experience.', features: ['Personalized itinerary', '24/7 support', 'Flexible scheduling', 'Local expert guides', 'Airport transfers included'], price: 'From $999/person' },
  { id: 2, icon: '💎', title: 'Luxury Travel', desc: 'Experience the world\'s finest hotels, exclusive experiences, and VIP treatment. Our luxury packages redefine what travel can be.', features: ['5-star hotels & resorts', 'Private transfers', 'Exclusive access experiences', 'Dedicated concierge', 'Champagne welcome'], price: 'From $3,999/person' },
  { id: 3, icon: '🏔️', title: 'Adventure Tours', desc: 'From trekking in the Himalayas to diving in the Great Barrier Reef, our adventure tours push the boundaries of exploration.', features: ['Expert adventure guides', 'Safety equipment', 'Small group sizes', 'Camping options', 'Emergency support'], price: 'From $1,499/person' },
  { id: 4, icon: '👨‍👩‍👧‍👦', title: 'Family Vacations', desc: 'Create lasting family memories with our specially designed family packages. Kid-friendly activities and stress-free planning.', features: ['Family-friendly hotels', 'Kid activities & clubs', 'Age-appropriate tours', 'Child safety protocols', 'Flexible pricing'], price: 'From $2,499/family' },
  { id: 5, icon: '💑', title: 'Honeymoon & Romance', desc: 'Start your forever together with an unforgettable honeymoon. Private dinners, couples\' spa treatments, and romantic sunsets await.', features: ['Private villas', 'Couples spa packages', 'Romantic dining', 'Surprise arrangements', 'Photography sessions'], price: 'From $2,999/couple' },
  { id: 6, icon: '🤝', title: 'Group & Corporate', desc: 'Perfect for team-building retreats, incentive travel, or group adventures. We handle all logistics.', features: ['Group discounts (10+)', 'Event planning', 'Team activities', 'Dedicated coordinator', 'Custom branding'], price: 'From $799/person' },
]

const processSteps = [
  { step: '1', title: 'Tell Us Your Dream', desc: 'Share your destination wishes, dates, budget and travel style with our expert team.' },
  { step: '2', title: 'We Plan Everything', desc: 'Our specialists craft a personalized itinerary tailored exactly to your requirements.' },
  { step: '3', title: 'Review & Refine', desc: 'We present your trip plan and make any adjustments until it\'s perfect for you.' },
  { step: '4', title: 'Enjoy Your Trip!', desc: 'Sit back, relax, and let us handle all the details. We\'re with you every step of the way.' },
]

export default function Services() {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <div className="services-page">
      <div className="page-hero" aria-label="Services">
        <div className="page-hero-content">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Our Services
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Tailored travel experiences for every type of adventurer
          </motion.p>
        </div>
      </div>

      {/* Services */}
      <section aria-labelledby="services-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header" style={{ paddingTop: '3rem' }}>
            <h2 id="services-heading">What We Offer</h2>
            <p>From budget adventures to luxury escapes, we have the perfect travel service for you</p>
          </AnimatedSection>

          <div className="services-grid">
            {services.map((s, i) => (
              <AnimatedSection key={s.id} variant="fadeUp" delay={i * 0.1}>
                <motion.div
                  className="service-card"
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedService(s)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setSelectedService(s)}
                  aria-label={`${s.title} - Click to learn more`}
                >
                  <span className="service-icon" aria-hidden="true">{s.icon}</span>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                  <ul className="service-features" aria-label="Features">
                    {s.features.slice(0, 3).map(f => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div className="service-price" aria-label={`Starting price: ${s.price}`}>{s.price}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process-section" aria-labelledby="process-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header">
            <h2 id="process-heading">How It Works</h2>
            <p>Book your dream trip in 4 simple steps</p>
          </AnimatedSection>
          <div className="process-steps">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.step} variant="fadeUp" delay={i * 0.15}>
                <div className="process-step">
                  <div className="process-step-num" aria-label={`Step ${step.step}`}>{step.step}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section" aria-labelledby="pricing-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header">
            <h2 id="pricing-heading">Simple, Transparent Pricing</h2>
            <p>No hidden fees. Ever.</p>
          </AnimatedSection>
          <div className="pricing-grid">
            {[
              { name: 'Starter', price: '$499', period: 'per person', popular: false, features: [{ label: 'Accommodation', included: true }, { label: 'Airport transfer', included: true }, { label: 'City map & guides', included: true }, { label: 'Personal guide', included: false }, { label: '24/7 support', included: false }] },
              { name: 'Explorer', price: '$999', period: 'per person', popular: true, features: [{ label: 'Accommodation', included: true }, { label: 'Airport transfer', included: true }, { label: 'City map & guides', included: true }, { label: 'Personal guide (2 days)', included: true }, { label: '24/7 support', included: false }] },
              { name: 'Premium', price: '$1,799', period: 'per person', popular: false, features: [{ label: 'Luxury accommodation', included: true }, { label: 'Private transfers', included: true }, { label: 'Full concierge service', included: true }, { label: 'Personal guide (full trip)', included: true }, { label: '24/7 dedicated support', included: true }] },
            ].map((plan, i) => (
              <AnimatedSection key={plan.name} variant="scale" delay={i * 0.15}>
                <div className={`pricing-card${plan.popular ? ' popular' : ''}`}>
                  {plan.popular && <div className="pricing-popular-tag">⭐ Most Popular</div>}
                  <div className="pricing-name">{plan.name}</div>
                  <div className="pricing-price">{plan.price}</div>
                  <div className="pricing-period">{plan.period}</div>
                  <ul className="pricing-features">
                    {plan.features.map(f => (
                      <li key={f.label}>
                        <span className={f.included ? 'check' : 'cross'} aria-hidden="true">
                          {f.included ? '✓' : '✕'}
                        </span>
                        <span style={{ color: f.included ? 'var(--text)' : 'var(--text-muted)' }}>
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button as={Link} to="/booking" variant={plan.popular ? 'primary' : 'outline'} fullWidth>
                    Choose {plan.name}
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title}
      >
        {selectedService && (
          <div>
            <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }} aria-hidden="true">
              {selectedService.icon}
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {selectedService.desc}
            </p>
            <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>What's Included:</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedService.features.map(f => (
                <li key={f} style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', fontSize: '0.9375rem' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)' }}>{selectedService.price}</div>
              <Button as={Link} to="/booking" onClick={() => setSelectedService(null)}>Book Now</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
