import Vue from 'vue';
import { MutationTree } from 'vuex';
import { ModuleState, Exercise } from './types';

const mutations: MutationTree<ModuleState> = {
  SET_EXERCISES(state, payload: Exercise[]) {
    Vue.set(state, 'exercises', payload);
  },

};

export default mutations;
