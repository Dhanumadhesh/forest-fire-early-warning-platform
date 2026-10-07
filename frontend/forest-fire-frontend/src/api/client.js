import axios from 'axios'

// Central Axios client for the Forest Fire Early Warning & Ranger Dispatch backend.
// All API service modules import this client instead of creating their own instance.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Normalizes errors so UI components can rely on a consistent shape:
// { message, isNetworkError, status }
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isNetworkError = !error.response
    const status = error.response?.status
    const backendMessage =
      error.response?.data?.message || error.response?.data?.error || null

    const message = isNetworkError
      ? 'Unable to connect to the backend. Please make sure Spring Boot is running on port 8080.'
      : backendMessage || `Request failed (${status}). Please try again.`

    return Promise.reject({ message, isNetworkError, status, raw: error })
  }
)

export default apiClient
