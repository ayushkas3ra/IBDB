import api from './axios'
import axios from 'axios'

export async function registerUser(userData) {
  const response = await api.post('/accounts/register/', userData)
  return response.data
}

export async function login(credentials) {
  const response = await api.post('/token/', credentials)
  return response.data
}

export async function getMe() {
  const response = await api.get('/accounts/me/')
  return response.data
}

export function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
}

// export async function refreshAccessToken() {
//   const refreshToken = localStorage.getItem('refresh')
//   const response = await axios.post(
//     'http://127.0.0.1:8000/api/token/refresh/',
//     {
//       refresh: refreshToken,
//     }
//   )
//   localStorage.setItem('access', response.data.access)
//   return response.data.access
// }

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh')

  console.log('Refreshing token...')

  const response = await axios.post(
    'http://127.0.0.1:8000/api/token/refresh/',
    {
      refresh: refreshToken,
    }
  )

  console.log(response.data)

  localStorage.setItem('access', response.data.access)

  return response.data.access
}
