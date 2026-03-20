import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import AnimatedSection from '../components/ui/AnimatedSection'
import destinations from '../data/destinations'
import './Destinations.css'

const ITEMS_PER_PAGE = 6

const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania']
const categories = ['Beach & Island', 'City & Culture', 'Adventure & Safari', 'Heritage & History']

export default function Destinations() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [continent, setContinent] = useState('')
  const [category, setCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState(5000)
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = [...destinations]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      )
    }

    if (continent) result = result.filter(d => d.continent === continent)
    if (category) result = result.filter(d => d.category === category)
    result = result.filter(d => d.price <= maxPrice)

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [search, continent, category, maxPrice, sortBy])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleReset = () => {
    setSearch(''); setContinent(''); setCategory(''); setMaxPrice(5000); setSortBy('featured'); setPage(1)
  }

  return (
    <div className="destinations-page">
      <div className="container">
        <AnimatedSection variant="fadeUp">
          <div className="destinations-header">
            <h1>Explore Destinations</h1>
            <p>Discover {destinations.length} incredible destinations around the world</p>
          </div>
        </AnimatedSection>

        <div className="destinations-layout">
          {/* Sidebar */}
          <div className="destinations-sidebar">
            <AnimatedSection variant="fadeLeft">
              <div className="filter-panel" aria-label="Filter destinations">
                <div className="filter-panel-header">
                  <h3>Filters</h3>
                  <button className="filter-reset-btn" onClick={handleReset} aria-label="Reset all filters">
                    Reset All
                  </button>
                </div>

                {/* Continent */}
                <div className="filter-section">
                  <h4>Continent</h4>
                  <div className="filter-options" role="radiogroup" aria-label="Filter by continent">
                    <label className="filter-option">
                      <input type="radio" name="continent" value="" checked={continent === ''} onChange={() => setContinent('')} />
                      All Continents
                    </label>
                    {continents.map(c => (
                      <label key={c} className="filter-option">
                        <input type="radio" name="continent" value={c} checked={continent === c} onChange={() => setContinent(c)} />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div className="filter-section">
                  <h4>Category</h4>
                  <div className="filter-options" role="radiogroup" aria-label="Filter by category">
                    <label className="filter-option">
                      <input type="radio" name="category" value="" checked={category === ''} onChange={() => setCategory('')} />
                      All Categories
                    </label>
                    {categories.map(c => (
                      <label key={c} className="filter-option">
                        <input type="radio" name="category" value={c} checked={category === c} onChange={() => setCategory(c)} />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="filter-section">
                  <h4>Max Price</h4>
                  <div className="price-range-display">
                    <span>$0</span>
                    <span aria-live="polite">${maxPrice.toLocaleString()}</span>
                  </div>
                  <label htmlFor="price-slider" style={{ display: 'none' }}>Maximum price per person</label>
                  <input
                    id="price-slider"
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    className="price-range-slider"
                    aria-label={`Maximum price: $${maxPrice}`}
                    aria-valuemin={500}
                    aria-valuemax={5000}
                    aria-valuenow={maxPrice}
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Main */}
          <div>
            {/* Search */}
            <AnimatedSection variant="fadeUp">
              <div className="destinations-search" role="search">
                <span aria-hidden="true">🔍</span>
                <label htmlFor="dest-search" style={{ display: 'none' }}>Search destinations</label>
                <input
                  id="dest-search"
                  type="text"
                  placeholder="Search destinations..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1) }}
                  aria-label="Search destinations"
                />
                {search && (
                  <button onClick={() => setSearch('')} aria-label="Clear search" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    ✕
                  </button>
                )}
              </div>
            </AnimatedSection>

            {/* Toolbar */}
            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div className="destinations-toolbar">
                <p className="destinations-count">
                  <strong>{filtered.length}</strong> destination{filtered.length !== 1 ? 's' : ''} found
                </p>
                <div className="toolbar-right">
                  <label htmlFor="sort-select" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Sort:</label>
                  <select
                    id="sort-select"
                    className="sort-select"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="rating">Top Rated</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Alphabetical</option>
                  </select>

                  <div className="view-toggle" role="group" aria-label="View mode">
                    <button
                      className={`view-toggle-btn${viewMode === 'grid' ? ' active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                      aria-pressed={viewMode === 'grid'}
                    >⊞</button>
                    <button
                      className={`view-toggle-btn${viewMode === 'list' ? ' active' : ''}`}
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                      aria-pressed={viewMode === 'list'}
                    >☰</button>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Results */}
            <div className={`destinations-results ${viewMode}-view`} aria-live="polite" aria-atomic="false">
              {paginated.length > 0 ? (
                <>
                  <div className="destinations-grid" style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr', gap: '1.5rem' }}>
                    {paginated.map((dest, i) => (
                      <motion.div
                        key={dest.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                      >
                        <Card destination={dest} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="pagination" aria-label="Destinations pagination">
                      <button
                        className="page-btn"
                        onClick={() => setPage(p => p - 1)}
                        disabled={page === 1}
                        aria-label="Previous page"
                      >‹</button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          className={`page-btn${p === page ? ' active' : ''}`}
                          onClick={() => setPage(p)}
                          aria-label={`Page ${p}`}
                          aria-current={p === page ? 'page' : undefined}
                        >
                          {p}
                        </button>
                      ))}

                      <button
                        className="page-btn"
                        onClick={() => setPage(p => p + 1)}
                        disabled={page === totalPages}
                        aria-label="Next page"
                      >›</button>
                    </nav>
                  )}
                </>
              ) : (
                <div className="no-results" role="status">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }} aria-hidden="true">🔍</div>
                  <h3>No destinations found</h3>
                  <p>Try adjusting your filters or search query</p>
                  <button onClick={handleReset} style={{ marginTop: '1rem', padding: '0.625rem 1.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '9999px', cursor: 'pointer', fontWeight: 600 }}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
