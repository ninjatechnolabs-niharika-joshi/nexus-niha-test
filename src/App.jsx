import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AppProvider } from './context/AppContext'
import Layout from './components/layout/Layout'

// Pages
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
import Booking from './pages/Booking'
import Dashboard from './pages/Dashboard'
import Accessibility from './pages/Accessibility'
import TravelDocs from './pages/TravelDocs'
import NotFound from './pages/NotFound'

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
              <Route path="booking" element={<Booking />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="accessibility" element={<Accessibility />} />
              <Route path="documents" element={<TravelDocs />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  )
}
