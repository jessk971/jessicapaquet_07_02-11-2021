<template>
<header>
<nav class="navbar" aria-label="nav main">
    <div id="nav-container">
        <div class="navlogo">

            <a href="#"><img src="../assets/logo.png" alt="logo" width="200" ></a>

        </div>
        <div class="nav-list">
<div class="nav-log">

    <a class="button-signup">
        <router-link to="/Signup">S'inscrire</router-link>
    </a>

<a class="button-login">
    <router-link to="/LogIn">Se connecter</router-link>
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
}

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


}

.nav-list {
    margin: 1.5em;
    margin-right: 1em;
    
}

.nav-list a {
    margin-right: 1em;
    cursor: pointer;
}

.nav-list a:hover {
    background-color: grey;
    border: solid grey;
    padding: 1.5em;
    padding-bottom: 1.6em;
}
    </style>
   
   