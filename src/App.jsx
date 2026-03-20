import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AppProvider } from './context/AppContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Gallery from './pages/Gallery'
import Testimonials from './pages/Testimonials'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Services from './pages/Services'
import FAQ from './pages/FAQ'

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
      <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🗺️</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Looks like this destination doesn't exist on our map.
      </p>
      <a href="/" style={{ padding: '0.75rem 2rem', background: 'var(--gradient-primary)', color: 'white', borderRadius: '9999px', textDecoration: 'none', fontWeight: 600 }}>
        Back to Home
      </a>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="destinations" element={<Destinations />} />
              <Route path="destinations/:id" element={<DestinationDetail />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="services" element={<Services />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  )
}
