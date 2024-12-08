<template>
  <div class="users-container">
    <h1>delete user</h1>
    <div class="users-grid">
      <div class="grid-header">
        <p>user id</p>
        <p>username</p>
        <p>email</p>
        <p>delete</p>
      </div>
      <div v-for="user in users" :key="user.id" class="user-row">
        <p>{{ user.id }}</p>
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
        <div class="delete-icon">
          <i
            class="fa-regular fa-trash"
            @click="user.id !== 1 && openDeleteModal(user.id)"
            :class="{ disabled: user.id === 1 }"
            style="cursor: pointer; font-size: 2rem"
          ></i>
        </div>
      </div>
    </div>

    <transition name="modal-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="isModalOpen" class="modal">
        <div class="modal-content">
          <label for="admin-password">confirm admin password</label>
          <input
            v-model="adminPassword"
            name="admin-password"
            id="admin-password"
            type="password"
            placeholder="enter password"
          />
          <button @click="confirmPassword">confirm</button>
          <button @click="closeModal">cancel</button>
          <div v-if="loginError" class="error-message">
            <p>wrong password</p>
            <p>check your credentials</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllUsers, deleteUser } from '../services/userService'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const users = ref([])
const isModalOpen = ref(false)
const adminPassword = ref('')
const loginError = ref(false)
const selectedUserId = ref(null)

onMounted(async () => {
  await authStore.checkLogin()
  listUsers()
})

const listUsers = async () => {
  try {
    const response = await getAllUsers()
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const openDeleteModal = (userId) => {
  selectedUserId.value = userId
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  adminPassword.value = ''
  loginError.value = false
}

const confirmPassword = async () => {
  const isPasswordCorrect = await validateAdminPassword(adminPassword.value)

  if (isPasswordCorrect) {
    await removeUser(selectedUserId.value)
    closeModal()
  } else {
    loginError.value = true
  }
}

const validateAdminPassword = async (password) => {
  return password === 'tata'
}

const removeUser = async (userId) => {
  try {
    await deleteUser(userId)
    console.log('Successfully deleted user')
    listUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'scale(0.8)'
}

const enter = (el, done) => {
  el.offsetHeight
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
  el.style.opacity = 1
  el.style.transform = 'scale(1)'
  done()
}

const leave = (el, done) => {
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
  el.style.opacity = 0
  el.style.transform = 'scale(0.8)'
  el.addEventListener('transitionend', done)
}
</script>

<style scoped>
.users-container {
  overflow-x: hidden;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  grid-template-areas: 'username email userId delete';
}

.grid-header {
  display: contents;
  font-weight: bold;
}

.grid-header p {
  margin: 0;
  padding: 10px;
  border-bottom: 2px solid black;
  text-align: center;
}

.user-row {
  display: contents;
}

.user-row p {
  margin: 0;
  padding: 8px;
  border-bottom: 1px solid black;
  text-align: center;
}

.delete-icon {
  text-align: center;
  padding: 10px;
}

.delete-icon i.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.delete-icon i {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.delete-icon i:not(.disabled):hover {
  opacity: 0.7;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 2px;
  width: 300px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@media (max-width: 991px) {
  .users-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      'username'
      'email'
      'userId'
      'delete';
  }
  .grid-header {
    display: none;
  }
}
</style>
