<template>
    <section class="container">
        <NavBarTwo />
    <div id="wall">
        <h1 class="title-wall">File d'actualité</h1>

        <div v-for="publication in publications" :key="publication.id" class="publication">
            
            <div class="user-publication">
                <div class="utilisateurs">
                    <p class="username">Publié par <em>{{ publication.User.username }}</em></p>
                    <p class="date">Posté le  <em>{{ publication.createdAt.split(" ")[0] }}</em>
                    <em>{{ publication.updatedAt }}</em></p>
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
//import axios from "axios"
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
            publication:[]
        };
    },
  

};
</script>