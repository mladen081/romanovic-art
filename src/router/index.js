import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import HomeView from '../views/HomeView.vue'
import AdminView from '@/views/AdminView.vue'
import { useAuthStore } from '../stores/authStore'
const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginComponent },
  { path: '/register', component: RegisterComponent },

  {
    path: '/delete-user',
    component: AdminView,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore() // Access the auth store
      authStore.checkLogin() // Ensure we check login status
      return authStore.role === 'ROLE_ADMIN' ? next() : next('/')
    },
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
