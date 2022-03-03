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

<h1> INSCRIPTION </h1>
        </div>
    <form >
            
    <div class="form_signup">

         <label for="inputUserName"> Nom d'utilisateur: </label> 
         <input class="form-signup"  type="text" id="inputUserName" v-model="dataSignup.username" aria-describedby="inputUserNameHelp" placeholder="Entrez votre nom">
      
        </div>

        <div class="form_signup">

            <label for="inputEmail"> Email: </label>
            <input class="form-signup" type="text"  v-model="dataSignup.email" id="inputEmail" aria-describedby="inputEmailHelp" placeholder="Votre email">
           

        </div>

        <div class="form_signup">

            <label for="inputPassword">Choissisez un mot de passe: </label>
            <input class="form-sign" type="password"  v-model="dataSignup.password" id="inputPassword" aria-describedby="inputPassword" placeholder="Mot de passe">
            

        </div>

        <button type="submit" @click.prevent="sendSignup" class="bouton" value="envoyer">S'inscrire</button>

    </form>
        
    </section>
</main>

</template>



<script>
import axios from "axios";

export default {
    name: "Signup",
    
        
    
    data() {
        return {
            dataSignup: {
                username: null,
                email: null,
                password: null,
            },
            msg: "",
        };
    },
    methods: {
        sendSignup() {
            const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
            const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
            if (
                (this.dataSignup.email !== null ||
                    this.dataSignup.username !== null ||
                    this.dataSignup.password !== null) &&
                regexPassword.test(this.dataSignup.password) &&
                regexEmail.test(this.dataSignup.email) &&
                this.dataSignup.username
            ) {
                axios
                    .post(
                        "http://localhost:3000/api/user/signup",
                        this.dataSignup
                    )
                    .then((response) => {
                        console.log(response);
                       
                        location.href = '/WallPublications';

                    })
                    .catch((error) => console.log(error));
            } else {
                alert(
                    "Le mot de passe doit contenir de 8 à 15 caractères,au moins une lettre minuscule, une lettre majuscule, un chiffre et un de ces caractères spéciaux: $ @ % * + - _ !"
                );
            }
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
    margin-right: 1em;
    cursor: pointer;
    text-decoration: none;
    color: white;
}

.nav-list a:hover {
    background-color: grey;
    border: solid grey;
    padding: 1.5em;
    padding-bottom: 1.6em;
}
    </style>
   
   