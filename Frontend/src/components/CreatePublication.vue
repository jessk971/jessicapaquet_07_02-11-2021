<template>
   <section class="container">
       <NavBarTwo />

<form @submit.prevent="createPublication">

       <div class="created">
           <label for="content">Quoi de neuf?</label>
           <textarea class="textarea" v-model="contentPublication" placeholder="Entrez le texte ici ..."></textarea>

       </div>/
       <div class="uploadImg">
           <label for="media">
           <input type="file" @change="uploadImg" accept="image/png, image/jpeg, image/jpg, image/gif" id="media" name="media">
           <i class="fas fa-upload"></i>
          
           </label>
       </div>
           <button type="submit" class="btn" @submit.prevent="sendFile()">Publier</button>
           </form>

   </section> 

</template>


<script>

import NavBarTwo from "../components/NavBarTwo.vue"
//import axios from 'axios'
export default {
    name: 'CreatePublication', 
    components: {
        NavBarTwo,
    }
        
    
}
</script>

<style>

.container form { 
display: flex;
    flex-wrap: wrap;
    background-color: white;
    border: solid transparent;
    border-radius: 10px;
    margin: auto;
    width: 600px;
    flex-direction: column;
    padding-top: 2em;
    line-height: 2.5em;
    opacity: 0.9;
    padding-bottom: 2em;
    box-shadow: 4px 2px 2px rgb(77, 77, 77);
    margin-top: 5%;
    }

    .created {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-right: 1em;
    margin-left: 1em;
    }

    .created label {
margin-bottom: 1em;
    }

    .created textarea {
       border: solid gray; 
    }

    button {
        margin-top: 0;
    }

</style>