<template>
<div class="container">
        <div class="left-column">
            <h1>{{ elements[currentIndex].title }}</h1>
            <p>{{ elements[currentIndex].blabla }}</p>
            <button class="next-button" @click="nextContent">{{ buttonText() }}</button>
        </div>
        <div class="right-column">
            <img :src="elements[currentIndex].image">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const currentIndex = ref(0);
const elements = [
    {
        title: "Bienvenue sur la Web App ARGIOS",
        blabla: "Tu es bien arrivé.e à destination ! Nous sommes ravis de t'accueillir Tu vas pouvoir dérouler l'e-diagnostic.",
        image:"src/assets/welcome.png"
    },
    {
        title: "Environs 15 minutes",
        blabla: "Tu vas passer 15 min à répondre à des questions concernant la thématique choisie. A tout moment tu verras ta progression grâce à une jauge que se remplira.",
        image:"/src/assets/clock.png"
    },
    {
        title: "Besoin d'aide ?",
        blabla: "Et puis si tu as une question pas d'inquiètude des consultants Argios sont là pour y répondre et pour t'accompagner tout au long de cette aventure.",
        image:"src/assets/help.png"
    }
];

const buttonText = () => {
    return currentIndex.value < elements.length - 1 ? 'Suivant →' : 'Commencer';
}
const nextContent = () => {
      if (currentIndex.value < elements.length - 1) {
        currentIndex.value++;
      } else {
        router.push({ name: 'DiagCard' });
      }
    }

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
}

.right-column {
    width: 66.67vw ;
    background: linear-gradient(135deg, #e3b0ff, #a1c4fd);
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
    font-size: 2rem;
    color: #3b1d82;
    margin-bottom: 1rem;
    font-family: 'Azo Sans';
}

p {
    font-size: 1rem;
    color: #333333;
    margin-bottom: 2rem;
    font-family: 'Azo Sans';
}

.next-button {
    background-color: #6a0dad;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 4px;
}

.next-button:hover {
    background-color: #5a009a;
}

img {
    max-width: 100%;
    height: auto;
}

</style>