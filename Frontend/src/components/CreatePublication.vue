<template>
   <section class="container">
       <NavBarTwo />
 
<form v-on:submit.prevent="createPublication">

       <div class="created">
           <label for="content">Quoi de neuf {{ user.username}} ?</label>
           <textarea class="textarea" v-model="content" placeholder="Entrez le texte ici ..."></textarea>

       </div>
       <div class="uploadImg">
           <label for="media">
           <input type="file"  @change="uploadImg" accept="image/png, image/jpeg, image/jpg, image/gif" id="media" name="media">
           
          
           </label>
       </div>
           <button type="submit" class="btn">Publier</button>
    
           </form>
 
   </section> 

</template>


<script>

import NavBarTwo from "../components/NavBarTwo.vue"
import axios from 'axios'
export default {
    name: 'CreatePublication', 
    components: {
        NavBarTwo,
    },
    data() {
        return {
            publication: {
                content:"",
                media:"",
                image:"",
                post_id:"",
                userId:""
            },
            user: {
                username:""
            }

            
        }
        
    },
    methods: {
        uploadImg(event) {
        this.publication = event.target.files[0];
        console.log(this.publication);
    },
        createPublication() {
            axios.post ("http://localhost:3000/api/publications/create", { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((response) => {
          console.log(response);
          this.publication = response.data.publication;
          location.reload();
        })
        .catch((error) => console.log(error));
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
}
      
    
};
</script>

<style>

.container form { 
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    border: solid transparent;
    border-radius: 10px;
    margin: auto;
    width: 600px;
    flex-direction: column;
    padding-top: 2em;
    line-height: 2.5em;
    opacity: 0.9;
    padding-bottom: 2em;
    box-shadow: 4px 2px 2px rgb(77, 77, 77);
    margin-top: 5%;
    }

    .created {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-right: 1em;
    margin-left: 1em;
    }

    .created label {
margin-bottom: 1em;
    }

    .created textarea {
       border: solid gray; 
    }

    button {
        margin-top: 0;
    }

    .uploadImg input {
        margin-left: 1.2em ;
    }

</style>