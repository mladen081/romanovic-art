<template>
  <h1>romanovic art</h1>
  <p v-if="isAdmin">logged in as admin</p>
  <p v-if="isUser">logged in as {{ user }}</p>

  <div class="slide" v-if="isUser">
    <p class="slide-text">welcome</p>

    <p class="slide-text-r">more or less</p>

    <p class="slide-text">than</p>

    <p class="slide-text-r">art</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.checkLogin()
})

const isAdmin = computed(() => authStore.role === 'ROLE_ADMIN')
const isUser = computed(() => authStore.role === 'ROLE_USER')

const user = authStore.user
</script>

<style scoped>
.slide {
  margin: 5rem 0;
  width: 300px;
}

.slide-text {
  position: relative;
  animation: slide-l 5s ease-out forwards;
}

.slide-text-r {
  position: relative;
  animation: slide-r 5s ease-out forwards;
}

@keyframes slide-l {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-r {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
