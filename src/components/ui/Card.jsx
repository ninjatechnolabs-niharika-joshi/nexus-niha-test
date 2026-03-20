import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import './Card.css'

export default function Card({ destination }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useApp()
  const inWishlist = isInWishlist(destination.id)

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(destination.id)
    } else {
      addToWishlist(destination)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/destinations/${destination.slug || destination.id}`}
        className="dest-card"
        aria-label={`View details for ${destination.name}, ${destination.country}`}
      >
        <div className="dest-card-image-wrap">
          <img
            src={destination.heroImage}
            alt={`${destination.name}, ${destination.country}`}
            loading="lazy"
          />
          <div className="dest-card-overlay" aria-hidden="true" />

          {destination.category && (
            <div className="dest-card-badge" aria-label={`Category: ${destination.category}`}>
              {destination.category}
            </div>
          )}

          {destination.featured && (
            <div className="dest-card-featured" aria-label="Featured destination">
              ⭐ Featured
            </div>
          )}

          <div className="dest-card-price">
            From ${destination.price?.toLocaleString()} <span>/person</span>
          </div>

          <button
            className="dest-card-wishlist"
            onClick={handleWishlist}
            aria-label={inWishlist ? `Remove ${destination.name} from wishlist` : `Add ${destination.name} to wishlist`}
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {inWishlist ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="dest-card-body">
          <div className="dest-card-meta">
            <div className="dest-card-location">
              <span aria-hidden="true">📍</span>
              <span>{destination.country}</span>
            </div>
            {destination.rating && (
              <div className="dest-card-rating" aria-label={`Rating: ${destination.rating} out of 5`}>
                <span aria-hidden="true">⭐</span>
                <strong>{destination.rating}</strong>
                <span>({destination.reviews?.toLocaleString() || 0})</span>
              </div>
            )}
          </div>

          <h3 className="dest-card-title">{destination.name}</h3>
          <p className="dest-card-tagline">{destination.tagline || destination.description?.slice(0, 80) + '...'}</p>

          <div className="dest-card-footer">
            <div className="dest-card-duration">
              <span aria-hidden="true">🕐</span>
              <span>{destination.duration}</span>
            </div>
            <div className="dest-card-cta">
              View Details <span aria-hidden="true">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
