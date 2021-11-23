<template>
<main class="container">

    <section class="container_login">
        <div class="title-login">

<h1> INSCRIPTION </h1>
        </div>
    <form v-on:submit.prevent="Signup()">
        
<div class="form_signup">

         <label for="inputLastName"> Nom: </label> 
         <input class="form-signup" v-model="name" type="text" id="inputLastName" aria-describedby="inputLastNameHelp" placeholder="Entrez votre nom">

        </div>

        
        
        <div class="form_signup">

         <label for="inputUserName"> Nom d'utilisateur: </label> 
         <input class="form-signup" type="text" id="inputUserName" aria-describedby="inputUserNameHelp" placeholder="Entrez votre nom">
      
        </div>

        <div class="form_signup">

            <label for="inputEmail"> Email: </label>
            <input class="form-signup" type="text" id="inputEmail" aria-describedby="inputEmailHelp" placeholder="Votre email">
           

        </div>

        <div class="form_signup">

            <label for="inputPassword">Choissisez un mot de passe: </label>
            <input class="form-sign" type="text" id="inputPassword" aria-describedby="inputPassword" placeholder="Mot de passe">
            

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
        
        };
    


</script>

