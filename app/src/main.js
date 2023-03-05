import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueTheMask from 'vue-the-mask'

createApp(App).use(router).use(store).use(VueTheMask).mount('#app');
