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
    
    margin-top: 2em;
    
}

.nav-list a {
    margin-right: 1em;
    cursor: pointer;
    text-decoration: none;
    color: white;
    font-size: large;
}

.nav-list a:hover {
    color: rgb(213, 213, 213);
    
}

@media(max-width: 563px) {

#nav-container {

        justify-content: center;
    }

}

@media(max-width: 426px) {

     .nav-list a {

     font-size: xx-large;
     margin-right: 0.5em;
    }

    .nav-list {

      margin-bottom: 1em;  

    }

    .navlogo img {

        width: 250px;
    }

   
}

@media(max-width: 414px) { 

    .nav-list a {

        
        margin-right: 0.5em;
    }

    .navlogo img {

        width: 250px;
    }
}

@media(max-width: 360px) {

.nav-list {

    margin-left: 1em;

    }

     .nav-list a {

        font-size: x-large;
    }
}

@media(max-width: 280px) {

    .nav-list {

        margin-left: 1em;
    }

    .nav-list a {

        font-size: larger;
    }

}


</style>
    

    
   
   