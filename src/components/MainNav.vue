<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav>
      <div class="branding">
        <img src="@/assets/logo.png" alt="Nav logo" />
      </div>
      <ul v-show="!mobile" class="navigation">
        <li><router-link class="link" :to="{ name: 'Home' }">Home</router-link></li>
        <li><router-link class="link" :to="{ name: 'SecondPage' }">Second</router-link></li>
      </ul>
      <div class="icon">
        <i
          v-show="mobile"
          class="far fa-bars"
          :class="{ 'icon-active': mobileNav }"
          @click="toggleMobileNav"
        ></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li><router-link class="link" :to="{ name: 'Home' }">Home</router-link></li>
          <li><router-link class="link" :to="{ name: 'SecondPage' }">Second</router-link></li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainNav',
  data() {
    return {
      scrolledNav: null,
      mobile: null,
      mobileNav: null,
      windowWith: null
    }
  },
  created() {
    window.addEventListener('resize', this.checkScrean)
    this.checkScrean()
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },

    updateScroll() {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50) {
        this.scrolledNav = true
        return
      }
      this.scrolledNav = false
      return
    },

    checkScrean() {
      this.windowWith = window.innerWidth
      if (this.windowWith <= 767) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
      return
    }
  }
}
</script>

<style scoped>
header {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: #fff;
}

header nav {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 12px 0;
  transition: 0.5s ease all;
  width: 90%;
  margin: 0 auto;
}

header nav ul,
header nav ul .link {
  font-weight: 500;
  color: #fff;
  list-style: none;
  text-decoration: none;
}

header nav ul li {
  text-transform: uppercase;
  padding: 16px;
  margin-left: 16px;
}

header nav ul li .link {
  font-size: 14px;
  transition: 0.5s ease all;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
}

header nav ul li .link:hover {
  color: #00afea;
  border-color: #00afea;
}

header nav .branding {
  display: flex;
  align-items: center;
}

header nav .branding img {
  width: 50px;
  transition: 0.5s ease all;
}

header nav .navigation {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

header nav .icon {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 24px;
  height: 100%;
}

header nav .icon i {
  cursor: pointer;
  font-size: 24px;
  transition: 0.8s ease all;
}

header nav .icon-active {
  transform: rotate(180deg);
}

header nav .dropdown-nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  max-width: 250px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  top: 0%;
  left: 0;
}

header nav .dropdown-nav li {
  margin-left: 0;
}
header nav .dropdown-nav li .link {
  color: #fff;
}

header nav .mobile-nav-enter-active,
header nav .mobile-nav-leave-active {
  transition: 1s ease all;
}

header nav .mobile-nav-enter-from,
header nav .mobile-nav-leave-to {
  transform: translateX(-250px);
}

header nav .mobile-nav-enter-to {
  transform: translateX(0);
}

.scrolled-nav {
  background-color: #000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.scrolled-nav nav {
  padding: 8px 0;
}

.scrolled-nav nav .branding img {
  width: 40px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@media (min-width: 1200px) {
  header nav {
    max-width: 1200px;
  }
}
</style>
