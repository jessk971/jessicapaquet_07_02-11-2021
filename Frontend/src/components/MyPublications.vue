<template>
  <section>
   

    <div id="wall">
      <h2 class="title-wall">Mes Publications</h2>
<div v-for="publication in publications" :key="publication.id">
      <div class="publicationForm">
        <div class="user-publication">
          <div class="userPostSup">
          <div class="utilisateurs">
            <img class="anonymeUser" src="../assets/profil.png" width="100px" alt="photo de profil">

            <div class="user-infos">
            <p class="username"> {{ publication.User.username }}</p>
            <p class="date"> {{ publication.formatDate }} </p>
            </div>
          </div>
           <div class="modify">
            

            <div class="Supp">

              <p  v-if="user.id==publication.user_id || user.isAdmin">
              <button  @click="supprimer(publication.id)" class="btn-supp" type="submit"><i title="Supprimer" class="fas fa-trash-alt"></i><span>Supprimer</span></button>
              </p>
              </div>
           
            
          </div>
          </div>
          <p class="publication-content">{{ publication.content }}</p>

          <div v-if="publication.image != null" class="publication-img">
            <img class="img"  :src="publication.image">
          </div>
         
         
          </div>
        
          <Comments :publicationId="publication.id"  />
          
          
      
        
      </div>
    </div>
  </div>
  </section>
</template>

<script>

import axios from "axios";
import moment from "moment";
import Comments from '../components/Comments.vue';

export default {
  name: "MyPublications",
  props: ["user"],
  components: {
    Comments,
  },
  

  data() {
    return {
    
      id: "",
      content: "",
      image: "",
      Comments: [],
      publications: [],
      userId: "",
      
      
    };
},

 methods: {
    

    getAllMyPublications() {
        console.log(this.user)
      axios.get("http://localhost:3000/api/publications/myPost/" +this.user.id  , {
          headers: { Authorization: "Bearer " + localStorage.token },
        })

        .then((response) => {
          console.log("publications", response.data);
          this.publications = response.data.map(p => {
            let date = moment(p.createdAt)
            p.formatDate = date.format('DD/MM/YYYY HH:mm')
            return p;
          })
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
                const newPublications = this.publications.filter(p =>(p.id != id));
                this.publications = newPublications
            })
            .catch(error => console.log(error));
        },

 },
  mounted() {
    
      this.getAllMyPublications()

  }

 

}
</script>

<style>
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

.btn-supp {

  margin-right: -1em;
  padding-right: 1em;
}

.btn-supp i {

  visibility: hidden;
}

.publicationForm:hover {
  box-shadow: 1px 2px 20px rgb(15, 15, 15);
}


.modify {

  display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-right: 2em;
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
    
}

.userPostSup {

  display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: solid grey;
    margin-bottom: 2em;

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

 @media(max-width: 654px) {

  .publicationForm {

    width: 100%;
    box-shadow: none;
    border: none;
  }
}
 @media(max-width:412px){
   

    #wall h1 {

      font-size: 60px;
    }

    
  }

  @media(max-width: 325px)
{
  .btn-supp i {

    visibility:visible;
    
  }

  .btn-supp {

    width: 40px;
    padding-right: 0.5em;
  }

  .btn-supp span {

    display: none;
  }
}

@media(max-width: 320px) {


  #wall h1 {
    font-size: 50px;

  }
}


  @media(max-width:280px) {

    #wall h1 {

      font-size: 40px;
    }

    
  }
</style>