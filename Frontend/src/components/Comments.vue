<template>
    <section class="container">

    <div v-for="comment in comments" :key='comment.id' class="comment" >

<div class="userComment">

    <p> {{ comment.username }}</p>
    <p> {{ comment.content }}</p>

</div>

<div class="delete" @click="removeComment(comment.id)" v-if="user.userId == comment.userId || user.isAdmin"><i class="fas fa-trash-alt"></i></div>

    </div>

<div class="button-comment">

     <input class="coms" id="coms" v-model="msg" placeholder="Ajouter un commentaire..."> 
     <button class="valider" @click="commentate">Commenter</button>

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
            content:"",
            username:""

        }
    },

     methods:{  

        startedComments(){
            axios.get('http://localhost:3000/api/comments/' + this.publication.id ,{ headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((response)=>{ 
                this.comments = response.data
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
        commentate(){
            const commentate = document.getElementById('commentate');
            if(!this.message == true){
                alert('Veuillez remplir le champ pour commenter')
            }
            else{
                commentate.addEventListener('keydown', (e) => {
                    if(e.key === 'Enter') {
                        axios.post('http://localhost:3000/api/comments/' + this.publication.id ,{message: this.message},{ headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
                        .then((response)=>{
                            console.log(response)
                            alert('Commentaire posté')
                            this.startedComments()
                        })
                        .catch((error)=> { 
                            console.log(error)
                        })
                    }
                    else{
                        console.log('impossible de commenter')
                    }
                })
            }
        },
    },
    mounted(){
        this.startedComments();
    }
}

</script>
