<template>
  <div>
    <h1>login</h1>
    <div>
      <form @submit.prevent="handleLoginForm">
        <label for="username">email or username</label>
        <input
          v-model="username"
          type="text"
          id="username"
          placeholder="your test email or username"
        />
        <label for="password">password</label>
        <input v-model="password" type="password" id="password" placeholder="your test password" />
        <button type="submit">submit</button>
      </form>
    </div>

    <div v-if="isLoading" class="loader">
      <div class="loader__element"></div>
      <div class="loader__element"></div>
      <div class="loader__element"></div>
    </div>

    <div v-if="loginError" class="error-message">
      <p>login failed</p>
      <p>check your credentials</p>
    </div>

    <div class="register">
      <p>don't have an account yet?</p>
      <p>please <router-link class="register-link" to="/register">register</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const loginError = ref(false)
    const authStore = useAuthStore()
    const router = useRouter()

    const handleLoginForm = async () => {
      isLoading.value = true
      loginError.value = false
      try {
        const success = await authStore.login(username.value, password.value)
        if (success) {
          router.push('/')
        } else {
          loginError.value = true
        }
      } catch (error) {
        loginError.value = true
        console.error(error)
      } finally {
        isLoading.value = false
      }
    }

    return { username, password, handleLoginForm, isLoading, loginError }
  },
}
</script>

<style scoped>
.loader {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader__element {
  border-radius: 50%;
  border: 3px solid #cb0000;
  margin: 0 5px;
  width: 20px;
  height: 20px;
  animation: preloader 0.6s ease-in-out infinite alternate;
}

.loader__element:nth-child(1) {
  animation-delay: 0s;
}
.loader__element:nth-child(2) {
  animation-delay: 0.2s;
}
.loader__element:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes preloader {
  100% {
    transform: scale(1.5);
  }
}

.error-message p {
  color: #cb0000;
}

.register {
  margin-top: 5rem;
}

.register-link {
  text-decoration: underline;
}

/* @media (max-width: 1024px) {
  .loader {
    top: 80%;
  }
} */
</style>
