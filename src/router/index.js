// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import DiagCard from '/Users/deni-kun/Documents/v2/plastik/src/components/DiagCard.vue';
import SurveyView from '/Users/deni-kun/Documents/v2/plastik/src/components/SurveyView.vue';
import FormsView from '/Users/deni-kun/Documents/v2/plastik/src/components/FormsView.vue';
import CarouselView from '/Users/deni-kun/Documents/v2/plastik/src/components/CarouselView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DiagCard
  },
  {
    path: '/survey',
    name: 'Survey',
    component: SurveyView
  },
  {
    path:'/form',
    name: 'Forms',
    component: FormsView
  },
  {
    path: '/carousel',
    name: 'Carousel',
    component: CarouselView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

