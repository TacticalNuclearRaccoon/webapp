<template>
    <div class="survey-container">
        <h1>{{ diagTitle }}</h1>
        <section v-if="loading">
            <p>Loading...</p>
        </section>
        <section v-if="!diagCompleted && !loading">
        <h2>Family</h2>
      <div class="main-text">
        <span>{{ getCurrentQuestion.question }}</span>
      </div>
      <div class="radio-item" v-for="(option, index) in getCurrentQuestion.options" :key="index">
      <input type="radio" :id="'radio' + index" :name="getCurrentQuestion.index" :value="index" v-model="getCurrentQuestion.selected" @change="setAnswer" />
      <label :for="'radio' + index">{{ option }}</label>
    </div>
      <button class="btn-grad" @click="nextQuestion" :disabled="isButtonDisabled()">{{ getButtonText() }}</button>
        </section>
        <section v-else-if="diagCompleted">
            <h2>e-Diagnostic terminé</h2>
            <p>Merci beaucoup</p>
        </section>
    </div>
  </template>

  <script setup>
  import {ref, computed, onMounted, watch} from 'vue';
  import { store } from '@/store';
  import { useRoute } from 'vue-router';
  import axios from 'axios';

  const diagName = computed(() => store.diagName)
  const route = useRoute()
  const diagTitle = ref(route.params.diagTitle || '')
  const questions = ref([])
  const diagCompleted = ref(false)
  const currentQuestion = ref(0)
  const loading = ref(true)

  const ediag = diagName.value

  const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${ediag}`); // Adjust the URL according Yoann's API
        questions.value = response.data.map((q) => ({ ...q, selected: null }));
        const groupedQuestions = 
        loading.value = false;
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
    };

    watch(diagName, (newVal) => {
      loading.value = true;
      fetchQuestions(newVal);
    });

/*
const fetchQuestions = async () => {
  try {
    const response = await fetch('http://localhost:3000/questions');
    const data = await response.json();

    // Group questions by "planet"
    const groupedQuestions = data.reduce((acc, question) => {
      if (!acc[question.planet]) {
        acc[question.planet] = [];
      }
      acc[question.planet].push(question);
      return acc;
    }, {});

    questions.value = groupedQuestions;
    currentPlanet.value = Object.keys(groupedQuestions)[0];
    initProgressBar();
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};
*/


  const saveAnswers = async() =>{
    try{
        const UserAnswers = questions.value.map((q) =>({question: q.question, answer:q.selected}))
        await axios.post('http://localhost:3000/answers', UserAnswers) // this POST will change according to Yoann's API
        console.log('Answers saved sucessfully') 
    } catch (error){
        console.log("Error saving answers:", error)
    }
  }

  onMounted(()=>{
    fetchQuestions(route.params.diagName)
  })

  watch(route, (newRoute) =>{
    diagTitle.value = newRoute.params.diagTitle
    fetchQuestions(newRoute.params.diagName)
  })

  const score = computed(()=>{
    let value = Objectquestions.value.forEach((q)=>{
        if(q.selected == q.answer){
            value++
        }
    })
    return value
  })

  const getCurrentQuestion = computed(()=>{
    if(questions.value.length === 0) return null
    const question = questions.value[currentQuestion.value]
    question.index = currentQuestion.value
    return question
  })


  const setAnswer = (evt) =>{
    questions.value[currentQuestion.value].selected = evt.target.value
    evt.target.value = null
  }

  const nextQuestion = () =>{
    if(currentQuestion.value < questions.value.length -1 ) {
        currentQuestion.value ++
    } else {
        diagCompleted.value = true
        saveAnswers()
    }
  }

  const getButtonText = () => {
  if (getCurrentQuestion.value.index === questions.value.length - 1) {
    return 'Terminer';
  }
  if (getCurrentQuestion.value.selected === null) {
    return 'Choisir une réponse';
  }
  return 'Question suivante';
};

  const isButtonDisabled = () => !getCurrentQuestion.value.selected

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

  </style>
    