import { defineStore } from 'pinia'
import { loginAPICall } from '../services/authService.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null,
    role: localStorage.getItem('role') || null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await loginAPICall(username, password)
        this.token = 'Bearer ' + response.data.accessToken
        this.user = username
        this.role = response.data.role

        localStorage.setItem('token', this.token)
        localStorage.setItem('user', this.user)
        localStorage.setItem('role', this.role)
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              console.error('Invalid credentials, please try again.')
              break
            case 401:
              console.error('Unauthorized access, please log in again.')
              break
            case 404:
              console.error('API endpoint not found.')
              break
            default:
              console.error('An unexpected error occurred: ', error.response.data.message)
          }
        } else if (error.request) {
          console.error('No response received from the server.')
        } else {
          console.error('Error occurred while setting up the request:', error.message)
        }
      }
    },
    logout() {
      this.token = null
      this.user = null
      this.role = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('role')
    },
    checkLogin() {
      if (this.token) {
        this.user = localStorage.getItem('user')
        this.role = localStorage.getItem('role')
      } else {
        this.user = null
        this.role = null
      }
    },
  },
})
