<template>
<header>
<nav class="navbar" aria-label="nav main">
    <div id="nav-container">
        <div class="navlogo">

            <a href="#"><router-link to="/"><img src="../assets/logo.png" alt="logo" width="200" ></router-link></a>

        </div>
        <div class="nav-list">
<div class="nav-log">

    <a  v-if="status != 'login'" class="button-signup">
        <router-link to="/Signup">S'inscrire</router-link>
    </a>

<a  v-if="status != 'login'" class="button-login">
    <router-link to="/Login">Se connecter</router-link>
</a>

</div>
        </div>
    </div>
</nav>
</header>
   </template>

   
  <script>

export default {

    name: "NavBar",

     mounted: function() {
            if (this.$store.state.user.userId != -1) {
                this.$store.commit('SET_STATUS', 'login')
            }
        },

      methods: {
        logout() {
            localStorage.clear();
            this.$router.push("/Signup");
        },
    },
};


</script>

<style>
    
.navbar
{
    background-color: black;
    color: white;
    
}

#nav-container {

    display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
}

.navlogo img {
margin: 1em;
margin-top: 1.5em;


}

.nav-list {
    margin: 1.5em;
    margin-right: 1em;
    margin-top: 2em;
    
}

.nav-list a {
    margin-right: 2em;
    cursor: pointer;
    text-decoration: none;
    color: white;
    font-size: large;
}

.nav-list a:hover {
    font-size: x-large;
    font-weight: bold;
}
    </style>
   
   