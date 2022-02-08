<template>
    <section class="container">
        <NavBarTwo />
    <div id="wall">
        <h1 class="title-wall">Fil d'actualité</h1>

<Create :submit="onSubmit" />

        <div v-for="publication in publications" :key="publication.id" class="publication">
            
            <div class="user-publication">
                <div class="utilisateurs">
                    <p class="username">Publié par {{ publication.user.username }}</p>
                    <p class="date">Posté le  {{ publication.createdAt.split(" ")[0] }}
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
                <div class="allcomments">
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
            user:"",
            id:"",
            content:"",
            image:"",
            user_id:"",
            comments:[],
            publication:[],
            publications:[]
        };
    },
  
    loadUser(){
        axios.get ("http://localhost:3000/api/user", { headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then((response) => (this.user = response.data.user))
            .catch((err) => console.log(err));
    },

    methods: {

    loadPublications() {
        axios.get ("http://locahost:3000/api/publications", { headers: { Authorization: "Bearer " + localStorage.token }, 
            })
            .then((response) => {
            console.log("publication", response.data);
            this.publications = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
},

    onSubmit() {
            this.loadPublications();
        },

    supprimer(id) { 
        console.log(id);
             axios.delete("http://localhost:3000/api/publications/"  + id , { headers: { Authorization: "Bearer " + localStorage.getItem("token")}})
            .then(() => {
             alert('la publication a bien été supprimé')
             this.loadPublication();  
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
    padding-top: 1em;
    text-align: center;
}


</style>