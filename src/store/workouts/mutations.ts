import Vue from 'vue';
import { MutationTree } from 'vuex';
import { ModuleState, Workout } from './types';

const mutations: MutationTree<ModuleState> = {
  SET_WORKOUTS(state, payload: Workout[]) {
    Vue.set(state, 'workouts', payload);
  },
  SET_WORKOUT(state, payload: Workout) {
    Vue.set(state, 'workout', payload);
  },
};

export default mutations;
