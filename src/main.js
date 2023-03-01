import { createApp } from 'vue';
import App from './App.vue';

import VueFeather from 'vue-feather';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);
app.component(VueFeather.name, VueFeather).mount('#app');

app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
});
