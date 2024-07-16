
<template>
  <div class="survey-container">
    <h1>{{ ediag }}</h1>
    <section v-if="loading">
      <p>Loading...</p>
    </section>
    <section v-if="!diagCompleted && !loading">
      <div class="tabs" v-if="planets.length">
        <button 
          v-for="(planet, index) in planets" 
          :key="index" 
          :class="{'active-tab': currentPlanetName === planet}"
          @click="selectPlanet(planet)">
          {{ planet }}
        </button>
      </div>
      <div v-if="stateZero">
        <p>Choisissez une famille de dysfonctionnement pour commencer</p>
      </div>
      <div v-else>
        <h2>{{ currentPlanetName }}</h2>
        <div class="main-text" v-if="getCurrentQuestion">
          <span>{{ getCurrentQuestion.question }}</span>
        </div>
        <div v-if="getCurrentQuestion">
          <div class="radio-item" v-for="(option, index) in getCurrentQuestion.options" :key="index">
            <input type="radio" :id="'radio' + index" :name="getCurrentQuestion.index" :value="index" v-model="getCurrentQuestion.selected" @change="setAnswer" />
            <label :for="'radio' + index">{{ option }}</label>
          </div>
        </div>
        <button class="btn-grad" @click="nextQuestion" :disabled="isButtonDisabled()">{{ getButtonText() }}</button>
      </div>
    </section>
    <section v-else-if="diagCompleted">
      <h2>e-Diagnostic terminé</h2>
      <p>Merci beaucoup</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { store } from '@/store';
import { useRoute } from 'vue-router';
import axios from 'axios';

const diagName = computed(() => store.diagName);
const route = useRoute();
const questions = ref({});
const diagCompleted = ref(false);
const currentQuestion = ref(0);
const loading = ref(true);

const ediag = diagName.value;

const fetchQuestions = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/${ediag}`);
    const groupedQuestions = response.data.reduce((acc, question) => {
      if (!acc[question.planet]) {
        acc[question.planet] = [];
      }
      acc[question.planet].push({ ...question, selected: null });
      return acc;
    }, {});
    questions.value = groupedQuestions;
    loading.value = false;
  } catch (error) {
    console.log("Error fetching questions:", error);
  }
};

watch(diagName, (newVal) => {
  loading.value = true;
  fetchQuestions(newVal);
});

const saveAnswers = async () => {
  try {
    const UserAnswers = Object.values(questions.value).flat().map((q) => ({ question: q.question, answer: q.selected }));
    await axios.post('http://localhost:3000/answers', UserAnswers);
    console.log('Answers saved successfully');
  } catch (error) {
    console.log("Error saving answers:", error);
  }
};

onMounted(() => {
  fetchQuestions(route.params.diagName);
});

watch(route, (newRoute) => {
  fetchQuestions(newRoute.params.diagName);
});

const planets = computed(() => Object.keys(questions.value));

const currentPlanet = ref(planets.value[0]);

const currentPlanetName = computed(() => currentPlanet.value);

const currentPlanetQuestions = computed(() => {
  return questions.value[currentPlanet.value] || [];
});

const getCurrentQuestion = computed(() => {
  if (!currentPlanetQuestions.value || currentPlanetQuestions.value.length === 0) return null;
  const question = currentPlanetQuestions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  return question;
});

const stateZero = computed(() => {
  return !getCurrentQuestion.value;
});

const setAnswer = (evt) => {
  questions.value[currentPlanet.value][currentQuestion.value].selected = evt.target.value;
};

const selectPlanet = (planet) => {
  currentPlanet.value = planet;
  currentQuestion.value = 0;
};

const nextQuestion = () => {
  if (currentQuestion.value < currentPlanetQuestions.value.length - 1) {
    currentQuestion.value++;
  } else {
    const currentIndex = planets.value.indexOf(currentPlanet.value);
    if (currentIndex < planets.value.length - 1) {
      currentPlanet.value = planets.value[currentIndex + 1];
      currentQuestion.value = 0;
    } else {
      diagCompleted.value = true;
      saveAnswers();
    }
  }
};

const getButtonText = () => {
  if (!getCurrentQuestion.value || getCurrentQuestion.value.index === currentPlanetQuestions.value.length - 1) {
    return 'Terminer';
  }
  if (getCurrentQuestion.value.selected === null) {
    return 'Choisir une réponse';
  }
  return 'Question suivante';
};

const isButtonDisabled = () => {
  return !getCurrentQuestion.value || getCurrentQuestion.value.selected === null;
};
</script>
  
  <style scoped>
  .survey-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px;
  }
  .main-text {
    background-color: white;
    color: #250070;
    border-radius: 5px;
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    width: 100%;
    font-family: 'Azo Sans';
  }
  
  .buttons {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .progress-bar {
    width: 100px;
    height: 100px;
    margin: 0 auto 1rem;
  }
          
  .btn-grad {
    background-image: linear-gradient(to right, #ff6e7f 0%, #bfe9ff  51%, #ff6e7f  100%);
    margin: 10px;
    padding: 15px 45px;
    text-align: center;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    display: block;
    font-weight: 700;
    font-size: 1.25rem;
  }

  .btn-grad:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
  .btn-grad:disabled{
    opacity: 0.5;
  }

  /*radio item*/
  .radio-item [type="radio"] {
  display: none;
}

.radio-item + .radio-item {
  margin-top: 15px;
}

.radio-item label {
  display: block;
  padding: 20px 60px;
  background: #ece9e9;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  min-width: 250px;
  white-space: nowrap;
  position: relative;
  transition: 0.4s ease-in-out 0s;
}

.radio-item label:after,
.radio-item label:before {
  content: "";
  position: absolute;
  border-radius: 50%;
}

.radio-item label:after {
  height: 19px;
  width: 19px;
  border: 2px solid #524eee;
  left: 19px;
  top: calc(50% - 12px);
}

.radio-item label:before {
  background: #524eee;
  border: 2px solid #524eee;
  height: 19px;
  width: 19px;
  left: 19px;
  top: calc(50% - 12px);
  transform: scale(5);
  opacity: 0;
  visibility: hidden;
}

.radio-item [type="radio"]:checked ~ label {
  border-color: #524eee;
}

.radio-item [type="radio"]:checked ~ label::before {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

/*Styles for planet tabs*/
  .tabs {
    display: flex;
    margin-bottom: 20px;
  }

  .tabs button {
    margin-right: 10px;
    padding: 10px;
    border: none;
    background: #ddd;
    cursor: pointer;
  }

  .tabs button.active-tab {
    background: #333;
    color: white;
  }

  .survey-container .btn-grad {
    margin-top: 20px;
  }

  </style>
    