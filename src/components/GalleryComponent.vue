<template>
  <div>
    <h1>gallery</h1>
    <div class="filter-buttons">
      <button
        :class="{ active: selectedCategory === 'natalija' }"
        @click="changeCategory('natalija')"
      >
        n
      </button>
      <button :class="{ active: selectedCategory === 'nikola' }" @click="changeCategory('nikola')">
        n
      </button>
      <button
        :class="{ active: selectedCategory === 'milomir' }"
        @click="changeCategory('milomir')"
      >
        m
      </button>
    </div>

    <div class="gallery-cont">
      <div
        v-for="(img, index) in filteredImages"
        :key="index"
        class="gallery-item"
        @click="openModal(img)"
      >
        <img :src="img.src" :alt="img.alt" />
      </div>
    </div>

    <transition name="modal-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="isModalOpen" class="modal" @click="closeModal">
        <div class="modal-content" @click.stop>
          <img :src="modalImage.src" :alt="modalImage.alt" />
          <button class="close-btn" @click="closeModal">X</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const images = [
  { src: '/src/assets/n_002.jpg', alt: '', category: 'natalija' },
  { src: '/src/assets/n_004.jpg', alt: '', category: 'natalija' },
  { src: '/src/assets/n_003.jpg', alt: '', category: 'natalija' },
  { src: '/src/assets/n_006.jpg', alt: '', category: 'natalija' },
  { src: '/src/assets/n_007.jpg', alt: '', category: 'natalija' },
  { src: '/src/assets/n_005.jpg', alt: '', category: 'natalija' },
  { src: '/src/assets/img_2.jpg', alt: '', category: 'nikola' },
  { src: '/src/assets/img_3.jpg', alt: '', category: 'nikola' },
  { src: '/src/assets/img_1.jpg', alt: '', category: 'milomir' },
]

const isModalOpen = ref(false)
const modalImage = ref({ src: '', alt: '' })
const route = useRoute()
const router = useRouter()

const selectedCategory = ref(route.params.category)

const openModal = (img) => {
  modalImage.value = img
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const changeCategory = (category) => {
  if (selectedCategory.value !== category) {
    router.push(`/gallery/${category}`)
  }
}

const filteredImages = computed(() => {
  return images.filter((img) => img.category === selectedCategory.value)
})

watch(
  () => route.params.category,
  (newCategory) => {
    selectedCategory.value = newCategory
  },
)

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
})

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
button {
  border-top: none;
  border-right: none;
  border-left: none;
  cursor: pointer;
  padding: 0.5rem;
}

.gallery-cont {
  margin-top: 1rem;
  padding: 1rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 4rem;
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
  border-radius: 0.1rem;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.filter-buttons {
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: left;
}

.filter-buttons button.active {
  color: #cb0000;
  border-color: #cb0000;
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
  height: auto;
  object-fit: contain;
  border: 3px solid white;
}

.close-btn {
  position: absolute;
  top: 1%;
  right: 28%;
  font-size: 2rem;
  background: none;
  border: none;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
  -webkit-text-stroke: 1px black;
  cursor: pointer;
  font-weight: 700;
}

.close-btn:hover,
.close-btn:focus {
  color: black;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 1);
  -webkit-text-stroke: 1px white;
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

  .modal-content img {
    max-width: 80%;
  }

  .close-btn {
    right: 10%;
  }
}
</style>
