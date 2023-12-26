<template>
  <div class="app">
    <MainNav />
    <router-view />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav.vue'
export default {
  name: 'App',
  components: {
    MainNav
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
}
</style>
