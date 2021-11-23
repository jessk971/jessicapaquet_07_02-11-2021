<template>
    <section class="home">
<div class="home-container">
    <div class="home-presentation">
        <h1>Bienvenue sur Groupomania !</h1>
        <h2>Le réseau social d'entreprise</h2> 

    </div>
</div>
    </section>
</template>


<script>
export default {
    name: "Home",
    
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
    font-size: 80px;
    
    
}
.home-presentation h2 {
    font-size: 50px;
}

</style>

