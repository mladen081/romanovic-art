<template>
  <h1>romanovic art</h1>
  <p v-if="isAdmin">logged in as admin</p>
  <p v-if="isUser">logged in as user</p>

  <div v-if="isUser">
    <div class="gallery-cont">
      <div v-for="(img, index) in images" :key="index" class="gallery-item" @click="openModal(img)">
        <img :src="img.src" :alt="img.alt" />
      </div>
    </div>
  </div>

  <!-- Modal for Enlarged Image -->
  <div v-if="isModalOpen" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <img :src="modalImage.src" :alt="modalImage.alt" />
      <button class="close-btn" @click="closeModal">X</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

// Check login and initialize user role
onMounted(async () => {
  await authStore.checkLogin()
})

const isAdmin = computed(() => authStore.role === 'ROLE_ADMIN')
const isUser = computed(() => authStore.role === 'ROLE_USER')

// List of images for the gallery
const images = [
  { src: '/src/assets/img_2.jpg', alt: '' },
  { src: '/src/assets/img_1.jpg', alt: '' },
  { src: '/src/assets/img_3.jpg', alt: '' },
  { src: '/src/assets/img_3.jpg', alt: '' },
  { src: '/src/assets/img_1.jpg', alt: '' },
  { src: '/src/assets/img_1.jpg', alt: '' },
  { src: '/src/assets/img_1.jpg', alt: '' },
  { src: '/src/assets/img_1.jpg', alt: '' },
  { src: '/src/assets/img_1.jpg', alt: '' },
  { src: '/src/assets/img_1.jpg', alt: '' },
  { src: '/src/assets/img_2.jpg', alt: '' },
  { src: '/src/assets/img_3.jpg', alt: '' },
  { src: '/src/assets/img_1.jpg', alt: '' },
  { src: '/src/assets/img_2.jpg', alt: '' },
]

const isModalOpen = ref(false)
const modalImage = ref({ src: '', alt: '' })

// Function to open the modal with the clicked image
const openModal = (img) => {
  modalImage.value = img
  isModalOpen.value = true
}

// Function to close the modal
const closeModal = () => {
  isModalOpen.value = false
}
</script>

<style scoped>
.gallery-cont {
  margin-top: 1rem;
  padding: 1rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
}

.gallery-item {
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  max-width: 100%;
  max-height: 100%;
  background: transparent;
  padding: 1px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.modal-content img {
  max-width: 60%;
  max-height: auto;
  object-fit: contain;
  border: 2px solid white;
}

.close-btn {
  position: absolute;
  top: 1%;
  right: 20%;
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .gallery-cont {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 767px) {
  .gallery-cont {
    grid-template-columns: 1fr;
  }
}
</style>
