<template>
    <section class="container">
<NavBarTwo />

<h1 class="title-wall">Profil</h1>

<div class="profil">

    <div class="usernameImg">
    
    <div class="infosUsername">

    <h2>Bienvenue {{ user.username  }} !</h2>
    <p v-if="user.isAdmin == 0">Utilisateur</p>
    <p v-if="user.isAdmin == 1">Administrateur</p>

    </div>

<div class="infoImg">

        <img class="anonymeUser" src="../assets/profil.png" width="100px" alt="photo de profil">
    
    </div>
    </div>

    <div class="infos">

        <span>Username: {{ user.username  }} </span>
        <p>Email: {{ user.email }} </p>
        <p>Membre depuis le: {{ user.createdAt  }} </p>

    </div>
<div class="button-clear">

    <button title="Modifier Profil" class="modifyProfil" @click="modifyUser()"><i title="Modifier Profil" class="fas fa-pen"></i><span>Modifier</span></button>
    <button title="Supprimer Profil" class="deleteProfil" @click="deleteUser(user)"><i title="Supprimer" class="fas fa-trash-alt"></i><span>Supprimer</span></button>
    

</div>

</div>
        <MyPublications v-if="user.id !== undefined" :user="this.user"  />

    </section>
</template>

<script>
import NavBarTwo from "../components/NavBarTwo.vue"
import axios from "axios"
import MyPublications from "../components/MyPublications.vue"
export default {
    name: 'Profil', 
    components:{
        NavBarTwo,
        MyPublications,
    },
    data() {
        return {
            user: {
                username: "",
                email: "",
                createdAt: "",
                isAdmin: ""
            }
        }
    },
  
    methods: {
       deleteUser(user) {
                if (window.confirm("ATTENTION : Vous êtes sur le point de supprimer votre compte ! Toute suppression est définitive, êtes-vous certain de ce choix ?")) {
                   axios.delete("http://localhost:3000/api/user/delete/" + user.id, {
                    headers: { Authorization: "Bearer " + localStorage.token },
                })
                .then((response) => console.log(response))
                .catch((err) => console.log(err));

            localStorage.clear();
            this.$router.push("/Signup");
        }
    }, 
    modifyUser() {
        this.$router.push("/ModifyProfil");
    }
    },
            
    

      mounted() {
    
axios.get("http://localhost:3000/api/user/profil", {headers: {Authorization: 'Bearer ' + localStorage.token}})
        .then(response => {
            
            this.user = response.data.user;
        })
        
        .catch(error => {
            console.log("Impossible de traiter les données du profil ! >" + error);
        })
    }


      
    
};
</script>

<style>

.usernameImg
{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-right: 1em;
    margin-left: 1em;
    
}
.profil { 
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    border: solid transparent;
    border-radius: 10px;
    margin: auto;
    width: 50%;
    flex-direction: column;
    padding-top: 2em;
    line-height: 2.5em;
    opacity: 0.9;
    padding-bottom: 2em;
    box-shadow: 4px 2px 2px rgb(77, 77, 77);
    margin-top: 1em;
    
    }

    .infoImg img {
        border-radius: 50%;
    }

    .infos
    {
        margin-left: 1em;
    }

    .button-clear {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    button.modifyProfil 
    {
        width: 100px;
    }

    .button-clear button {

        padding-right: 2em;
    }

    button.deleteProfil {

        width: unset;
    }

    .button-clear i {

        visibility: hidden;
    }

     

    .title-wall {

 text-shadow: 3px 3px 3px black;
  color: white;
  font-style: oblique;
  font-weight: 900;
  font-size: 50px;
  margin-top: 1em;
  margin-bottom: 1em;
  text-align: center;
    }

@media(max-width: 654px) {

    .profil {

        width: 100%;
        border: none;
        box-shadow: none;
        
    }

    .button-clear span {

        display: none;
    }

    .button-clear i {

        visibility: visible;
    }

    .button-clear button {

        width: 50px;
        padding-right: 0.5em;
    }
}    @media(max-width:412px) {

        .profil{

            width: 100%;
            margin-top: 3em;
        }
    }

    @media(max-width: 297px) {

        .button-clear i {

            visibility: visible;
        }
    }

</style>