<template>
  <div>
    <h1>delete user</h1>
    <div v-for="user in users" :key="user.id">
      <div>
        <p>user name: {{ user.name }}</p>
      </div>
      <div>
        <p>user email: {{ user.email }}</p>
      </div>
      <div>
        <p>user id: {{ user.id }}</p>
      </div>
      <br />
      <div>
        <i
          v-if="isAdmin && user.id !== 1"
          class="fa-regular fa-trash"
          @click="removeUser(user.id)"
          style="cursor: pointer; font-size: 2rem"
        ></i>
      </div>
      <br /><br /><br />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAllUsers, deleteUser } from '../services/userService'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const users = ref([])

onMounted(async () => {
  await authStore.checkLogin()
  listUsers()
})

const isAdmin = computed(() => authStore.role === 'ROLE_ADMIN')

const listUsers = async () => {
  try {
    const response = await getAllUsers()
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const removeUser = async (userId) => {
  try {
    await deleteUser(userId)
    console.log('successfully deleted user')
    listUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}
</script>
