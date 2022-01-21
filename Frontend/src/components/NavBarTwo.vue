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
        <router-link to="/WallPublications">Accueil</router-link>
    </a>

<a class="button-menu">
    <router-link to="/CreatePublication">Publier</router-link>
</a>

<a class="button-menu">
    <router-link to="/Profil">Mon Compte</router-link>
</a>

<a class="button-menu" @click="logOut()">
    <router-link to="/">Se déconnecter</router-link>
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