import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from '../pages/Search';
import AboutPage from '../pages/About';
import ContactPage from '../pages/Contact'

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
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
