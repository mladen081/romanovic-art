import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MilomirView from '@/views/MilomirView.vue'
import NatalijaView from '@/views/NatalijaView.vue'
import NikolaView from '@/views/NikolaView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/milomir',
    name: 'Milomir',
    component: MilomirView
  },

  {
    path: '/natalija',
    name: 'Natalija',
    component: NatalijaView
  },
  {
    path: '/nikola',
    name: 'Nikola',
    component: NikolaView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
