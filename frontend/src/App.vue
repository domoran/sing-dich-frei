<template>
  <div class="container">
    <Nav />


    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";



export default {
  name: "App",
  components: { Nav, },

 
};
</script>

<style>
</style>
