import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Auth access
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('gymcronisUserToken');
  const isAuthenticated = token && token !== '';
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Error', params: { error: '401' } });
  } else next();
  if (to.matched.some((record) => record.name === 'Auth') && isAuthenticated) {
    next({ path: '/workouts' });
  } else next();
});

export default router;
