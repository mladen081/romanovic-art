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

<style scoped></style>
