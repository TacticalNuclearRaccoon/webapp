// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import DiagCard from '/Users/deni-kun/Documents/v2/plastik/src/components/DiagCard.vue';
import SurveyView from '/Users/deni-kun/Documents/v2/plastik/src/components/SurveyView.vue';
import FormsView from '/Users/deni-kun/Documents/v2/plastik/src/components/FormsView.vue';
import CarouselMenu from '@/components/CarouselMenu.vue';
import BoardView from '@/components/onboarding/BoardView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: BoardView  
  },
  {
    path: '/diagcard',
    name: 'DiagCaard',
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
    name: 'Menu',
    component: CarouselMenu
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

