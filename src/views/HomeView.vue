<template>
  <h1>romanovic art</h1>
  <p v-if="isAdmin">logged in as admin</p>
  <p v-if="isUser">logged in as {{ user }}</p>

  <div v-if="isUser">
    <gallery-component />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import GalleryComponent from '@/components/GalleryComponent.vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.checkLogin()
})

const isAdmin = computed(() => authStore.role === 'ROLE_ADMIN')
const isUser = computed(() => authStore.role === 'ROLE_USER')

const user = authStore.user
</script>

<style scoped></style>
