import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/destinations?q=${encodeURIComponent(searchValue)}`)
  }

  return (
    <section className="hero" aria-label="Hero banner">
      {/* Video Background */}
      <div className="hero-video-bg" aria-hidden="true">
        <video autoPlay muted loop playsInline>
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Fallback background image */}
      <div className="hero-bg-image" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-gradient" aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-label">
            <span aria-hidden="true">✈️</span>
            <span>Your World Awaits</span>
          </span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Explore the World's
          <br />
          <span className="highlight">Most Beautiful</span>
          <br />
          Destinations
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Discover handcrafted travel experiences that turn your dream vacations into lifelong memories. From tropical beaches to ancient ruins.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          className="hero-search"
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          role="search"
        >
          <label htmlFor="hero-search-input" className="sr-only">Search destinations</label>
          <input
            id="hero-search-input"
            type="text"
            placeholder="🔍  Where do you want to go?"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            aria-label="Search for destinations"
          />
          <button type="submit" className="hero-search-btn">
            Search
          </button>
        </motion.form>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          aria-label="Company statistics"
        >
          <div className="hero-stat">
            <span className="hero-stat-num">50+</span>
            <span className="hero-stat-label">Destinations</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat">
            <span className="hero-stat-num">10K+</span>
            <span className="hero-stat-label">Happy Travelers</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat">
            <span className="hero-stat-num">4.9★</span>
            <span className="hero-stat-label">Average Rating</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat">
            <span className="hero-stat-num">14</span>
            <span className="hero-stat-label">Years Experience</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Scroll down to explore"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span>Scroll</span>
        <div className="scroll-mouse" aria-hidden="true">
          <div className="scroll-mouse-dot" />
        </div>
      </motion.div>
    </section>
  )
}
