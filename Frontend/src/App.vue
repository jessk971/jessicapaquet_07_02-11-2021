<template>
<div class="app">
  

  <router-view></router-view>

  
  <Footer></Footer>
</div>
  
</template>

<script>



import Footer from "./components/Footer.vue"
import "./main.css"





export default {
  name: 'App',
  
  
  components:
   {
    
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
