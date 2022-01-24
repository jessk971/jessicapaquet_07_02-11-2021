<template>
    
<main class="container">

    <header>
<nav class="navbar" aria-label="nav main">
    <div id="nav-container">
        <div class="navlogo">

            <a href="#"><router-link to="/"><img src="../assets/logo.png" alt="logo" width="200" ></router-link></a>

        </div>
        <div class="nav-list">
<div class="nav-log">

    <a class="button-signup">
        <router-link to="/Signup">S'inscrire</router-link>
    </a>

<a class="button-login">
    <router-link to="/Login">Se connecter</router-link>
</a>

</div>
        </div>
    </div>
</nav>
</header>

    <section class="container_login">
        <div class="title-login">

<h1> CONNECTEZ-VOUS </h1>
        </div>

        <form>

        <div class="form_signup">

            <label for="inputEmail"> Email: </label>
            <input class="form-signup" type="text" v-model="dataLogin.email" id="inputEmail" aria-describedby="inputEmailHelp" placeholder="Votre email">
           

        </div>

        <div class="form_signup">

            <label for="inputPassword">Mot de passe: </label>
            <input class="form-signup" type="text"  v-model="dataLogin.password" id="inputPassword" aria-describedby="inputPassword" placeholder="Mot de passe">
            

        </div>

        <button type="submit" @click.prevent="logIn" class="bouton" value="envoyer"><router-link to="WallPublications">Se connecter</router-link></button>
        </form>
        </section>
    </main>
        
</template>

<script>
    
 import axios from "axios";
import { mapState } from "vuex";
export default {
    name: "Signin",
    data() {
        return {
            dataLogin: {
                email: null,
                password: null,
            },
            msg: "",
        };
    },
    computed: {
        ...mapState(["user"]),
    },
   
     methods: {
        logIn() {
            if (
                this.dataLogin.email !== null ||
                this.dataLogin.password !== null
            ) {
                axios
                    .post(
                        "http://localhost:3000/api/user/login",
                        this.dataLogin
                    )
                    .then((response) => {
                        localStorage.setItem("token", response.data.token);
                        location.replace(location.href ="/WallPublications");
                    })
                    .catch((error) => console.log(error));
            } else {
                console.log("Erreur est survenue !");
            }
        },
    },
};   

</script>