// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import SignUpView from '../views/SignUpView.vue';
import SignInView from '../views/SignInView.vue';
import EmailConfirmationView from '../views/EmailConfirmationView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import HomeView from '../views/HomeView.vue';


const routes = [
  { path: '/sign-up', component: SignUpView },
  { path: '/sign-in', component: SignInView },
  { path: '/confirm-email', component: EmailConfirmationView },
  { path: '/user-profile', component: UserProfileView },
  { path: '/', component: HomeView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
