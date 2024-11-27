<template>
  <div class="gallery-cont">
    <div v-for="(img, index) in images" :key="index" class="gallery-item" @click="openModal(img)">
      <img :src="img.src" :alt="img.alt" />
    </div>
  </div>

  <div v-if="isModalOpen" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <img :src="modalImage.src" :alt="modalImage.alt" />
      <button class="close-btn" @click="closeModal">X</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const images = [
  // { src: '/src/assets/n_001.jpg', alt: '' },
  { src: '/src/assets/n_002.jpg', alt: '' },
  { src: '/src/assets/n_003.jpg', alt: '' },
  { src: '/src/assets/n_004.jpg', alt: '' },
  { src: '/src/assets/n_005.jpg', alt: '' },
  { src: '/src/assets/n_006.jpg', alt: '' },
  { src: '/src/assets/n_007.jpg', alt: '' },
  { src: '/src/assets/n_008.jpg', alt: '' },
]

const isModalOpen = ref(false)
const modalImage = ref({ src: '', alt: '' })

const openModal = (img) => {
  modalImage.value = img
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<style scoped>
.gallery-cont {
  margin-top: 1rem;
  padding: 1rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
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
  max-height: 50rem;
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
  max-width: 45%;
  max-height: auto;
  object-fit: contain;
  border: 2px solid white;
}

.close-btn {
  position: absolute;
  top: 1%;
  right: 27%;
  font-size: 2rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .gallery-cont {
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  }
}

@media (max-width: 767px) {
  .gallery-cont {
    grid-template-columns: 1fr;
  }
}
</style>
