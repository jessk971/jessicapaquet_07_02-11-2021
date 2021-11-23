<template>
    
<main class="container">

    <section class="container_login">
        <div class="title-login">

<h1> CONNECTEZ-VOUS </h1>
        </div>

        <form>

        <div class="form_signup">

            <label for="inputEmail"> Email: </label>
            <input class="form-signup" type="text" id="inputEmail" aria-describedby="inputEmailHelp" placeholder="Votre email">
           

        </div>

        <div class="form_signup">

            <label for="inputPassword">Mot de passe: </label>
            <input class="form-sign" type="text" id="inputPassword" aria-describedby="inputPassword" placeholder="Mot de passe">
            

        </div>

        <button type="submit" class="bouton"><router-link class="router-link" to="./WallGroupomania"> Connecter </router-link></button>
        </form>
        </section>
    </main>
        
</template>

<script>
export default {
    name: 'Login' 
        
    
}
</script>