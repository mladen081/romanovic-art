<template>
  <div>
    <h1>login</h1>
    <div>
      <form @submit.prevent="handleLoginForm">
        <label for="username">email or username</label>
        <input v-model="username" type="text" id="username" placeholder="your email or username" />
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
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const authStore = useAuthStore()
    const router = useRouter()
    const handleLoginForm = async () => {
      await authStore.login(username.value, password.value)
      router.push('/')
    }
    return { username, password, handleLoginForm }
  },
}
</script>
<style scoped></style>
