import { createApp } from 'vue'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import router from '@/router.js';
import VCalendar from 'v-calendar';

createApp(App)
.use(router)
.use(VCalendar)
.mount('#app');
