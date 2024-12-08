<template>
  <div class="matches-container">
    <h1>matches</h1>
    <div class="matches-grid">
      <div class="grid-header">
        <p>opponents</p>
        <p>attendance</p>
        <p>date</p>
        <p>ha</p>
        <p>result</p>
        <p>scorers</p>
        <p>position</p>
        <p>delete</p>
      </div>
      <div v-for="match in matches" :key="match.id" class="match-row">
        <p>{{ match.opponents }}</p>
        <p>{{ match.attendance }}</p>
        <p>{{ match.date }}</p>
        <p>{{ match.ha }}</p>
        <p>{{ match.result }}</p>
        <p>{{ match.scorers }}</p>
        <p>{{ match.position }}</p>
        <div v-if="isAdmin" class="delete-icon">
          <i
            class="fa-regular fa-trash"
            @click="openDeleteModal(match.id)"
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
import { ref, computed, onMounted } from 'vue'
import { getAllMatches, deleteMatch } from '../services/matchService'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const matches = ref([])
const isModalOpen = ref(false)
const adminPassword = ref('')
const loginError = ref(false)
const selectedMatchId = ref(null)

onMounted(async () => {
  await authStore.checkLogin()
  listMatches()
})

const isAdmin = computed(() => authStore.role === 'ROLE_ADMIN')

const listMatches = async () => {
  try {
    const response = await getAllMatches()
    matches.value = response.data
  } catch (error) {
    console.error('Error fetching matches:', error)
  }
}

const openDeleteModal = (matchId) => {
  selectedMatchId.value = matchId
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  adminPassword.value = ''
  loginError.value = false // Reset the error message when modal is closed
}

const confirmPassword = async () => {
  const isPasswordCorrect = await validateAdminPassword(adminPassword.value)

  if (isPasswordCorrect) {
    await removeMatch(selectedMatchId.value)
    closeModal()
  } else {
    loginError.value = true // Show error message if password is incorrect
  }
}

const validateAdminPassword = async (password) => {
  return password === 'tata' // Example of a hardcoded password check
}

const removeMatch = async (matchId) => {
  try {
    await deleteMatch(matchId)
    console.log('Successfully deleted match')
    listMatches()
  } catch (error) {
    console.error('Error deleting match:', error)
  }
}

// Transition hooks
const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'scale(0.8)'
}

const enter = (el, done) => {
  el.offsetHeight // Trigger reflow to restart transition
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
.matches-container {
  overflow-x: hidden;
}

.matches-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  grid-template-areas: 'opponents attendance date ha result scorers position delete';
}

.grid-header {
  display: contents;
  font-weight: bold;
}

.grid-header p {
  margin: 0;
  padding: 10px;
  border-bottom: 2px solid black;
}

.match-row {
  display: contents;
}

.match-row p {
  margin: 0;
  padding: 8px;
  border-bottom: 1px solid black;
}

.delete-icon {
  text-align: center;
  padding: 10px;
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

/* Transition animation */
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

/* Mobile responsiveness */
@media (max-width: 991px) {
  .matches-grid {
    grid-template-columns: 1fr; /* 1 kolona za najmanje ekrane */
    grid-template-areas:
      'opponents'
      'attendance'
      'date'
      'ha'
      'result'
      'scorers'
      'position'
      'delete';
  }
  .grid-header {
    display: none;
  }
}
</style>
