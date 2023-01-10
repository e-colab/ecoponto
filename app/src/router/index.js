import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from '../pages/Search';
import RegisterPage from '../pages/Register';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: SearchPage,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
