<template>
  <div>
    <h1>register</h1>
    <div>
      <form @submit.prevent="handleRegistrationForm">
        <label for="name">name</label>
        <input v-model="name" type="text" id="name" placeholder="enter name" />
        <label for="username">username</label>
        <input v-model="username" type="text" id="username" placeholder="your username" />
        <label for="email">email</label>
        <input v-model="email" type="text" id="email" placeholder="your email" />
        <label for="password">password</label>
        <input v-model="password" type="password" id="password" placeholder="your password" />
        <button type="submit">submit</button>
      </form>
    </div>

    <!-- Loader -->
    <div v-if="isLoading" class="loader">
      <div class="loader__element"></div>
      <div class="loader__element"></div>
      <div class="loader__element"></div>
    </div>

    <!-- Error message -->
    <div v-if="registerError" class="error-message">
      <p>Registration failed</p>
      <p>Please try again later.</p>
    </div>

    <div class="register">
      <p>already have an account?</p>
      <p><router-link class="register-link" to="/login#">sign in</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { registerAPICall } from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const name = ref('')
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const registerError = ref(false)

    const handleRegistrationForm = async () => {
      isLoading.value = true
      registerError.value = false
      try {
        await registerAPICall({
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value,
        })
        console.log('successful registration')
        await authStore.login(username.value, password.value)
        router.push('/')
      } catch (error) {
        registerError.value = true
        console.error(error)
      } finally {
        isLoading.value = false
      }
    }
    return { name, username, email, password, isLoading, registerError, handleRegistrationForm }
  },
}
</script>

<style scoped></style>
