<template>
    <section >

   <div class="Comments">
            <div class="createComment">
          

     <textarea type="text" v-bind:id="publicationId" class="coms"  v-model="dataComs[publicationId]" placeholder="Votre commentaire..."></textarea> 
     <div class="button-comment">
      
      <button type="submit" v-on:click="commenter(publicationId)" id="valider"><i title="Commenter" class="fas fa-comment"></i></button>
      
    </div>
            </div>

   <div class="allComments">

 <div class="comment" v-for="comment in comments" :key='comment.id'  >

<div class="userComment">
    <div class="imgUsername">

        <img class="anonymeComment" src="../assets/profil.png"  alt="photo de profil">

    </div>

    <div class="commentInfos">

    <p class="usernameComment"> {{ comment.User.username }}</p>
    <p class="contentComent"> {{ comment.content }}</p>

    </div>
    
<p v-if="user.id==comment.user_id || user.isAdmin">
<button class="deleteComment"   @click="removeComment(comment.id)" type="submit" ><i title="Supprimer" class="fas fa-trash-alt"></i></button>
</p>
</div>

<div class="dateAndTrash">

<p class="dateComment">{{ comment.formatDate }}</p>



    </div>
 </div>
 </div>
   </div>
    </section>

</template>

<script>

import axios from "axios";
import moment from 'moment';

export default {
    
    name: "Comments", 

    props : [
        "publicationId"
    ],
      
   
  data(){
        return{
            comments:[],
            userId:"",
            content:"",
            user:{
                usersame:""
            },
            dataComs: {},
           
            

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
           
            this.comments = response.data.map(p => {
            let date = moment(p.createdAt)
            p.formatDate = date.format('DD/MM/YYYY HH:mm')
            return p;
          }) 
            console.log('comments',this.comments)
        
        })
        .catch(error => console.log(error));
    },

methods: {
    removeComment(commentaireId){
            console.log(commentaireId)
            axios.delete('http://localhost:3000/api/comments/'   + commentaireId,{ headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((res)=>{
                console.log(res)
                alert('Le commentaire a bien été supprimé !')
                let newComments = this.comments.filter((c) => c.id != commentaireId);
                this.comments = newComments;
                
            })
            .catch((error)=> { 
                console.log(error)
            })
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
                   let newComment = response.data.comment;
                   newComment.User = this.user;

                   let date = moment(newComment.createdAt);
                   newComment.formatDate = date.format("DD/MM/YYYY HH:mm");

                   this.comments.push(newComment);
                })
                .catch(error => console.log(error));
            }
        },
}
   
}

</script>

<style>

.anonymeComment {

    height: 40px;
    width: 40px;
    border-radius: 50px;
}

.userComment {
    display: flex;
    flex-wrap: wrap;
    margin-left: 2em;
    flex-direction: row;
}

.commentInfos {
    margin-left: 1em;
    border: solid rgb(222, 222, 222);
    border-radius: 30px;
    width: 70%;
    padding-left: 1em;
    background-color: rgb(230, 230, 230);
}

.usernameComment {

   font-weight: 800;
    font-size: larger;
} 

.dateComment {

    margin-left: 6em;
}

 button.deleteComment { 
   
    width: 30px;
    margin-top: 0;
    margin-top: 1em;
    margin-left: 1em;

}

.createComment textarea {
      margin-left: 1em;
    border: solid rgb(222, 222, 222);
    border-radius: 20px;
    width: 85%;
    padding-left: 1em;
    background-color: rgb(235, 235, 243); 
    height: 50px;  
    margin-top: 1em;
    padding-top: 1em;
    font-size: large;
    margin-right: 1em; 
   
}

.createComment {

  display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-right: 1em;
    margin-bottom: 2em;
}

#valider {

  font-size: 20px;
  width: 50px;
  margin-top: 1em;
  margin-left: -0.5em;
}

.allComments {
  margin-top: 1em;
}

@media(max-width:1280px) {
    .createComment textarea {
        width: 80%
    }
}

@media(max-width:1024px) {

  .createComment textarea {
    width: 75%;
    margin-left: 0.5em ;
  }
}

@media(max-width:916px) {

  .createComment textarea {

    width: 75%;
    margin-left: 0.5em;

  }

  .commentInfos {

      margin-left: 0.5em;
  }

  .userComment {

      margin-left: 1em;
  }
}

@media(max-width: 820px) {

  .commentInfos {

      width: 60%;
  }
}

@media(max-width: 720px) {

    .createComment textarea {

        width: 70%;
    }
}

@media(max-width: 320px) {

    .createComment textarea {

        width: 70%;
    }

    .createComment {

        margin-right: 0.5em;
    }
}

@media(max-width: 295px)
{
    .createComment textarea {

        width: 65%;
    }

    .commentInfos {

        width: 55%;
    }
}

@media(max-width: 280px) {

    .createComment {

        margin-right: 0.5em;
    }

    .userComment {

        margin-left: 1em;
    }

    button.dateComment {

        margin-left: 0.5em;
    }

    .commentInfos {

        margin-left: 0.5em;
        width: 55%
    }

   
}

</style>
