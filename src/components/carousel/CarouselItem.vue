<template>
    <transition :name="TransitionEffect">  
      <div class="carousel-item" v-show="currentSlide === index" @mouseenter="$emit('mouseenter')" @mouseout="$emit('mouseout')">
        <h1>{{slide.header}}</h1>
        <p>{{slide.paragraph}}</p>
        <img :src="slide.image" />
      </div>
  </transition>
  </template>
  
  <script>
  import {ref} from 'vue';
  import { useRouter } from 'vue-router';
  import { store } from '@/store';
  
  export default {
  emits: ['mouseenter', 'mouseout'],
  props: ['slide', 'currentSlide', 'index', 'direction', 'slides'],
  setup(props) {
    const router = useRouter();
    const currentSlide = ref(props.currentSlide);

    const changeValue = () => {
      console.log("Slides: ", props.slides); // Debugging log
      console.log("CurrentSlide: ", currentSlide.value); // Debugging log

      if (props.slides && props.slides.length > 0 && currentSlide.value >= 0 && currentSlide.value < props.slides.length) {
        const slide = props.slides[currentSlide.value];
        store.commit('updateDiagName', slide.header);
      } else {
        console.error("Slides or currentSlide is not properly defined.");
      }
    };

    const navigateToSurvey = () => {
      changeValue();
      if (store.state.diagName) {
        router.push({ name: 'Survey' });
      }
    };

    return {
      navigateToSurvey
    };
  },
  computed: {
    TransitionEffect() {
      return this.direction === "right" ? "slide-out" : "slide-in";
    }
  }
};

  </script>
  
  <style>
  .h1{
    color: black;
    font-weight: bold;
  }
  .carousel-item{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .slide-in-enter-active,
  .slide-in-leave-active{
    transition: all 1s ease-in-out;
  }
  .slide-out-enter-active,
  .slide-out-leave-active{
    transition: all 1s ease-in-out;
  }
  .slide-in-enter-from{
    transform: translateX(-100%);
  }
  .slide-in-leave-to{
    transform: translateX(100%);
  }
  .slide-out-enter-from{
    transform: translateX(100%);
  }
  .slide-out-leave-to{
    transform: translateX(-100%);
  }
  </style> 