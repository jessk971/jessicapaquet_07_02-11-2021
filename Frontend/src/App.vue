<template>
<div class="app">
  <NavBar></NavBar>

  <router-view></router-view>

  
  <Footer></Footer>
</div>
  
</template>

<script>


import NavBar from "./components/NavBar.vue"
import Footer from "./components/Footer.vue"
import "./main.css"





export default {
  name: 'App',
  
  
  components:
   {
    NavBar,
    Footer,
    
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif; 
}
body {
  margin: 0;
}



</style>
