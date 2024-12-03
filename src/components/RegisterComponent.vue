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
      <p><router-link class="register-link" to="/login">sign in</router-link></p>
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

<style scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader__element {
  border-radius: 50%;
  border: 1px solid #cb0000;
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
  margin-top: 4rem;
}

.register-link {
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .loader {
    top: 80%;
  }
}
</style>
