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
      </div>
    </div>
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
}

const confirmPassword = async () => {
  const isPasswordCorrect = await validateAdminPassword(adminPassword.value)

  if (isPasswordCorrect) {
    await removeMatch(selectedMatchId.value)
    closeModal()
  } else {
    alert('Incorrect password!')
  }
}

const validateAdminPassword = async (password) => {
  return password === 'tata'
}

const removeMatch = async (matchId) => {
  try {
    await deleteMatch(matchId)
    console.log('successfully deleted match')
    listMatches()
  } catch (error) {
    console.error('error deleting match:', error)
  }
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
