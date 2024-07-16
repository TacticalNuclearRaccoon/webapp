<template>
    <form action="">
        <label for="prenom">Prénom</label>
        <input type="text" v-model="prenom" placeholder="Jean">
        <label for="nom">Nom</label>
        <input type="text" v-model="nom" placeholder="Dupont">
        <label for="secteur">Secteur d'activité</label>
        <input type="text" v-model="secteur" placeholder="Retail">
        <label for="email">Email</label>
        <input type="email" v-model="email" placeholder="jdupont@gmail.com" required>
    </form>
    <button @click="saveInfo()">Submit</button>
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios';

const prenom = ref('')
const nom = ref('')
const secteur = ref('')
const email = ref('')

const saveInfo = async () => {
  try {
    const userAnswers = {prenom: prenom.value, nom: nom.value, secteur:secteur.value, email: email.value}
    await axios.post('http://localhost:3000/userInfo', userAnswers);
    console.log('Information saved successfully');
  } catch (error) {
    console.log("Error saving information:", error);
  }
};

</script>

<style>
form{
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}
label{
    color:#aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-bottom: 1 px solid #ddd;
    color: #555;
}
</style>