import axios from 'axios'
import { logout, refreshAccessToken } from './auth'

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL || 'http://127.0.0.1:8000/api',
})

// interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// refreshing access token
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/token/')
    ) {
      originalRequest._retry = true
      try {
        await refreshAccessToken()
        return api(originalRequest)
      } catch (error) {
        logout()
        window.location.href = '/signin'
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default api
