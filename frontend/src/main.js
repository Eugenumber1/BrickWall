import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router';

import './index.css'
import './custom.less'
import './typography.css'
import 'vue-slider-component/theme/default.css'

const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(router); // Mount the router
app.mount('#app');
