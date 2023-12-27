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

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

body {
  font-family: 'Raleway', sans-serif;
  box-sizing: border-box;
}

.pagecontent {
  padding: 7.5rem 0;
}

/* Typography */

p {
  font-size: 1.4rem;
}
</style>
