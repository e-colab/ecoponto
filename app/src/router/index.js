import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../pages/Search"

const routes = [
    {
        path: "/",
        name: "Main",
        component: SearchPage,
      },
    {
        path: "/search",
        name: "Search",
        component: SearchPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;