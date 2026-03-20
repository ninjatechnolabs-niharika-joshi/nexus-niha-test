import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'
import { useApp } from '../context/AppContext'
import destinations from '../data/destinations'
import './Dashboard.css'

const mockBookings = [
  { id: 'WL3F9X2', destination: 'Bali, Indonesia', dates: 'Apr 15–22, 2024', travelers: 2, status: 'confirmed', amount: 2598 },
  { id: 'WL7M4KP', destination: 'Paris, France', dates: 'Jun 1–6, 2024', travelers: 2, status: 'upcoming', amount: 3798 },
  { id: 'WL2R8QS', destination: 'Tokyo, Japan', dates: 'Sep 10–19, 2024', travelers: 3, status: 'pending', amount: 6897 },
]

const activities = [
  { text: 'You bookmarked "Maldives" to your wishlist', time: '2 hours ago' },
  { text: 'Trip to Bali confirmed — check your email for details', time: 'Yesterday' },
  { text: 'Review submitted for Paris trip', time: '3 days ago' },
  { text: 'Downloaded Bali travel brochure', time: '1 week ago' },
  { text: 'Newsletter subscription confirmed', time: '2 weeks ago' },
]

const docs = [
  { name: '🗺️ Bali Itinerary', file: '/brochure.pdf' },
  { name: '📋 Booking Confirmation', file: '/brochure.pdf' },
  { name: '🛡️ Travel Insurance', file: '/brochure.pdf' },
  { name: '📄 Visa Guide', file: '/brochure.pdf' },
]

export default function Dashboard() {
  const { wishlist, removeFromWishlist } = useApp()
  const displayWishlist = wishlist.length > 0 ? wishlist : destinations.slice(0, 3)

  return (
    <div className="dashboard">
      <div className="container">
        {/* Header */}
        <AnimatedSection variant="fadeUp">
          <div className="dashboard-header">
            <div className="dashboard-welcome">
              <h1>Welcome back, Traveler! 👋</h1>
              <p>Here's what's happening with your trips</p>
            </div>
            <Button as={Link} to="/booking" variant="primary" icon="✈️">
              Book New Trip
            </Button>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection variant="fadeUp" delay={0.1}>
          <div className="dashboard-stats" role="list">
            {[
              { icon: '✈️', iconClass: 'orange', num: '3', label: 'Upcoming Trips' },
              { icon: '🌍', iconClass: 'blue', num: '12', label: 'Countries Visited' },
              { icon: '❤️', iconClass: 'green', num: displayWishlist.length, label: 'Saved Destinations' },
              { icon: '⭐', iconClass: 'yellow', num: '8', label: 'Reviews Written' },
            ].map(s => (
              <motion.div key={s.label} className="stat-card" whileHover={{ y: -3 }} role="listitem">
                <div className={`stat-icon ${s.iconClass}`} aria-hidden="true">{s.icon}</div>
                <div>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <div className="dashboard-grid">
          {/* Main */}
          <div>
            {/* Bookings */}
            <AnimatedSection variant="fadeUp" delay={0.15}>
              <div className="dashboard-section">
                <h2>✈️ My Bookings</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table className="bookings-table" aria-label="Upcoming bookings">
                    <thead>
                      <tr>
                        <th scope="col">Ref #</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Dates</th>
                        <th scope="col">Travelers</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBookings.map(b => (
                        <tr key={b.id}>
                          <td><code style={{ fontFamily: 'monospace', color: 'var(--primary)', fontWeight: 600 }}>{b.id}</code></td>
                          <td style={{ fontWeight: 600 }}>{b.destination}</td>
                          <td style={{ color: 'var(--text-secondary)' }}>{b.dates}</td>
                          <td>{b.travelers}</td>
                          <td style={{ fontWeight: 700 }}>${b.amount.toLocaleString()}</td>
                          <td>
                            <span
                              className={`status-badge ${b.status}`}
                              role="status"
                              aria-label={`Status: ${b.status}`}
                            >
                              {b.status === 'confirmed' ? '✓ ' : b.status === 'upcoming' ? '🗓️ ' : '⏳ '}
                              {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>

            {/* Wishlist */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
              <div className="dashboard-section">
                <h2>❤️ Saved Destinations</h2>
                {displayWishlist.length > 0 ? (
                  <div className="wishlist-grid">
                    {displayWishlist.slice(0, 4).map(dest => (
                      <Link key={dest.id} to={`/destinations/${dest.slug || dest.id}`} className="wishlist-item">
                        <div className="wishlist-item-img">
                          <img src={dest.heroImage} alt={dest.name} loading="lazy" />
                        </div>
                        <div className="wishlist-item-info">
                          <div>{dest.name}, {dest.country}</div>
                          <div style={{ color: 'var(--primary)', fontSize: '0.8125rem' }}>From ${dest.price?.toLocaleString()}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💔</div>
                    <p>No saved destinations yet</p>
                    <Link to="/destinations" style={{ color: 'var(--primary)' }}>Browse Destinations</Link>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Travel Documents */}
            <AnimatedSection variant="fadeUp" delay={0.25}>
              <div className="dashboard-section">
                <h2>📁 Travel Documents</h2>
                <div className="docs-list">
                  {docs.map(doc => (
                    <div key={doc.name} className="doc-item">
                      <span className="doc-name">{doc.name}</span>
                      <a
                        href={doc.file}
                        download
                        className="doc-download"
                        aria-label={`Download ${doc.name}`}
                      >
                        ⬇️ Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div>
            {/* Quick Book */}
            <AnimatedSection variant="fadeLeft">
              <div className="dashboard-section">
                <h2>🚀 Quick Book</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1.25rem' }}>
                  Ready for your next adventure?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {destinations.slice(0, 3).map(d => (
                    <Link
                      key={d.id}
                      to={`/booking`}
                      state={{ destination: d }}
                      style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', textDecoration: 'none', color: 'inherit', border: '1px solid var(--border)', transition: 'var(--transition)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                    >
                      <img src={d.heroImage} alt="" aria-hidden="true" style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{d.name}</div>
                        <div style={{ color: 'var(--primary)', fontSize: '0.8125rem', fontWeight: 600 }}>${d.price?.toLocaleString()}/person</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Activity */}
            <AnimatedSection variant="fadeLeft" delay={0.1}>
              <div className="dashboard-section">
                <h2>🔔 Recent Activity</h2>
                <div aria-label="Recent activity feed">
                  {activities.map((a, i) => (
                    <div key={i} className="activity-item">
                      <div className="activity-dot" aria-hidden="true" />
                      <div>
                        <div className="activity-text">{a.text}</div>
                        <div className="activity-time">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}
