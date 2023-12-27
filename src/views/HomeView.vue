<template>
  <div class="pagecontent">
    <main class="main">
      <div class="text-box">
        <div class="home-header">
          <h1 class="heading-primary">
            <span class="heading-primary-main">Romanovic</span
            ><span class="heading-primary-sub">Art</span>
          </h1>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  mame: 'HomeView'
}
</script>

<style scoped>
.text-box {
  height: 500px;
  background-color: teal;
}

.heading-primary {
  color: #000;
  text-transform: uppercase;
  text-align: center;
}

.heading-primary-main {
  display: block;
  font-size: 4rem;
  font-weight: 400;
}
.heading-primary-sub {
  display: block;
  font-size: 3rem;
  font-weight: 400;
}
</style>
