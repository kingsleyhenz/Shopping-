<template>
  <div>
    <!-- <Navbar/> -->
    <Hero/>
    <Products/>
  </div>
</template>


<script>
  import Hero from './components/hero.vue';
import Navbar from './components/navbar.vue';
import Products from './components/products.vue';
import './assets/css/main.css'

  export default {
    components: {
      Navbar,
      Hero,
      Products
    },
  };
</script>

