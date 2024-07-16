// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import DiagCard from '/Users/deni-kun/Documents/v2/plastik/src/components/DiagCard.vue';
import SurveyView from '/Users/deni-kun/Documents/v2/plastik/src/components/SurveyView.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

