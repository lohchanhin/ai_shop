import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/HomeComponent.vue';
import Shop from '@/components/ShopComponent.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
