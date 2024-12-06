import axios from 'axios'
import { getToken } from './authService'

const BASE_URL = 'https://utd-stats.onrender.com/api/matches'
// const BASE_URL = 'http://localhost:8080/api/users'

axios.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const getAllMatches = () => axios.get(`${BASE_URL}`)

export const saveMatch = (match) => axios.post(`${BASE_URL}`, match)

export const getMAtch = (id) => axios.get(`${BASE_URL}/${id}`)

export const updateMatch = (id, match) => axios.put(`${BASE_URL}/${id}`, match)

export const deleteMatch = (id) => axios.delete(`${BASE_URL}/${id}`)
