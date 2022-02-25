<template>
  <section class="container">
    <NavBarTwo />
    <div id="wall">
      <h1 class="title-wall">Fil d'actualité</h1>
<div v-for="publication in publications" :key="publication.id">
      <div class="publicationForm">
        <div class="user-publication">
          <div class="utilisateurs">
            <img class="anonymeUser" src="../assets/profil.png" width="100px" alt="photo de profil">

            <div class="user-infos">
            <p class="username"> {{ publication.User.username }}</p>
            <p class="date"> {{ publication.createdAt }}</p>
            </div>
          </div>
          <p class="publication-content">{{ publication.content }}</p>

          <div class="publication-img">
            <img class="img"  :src="publication.image">
          </div>
          <div class="modify">
            <div
              class="button"
             
            >
              <button v-if="publication.userId == user.id || user.isAdmin" @click="supprimer(publication.id)">Supprimer</button>
            </div>
            <div class="button">
              <button
                v-if="user.userId === publication.userId || user.isAdmin"
                @click="modifier(publication.id)"
              >Modifier
              </button>
            </div>
          </div>
          <div class="Comments">
            <div class="createComment">
          <Comments :user="user" :publication="publication" />

          </div>
          
          </div>
      </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script>
import Comments from "../components/Comments.vue";

import NavBarTwo from "../components/NavBarTwo.vue";
import axios from "axios";
export default {
  name: "WallPublications",
  components: {
    NavBarTwo,
    Comments,
    
    
  },
  data() {
    return {
      user: {
        username: "",
      },
      
      id: "",
      content: "",
      image: "",
      comments: [],
      publications: [],
      userId: "",
    };
  },

  loadUser() {
    axios
      .get("http://localhost:3000/api/user/profil", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.user = response.data.user;
      })
      .catch((error) => {
        console.log("Impossible de traiter les données du profil ! " + error);
      });
  },

  methods: {
    getAllPublications() {
      axios
        .get("http://localhost:3000/api/publications" , {
          headers: { Authorization: "Bearer " + localStorage.token },
        })

        .then((response) => {
          console.log("publications", response.data);
          this.publications = response.data;
          this.image = response.data.image;
        });
    },
    supprimer(id) {
    console.log(id);
    const post_id = this.publications.findIndex(
                (publication) => publication.id === id
            );
            if (post_id !== -1) {
                this.publications.splice(post_id, 1);
                axios
                    .delete("http://localhost:3000/api/publications/" + id, {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .catch((error) => console.log(error));
            }
        },
  
  },
  mounted() {
    this.getAllPublications();
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


button {
  margin-right: 1em;
}

.valider {
  margin-left: 1em;
}

.img  {
  width: 100%;
  height: auto;
}

.utilisateurs { 
  display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    border-bottom: solid grey;
}

.user-infos { 
  margin-left: 1em;
  
}

.user-infos .username {
    font-size: x-large;
    font-family: arial;
    font-weight: 800;
    margin-top: 0;
}

.anonymeUser { 
  border-radius: 50%;
    width: 60px;
    height: 60px;
    margin-left: 1em;
    border-bottom: solid grey;
}

.publication-content {
  margin-left: 1em;
  font-size: larger;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>