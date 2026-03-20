import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import destinations from '../data/destinations'
import './NotFound.css'

export default function NotFound() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search) navigate(`/destinations?q=${encodeURIComponent(search)}`)
  }

  const popular = destinations.filter(d => d.featured).slice(0, 4)

  return (
    <div className="not-found">
      <div className="not-found-content">
        <motion.span
          className="not-found-number"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          aria-hidden="true"
        >
          404
        </motion.span>

        <motion.span
          className="not-found-emoji"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          aria-hidden="true"
        >
          ✈️
        </motion.span>

        <motion.h1
          className="not-found-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          You've Flown Off the Map!
        </motion.h1>

        <motion.p
          className="not-found-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Looks like this page took a wrong turn somewhere between Tokyo and Timbuktu.
          Don't worry — even the best explorers get lost sometimes. Let's get you back on track!
        </motion.p>

        {/* Search */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '0.75rem', maxWidth: '400px', margin: '0 auto 2rem' }}
          role="search"
        >
          <label htmlFor="notfound-search" style={{ display: 'none' }}>Search destinations</label>
          <input
            id="notfound-search"
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, padding: '0.75rem 1rem',
              border: '2px solid var(--border)', borderRadius: '9999px',
              background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem',
            }}
            aria-label="Search for destinations"
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.25rem',
              background: 'var(--gradient-primary)', color: 'white',
              border: 'none', borderRadius: '9999px',
              fontWeight: 600, cursor: 'pointer',
            }}
            aria-label="Search"
          >
            🔍
          </button>
        </motion.form>

        {/* Popular destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            Or explore popular destinations:
          </p>
          <div className="not-found-destinations">
            {popular.map(d => (
              <Link key={d.id} to={`/destinations/${d.slug}`} className="not-found-dest-btn">
                {d.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Home button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem',
              background: 'var(--gradient-primary)', color: 'white',
              borderRadius: '9999px', fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(255,107,53,0.3)',
              transition: 'var(--transition)',
            }}
          >
            🏠 Take Me Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
