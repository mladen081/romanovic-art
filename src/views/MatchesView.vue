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
            @click="removeMatch(match.id)"
            style="cursor: pointer; font-size: 2rem"
          ></i>
        </div>
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

const removeMatch = async (matchId) => {
  try {
    await deleteMatch(matchId)
    console.log('successfully deleted match')
    listMatches()
  } catch (error) {
    console.error('Error deleting match:', error)
  }
}
</script>

<style scoped>
.matches-container {
  padding: 20px;
  overflow-x: hidden; /* Sprečava horizontalno pomeranje */
}

.matches-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 kolona za svaki detalj meča */
  gap: 10px;
  grid-template-areas: 'opponents attendance date ha result scorers position delete';
  border-collapse: collapse;
  box-sizing: border-box; /* Uključuje padding i border u ukupnu širinu i visinu */
}

.grid-header {
  display: contents; /* Ovo omogućava da radi kao zaglavlje tabele */
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

/* Media query za ekrane ispod 767px (još manji ekran) */
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
