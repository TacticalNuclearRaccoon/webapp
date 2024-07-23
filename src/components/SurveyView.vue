<template>
  <div class="survey-container">
    <section v-if="loading">
      <p>Loading...</p>
    </section>
    <section v-if="!diagCompleted && !loading" class="survey-content">
      <div class="side-container">
        <div class="tabs" v-if="planets.length">
          <button 
            v-for="(planet, index) in planets" 
            :key="index" 
            :class="{'active-tab': currentPlanetName === planet}"
            @click="selectPlanet(planet)">
            {{ planet }}
          </button>
        </div>
        <div class="progress-container">
          <ProgressBar :bgcolor="'#6a1b9a'" :completed="currentPlanetProgress" />
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
            <div class="radio-item" v-for="(option, index) in getCurrentQuestion.options" :key="index">
              <input type="radio" :id="'radio' + index" :name="getCurrentQuestion.index" :value="index" v-model="getCurrentQuestion.selected" @change="setAnswer" />
              <label :for="'radio' + index">{{ option }}</label>
            </div>
          </div>
          <button class="btn-grad" @click="nextQuestion" :disabled="isButtonDisabled()">{{ getButtonText() }}</button>
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

const selectPlanet = (planet) => {
  currentPlanet.value = planet;
  currentQuestion.value = 0;
};

const isSurveyComplete = computed(() => {
  return Object.values(questions.value).flat().every(q => q.selected !== null);
});

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

const getButtonText = () => {
  if (isSurveyComplete.value) {
    return 'Terminer';
  }
  if (!getCurrentQuestion.value || getCurrentQuestion.value.selected === null) {
    return 'Choisir une réponse';
  }
  return 'Question suivante';
};

const isButtonDisabled = () => !getCurrentQuestion.value || getCurrentQuestion.value.selected === null;

const currentPlanetProgress = computed(() => {
  const totalQuestions = currentPlanetQuestions.value.length;
  const answeredQuestions = currentPlanetQuestions.value.filter(q => q.selected !== null).length;
  return Math.round((answeredQuestions / totalQuestions) * 100);
});

const navigateToForms = () => {
  changeValue();
  router.push({ name: 'Forms' });
};

</script>

<style scoped>
h2 {
  align-content: center;
}
p {
  align-content: center;
}
.survey-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 0px;
  width: 100%;
}

.survey-content {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.side-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 20px;
  border-right: 2px solid #ece9e9;
}

.tabs {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  width: 100%;
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
  flex-grow: 1;
  padding-left: 20px;
}

.main-text {
  width: 50%;
  display: flex;
  position: relative;
  padding: 25%;
  box-shadow: 0px 14px 44px rgba(37, 0, 112, 0.2);
  border-radius: 8px;
  background-color: #fff;
  height: 50%;
  text-align: center;
  font-size: 24px;
  color: #250070;
  font-family: 'Azo Sans';
}

.buttons {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.progress-container{
  width: 100%;
  position: relative;
  border-radius: 40px;
  background-color: rgba(243, 99, 17, 0.1);
  height: 16px;
}

.btn-grad {
  background-image: linear-gradient(to right, #ff6e7f 0%, #bfe9ff  51%, #ff6e7f  100%);
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
}

.btn-grad:disabled {
  opacity: 0.5;
}

/*radio item*/
.radio-item [type="radio"] {
  display: none;
}

.radio-item + .radio-item {
  margin-top: 10px;
}

.radio-item label {
  display: block;
  padding: 10px 60px;
  background: #ece9e9;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  position: relative;
}


.radio-item label:after {
  background-image: linear-gradient(145deg, #bfbfbf, #ececec);
  box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.2) inset,
    0px -4px 4px 0px rgba(255, 255, 255, 0.2) inset,
    0px 4px 8px 0px rgba(255, 255, 255, 0.25) inset;
}

.radio-item input:checked + label {
  border: 4px solid #9f3ed5;
  color: #250070;
}

.radio-item input:checked + label:before {
  background-color: #9f3ed5;
  background-image: linear-gradient(145deg, #b060e5, #9f3ed5);
}
</style>
