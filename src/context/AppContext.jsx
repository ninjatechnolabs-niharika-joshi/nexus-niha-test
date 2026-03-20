import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    continent: '',
    category: '',
    priceRange: [0, 10000],
    rating: 0
  })
  const [bookingData, setBookingData] = useState({
    destination: null,
    travelers: { adults: 2, children: 0 },
    dates: { checkIn: '', checkOut: '' },
    contactInfo: { name: '', email: '', phone: '' }
  })
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist') || '[]')
    } catch {
      return []
    }
  })
  const [notifications, setNotifications] = useState([])

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({ continent: '', category: '', priceRange: [0, 10000], rating: 0 })
  }, [])

  const addToWishlist = useCallback((destination) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === destination.id)
      if (exists) return prev
      const updated = [...prev, destination]
      try {
        localStorage.setItem('wishlist', JSON.stringify(updated))
      } catch {}
      return updated
    })
    addNotification({ type: 'success', message: `${destination.name} added to wishlist!` })
  }, [])

  const removeFromWishlist = useCallback((destinationId) => {
    setWishlist(prev => {
      const updated = prev.filter(item => item.id !== destinationId)
      try {
        localStorage.setItem('wishlist', JSON.stringify(updated))
      } catch {}
      return updated
    })
  }, [])

  const isInWishlist = useCallback((destinationId) => {
    return wishlist.some(item => item.id === destinationId)
  }, [wishlist])

  const addNotification = useCallback((notification) => {
    const id = Date.now()
    const newNotif = { id, ...notification }
    setNotifications(prev => [...prev, newNotif])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 4000)
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const updateBookingData = useCallback((data) => {
    setBookingData(prev => ({ ...prev, ...data }))
  }, [])

  const value = {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilters,
    resetFilters,
    bookingData,
    updateBookingData,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    notifications,
    addNotification,
    removeNotification
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
