import Vue from 'vue';
import { MutationTree } from 'vuex';
import { ModuleState, Exercise } from './types';

const mutations: MutationTree<ModuleState> = {
  SET_EXERCISES(state, payload: Exercise[]) {
    Vue.set(state, 'exercises', payload);
  },
  SET_EXERCISE(state, payload: Exercise) {
    Vue.set(state, 'exercise', payload);
  },
};

export default mutations;
