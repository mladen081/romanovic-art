import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import SecondPageView from '@/views/SecondPageView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/second',
    name: 'SecondPage',
    component: SecondPageView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
