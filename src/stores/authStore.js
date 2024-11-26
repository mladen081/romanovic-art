import { defineStore } from 'pinia'
import {
  loginAPICall,
  storeToken,
  saveLoggedInUser,
  logout as logoutService,
} from '../services/authService.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null, // Load token from localStorage if available
    user: localStorage.getItem('user') || null, // Load user from localStorage if available
    role: localStorage.getItem('role') || null, // Load role from localStorage if available
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await loginAPICall(username, password)
        this.token = 'Bearer ' + response.data.accessToken
        storeToken(this.token) // Store the token wherever it's required
        saveLoggedInUser(username, response.data.role)
        this.user = username
        this.role = response.data.role

        // Persist login info in localStorage
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', this.user)
        localStorage.setItem('role', this.role)
      } catch (error) {
        // Check if the error is an AxiosError and has a response
        if (error.response) {
          // Check the status code and log a custom message
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
      logoutService()
      this.token = null
      this.user = null
      this.role = null

      // Clear login info from localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('role')
    },
    checkLogin() {
      if (this.token) {
        // Check if the token is available, then reload user and role info
        this.user = localStorage.getItem('user')
        this.role = localStorage.getItem('role')
      } else {
        this.user = null
        this.role = null
      }
    },
  },
})
