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
  padding: 7rem 1rem;
}

/* Typography */

h1 {
  font-size: 4rem;
  margin: 2rem 0;
  text-align: center;
}

p {
  font-size: 1.4rem;
}

@media (max-width: 991px) {
  h1 {
    font-size: 3.5rem;
  }
}

@media (max-width: 767px) {
  h1 {
    font-size: 3rem;
  }
}
</style>
