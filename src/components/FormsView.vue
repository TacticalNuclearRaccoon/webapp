<template>
  <div class="container">
    <div class="left-column">
      <form action="">
        <label for="prenom">Prénom</label>
        <input type="text" v-model="prenom" placeholder="Jean" id="prenom">
        <label for="nom">Nom</label>
        <input type="text" v-model="nom" placeholder="Dupont" id="nom">
        <label for="secteur">Secteur d'activité</label>
        <input type="text" v-model="secteur" placeholder="Retail" id="secteur">
        <label for="email">Email</label>
        <input type="email" v-model="email" placeholder="jdupont@gmail.com" required id="email">
    </form>
    <button class="submit-button" @click="saveInfo()">Submit</button>
    </div>
    <div class="right-column">
      <img src="/Users/deni-kun/Documents/v2/plastik/src/assets/form.png">
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';

const prenom = ref('')
const nom = ref('')
const secteur = ref('')
const email = ref('')
const router = useRouter()

const saveInfo = async () => {
  try {
    const userAnswers = {prenom: prenom.value, nom: nom.value, secteur:secteur.value, email: email.value}
    await axios.post('http://localhost:3000/userInfo', userAnswers);
    console.log('Information saved successfully');
    goFinal();
  } catch (error) {
    console.log("Error saving information:", error);
  }
};

const goFinal = () => {
  router.push({ name: 'CompletionView' });
};


</script>

<style scoped>
.container {
    display: flex;
    width: auto;
    height: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.left-column {
    width: 33.33vw;
    background-color: #ffffff;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: 'Azo Sans';
}
input{
    display: block;
    margin-bottom: 10px;
    margin-top: 5px;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-bottom: 1 px solid #ddd;
    color: #555;
    font-family: 'Azo Sans';
}

.label{
  font-family: 'Azo Sans';
}

form{
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}

.right-column {
    width: 66.67vw ;
    background: linear-gradient(135deg, #e3b0ff, #a1c4fd);
    display: flex;
    justify-content: center;
    align-items: center;
}

.submit-button {
    background-color: #6a0dad;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 4px;
    margin-top: 40px;
}

.submit-button:hover {
    background-color: #5a009a;
}

img {
    max-width: 100%;
    height: auto;
}

</style>