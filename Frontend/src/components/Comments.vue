<template>
    <section >
 <div class="comment" v-for="comment in comments" :key='comment.id'  >

<div class="userComment">

    <p> {{ comment.User.username }} {{ comment.createdAt.split(' ')[0] }}</p>
    <p> {{ comment.content }}</p>
    

</div>
<p v-if="user.userId==comment.userId || user.isAdmin">
<button class="delete" @click="removeComment(comment.id)" type="submit" >Supprimer</button>
</p>
    </div>


    </section>

</template>

<script>

import axios from "axios";

export default {
    
    name: "Comments", 

    props : [
        "publicationId"
    ],
      
   
  data(){
        return{
            comments:[],
            publications:[],
            
            userId:"",
            
            content:"",
            user:{
                usersame:""
            }
           
            

        }
    },

     mounted(){  
 
        axios 
        .get("http://localhost:3000/api/user/profil", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            
            this.user = response.data.user
            console.log('this.user',this.user)
        })
        .catch(error => console.log(error));
        axios .get(`http://localhost:3000/api/publications/${this.publicationId}/comments`, {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("token") 
            }
        })
        .then(response => {
           
            this.comments = response.data;
            console.log('comments',this.comments)
        
        })
        .catch(error => console.log(error));
    },

   
}

</script>
