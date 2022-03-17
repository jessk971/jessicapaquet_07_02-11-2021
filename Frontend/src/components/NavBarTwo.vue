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

@media(max-width: 660px) {

    .button-menu i {

    visibility: visible;
}
.button-menu span {
    display: none;
}
}

@media(max-width:412px)
{
    .nav-list a {

        margin-left: 0.5em;
        margin-right: 0.5em;
        font-size: xx-large;
    }

    .nav-list {

        padding-bottom: 1em;
    }

    .navlogo img  {

        width: 300px;
    }
}

</style>