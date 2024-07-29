import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import vHammer from './directives/v-hammer'; //custom directive

const app = createApp(App);
app.use(router);
app.provide('store', store);
app.directive('hammer', vHammer); // Register the custom directive
app.mount('#app');