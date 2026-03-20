import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero'
import StatsSection from '../components/sections/StatsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import Card from '../components/ui/Card'
import AnimatedSection from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'
import destinations from '../data/destinations'
import blogs from '../data/blogs'
import './Home.css'

const categories = ['All', 'Beach & Island', 'City & Culture', 'Adventure & Safari', 'Heritage & History']

const whyUsFeatures = [
  { icon: '🗺️', title: 'Expert Local Guides', desc: 'Our certified guides have lived in and explored every destination we offer, giving you authentic insights.' },
  { icon: '💰', title: 'Best Price Guarantee', desc: 'Find a better price? We\'ll match it and give you an additional 10% discount on your booking.' },
  { icon: '🛡️', title: 'Fully Protected Travel', desc: 'All bookings are financially protected and insured for your complete peace of mind.' },
  { icon: '🎯', title: 'Tailor-Made Trips', desc: 'Every itinerary is crafted to match your interests, budget, and travel style.' },
  { icon: '📞', title: '24/7 Support', desc: 'Our dedicated travel experts are available around the clock, wherever you are in the world.' },
  { icon: '♻️', title: 'Sustainable Travel', desc: 'We partner with eco-friendly lodges and tour operators to minimize your environmental impact.' },
]

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filtered = activeCategory === 'All'
    ? destinations
    : destinations.filter(d => d.category === activeCategory)

  const featuredBlogs = blogs.slice(0, 3)

  const handleSubscribe = (e) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <div className="home-page">
      <Hero />

      {/* Stats */}
      <StatsSection />

      {/* Featured Destinations */}
      <section className="featured-destinations" aria-labelledby="featured-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header">
            <h2 id="featured-heading">Popular Destinations</h2>
            <p>Handpicked destinations that our travelers love. From tropical paradises to ancient wonders.</p>
          </AnimatedSection>

          {/* Category Filters */}
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <div className="featured-filters" role="group" aria-label="Filter destinations by category">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          <div className="destinations-grid">
            {filtered.slice(0, 6).map((dest, i) => (
              <AnimatedSection key={dest.id} variant="fadeUp" delay={i * 0.08}>
                <Card destination={dest} />
              </AnimatedSection>
            ))}
          </div>

          <div className="see-all-wrap">
            <Button as={Link} to="/destinations" variant="outline" size="lg" iconRight="→">
              View All Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section" aria-labelledby="why-us-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header">
            <h2 id="why-us-heading">Why Travel With WanderLust?</h2>
            <p>We're not just a travel company — we're your partners in creating stories worth telling.</p>
          </AnimatedSection>

          <div className="why-us-grid">
            {whyUsFeatures.map((feature, i) => (
              <AnimatedSection key={feature.title} variant="fadeUp" delay={i * 0.1}>
                <motion.div
                  className="why-us-card"
                  whileHover={{ y: -4 }}
                >
                  <div className="why-us-icon" aria-hidden="true">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Blog Preview */}
      <section className="blog-preview" aria-labelledby="blog-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header">
            <h2 id="blog-heading">Travel Stories & Tips</h2>
            <p>Get inspired by our latest travel guides, tips, and destination stories.</p>
          </AnimatedSection>

          <div className="blog-grid">
            {featuredBlogs.map((blog, i) => (
              <AnimatedSection key={blog.id} variant="fadeUp" delay={i * 0.1}>
                <Link to={`/blog/${blog.slug}`} className="blog-card">
                  <div className="blog-card-image">
                    <img src={blog.image} alt={blog.title} loading="lazy" />
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-card-category">{blog.category}</span>
                      <span className="blog-card-date">{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <h3 className="blog-card-title">{blog.title}</h3>
                    <p className="blog-card-excerpt">{blog.excerpt}</p>
                    <div className="blog-card-footer">
                      <div className="blog-card-author">
                        <img src={blog.authorAvatar} alt="" aria-hidden="true" />
                        <span>{blog.author}</span>
                      </div>
                      <span className="blog-card-read-time">📖 {blog.readTime}</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="see-all-wrap">
            <Button as={Link} to="/blog" variant="outline" size="lg" iconRight="→">
              Read More Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section" aria-labelledby="video-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header">
            <h2 id="video-heading">Experience the Journey</h2>
            <p>Get a taste of the incredible adventures waiting for you</p>
          </AnimatedSection>

          <AnimatedSection variant="scale">
            <div className="video-container">
              <video
                controls
                poster="https://picsum.photos/seed/video-poster/900/500"
                aria-label="Travel experience showcase video"
              >
                <source src="https://www.w3schools.com/html/mov_baa.mp4" type="video/mp4" />
                <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
                Your browser does not support the video tag. <a href="https://www.w3schools.com/html/mov_baa.mp4">Download the video</a>.
              </video>
            </div>
          </AnimatedSection>

          {/* Audio Player Easter Egg */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              🎵 Travel soundtrack
            </p>
            <audio controls aria-label="Travel background music" style={{ borderRadius: 'var(--radius)', maxWidth: '300px' }}>
              <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
              Your browser does not support audio.
            </audio>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section" aria-labelledby="newsletter-heading">
        <div className="container">
          <div className="newsletter-inner">
            <AnimatedSection variant="fadeUp">
              <h2 id="newsletter-heading">✈️ Never Miss a Travel Deal</h2>
              <p>
                Subscribe to get exclusive offers, destination inspiration, and travel tips straight to your inbox.
                Join 50,000+ adventure seekers!
              </p>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <label htmlFor="newsletter-email" style={{ display: 'none' }}>Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter subscription"
                />
                <button type="submit">
                  {subscribed ? '✅ Subscribed!' : 'Subscribe Free'}
                </button>
              </form>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem', marginTop: '1rem' }}>
                No spam, ever. Unsubscribe at any time.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
