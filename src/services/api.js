const API_BASE = '/api'

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export async function getDestinations(filters = {}) {
  const params = new URLSearchParams()
  if (filters.continent) params.append('continent', filters.continent)
  if (filters.category) params.append('category', filters.category)
  if (filters.featured !== undefined) params.append('featured', filters.featured)

  const url = `${API_BASE}/destinations${params.toString() ? '?' + params.toString() : ''}`
  const response = await fetch(url)
  return handleResponse(response)
}

export async function getDestination(id) {
  const response = await fetch(`${API_BASE}/destinations/${id}`)
  return handleResponse(response)
}

export async function getBlogs(filters = {}) {
  const params = new URLSearchParams()
  if (filters.category) params.append('category', filters.category)

  const url = `${API_BASE}/blogs${params.toString() ? '?' + params.toString() : ''}`
  const response = await fetch(url)
  return handleResponse(response)
}

export async function getBlog(id) {
  const response = await fetch(`${API_BASE}/blogs/${id}`)
  return handleResponse(response)
}

export async function getTestimonials() {
  const response = await fetch(`${API_BASE}/testimonials`)
  return handleResponse(response)
}

export async function createBooking(data) {
  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, id: Date.now(), createdAt: new Date().toISOString() })
  })
  return handleResponse(response)
}

export async function getBookings() {
  const response = await fetch(`${API_BASE}/bookings`)
  return handleResponse(response)
}

export async function getServices() {
  const response = await fetch(`${API_BASE}/services`)
  return handleResponse(response)
}

export async function updateDestinationImage(id, imageUrl) {
  const response = await fetch(`${API_BASE}/destinations/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ heroImage: imageUrl })
  })
  return handleResponse(response)
}
