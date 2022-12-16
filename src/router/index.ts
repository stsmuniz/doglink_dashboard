import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {default as dashboard} from './dashboard/routes'
import {default as auth} from './auth/routes'
import authGuard from "@/router/auth/authGuard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
      ...auth,
      ...dashboard
  ]
})

router.beforeEach((to, from, next) => {
  authGuard(to, from, next)
  document.title = `${to.meta.title}`;
  next();
})


export default router
