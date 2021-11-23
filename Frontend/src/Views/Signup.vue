<template>
<main class="container">

    <section class="container_login">
        <div class="title-login">

<h1> INSCRIPTION </h1>
        </div>
    <form >
        
<div class="form_signup">

         <label for="inputLastName"> Nom: </label> 
         <input class="form-signup" type="text" v-model="dataSignup.lastname" id="inputLastName" aria-describedby="inputLastNameHelp" placeholder="Entrez votre nom">

        </div>

        
        
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
            <input class="form-sign" type="text"  v-model="dataSignup.password" id="inputPassword" aria-describedby="inputPassword" placeholder="Mot de passe">
            

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
                lastname: null,
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
                (this.dataSignup.lastname !== null ||
                this.dataSignup.email !== null ||
                 this.dataSignup.username !== null ||
                    this.dataSignup.password !== null) &&
                regexPassword.test(this.dataSignup.password) &&
                regexEmail.test(this.dataSignup.email) &&
                this.dataSignup.username &&  this.dataSignup.lastname
            ) {
                axios
                    .post(
                        "http://localhost:3000/api/auth/signup",
                        this.dataSignup
                    )
                    .then((response) => {
                        console.log(response);
                        
                        location.replace(location.origin);
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