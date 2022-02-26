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
            <p class="date"> {{ publication.createdAt.split(' ')[0] }} {{ publication.createdAt.slice(11,16) }}</p>
            </div>
          </div>
          <p class="publication-content">{{ publication.content }}</p>

          <div class="publication-img">
            <img class="img"  :src="publication.image">
          </div>
          <div class="modify">
            <div class="button">

              <p  v-if="user.userId==publication.userId || user.isAdmin">
              <button  @click="supprimer(publication.id)" id="btn-supp" type="submit">Supprimer</button>
              </p>
              </div>
           
          </div>
          <div class="Comments">
            <div class="createComment">
          

     <textarea type="text" v-bind:id="publication.id" class="coms"  v-model="dataComs[publication.id]" placeholder="Ajouter un commentaire..."></textarea> 
     <div class="button-comment">
      <button type="submit" v-on:click="commenter(publication.id)" id="valider">Commenter</button>

    </div>

          </div>
        <div class="allComments">
          <Comments />
          
          </div>
      </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script>


import NavBarTwo from "../components/NavBarTwo.vue";
import axios from "axios";
import Comments from '../components/Comments.vue';
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
      Comments: [],
      publications: [],
      userId: "",
      dataComs:{},
      allComments:{}
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
      axios.get("http://localhost:3000/api/publications" , {
          headers: { Authorization: "Bearer " + localStorage.token },
        })

        .then((response) => {
          console.log("publications", response.data);
          this.publications = response.data;
          this.image = response.data.image;
        });
    },
    supprimer(id) {
    if (window.confirm("Souhaitez-vous réellement supprimer cette publication?"))
            axios
            .delete("http://localhost:3000/api/publications/"+ id, {
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem("token")
                },
            })
            .then(() => {
                window.location.reload();
            })
            .catch(error => console.log(error));
        },
        commenter(postId) { 
           if (this.dataComs[postId] !== null) {
                axios.post("http://localhost:3000/api/comments", {
                    content: this.dataComs[postId],
                    post_id: postId,
                    
                },
                {
                    headers: {
                        Authorization: "Bearer " + window.localStorage.getItem("token")
                    }
                })
                .then(response => {
                    console.log(response);
                   window.location.reload();
                    
                })
                .catch(error => console.log(error));
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