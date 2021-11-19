<template>
<main class="container">

    <section class="container_login">

    <form v-on:submit.prevent="Signup()">
        <h1> INSCRIPTION </h1>
<div class="form_signup">

         <label for="inputLastName"> Nom: </label> 
         <input class="form-signup" v-model="name" type="text" id="inputLastName" aria-describedby="inputLastNameHelp" placeholder="Entrez votre nom">

        </div>

        
        
        <div class="form_signup">

         <label for="inputUserName"> Nom d'utilisateur: </label> 
         <input class="form-signup" type="text" id="inputUserName" aria-describedby="inputUserNameHelp" placeholder="Entrez votre nom">
        <span class="error" v-if="(!$v.username.required && $v.username.$dirty) && submited">Veuillez saisir votre pseudonyme !</span>
        <span class="error" v-if="!$v.username.alpha && $v.username.$dirty">Veuillez saisir un pseudonyme valide !</span>
        </div>

        <div class="form_signup">

            <label for="inputEmail"> Email: </label>
            <input class="form-signup" type="text" id="inputEmail" aria-describedby="inputEmailHelp" placeholder="votre email">
            <span class="error" v-if="((!$v.email.required || !$v.email.email) && $v.email.$dirty) && submited">Veuillez saisir un email valide !</span>
             <span class="error" v-if="responseEmailError">L'inscription a échouée, merci de réessayer !</span>

        </div>

        <div class="form-signup">

            <label for="inputPassword">Choissisez un mot de passe</label>
            <input class="form-sign" type="text" id="inputPassword" aria-describedby="inputPassword" placeholder="mot de passe">
            <span class="error" v-if="(!$v.password.required && $v.password.$dirty) && submited">Veuillez saisir un mot de passe !</span>
            <span class="error" v-if="(!$v.password.isPasswordStrong) && $v.password.$dirty">Votre mot de passe doit être contenir minimum 8 caractères avec au moins une minuscule, une majuscule, un chiffre et un caractère spécial.</span>

        </div>

        <button type="submit" class="bouton">S'inscrire</button>

    </form>
    </section>
</main>

</template>

<script>

export default {
     
     name: 
         "Signup",
        data() {
        return {
           username: "",
            email:"",
            password:"",
            submited: false,
            responseEmailError: false
        };
    
    
        },
}
    

</script>
