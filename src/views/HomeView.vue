<template>
  <div class="pagecontent">
    <top-header class="a" heading-primary-main-name="Romanovic" />
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue'
export default {
  name: 'HomeView',
  components: {
    TopHeader
  }
}
</script>

<style scoped>
.a::before {
  content: '';
  background-image: url('@/assets/hero_1.jpg');
  background-size: cover;
  background-position: top center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.4;
  background-color: #fff;
}
</style>
