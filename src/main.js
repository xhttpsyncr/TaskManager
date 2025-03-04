// main.js - Entry point for the Vue app
import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';

const app = createApp(App);
app.use(store); // Integrate Vuex store
app.mount('#app'); // Mount the app to the DOM
