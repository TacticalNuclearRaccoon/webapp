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
          <div class="progress-container">
              <ProgressBar :bgcolor="'#ff5f6d'" :completed="surveyProgress" />
              <span></span>
            </div>
        </div>
      </div>
      <div class="main-container">
        <div v-if="stateZero">
          <p>Choisissez une famille de dysfonctionnement pour commencer</p>
        </div>
        <div v-else>
          <h2>{{ currentPlanetName }}</h2>
          <div ref="mainTextRef" class="main-text" v-if="getCurrentQuestion" v-hammer="swipeEvents">
            <span>{{ getCurrentQuestion.question }}</span>
            <div class="swipe-feedback" :class="feedbackClass" v-if="showFeedback">
              <span>{{ feedbackText }}</span>
          </div>
        </div>
          <div v-if="getCurrentQuestion">
            <div class="wrapper">
              <div class="radio-item" v-for="(option, index) in getCurrentQuestion.options" :key="index">
                <input type="radio" :id="'radio' + index" :name="getCurrentQuestion.index" :value="index" v-model="getCurrentQuestion.selected" @change="handleAnswerChange(index)" />
                <label :for="'radio' + index">{{ option }}</label>
              </div>
            </div>
          </div>
          <button class="btn-grad" @click="goBack" :disabled="false">{{ getButtonText() }}</button>
        </div>
      </div>
    </section>
    <section v-else-if="diagCompleted">
      <div class="last-page">
        <h2>e-Diagnostic terminé</h2>
        <p>Merci beaucoup</p>
        <button class="next-btn" @click="router.push({ name: 'Forms' })">Suivant</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue';
import { store } from '@/store';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ProgressBar from '@/components/ProgressBar.vue';
import CircularProgress from '@/components/CircularProgress.vue';
import Hammer from 'hammerjs';
import { debounce } from '@/utils/debounce';

const router = useRouter();
const route = useRoute();
const diagName = computed(() => store.diagName);
const questions = reactive({});
const diagCompleted = ref(false);
const currentQuestion = ref(0);
const loading = ref(true);
const ediag = diagName.value;
const currentPlanet = ref(null);
const mainTextRef = ref(null);
const showFeedback = ref(false);
const feedbackText = ref('');
const feedbackClass = ref('');

const onSwipeLeft = debounce(() => handleSwipe(0), 300);
const onSwipeRight = debounce(() => handleSwipe(3), 300);
const onSwipeUp = debounce(() => handleSwipe(1), 300);
const onSwipeDown = debounce(() => handleSwipe(2), 300);

const swipeEvents = {
  swipeleft: onSwipeLeft,
  swiperight: onSwipeRight,
  swipeup: onSwipeUp,
  swipedown: onSwipeDown
};

function handleSwipe(optionIndex) {
  const question = getCurrentQuestion.value;
  if (question && question.options[optionIndex] !== undefined) {
    feedbackText.value = question.options[optionIndex];
    feedbackClass.value = `active option-${optionIndex}`;
    showFeedback.value = true;

    setAnswer(optionIndex);
    handleAnswerChange(optionIndex);

    setTimeout(() => {
      showFeedback.value = false;
      feedbackClass.value = '';
    }, 1000); // Hide feedback after 1 second
  }
}

const fetchQuestions = async () => {
  try {
    const response = await axios.get(`http://192.168.1.24:3000/${ediag}`);
    const groupedQuestions = response.data.reduce((acc, question) => {
      if (!acc[question.planet]) {
        acc[question.planet] = [];
      }
      acc[question.planet].push({ ...question, selected: null });
      return acc;
    }, {});
    Object.assign(questions, groupedQuestions);
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
    const UserAnswers = Object.values(questions).flat().map((q) => ({ question: q.question, answer: q.selected }));
    await axios.post('http://localhost:3000/answers', UserAnswers);
    console.log('Answers saved successfully');
  } catch (error) {
    console.log("Error saving answers:", error);
  }
};

onMounted(() => {
  fetchQuestions(route.params.diagName);
  if (mainTextRef.value) {
    const hammer = new Hammer(mainTextRef.value);

    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    hammer.on('swipeleft', () => handleSwipe(0));
    hammer.on('swiperight', () => handleSwipe(3));
    hammer.on('swipeup', () => handleSwipe(1));
    hammer.on('swipedown', () => handleSwipe(2));
  }
});

watch(route, (newRoute) => {
  fetchQuestions(newRoute.params.diagName);
});

const planets = computed(() => Object.keys(questions));
const currentPlanetName = computed(() => currentPlanet.value);
const currentPlanetQuestions = computed(() => questions[currentPlanet.value] || []);

const getCurrentQuestion = computed(() => {
  if (!currentPlanetQuestions.value || currentPlanetQuestions.value.length === 0) return null;
  const question = currentPlanetQuestions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  return question;
});

const stateZero = computed(() => !getCurrentQuestion.value);

const setAnswer = (index) => {
  questions[currentPlanet.value][currentQuestion.value].selected = index;
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

const handleAnswerChange = async (index) => {
  setAnswer(index);

  // Save the current answer to the server
  try {
    const UserAnswers = Object.values(questions).flat().map((q) => ({
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
  return Object.values(questions).flat().every(q => q.selected !== null);
});

const goBack = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--;
  } else {
    const currentIndex = planets.value.indexOf(currentPlanet.value);
    if (currentIndex > 0) {
      currentPlanet.value = planets.value[currentIndex - 1];
      currentQuestion.value = questions[currentPlanet.value].length - 1;
    }
  }
  if (questions[currentPlanet.value][currentQuestion.value].selected !== null) {
    questions[currentPlanet.value][currentQuestion.value].selected = null;
  }
};

const getButtonText = () => {
  return 'Précédent';
};

const surveyProgress = computed(() => {
  const totalQuestions = Object.values(questions).flat().length;
  const answeredQuestions = Object.values(questions).flat().filter(q => q.selected !== null).length;
  return Math.round((answeredQuestions / totalQuestions) * 100);
});

const planetProgress = computed(() => {
  const progress = {};
  planets.value.forEach((planet) => {
    const planetQuestions = questions[planet];
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
    width: auto;
    height: auto;
}

.last-page {
  text-align: center;
  align-items: center;
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
}

.next-btn{
  background: linear-gradient(90deg, #8e2de2, #4a00e0), rgba(74, 0, 224, 0.1);
  padding: 10px 20px;
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
  font-weight: 100;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
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
  align-items: flex-start;
  height: 100%;
  overflow-y: auto;
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
  width: 50vw;
  height: auto;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
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
  position: relative;
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

.swipe-feedback {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: green;
  color: white;
  font-size: 24px;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
}

.swipe-feedback.active {
  opacity: 1;
}

.swipe-feedback.option-0 {
  background-color: green;
}

.swipe-feedback.option-1 {
  background-color: blue;
}

.swipe-feedback.option-2 {
  background-color: yellow;
}

.swipe-feedback.option-3 {
  background-color: red;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
}

.radio-item {
  position: relative;
  flex: 1 1 calc(50% - 20px); /* Two columns */
  margin-bottom: 2px;
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
}

.btn-grad {
  background-image: linear-gradient(90deg, #ff5f6d, #ffc371);
  padding: 10px 20px;
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
  font-weight: 100;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
}

.btn-grad:disabled {
  opacity: 0.5;
}

</style>
