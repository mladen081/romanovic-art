import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import AdminView from '@/views/AdminView.vue'
import MatchesView from '@/views/MatchesView.vue'
import GalleryComponent from '@/components/GalleryComponent.vue'
import { useAuthStore } from '../stores/authStore'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginComponent },
  { path: '/register', component: RegisterComponent },
  {
    path: '/delete-user',
    component: AdminView,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      authStore.checkLogin()
      return authStore.role === 'ROLE_ADMIN' ? next() : next('/')
    },
  },

  {
    path: '/matches',
    component: MatchesView,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      authStore.checkLogin()
      return authStore.role === 'ROLE_ADMIN' ? next() : next('/')
    },
  },

  {
    path: '/gallery/:category',
    component: GalleryComponent,
    props: true,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      authStore.checkLogin()
      return authStore.role === 'ROLE_USER' ? next() : next('/')
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
