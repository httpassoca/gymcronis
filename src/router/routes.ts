import { RouteConfig } from 'vue-router';

type AppRoute = RouteConfig & {
  meta?: {
    requiresAuth?: boolean;
  };
}

const routes: Array<AppRoute> = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/ViewAuth.vue'),
  },
  {
    path: '/workouts',
    alias: '/',
    name: 'Workouts',
    component: () => import('../views/ViewWorkouts.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: () => import('../views/ViewExercises.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:error',
    name: 'Error',
    component: () => import('../views/ViewError.vue'),
    props: true,
  },

];

export default routes;
