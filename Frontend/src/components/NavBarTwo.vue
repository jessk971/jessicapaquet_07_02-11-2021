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
        <router-link to="/WallPublications">Accueil<i title="Home" class="fas fa-house" style="white"></i></router-link>
    </a>

<a class="button-menu">
    <router-link to="/CreatePublication">Publier<i title="Publier" class="fas fa-paper-plane" style="white"></i></router-link>
</a>

<a class="button-menu">
    <router-link to="/Profil">Mon Compte<i title="Mon Compte" class="fas fa-user" style="white"></i> </router-link>
</a>

<a class="button-menu" @click="logOut()">
    <router-link to="/">Se Déconnecter<i title="Déconnecter" class="fas fa-shield-keyhole" style="white"></i> </router-link>
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
.button-menu a {
    visibility: hidden;
}
}

</style>