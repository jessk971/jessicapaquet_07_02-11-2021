<template>
    <section >

    <div v-for="comment in comments" :key='comment.id' class="comment" >

<div class="userComment">

    <p> {{ user.username }}</p>
    <p> {{ publication.comment }}</p>
    

</div>

<button class="delete" @click="removeComment(comment.id)" v-if="user.userId == comment.userId || user.isAdmin">Supprimer</button>

    </div>

<div class="button-comment">

     <input class="coms" id="coms" v-model="comment" placeholder="Ajouter un commentaire..."> 
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
            comment:"",
            user_id:"",
            post_id:""

        }
    },

     methods:{  

        startedComments(){
            axios.get('http://localhost:3000/api/comments' + this.publication.id ,{ headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((response)=>{ 
                this.comment = response.data.comment
            })
            .catch((error)=> { 
                console.log(error)
            })
        },
        removeComment(commentId){
            console.log(commentId)
            axios.delete('http://localhost:3000/api/comments/' + this.publication.id  + commentId,{ headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((res)=>{
                console.log(res)
                alert('Le commentaire a bien été supprimé !')
                this.startedComments()
            })
            .catch((error)=> { 
                console.log(error)
            })
        },
        commenter(){
            
             var formData = new FormData();
            formData.append("comment", this.comment);
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
    },
    mounted(){
        this.startedComments();
         axios.get("http://localhost:3000/api/user/profil", {headers: {Authorization: 'Bearer ' + localStorage.token}})
        .then(response => {
            
            this.user = response.data.user;
        })
        
        .catch(error => {
            console.log("Impossible de traiter les données du profil ! >" + error);
        })
    
    }

}

</script>
