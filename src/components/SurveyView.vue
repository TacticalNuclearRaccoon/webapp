<template>
  <div class="survey-container">
    <section v-if="loading">
      <p>Loading...</p>
    </section>
    <section v-if="!diagCompleted && !loading" class="survey-content">
      <div class="side-container">
        <div class="tabs" v-if="planets.length">
          <div v-for="(planet, index) in planets" :key="index" class="planet-tab">
            <CircularProgress :progress="planetProgress[planet]" />
            <button 
              :class="{'active-tab': currentPlanetName === planet}"
              @click="selectPlanet(planet)">
              {{ planet }}
            </button>
          </div>
        </div>
        <div class="progress-container">
          <ProgressBar :bgcolor="'#ff5f6d'" :completed="surveyProgress" />
          <span></span>
        </div>
      </div>
      <div class="main-container">
        <div v-if="stateZero">
          <p>Choisissez une famille de dysfonctionnement pour commencer</p>
        </div>
        <div v-else>
          <h2>{{ currentPlanetName }}</h2>
          <div class="main-text" v-if="getCurrentQuestion">
            <span>{{ getCurrentQuestion.question }}</span>
          </div>
          <div v-if="getCurrentQuestion">
            <div class="wrapper">
              <div class="radio-item" v-for="(option, index) in getCurrentQuestion.options" :key="index">
                <input type="radio" :id="'radio' + index" :name="getCurrentQuestion.index" :value="index" v-model="getCurrentQuestion.selected" @change="handleAnswerChange" />
                <label :for="'radio' + index">{{ option }}</label>
              </div>
            </div>
          </div>
          <button class="btn-grad" @click="goBack" :disabled="false">{{ getButtonText() }}</button>
        </div>
      </div>
    </section>
    <section v-else-if="diagCompleted">
      <h2>e-Diagnostic terminé</h2>
      <p>Merci beaucoup</p>
      <button class="next-btn" @click="router.push({ name: 'Forms' })">Suivant</button>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { store } from '@/store';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ProgressBar from '@/components/ProgressBar.vue';
import CircularProgress from '@/components/CircularProgress.vue';

const router = useRouter();
const route = useRoute();
const diagName = computed(() => store.diagName);
const questions = ref({});
const diagCompleted = ref(false);
const currentQuestion = ref(0);
const loading = ref(true);
const ediag = diagName.value;
const currentPlanet = ref(null);

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
    if (planets.value.length > 0) {
      currentPlanet.value = planets.value[0];
    }
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
const currentPlanetName = computed(() => currentPlanet.value);
const currentPlanetQuestions = computed(() => questions.value[currentPlanet.value] || []);

const getCurrentQuestion = computed(() => {
  if (!currentPlanetQuestions.value || currentPlanetQuestions.value.length === 0) return null;
  const question = currentPlanetQuestions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  return question;
});

const stateZero = computed(() => !getCurrentQuestion.value);

const setAnswer = (evt) => {
  questions.value[currentPlanet.value][currentQuestion.value].selected = evt.target.value;
};

const nextQuestion = () => {
  if (currentQuestion.value < currentPlanetQuestions.value.length - 1) {
    currentQuestion.value++;
  } else {
    const currentIndex = planets.value.indexOf(currentPlanet.value);
    if (currentIndex < planets.value.length - 1) {
      currentPlanet.value = planets.value[currentIndex + 1];
      currentQuestion.value = 0;
    } else if (isSurveyComplete.value) {
      diagCompleted.value = true;
      saveAnswers();
    }
  }
};

const handleAnswerChange = async (evt) => {
  setAnswer(evt);

  // Save the current answer to the server
  try {
    const UserAnswers = Object.values(questions.value).flat().map((q) => ({
      question: q.question,
      answer: q.selected,
    }));
    await axios.post('http://localhost:3000/answers', UserAnswers);
    console.log('Answer saved successfully');
  } catch (error) {
    console.log("Error saving answer:", error);
  }

  // Move to the next question
  nextQuestion();
};

const selectPlanet = (planet) => {
  currentPlanet.value = planet;
  currentQuestion.value = 0;
};

const isSurveyComplete = computed(() => {
  return Object.values(questions.value).flat().every(q => q.selected !== null);
});

const goBack = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--;
  } else {
    const currentIndex = planets.value.indexOf(currentPlanet.value);
    if (currentIndex > 0) {
      currentPlanet.value = planets.value[currentIndex - 1];
      currentQuestion.value = questions.value[currentPlanet.value].length - 1;
    }
  }
  if (questions.value[currentPlanet.value][currentQuestion.value].selected !== null) {
    questions.value[currentPlanet.value][currentQuestion.value].selected = null;
  }
};

const getButtonText = () => {
  return 'Précédent';
};

const surveyProgress = computed(() => {
  const totalQuestions = Object.values(questions.value).flat().length;
  const answeredQuestions = Object.values(questions.value).flat().filter(q => q.selected !== null).length;
  return Math.round((answeredQuestions / totalQuestions) * 100);
});

const planetProgress = computed(() => {
  const progress = {};
  planets.value.forEach((planet) => {
    const planetQuestions = questions.value[planet];
    const totalQuestions = planetQuestions.length;
    const answeredQuestions = planetQuestions.filter(q => q.selected !== null).length;
    progress[planet] = Math.round((answeredQuestions / totalQuestions) * 100);
  });
  return progress;
});

</script>

<style scoped>
.survey-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.survey-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.side-container {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 20px;
  border-right: 2px solid #ece9e9;
  height: 100%;
  overflow-y: auto;
  width: 15%;
}

.tabs {
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.planet-tab {
  display: flex;
  align-items: center;
  margin-bottom: 0px;
}

.tabs button {
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  background-color: #ece9e9;
  cursor: pointer;
  font-size: 16px;
}

.tabs button.active-tab {
  background-color: #dcdcdc;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.main-container h2 {
  text-align: center;
  font-family: 'Azo Sans';
}

.main-text {
  width: 50vw;
  height: 50vh;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 14px 44px rgba(37, 0, 112, 0.2);
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
  font-size: 24px;
  color: #250070;
  font-family: 'Azo Sans';
  margin-bottom: 20px;
  box-sizing: border-box;
}

.main-text span {
  padding: 10%;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.radio-item {
  position: relative;
  flex: 1 1 calc(50% - 20px); /* Two columns */
  margin-bottom: 10px;
}

input[type="radio"] {
  display: none; /* Hide the default radio button */
}

label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  background-color: #f2f2f2;
  width: 100%;
  box-sizing: border-box;
}

input[type="radio"]:checked + label {
  border-color: #ff5f6d; /* Change border color when selected */
  background-color: #ffe6e6; /* Change background color when selected */
}

label:hover {
  background-color: #e6e6e6; /* Change background on hover */
}

.progress-container {
  width: 100%;
  border-radius: 40px;
  background-color: rgba(243, 99, 17, 0.1);
  height: 16px;
  margin-bottom: 10px;
}

.btn-grad {
  background-image: linear-gradient(90deg, #ff5f6d, #ffc371);
  padding: 10px 40px;
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
  font-weight: 100;
  font-size: 1.25rem;
  cursor: pointer;
  margin-top: 20px;
}

.btn-grad:disabled {
  opacity: 0.5;
}

/* --- animations --- */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 black;
  }
  50% {
    box-shadow: 0 0 10px black;
  }
  100% {
    box-shadow: 0 0 0 black;
  }
}

</style>
