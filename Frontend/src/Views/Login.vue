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
<div class="formLogin">
        <form>

        <div class="form_signup">

            <label for="inputEmail"> Email: </label>
            <input class="form-signup" type="text" v-model="email" id="inputEmail" aria-describedby="inputEmailHelp" placeholder="Votre email">
           

        </div>

        <div class="form_signup">

            <label for="inputPassword">Mot de passe: </label>
            <input class="form-signup" type="text"  v-model="password" id="inputPassword" aria-describedby="inputPassword" placeholder="Mot de passe">
            

        </div>

        <button type="submit" @click.prevent="logIn" class="bouton" value="envoyer">Se connecter</button>
        </form>
</div>
        </section>
    </main>
        
</template>

<script>
import axios from 'axios'
    export default {
        name: 'Login',
        data() {
            return {
                email:'',
                password: '',
                msg: 'Veuillez remplir tous les champs',
                isAdmin:false,
                 invalid: false,
                 userError: false
                
            }
        },
        methods: {


    logIn(){

    if(this.email == ''|| this.password == ''){
        return this.invalid = true, this.msg = 'Veuillez remplir tous les champs';
    } 
        axios.post("http://localhost:3000/api/user/login", {
            email: this.email,
            password: this.password
        },
        {
            headers: { 'Content-Type' : 'application/json'}
        

        })
      .then((response) => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userId", response.data.userId)
            localStorage.setItem("isAdmin", response.data.isAdmin)
            if (response.data.isAdmin == 1) {
                console.log('Vous êtes sur le compte test administrateur');
                this.isAdmin = true;
                console.log(this.isAdmin);
            }
            alert('Bienvenue , vous êtes maintenant connecté')
            this.$router.push('/Profil')
        })
         .catch(() => { 
                  alert('Mot de passe incorrect')
                  this.userError = true 
                })
         }}
         }
     
    
    
 

</script>