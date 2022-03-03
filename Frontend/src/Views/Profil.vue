<template>
    <section class="container">
<NavBarTwo />

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

    <button class="modify" @click="modifyUser()">Modifier le profil</button>
    <button class="delete" @click="deleteUser(user)">Supprimer le profil</button>
    

</div>

</div>

    </section>
</template>

<script>
import NavBarTwo from "../components/NavBarTwo.vue"
import axios from "axios"
export default {
    name: 'Profil', 
    components:{
        NavBarTwo,
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

    .button-clear button
    {
        width: 150px;
    }

</style>