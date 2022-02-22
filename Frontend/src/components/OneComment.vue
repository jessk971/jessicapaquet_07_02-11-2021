<template>
    <section>
         <div v-for="comment in comments" :key='comment.id' class="comment" >

<div class="userComment">

    <p> {{ comment.User.username }}</p>
    <p> {{ comment.comment }}</p>
    

</div>

<button class="delete" @click="removeComment(comment.id)" v-if="user.userId == comment.userId || user.isAdmin">Supprimer</button>

    </div>
    </section>
</template>

<script>

import axios from 'axios'

export default {
    name:"OneComment",

    data() {
        return {
            publication:[],
            user:"",
            username:"",
            comments:[],
            comment:"",
            userId:"",
            id:"",
            commentsId:""

        }
        
    },

     mounted(){
         axios.get("http://localhost:3000/api/user/profil", {headers: {Authorization: 'Bearer ' + localStorage.token}})
        .then(response => {
            
            this.user = response.data.user;
        })
        
        .catch(error => {
            console.log("Impossible de traiter les données du profil ! >" + error);
        })
    
    },
methods: {
getAllComments() {
      axios
        .get("http://localhost:3000/api/comments" , {
          headers: { Authorization: "Bearer " + localStorage.token },
        })

        .then((response) => {
          console.log("comments", response.data);
          this.comments = response.data;
         
        });
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
}
}
</script>