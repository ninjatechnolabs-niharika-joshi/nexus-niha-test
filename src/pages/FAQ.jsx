import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'
import './FAQ.css'

const faqs = [
  { id: 1, category: 'Booking', q: 'How do I book a trip with WanderLust?', a: 'Booking is easy! You can book directly through our website using the booking form, call us at +1 (800) 555-1234, or email hello@wanderlust.com. Our travel experts are available Monday-Friday 9am-6pm EST.' },
  { id: 2, category: 'Booking', q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and installment plans for bookings over $1,000. A 30% deposit is required to confirm your booking, with the balance due 30 days before departure.' },
  { id: 3, category: 'Booking', q: 'Can I customize my travel itinerary?', a: 'Absolutely! All our packages can be customized to your preferences. Tell us about your interests, dietary requirements, accessibility needs, or any special occasions you\'d like to celebrate, and we\'ll tailor everything accordingly.' },
  { id: 4, category: 'Cancellation', q: 'What is your cancellation policy?', a: 'We offer free cancellation up to 30 days before departure for a full refund. Between 15-30 days, you\'ll receive a 75% refund. Between 7-14 days, 50% refund. Less than 7 days, no refund. We strongly recommend travel insurance.' },
  { id: 5, category: 'Cancellation', q: 'What happens if WanderLust cancels my trip?', a: 'In the rare event that we need to cancel your trip, you\'ll receive a full refund plus a voucher for 10% off your next booking. If we cancel due to circumstances beyond our control (natural disasters, political unrest), we\'ll help you reschedule at no extra cost.' },
  { id: 6, category: 'Travel Tips', q: 'Do I need travel insurance?', a: 'We strongly recommend travel insurance. It can protect you against unexpected medical emergencies, trip cancellations, lost luggage, and more. We can help you choose the right policy, or you can purchase through our partner providers.' },
  { id: 7, category: 'Travel Tips', q: 'What should I pack for my trip?', a: 'Packing depends greatly on your destination. Check the climate section of your destination page for weather info. Generally, pack light layers, comfortable walking shoes, any required medications, your travel documents, and a portable charger. We\'ll email you a destination-specific packing guide after booking.' },
  { id: 8, category: 'Travel Tips', q: 'Are visas included in the package price?', a: 'Visa fees are generally not included in the package price as requirements vary by nationality. However, we provide detailed visa guidance for every destination and can assist with the application process for an additional fee. Check the visa requirements section of each destination.' },
  { id: 9, category: 'About Us', q: 'How long has WanderLust been operating?', a: 'WanderLust was founded in 2010. We\'ve been helping travelers explore the world for over 14 years, serving more than 10,000 satisfied customers in that time. We\'re proud to have been recognized as "Best Independent Travel Agency" by Travel+Leisure Magazine.' },
  { id: 10, category: 'About Us', q: 'Are your local guides certified?', a: 'Yes! All our local guides are certified by their respective national tourism boards. They undergo regular training on cultural sensitivity, first aid, and customer service. Our adventure guides hold additional certifications in areas like mountain guiding, diving, and wilderness first aid.' },
  { id: 11, category: 'Accessibility', q: 'Do you offer accessible travel options?', a: 'Yes! We work to make travel accessible to everyone. We can arrange wheelchair-accessible transportation, accommodations, and activities. Please inform us of any accessibility requirements at the time of booking and we\'ll ensure your trip is comfortable and inclusive.' },
  { id: 12, category: 'Sustainability', q: 'How does WanderLust approach sustainable travel?', a: 'Sustainability is at the core of everything we do. We partner exclusively with eco-certified hotels, support local businesses and guides, offer carbon offset options, and run our operations on renewable energy. Our "Green Travel" pledge commits us to a minimum 50% carbon reduction by 2030.' },
]

const categories = ['All', ...new Set(faqs.map(f => f.category))]

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [openId, setOpenId] = useState(null)

  const filtered = faqs.filter(f => {
    if (activeCategory !== 'All' && f.category !== activeCategory) return false
    if (search && !f.q.toLowerCase().includes(search.toLowerCase()) && !f.a.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="faq-page">
      <div className="page-hero" aria-label="FAQ">
        <div className="page-hero-content">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Frequently Asked Questions
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Everything you need to know about traveling with WanderLust
          </motion.p>
        </div>
      </div>

      <div className="container">
        <div className="faq-layout">
          <div>
            {/* Search */}
            <AnimatedSection variant="fadeUp">
              <div className="faq-search" role="search">
                <span aria-hidden="true">🔍</span>
                <label htmlFor="faq-search" style={{ display: 'none' }}>Search FAQs</label>
                <input
                  id="faq-search"
                  type="text"
                  placeholder="Search questions..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search frequently asked questions"
                />
              </div>
            </AnimatedSection>

            {/* Category Tabs */}
            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div className="faq-category-tabs" role="tablist" aria-label="FAQ categories">
                {categories.map(cat => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={activeCategory === cat}
                    className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    style={{ padding: '0.5rem 1.125rem', borderRadius: '9999px', border: '2px solid var(--border)', background: activeCategory === cat ? 'var(--primary)' : 'transparent', color: activeCategory === cat ? 'white' : 'var(--text-secondary)', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit', fontSize: '0.9rem' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* FAQs */}
            <div aria-live="polite">
              {filtered.length > 0 ? (
                filtered.map((faq, i) => (
                  <AnimatedSection key={faq.id} variant="fadeUp" delay={i * 0.05}>
                    <div
                      className={`faq-item${openId === faq.id ? ' open' : ''}`}
                      itemScope
                      itemType="https://schema.org/Question"
                    >
                      <button
                        className="faq-question"
                        onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                        aria-expanded={openId === faq.id}
                        aria-controls={`faq-answer-${faq.id}`}
                        id={`faq-q-${faq.id}`}
                      >
                        <span itemProp="name">{faq.q}</span>
                        <span className="faq-icon" aria-hidden="true">+</span>
                      </button>
                      <AnimatePresence>
                        {openId === faq.id && (
                          <motion.div
                            id={`faq-answer-${faq.id}`}
                            role="region"
                            aria-labelledby={`faq-q-${faq.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                            itemScope
                            itemProp="acceptedAnswer"
                            itemType="https://schema.org/Answer"
                          >
                            <div className="faq-answer" itemProp="text">{faq.a}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </AnimatedSection>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">🔍</div>
                  <p>No questions found matching "{search}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside aria-label="Contact information">
            <AnimatedSection variant="fadeRight">
              <div className="faq-cta">
                <h3>Still Have Questions?</h3>
                <p>Our travel experts are ready to help you plan your perfect trip.</p>
                <Button as={Link} to="/contact" variant="primary" style={{ background: 'white', color: 'var(--primary)' }}>
                  Contact Us
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fadeRight" delay={0.1} style={{ marginTop: '1.5rem' }}>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: 1.25, fontSize: '1.0625rem' }}>Quick Contact</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginTop: '1rem' }}>
                  <a href="tel:+18005551234" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', textDecoration: 'none', color: 'var(--text)', fontSize: '0.9375rem' }}>
                    <span style={{ width: 36, height: 36, background: 'rgba(255,107,53,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>📞</span>
                    +1 (800) 555-1234
                  </a>
                  <a href="mailto:hello@wanderlust.com" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', textDecoration: 'none', color: 'var(--text)', fontSize: '0.9375rem' }}>
                    <span style={{ width: 36, height: 36, background: 'rgba(255,107,53,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>✉️</span>
                    hello@wanderlust.com
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </aside>
        </div>
      </div>
    </div>
  )
}
