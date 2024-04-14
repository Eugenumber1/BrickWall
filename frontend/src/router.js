// router.js
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    { path: '/', name: 'Home', component: () => import('./components/HomeMain.vue') },
    { path: '/company/:id', component: () => import('./components/CompanySpecific.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
