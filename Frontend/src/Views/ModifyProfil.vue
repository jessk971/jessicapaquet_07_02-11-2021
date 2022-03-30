<template>
  <section class="container">
     <NavBarTwo /> 

     <div class="Modify">
         <h1>Modifier votre profil</h1>

<form class="modifyForm">
         <div class="modifyUser">

         <label for="inputUserName"> Nom d'utilisateur: </label> 
         <input class="form-modify"  type="text" id="inputUserName" v-model="user.username" aria-describedby="inputUserNameHelp" placeholder="Entrez votre nom">

         </div>

<div class="button-modif">

        <div class="modify-button">
            <button class="modifyValid" @click="modify(user)"> Modifier</button>
        </div>

        <div class="annulerModif">
            <button class="annule" @click="Annuler()">Annuler</button>
        </div>

</div>
</form>
     </div>

  </section> 
</template>

<script>
import NavBarTwo from "../components/NavBarTwo.vue"
import axios from "axios"

export default {
    name: "ModifyProfil",
    component:{
        NavBarTwo,
    
    },
   data() {
        return {
            user:{},
        }
    },

    methods: {

        modify(){
            axios.put("http://localhost:3000/api/user/profil" , this.user, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then(() => {
                localStorage.setItem('user', JSON.stringify(this.user))
                alert('votre profil a bien été modifier')
                  this.$router.push("/Profil")
            })
            .catch((error) => {
                console.log(error);
            });
        
        }, 

        Annuler() {
           this.$router.push("/Profil")
        }
   },

       mounted() {

            let token = localStorage.getItem("token");
    if (!token || token == null) {
      location.href = "/";
    }
    
axios.get("http://localhost:3000/api/user/profil", {headers: {Authorization: 'Bearer ' + localStorage.token}})
        .then(response => {
            
            this.user = response.data.user;
        })
        
        .catch(error => {
            console.log("Impossible de traiter les données du profil ! >" + error);
        })

        
    }
}

</script>

<style>

.Modify h1 {
    text-shadow: 3px 3px 3px black;
  color: white;
  font-style: oblique;
  font-weight: 900;
  font-size: 50px;
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
}

 .modifyForm {
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    border: solid transparent;
    border-radius: 10px;
    flex-direction: column;
    padding-top: 2em;
    line-height: 2.5em;
    opacity: 0.9;
    padding-bottom: 2em;
    box-shadow: 4px 2px 2px rgb(77, 77, 77);
    margin: auto;
    width: 50%;
    margin-top: 1em;
}

.modifyUser { 
    margin-left: 1em;
}

.modifyUser input {
    margin-left: 1em;
}

.button-modif {

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

button.modifyValid {

    justify-content: center;
    display: flex;
    flex-wrap: wrap;

}

@media(max-width: 654px) {

    .modifyForm {

        width: 100%;
        border: none;
        box-shadow: none;
    }
}
</style>


