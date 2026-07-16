import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.params = { ...config.params, _t: Date.now() }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 429) {
      error.response.data = { message: 'Muitas tentativas. Aguarde alguns minutos.' }
    }
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api