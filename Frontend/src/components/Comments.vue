<template>
    <section >
 <div class="comment" v-for="comment in comments" :key='comment.id'  >

<div class="userComment">

    <p> {{ comment.User.username }}</p>
    <p> {{ comment.message }}</p>
    

</div>

<button class="delete" @click="removeComment(comment.id)" v-if="user.userId == comment.userId || user.isAdmin">Supprimer</button>

    </div>

<div class="button-comment">

     <input class="coms" id="coms" v-model="message" placeholder="Ajouter un commentaire..."> 
     <button class="valider" @click="commenter">Commenter</button>

    </div>
    </section>

</template>

<script>

import axios from "axios";

export default {
    name: "Comments", 
        
   
  data(){
        return{
            comments:[],
            publication:[],
            user:"",
           
            username:"",
            commentId:"",
            comment:[],
            user_id:"",
            post_id:"",
            message:""

        }
    },

     methods:{  
loadUser() { 
        axios.get("http://localhost:3000/api/user/profil", {headers: {Authorization: 'Bearer ' + localStorage.token}})
        .then(response => {
            
            this.user = response.data.user;
        })
        
        .catch(error => {
            console.log("Impossible de traiter les données du profil ! >" + error);
        }) 
},

        commenter(){
            
            var formData = new FormData();
            formData.append("comment", this.message);
            formData.append("user_id", this.user.id);
            formData.append("post_id", this.publication.id)
                
            axios.post ("http://localhost:3000/api/comments", formData, { headers: { "Authorization":"Bearer " + localStorage.token}})   
           .then((response) => {
                alert("Votre commentaire à bien été créée !")
          console.log(response);
          this.comment = response.data.comment;
          window.location.reload();
        })
        .catch((error) => console.log(error));
    
        },
        getAllComments(){

        axios.get("http://localhost:3000/api/comments/postId" +this.publication.id , {
          headers: { Authorization: "Bearer " + localStorage.token },
        })

        .then((response) => {
          console.log("comments", response.data);
          this.comments = response.data;
         
        });

}
        
    },
    mounted(){
        
       this.getAllComments;

      
    
    }

}

</script>
