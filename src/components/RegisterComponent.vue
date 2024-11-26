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
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="correct horse battery staple"
        />
        <button type="submit">submit</button>
      </form>
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
    const handleRegistrationForm = async () => {
      try {
        await registerAPICall({
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value,
        })
        // Handle successful registration
        console.log('USPESNA REGISTRACIJA')
        await authStore.login(username.value, password.value)
        router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
    return { name, username, email, password, handleRegistrationForm }
  },
}
</script>

<style scoped></style>
