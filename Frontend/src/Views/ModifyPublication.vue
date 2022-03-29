<template>
   <section class="container">
       <NavBarTwo />
 
<form v-on:submit.prevent="ModifyPublication">

       <div class="created">
           <label for="content">Tu peux modifier ta publication ici <em> {{ user.username}} </em></label>
           <textarea class="textarea" v-model="editPublication.content" placeholder="Entrez le texte ici ..."></textarea>

       </div>
       <div class="uploadImg">
           <label for="media">
           <input type="file"  @change="uploadImg" accept="image/png, image/jpeg, image/jpg, image/gif" id="media" name="media">
           
          
           </label>
       </div>
           <button type="submit" class="btn">Modifier</button>
    
           </form>
 
   </section> 

</template>


<script>

import NavBarTwo from "../components/NavBarTwo.vue"
import axios from 'axios'
export default {
    name: 'ModifyPublication', 
    components: {
        NavBarTwo,
    },
    data() {
        return {
            editPublication: {
                content:"",
                image:"",
                 userId:"",
                 
                
            },
            file:{},
            
            user: {
                username:"",
               
            },

           
            
        }
        
    },
    methods: {
         ModifyPublication() {
            let newMessage = document.getElementById("newText").value;
            let newContent = false;
            if ((newMessage == this.editPublication.content) != false) {
                newContent = true;
            }
            const id = this.$route.params.id;
            console.log(this.$route);
            if (newContent) {
                axios
                    .put(
                        "http://localhost:3000/api/publications/" + id,
                        {
                            content: this.editPublication.content,
                            attachment: this.editPublication.image,
                            postId: this.editPublication.id,
                        },
                        {
                            headers: {
                                authorization:
                                    "Bearer " + localStorage.getItem("token"),
                            },
                        }
                    )
                    .then(() => {
                        this.message === "";
                        this.$router.push("/WallPublications");
                    })
                    .catch(() => {
                        console.log("erreur de modification");
                    });
            } else {
                console.log("aucune modification");
            }
        },
        uploadImg(evt) {
            const files = evt.target.files;
            if (!files.length) return;
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (evt) => {
                this.editPublication.image = evt.target.result;
            };
            // To enable reuploading of same files in Chrome
            document.querySelector("#inputFile").value = "";
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

</style>
