export default function StarRating({ rating, max = 5, size = 16, showNumber = false }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = max - fullStars - (hasHalf ? 1 : 0)

  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}
      aria-label={`Rating: ${rating} out of ${max} stars`}
      role="img"
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} style={{ color: '#f59e0b', fontSize: size }} aria-hidden="true">★</span>
      ))}
      {hasHalf && (
        <span style={{ color: '#f59e0b', fontSize: size, opacity: 0.6 }} aria-hidden="true">★</span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} style={{ color: '#d1d5db', fontSize: size }} aria-hidden="true">★</span>
      ))}
      {showNumber && (
        <span style={{ marginLeft: '4px', fontSize: size * 0.875, color: 'var(--text-secondary)' }}>
          {rating}
        </span>
      )}
    </span>
  )
}
