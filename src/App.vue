<template>
  <header>
    <ul>
      <li>
        <router-link exact-active-class="active-tab" to="/">home</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link exact-active-class="active-tab" to="/delete-user">admin</router-link>
      </li>
      <li v-if="!isAuth">
        <router-link exact-active-class="active-tab" to="/register">register</router-link>
      </li>
      <li v-if="!isAuth">
        <router-link exact-active-class="active-tab" to="/login">login</router-link>
      </li>
      <li v-if="isAuth">
        <router-link @click="handleLogout" to="#">logout</router-link>
      </li>
    </ul>
  </header>
  <main>
    <RouterView />
  </main>
  <footer><p>dev by mj & up</p></footer>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isAuth = computed(() => !!authStore.user)

const isAdmin = computed(() => authStore.role === 'ROLE_ADMIN')

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style>
header ul li .active-tab {
  border-bottom: 1px solid black;
  padding-bottom: 1px;
}
</style>
