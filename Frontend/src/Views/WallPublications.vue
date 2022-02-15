<template>
    <section class="container">
        <NavBarTwo />
    <div id="wall">
        <h1 class="title-wall">Fil d'actualité</h1>

<Create :submit="onSubmit" />

        <div class="publicationForm">
            
            <div class="user-publication">
                <div class="utilisateurs">
                    <p class="username">Publié par {{ user.username }}</p>
                    <p class="date">Posté le  {{ publication.createdAt }}
                    {{ publication.updatedAt }}</p>
                </div>
                <p class="publication-content">{{ publication.content }}</p>

                <div class="publication-img">
                    <img class="image" :src="publication.image">
                </div>
                <div class="modify">
                <div class="button" v-if="user.userId == publication.userId || user.isAdmin">
        <button @click="supprimer(publication.id)" >Supprimer</button>
      </div>
      <div class="button">
        <button v-if="user.userId === publication.userId || user.isAdmin" @click="modifier(publication.id)">Modifier</button>
      </div>
                </div>
                <div class="allComments">
     <Comments :user="user" :publication="publication" />
      </div>
            </div>
        </div>
    </div>
    </section>
        
    
</template>

<script>
import Comments from "../components/Comments.vue";
import NavBarTwo from "../components/NavBarTwo.vue";
import axios from "axios"
export default {
    name: "WallPublications",
    components: {
        NavBarTwo,
        Comments,
    },
    data(){
        return {
            user:{
            username:"",
            },
            publication:[],
                id:"",
                content:"",
                image:"", 
                comments:[],
                publications:[],
                userId:"",
            
            
            
           
            
        };
    },
  
    loadUser(){
        axios.get ("http://localhost:3000/api/user/profil", { headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then(response => {
            
            this.user = response.data.user;
        })
            .catch(error => {
            console.log("Impossible de traiter les données du profil ! " + error);
        })
    },

    methods: {

        

    getAllPublications() {
        axios.get ("http://locahost:3000/api/publications", { headers: { Authorization: "Bearer " + localStorage.token }, 
            })
            
             .then((response) => {
                    console.log("publication", response.data);
                    this.publication = response.data.publication;
                    this.image = response.data.image
                })
        
        },
},

    onSubmit() {
            this.getAllPublications();
        },

    supprimer(publication) { 
        console.log(publication);
             axios.delete("http://localhost:3000/api/publications/delete"  +publication.id , { headers: { Authorization: "Bearer " + localStorage.getItem("token")}})
            .then(() => {
             alert('la publication a bien été supprimé')
             this.getAllPublications();  
        })
        .catch((error) => {
          console.log(error);
        });
    
     },
    
    
    
    
};
</script>

<style>

#wall h1 {
    text-shadow: 3px 3px 3px black;
    color: white;
    font-style: oblique;
    font-weight: 900;
    font-size: 50px;
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
}

.publicationForm { 
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    border: solid transparent;
    border-radius: 10px;
    margin: auto;
    width: 50%;
    flex-direction: column;
    padding-top: 2em;
    
    opacity: 0.9;
    padding-bottom: 2em;
    box-shadow: 4px 2px 2px rgb(77 77 77);
    margin-top: 1em;
    }

    .modify {

        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .allComments {
        margin-top: 1em;
    }

    .user-publication { 
        margin-left: 1em;
    }
    button {
        margin-right: 1em;
    }

    .valider {
        margin-left: 1em;
    }


</style>