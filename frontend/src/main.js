import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import './index.css'
import './custom.less'

const app = createApp(App);
app.use(router); // Mount the router
app.mount('#app');
