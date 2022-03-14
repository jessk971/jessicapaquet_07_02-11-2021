<template>
  <section>
   

    <div class="wall">

      <div v-for="publication in publications" :key="publication.id">
        <div class="publicationForm">
          <div class="user-publication">
            <div class="utilisateurs">
              <img
                class="anonymeUser"
                src="../assets/profil.png"
                width="100px"
                alt="photo de profil"
              />

              <div class="user-infos">
                <p class="username">{{ publication.User.username }}</p>
                <p class="date">{{ publication.formatDate }}</p>
              </div>
            </div>
            <p class="publication-content">{{ publication.content }}</p>
            <div v-if="publication.image != null" class="publication-img">
              <img class="img" :src="publication.image" />
            </div>

            <div class="Supp">
              <p v-if="user.id == publication.user_id">
                <button
                  @click="supprimer(publication.id)"
                  id="btn-supp"
                  type="submit"
                >
                  Supprimer
                </button>
              </p>
            </div>
          </div>
        </div>
        /
      </div>
    </div>
  </section>
</template>

<script>

import axios from "axios";
import moment from "moment"

export default {
  name: "MyPublications",
  

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
      
      
    };
},

 methods: {
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

    getAllMyPublications() {
      axios.get("http://localhost:3000/api/publications/myPost"  , {
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
      this.loadUser()
      this.getAllMyPublications()

  }

 

}
</script>