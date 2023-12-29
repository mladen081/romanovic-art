import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import NatalijaView from '@/views/NatalijaView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/natalija',
    name: 'Natalija',
    component: NatalijaView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
