import { useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function LazyImage({ src, alt, className, style, ...props }) {
  const [loaded, setLoaded] = useState(false)
  const { ref, hasIntersected } = useIntersectionObserver({ rootMargin: '200px' })

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      className={className}
    >
      {/* Blur placeholder */}
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
          aria-hidden="true"
        />
      )}

      {hasIntersected && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          style={{
            transition: 'opacity 0.4s ease',
            opacity: loaded ? 1 : 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          {...props}
        />
      )}
    </div>
  )
}
