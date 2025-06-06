import './style.css';

import { createApp } from 'vue';
import {createPinia} from "pinia";

import App from './App.vue';
import router from './router/main_router';


const app = createApp(App);

app.use(createPinia())
app.use(router);

app.mount('#app');
// app.mount('body');
