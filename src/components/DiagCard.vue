<template>
    <div class="card">
      <img :src="currentImage" alt="Custom Image" class="card-image">
      <h2>{{ currentHeader }}</h2>
      <p>{{ currentParagraph }}</p>
      <button @click="navigateToSurvey">{{ buttonText }}</button>
      <div class="navigation">
        <button @click="prevItem" :disabled="previousButtonDisable">←</button>
        <button @click="nextItem" :disabled="nextButtonDisable">→</button>
      </div>
    </div>
  </template>

<script setup>
import {ref, computed} from 'vue'
import { useRouter} from 'vue-router'
import { store } from '@/store';

const router = useRouter()
const diagName = ref('')
const currentIndex = ref(0)
const items = [
    {
        image: 'src/assets/image1.png',
        header: 'Mesurer la vision produit',
        paragraph: "La vision correspond à la raison d'être d'un produit, grâce à laquelle on sait identifier qui sont les clients ainsi que leurs besoins."
      },
      {
        image: 'src/assets/image2.png',
        header: 'Collaborer en Équipe',
        paragraph: "Collaborer en équipe correspond à la transparence, la confiance et la collaboration dans le travail entre les membres d'une équipe."
      },
      {
        image: 'src/assets/image3.png',
        header: 'Strategie Produit',
        paragraph: "Le e-diagnostic se déroule sur le thème Stratégie Produit."
      },
      // for the moment this is hardcoded, I need to figure a way to fetch these from somewhere
    ];
    
const buttonText = 'Essayez maintenant';

const currentImage = computed(() => items[currentIndex.value].image);
const currentHeader = computed(() => items[currentIndex.value].header);
const currentParagraph = computed(() => items[currentIndex.value].paragraph);

const changeValue = () => {
      diagName.value = currentHeader.value
      store.diagName = currentHeader.value;
    };
    
const navigateToSurvey = () => {
    changeValue();
    if (store.diagName) {
        router.push({ name: 'Survey' });
      }
    };

const prevItem = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--
    }
};

const nextItem = () => {
    if (currentIndex.value < items.length - 1) {
        currentIndex.value++
      }
    };

const previousButtonDisable = computed(() =>{
  return currentIndex.value ===0;
})
const nextButtonDisable = computed(() => {
  return currentIndex.value === items.length - 1;
});

</script>

<style scoped>
.card {
  background: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
  color: #250070;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.card-image {
  width: 55%;
  height: auto;
}
.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
button {
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
button:hover {
  background-color: #3700b3;
}
button:disabled{
  opacity: 50%;
}
</style>