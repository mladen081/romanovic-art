<template>
  <h1>welcome</h1>
  <p v-if="isAdmin">logged in as admin</p>

  <div class="slide" v-if="isUser">
    <p class="slide-text">natalija</p>
    <p class="slide-text-r">nikola</p>
    <p class="slide-text">milomir</p>
    <p class="slide-text-r red-text">romanovic</p>
  </div>

  <div class="container">
    <div class="line vertical first"></div>
    <div class="line horizontal"></div>
    <div class="line vertical second"></div>
    <div class="line horizontal third-left"></div>
  </div>

  <div class="container">
    <div class="line vertical first"></div>
    <div class="line horizontal"></div>
    <div class="line vertical second"></div>
    <div class="line horizontal third-left"></div>
  </div>
  <div class="container">
    <div class="line vertical first"></div>
    <div class="line horizontal"></div>
    <div class="line vertical second"></div>
    <div class="line horizontal third-left"></div>
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
  color: red;
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

.container {
  margin: 0 auto 0 auto;
  position: relative;
  width: 100px;
  height: 200px;
}

.line {
  position: absolute;
  background-color: black;
  opacity: 0;
}

.vertical {
  width: 1px;
  height: 0;
}

.horizontal {
  width: 0;
  height: 1px;
  top: 100px;
  left: 0;
}

@keyframes verticalDraw {
  0% {
    opacity: 0;
    height: 0;
  }
  100% {
    opacity: 1;
    height: 100px;
  }
}

@keyframes horizontalDraw {
  0% {
    opacity: 0;
    width: 0;
  }
  100% {
    opacity: 1;
    width: 100px;
  }
}

.first {
  animation: verticalDraw 5s forwards;
  animation-delay: 0s;
}

.horizontal {
  animation: horizontalDraw 5s forwards;
  animation-delay: 1s;
}

.second {
  animation: verticalDraw 5s forwards;
  animation-delay: 1s;
  left: 100px;
  top: 100px;
}

.third {
  animation: horizontalDraw 5s forwards;
  animation-delay: 1s;
  top: 200px;
  left: 100px;
}

.third-left {
  animation: horizontalDraw 5s forwards;
  animation-delay: 1s;
  top: 200px;
  left: 0;
}

@media (max-width: 767px) {
  .slide {
    width: 150px;
  }
}
</style>
