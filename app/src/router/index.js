import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from '../pages/Search';
import RegisterPage from '../pages/Register';
import CompanyAreaPage from '../pages/CompanyArea'
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
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/company-area',
    name: 'Company-Area',
    component: CompanyAreaPage
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
