import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import blogs from '../data/blogs'
import './BlogDetail.css'

export default function BlogDetail() {
  const { id } = useParams()
  const blog = blogs.find(b => b.slug === id || b.id === Number(id))

  if (!blog) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <h2>Blog post not found</h2>
        <Link to="/blog" style={{ color: 'var(--primary)' }}>Back to blog</Link>
      </div>
    )
  }

  const related = blogs.filter(b => b.id !== blog.id && b.category === blog.category).slice(0, 2)

  const contentBlocks = blog.content.split('\n\n').map((block, i) => {
    if (block.startsWith('**') && block.endsWith('**')) {
      return <h3 key={i}>{block.replace(/\*\*/g, '')}</h3>
    }
    if (block.startsWith('- ')) {
      const items = block.split('\n').filter(l => l.startsWith('- '))
      return <ul key={i}>{items.map((item, j) => <li key={j}>{item.slice(2)}</li>)}</ul>
    }
    return <p key={i}>{block.replace(/\*\*/g, '')}</p>
  })

  return (
    <div className="blog-detail">
      {/* Hero */}
      <div className="page-hero" style={{ minHeight: '40vh' }}>
        <div className="page-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '0 1.5rem' }}
          >
            <span style={{ background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '1rem', display: 'inline-block' }}>
              {blog.category}
            </span>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: 'white', maxWidth: '800px', lineHeight: 1.2 }}>
              {blog.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="blog-detail-layout">
          {/* Main */}
          <article aria-labelledby="blog-title">
            <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <Link to="/">Home</Link>
              <span className="breadcrumb-sep" aria-hidden="true">›</span>
              <Link to="/blog">Blog</Link>
              <span className="breadcrumb-sep" aria-hidden="true">›</span>
              <span aria-current="page">{blog.title}</span>
            </nav>

            <div className="blog-detail-hero">
              <img src={blog.image} alt={`Featured image for: ${blog.title}`} />
            </div>

            <AnimatedSection variant="fadeUp">
              <div className="blog-detail-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <img src={blog.authorAvatar} alt="" aria-hidden="true" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{blog.author}</div>
                    <time dateTime={blog.date} style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>📖 {blog.readTime}</span>
                <span style={{ background: 'rgba(255,107,53,0.1)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 600 }}>
                  {blog.category}
                </span>
              </div>

              <h1 id="blog-title" className="blog-detail-title">{blog.title}</h1>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div className="blog-detail-content">
                {contentBlocks}
              </div>

              {/* Video */}
              {blog.video && (
                <div className="blog-video-section">
                  <h3>📹 Video Guide</h3>
                  <video
                    controls
                    poster={blog.videoPoster}
                    aria-label={`Video guide for: ${blog.title}`}
                  >
                    <source src={blog.video} type={blog.video.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Tags */}
              <div className="blog-tags" aria-label="Blog tags">
                {blog.tags.map(tag => (
                  <span key={tag} className="blog-tag">#{tag}</span>
                ))}
              </div>
            </AnimatedSection>

            {/* Share */}
            <AnimatedSection variant="fadeUp" delay={0.15}>
              <div className="share-section">
                <h3>Share This Article</h3>
                <div className="share-buttons">
                  <button className="share-btn" style={{ background: '#1877F2', color: 'white' }} aria-label="Share on Facebook">
                    📘 Facebook
                  </button>
                  <button className="share-btn" style={{ background: '#000', color: 'white' }} aria-label="Share on Twitter/X">
                    🐦 Twitter
                  </button>
                  <button className="share-btn" style={{ background: '#0A66C2', color: 'white' }} aria-label="Share on LinkedIn">
                    💼 LinkedIn
                  </button>
                  <button
                    className="share-btn"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text)', border: '1px solid var(--border)' }}
                    onClick={() => navigator.clipboard?.writeText(window.location.href)}
                    aria-label="Copy link"
                  >
                    🔗 Copy Link
                  </button>
                </div>
              </div>
            </AnimatedSection>

            {/* Author Bio */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
              <div className="author-box" aria-label="About the author">
                <img src={blog.authorAvatar} alt={`Photo of ${blog.author}`} />
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.25rem' }}>About the Author</div>
                  <div className="author-box-name">{blog.author}</div>
                  <p className="author-box-bio">{blog.authorBio || `${blog.author} is a travel writer and photographer specializing in ${blog.category}.`}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Comments */}
            <AnimatedSection variant="fadeUp" delay={0.25}>
              <div className="comments-section">
                <h2>{blog.comments?.length || 0} Comments</h2>
                {blog.comments?.map(c => (
                  <div key={c.id} className="comment-item">
                    <div className="comment-header">
                      <div className="comment-author">{c.author}</div>
                      <time dateTime={c.date} className="comment-date">{new Date(c.date).toLocaleDateString()}</time>
                    </div>
                    <p className="comment-text">{c.text}</p>
                  </div>
                ))}

                {/* Comment Form */}
                <div style={{ marginTop: '2rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                  <h3 style={{ marginBottom: '1.25rem' }}>Leave a Comment</h3>
                  <form onSubmit={e => e.preventDefault()}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label htmlFor="comment-name" style={{ display: 'block', fontWeight: 600, marginBottom: '0.375rem', fontSize: '0.9375rem' }}>Name</label>
                      <input id="comment-name" type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem' }} placeholder="Your name" />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label htmlFor="comment-text" style={{ display: 'block', fontWeight: 600, marginBottom: '0.375rem', fontSize: '0.9375rem' }}>Comment</label>
                      <textarea id="comment-text" rows={4} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem', resize: 'vertical', fontFamily: 'inherit' }} placeholder="Share your thoughts..." />
                    </div>
                    <button type="submit" style={{ padding: '0.75rem 1.5rem', background: 'var(--gradient-primary)', color: 'white', border: 'none', borderRadius: '9999px', fontWeight: 600, cursor: 'pointer' }}>
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
            </AnimatedSection>
          </article>

          {/* Sidebar */}
          <aside aria-label="Blog sidebar">
            {related.length > 0 && (
              <AnimatedSection variant="fadeRight">
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                  <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Related Posts
                  </h3>
                  <div className="related-posts">
                    {related.map(b => (
                      <Link key={b.id} to={`/blog/${b.slug}`} className="related-post-card">
                        <img src={b.image} alt={b.title} loading="lazy" />
                        <div className="related-post-info">{b.title}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection variant="fadeRight" delay={0.1} style={{ marginTop: '1.5rem' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))', borderRadius: 'var(--radius-lg)', padding: '1.75rem', color: 'white', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">✈️</div>
                <h3 style={{ color: 'white', marginBottom: '0.75rem', fontSize: '1.125rem' }}>Ready to Explore?</h3>
                <p style={{ opacity: 0.85, marginBottom: '1.25rem', fontSize: '0.9rem' }}>Turn this inspiration into your next adventure</p>
                <Link to="/destinations" style={{ display: 'inline-block', padding: '0.625rem 1.25rem', background: 'white', color: 'var(--primary)', borderRadius: '9999px', fontWeight: 700, textDecoration: 'none', fontSize: '0.875rem' }}>
                  Browse Destinations
                </Link>
              </div>
            </AnimatedSection>
          </aside>
        </div>
      </div>
    </div>
  )
}
