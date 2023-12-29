<template>
  <div class="top-header">
    <h1 class="heading-primary">
      <span class="heading-primary-main">{{ headingPrimaryMainName }}</span
      ><span class="heading-primary-sub">Art</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'TopHeader',
  props: {
    headingPrimaryMainName: {
      type: String,
      default: 'Artist Name'
    }
  }
}
</script>

<style scoped>
.top-header {
  height: 60vh;
  background-color: #fff;
  position: relative;
  border-bottom: 2px solid #008080;
}

.heading-primary {
  color: #008080;
  text-transform: uppercase;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.heading-primary-main {
  display: block;
  font-size: 6rem;
  font-weight: 400;
}
.heading-primary-sub {
  display: block;
  font-size: 4rem;
  font-weight: 400;
}

@media (max-width: 1200px) {
  .heading-primary-main {
    font-size: 4rem;
  }
  .heading-primary-sub {
    font-size: 2rem;
  }
}
</style>
