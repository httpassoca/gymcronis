import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Auth',
    component: () => import('../views/ViewAuth.vue'),
  },
  {
    path: '/workouts',
    name: 'Workouts',
    component: () => import('../views/ViewWorkouts.vue'),
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: () => import('../views/ViewExercises.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
