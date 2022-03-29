<template>
<header>
<nav class="navbar" aria-label="nav main">
    <div id="nav-container">
        <div class="navlogo">

            <a href="#"><router-link to="/WallPublications"><img src="../assets/logo.png" alt="logo" width="200" ></router-link></a>

        </div>
        <div class="nav-list">
<div class="nav-log">

    <a class="button-menu">
        <router-link to="/WallPublications"><span>Accueil</span><i title="Home" class="fas fa-house-user" style="white"></i></router-link>
    </a>

<a class="button-menu">
    <router-link to="/CreatePublication"><span>Publier</span><i title="Publier" class="fas fa-paper-plane" style="white"></i></router-link>
</a>

<a class="button-menu">
    <router-link to="/Profil"><span>Mon Compte</span><i title="Mon Compte" class="fas fa-user" style="white"></i> </router-link>
</a>

<a class="button-menu" @click="logOut()">
    <router-link to="/" ><span> Déconnecter</span><i title="Déconnecter" class="fas fa-user-lock" style="white"></i> </router-link>
</a>
</div>
        </div>
    </div>
</nav>

</header>

   </template>

<script>
export default {
    name: 'NavBarTwo',

    mounted() {

    },
    methods: {

logOut() {

localStorage.removeItem("user");

},
verifStoage() {
    if(!localStorage.getItem('user')) {
        window.location = "/";
        }
    }
}
}

</script>

<style>

.button-menu i {

    visibility: hidden;
}

@media(max-width: 740px) {

    .nav-log  {

margin-bottom: 1em;

    }

    #nav-container {

        justify-content: center;
    }

    .navlogo img 
    {

        width: 300px;
    }
}


@media(max-width: 660px) {

    .button-menu i {

    visibility: visible;
}
.button-menu span {
    display: none;
}
}

@media(max-width: 540px)
{
    .button-menu i {

        font-size: xx-large;
        margin-right: 1.5em;
    
    }

    .nav-list {

        margin-left: auto;
        
    }
}

@media(max-width: 426px){

    .nav-list {

    margin-left: 1em;
    margin-right: -4em;
    }
}
@media(max-width:414px)
{
.button-menu i {

    margin-left: 0;
    margin-right: 1em;
}

.nav-list {

    margin-left: 1em;
    margin-right: -2em;
}
    
    .navlogo img  {

        width: 300px;
    }
}

@media(max-width: 394px) {

    .nav-list a {
    font-size: large;

    }

.nav-list {

    margin-left: 1.5em;

    } 

   
}

@media(max-width: 320px) {

    .nav-list {

        margin-left: 0.5em;
    }
}

@media(max-width: 280px) {

    .navlogo img  {

        width: 250px;
    }

    .nav-list i {

        font-size: large;
        margin-left: -1em;
    }
}

</style>