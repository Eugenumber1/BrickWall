// router.js
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    { path: '/', name: 'Home', component: () => import('./components/HomeMain.vue') },
    //{ path: '/profile', name: 'Profile', component: () => import('../components/Profile.vue') },
    //{ path: '/mygroup', name: 'MyCompany', component: () => import('../components/Company.vue') }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
