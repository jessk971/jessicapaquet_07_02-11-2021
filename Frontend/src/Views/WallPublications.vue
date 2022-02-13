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
                <div class="allcomments">
      // Comments :user="user" :publication="publication" 
      </div>
            </div>
        </div>
    </div>
    </section>
        
    
</template>

<script>
//import Comments from "../components/Comments.vue";
import NavBarTwo from "../components/NavBarTwo.vue";
import axios from "axios"
export default {
    name: "WallPublications",
    components: {
        NavBarTwo,
        //Comments,
    },
    data(){
        return {
            user:"",
            username:"",
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

    getAllPublications() {
        axios.get ("http://locahost:3000/api/publications", { headers: { Authorization: "Bearer " + localStorage.token }, 
            })
            .then(response => {
            let publications = JSON.parse(response.data);
            this.allPublications = publications;
            console.log(publications);
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

.publicationForm { 
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


</style>