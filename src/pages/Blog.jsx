import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import blogs from '../data/blogs'
import './Blog.css'

const categories = ['All', 'Travel Tips', 'Destination Guides', 'Solo Travel', 'Budget Travel', 'Photography', 'Sustainable Travel']

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = blogs.filter(b => {
    if (activeCategory !== 'All' && b.category !== activeCategory) return false
    if (search && !b.title.toLowerCase().includes(search.toLowerCase()) && !b.excerpt.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const featured = blogs.find(b => b.featured)
  const rest = filtered.filter(b => !b.featured)

  return (
    <div className="blog-page">
      <div className="page-hero" aria-label="Blog">
        <div className="page-hero-content">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Travel Stories
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Tips, guides, and inspiration for your next adventure
          </motion.p>
        </div>
      </div>

      <div className="container">
        <div className="blog-layout">
          {/* Main */}
          <div className="blog-main">
            {/* Featured */}
            {featured && (
              <AnimatedSection variant="fadeUp">
                <Link to={`/blog/${featured.slug}`} className="blog-featured" aria-label={`Featured post: ${featured.title}`}>
                  <div className="blog-featured-image">
                    <img src={featured.image} alt="" aria-hidden="true" />
                  </div>
                  <div className="blog-featured-overlay" aria-hidden="true" />
                  <div className="blog-featured-content">
                    <span className="blog-featured-tag">⭐ Featured</span>
                    <h2 className="blog-featured-title">{featured.title}</h2>
                    <p className="blog-featured-excerpt">{featured.excerpt}</p>
                    <div className="blog-featured-meta">
                      <span>✍️ {featured.author}</span>
                      <span>📅 {new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <span>📖 {featured.readTime}</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            )}

            {/* Filters */}
            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }} role="group" aria-label="Filter blog posts by category">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`category-tag${activeCategory === cat ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* Posts Grid */}
            <div className="blog-posts-grid">
              {filtered.map((blog, i) => (
                <AnimatedSection key={blog.id} variant="fadeUp" delay={i * 0.08}>
                  <Link to={`/blog/${blog.slug}`} className="blog-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'var(--transition)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px var(--shadow-md)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                  >
                    <div style={{ overflow: 'hidden', aspectRatio: '16/9' }}>
                      <img src={blog.image} alt={blog.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                        onMouseLeave={e => e.target.style.transform = ''}
                      />
                    </div>
                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.625rem' }}>
                        <span style={{ background: 'rgba(255,107,53,0.1)', color: 'var(--primary)', padding: '0.2rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {blog.category}
                        </span>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                          {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.4, flex: 1 }}>
                        {blog.title}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                        {blog.excerpt.slice(0, 100)}...
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.875rem', borderTop: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                          <img src={blog.authorAvatar} alt="" aria-hidden="true" style={{ width: 26, height: 26, borderRadius: '50%' }} />
                          {blog.author}
                        </div>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>📖 {blog.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="blog-sidebar" aria-label="Blog sidebar">
            {/* Search */}
            <AnimatedSection variant="fadeRight">
              <div className="sidebar-widget">
                <h3>Search</h3>
                <label htmlFor="blog-search" style={{ display: 'none' }}>Search blog posts</label>
                <input
                  id="blog-search"
                  type="search"
                  placeholder="Search posts..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: '100%', padding: '0.625rem 0.875rem',
                    border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                    background: 'var(--bg)', color: 'var(--text)', fontSize: '0.9375rem'
                  }}
                  aria-label="Search blog posts"
                />
              </div>
            </AnimatedSection>

            {/* Categories */}
            <AnimatedSection variant="fadeRight" delay={0.1}>
              <div className="sidebar-widget">
                <h3>Categories</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {categories.slice(1).map(cat => (
                    <button
                      key={cat}
                      className={`category-tag${activeCategory === cat ? ' active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Recent Posts */}
            <AnimatedSection variant="fadeRight" delay={0.2}>
              <div className="sidebar-widget">
                <h3>Recent Posts</h3>
                {blogs.slice(0, 4).map(b => (
                  <Link key={b.id} to={`/blog/${b.slug}`} className="recent-post">
                    <img src={b.image} alt="" aria-hidden="true" className="recent-post-image" />
                    <div>
                      <div className="recent-post-title">{b.title}</div>
                      <div className="recent-post-date">{new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </AnimatedSection>

            {/* Popular Tags */}
            <AnimatedSection variant="fadeRight" delay={0.3}>
              <div className="sidebar-widget">
                <h3>Popular Tags</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Bali', 'Paris', 'Japan', 'Safari', 'Budget Travel', 'Photography', 'Solo Travel', 'Beaches'].map(tag => (
                    <span key={tag} style={{
                      padding: '0.25rem 0.625rem', borderRadius: '9999px',
                      background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                      fontSize: '0.8125rem', color: 'var(--text-secondary)',
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </aside>
        </div>
      </div>
    </div>
  )
}
