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
    color: rgb(213, 213, 213);
}

@media(max-width: 820px) {
 .form_signup input{

     margin-left: 1em;
 }

}

@media(max-width: 654px) {
    .container_login form {
        width: unset;
    }
}

@media(max-width: 414px) { 

 #nav-container {

        justify-content: center;
    }

    .nav-list {

      margin-bottom: 1em;  

    }

    .nav-list a {

        font-size: xx-large;
        margin-right: 0.5em;
    }

    .navlogo img {

        width: 250px;
    }

    #inputPassword {

        width:130px
    }

    
    .nav-list {

        margin-left: 1em;
    }

    
}

@media(max-width: 376px) {

    .nav-list {

    margin-left: 1em;

    }

     .nav-list a {

        font-size: x-large;
    }

}

@media(max-width: 280px) {
    .title-login h1 {
        font-size: 40px;
    }

    .form_signup input {

        margin-left: 1em;
    }

     .nav-list {

        margin-left: 1em;
    }

    .nav-list a {

        font-size: larger;
    }

}
    </style>
   
   