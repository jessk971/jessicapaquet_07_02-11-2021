<template>
    <section >
 <div class="comment" v-for="comment in comments" :key='comment.id'  >

<div class="userComment">

    <p> {{ comment.User.username }}</p>
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
        
   
  data(){
        return{
            comments:[],
            publications:[],
            postId:"",
            userId:"",
            id:"",
            user:{
                usersame:""
            }
           
            

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

       this.getAllComments();
},

   methods: {
        getAllComments(id) {
            this.post_id = id
            axios.get("http://localhost:3000/api/publications/" +id + "/comments", 
            {
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem("token")
                }
            })
            .then(response => {
            console.log(response);
            this.comments = response.data;
            console.log('Comments',this.comments)
               
            })
            .catch(error => console.log(error));
        },      
   }
      
    
    

}

</script>
