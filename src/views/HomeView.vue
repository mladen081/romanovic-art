<template>
  <h1>welcome</h1>
  <p v-if="isAdmin">logged in as admin</p>

  <div class="slide" v-if="isUser">
    <p class="slide-text">natalija</p>
    <p class="slide-text-r">nikola</p>
    <p class="slide-text">milomir</p>
    <p class="slide-text-r red-text">romanovic</p>
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

.red-text {
  color: #cb0000;
  margin-top: 2rem;
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

@media (max-width: 767px) {
  .slide {
    width: 150px;
  }
}
</style>
