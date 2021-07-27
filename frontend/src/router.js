import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Meetings from "@/views/Meetings.vue";
import Songs from "@/views/Songs.vue";
import api from '@/lib/api.js';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: { logout: false }
  }, 
  {
    path: '/logout',
    name: 'Logout',
    component: Login,
    props: { logout: true }
  }, 
  {
    path: '/songs',
    name: 'Songs',
    meta: { secured: true}, 
    component: Songs,
  }, 
  {
    path: '/meetings',
    name: 'Meetings',
    meta: { secured: true}, 
    component: Meetings,
  }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.secured) {
    const loggedIn = await api.isLoggedIn();

    if (!loggedIn) {
      next({ name: 'Login', query: { goto: to.name }, props: { logout: false }})
    } else {
      next(); 
    }
  }
  else {
    next();
  } 
})

export default router;