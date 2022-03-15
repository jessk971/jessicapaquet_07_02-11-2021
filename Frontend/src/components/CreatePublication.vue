<template>
   <section class="container">
       <NavBarTwo />
 
<form v-on:submit.prevent="createPublication">

       <div class="created">
           <label for="content">Quoi de neuf <em> {{ user.username}} </em> ?</label>
           <textarea class="textarea" v-model="publication.content" placeholder="Entrez le texte ici ..."></textarea>

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
                image:"",
                 userId:""
                
            },
            file:{},
            
            user: {
                username:"",
               
            },  
            
        
            
        }
        
    },
    methods: {
        uploadImg(event) {
        this.file = event.target.files[0];
        console.log(this);
    },
        createPublication() {
            
            var formData = new FormData();
            formData.append("image", this.file);
            formData.append("content", this.publication.content);
            formData.append("user_id", this.user.id);
            if (formData.get("image") !== null && formData.get("content") !== null)

            axios.post ("http://localhost:3000/api/publications/create", formData, { headers: { "Authorization":"Bearer " + localStorage.token}})
            .then((response) => {
                alert("Votre publication à bien été créée !")
          console.log(response);
          this.publication = response.data.publication;
          this.$router.push("/WallPublications");
        })
        .catch((error) => console.log(error));
    },
    
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

    em {
        font-weight: 800;
    }

    @media(max-width:412px) {
        
        .container form {

            width: 100%;
            margin-top: 3em;
        }
    }

</style>