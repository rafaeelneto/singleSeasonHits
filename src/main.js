import { createApp } from 'vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faFilter,
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faFilter, faSort, faSortDown, faSortUp);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
