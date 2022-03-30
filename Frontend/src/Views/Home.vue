<template>
<section>
<NavBar /> 
    <div class="home">
     
<div class="home-container">
    <div class="home-presentation">
        <h1>Bienvenue sur Groupomania !</h1>
        <h2>Le réseau social d'entreprise</h2> 

    </div>
</div>
    </div>
</section>
</template>


<script>

import NavBar from "../components/NavBar.vue"

export default {
    name: "Home",
    components: {
        NavBar,
    }
    
};
</script>

<style>

.home {

    text-align: center;
    vertical-align:middle;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background: url(../assets/background.png);
    height: 500px;
    margin-bottom: 0px;
    padding-top: 10em;
    text-shadow: 3px 3px 3px black;
    color: white;
    font-style: oblique;
    font-weight: 900;
}


.home-presentation h1 {
    margin-top: 0;
    font-size: 70px;
    
    
}
.home-presentation h2 {
    font-size: 50px;
}

@media(max-width: 426px)
{
    .home-presentation h1 {
        font-size: 60px;
    }

    .home-presentation h2 {
        font-size: 40px;
    }
}

@media(max-width: 376px) {

    .home-presentation h1 {
        font-size: 50px;
    }

    
}

@media(max-width: 320px) {

    
    .home-presentation h1 {

        font-size: 40px;

    }

    .home-presentation h2 {

        font-size: 30px;
    }
}

</style>

