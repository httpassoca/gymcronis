import Vue from 'vue';
import { MutationTree } from 'vuex';
import { ModuleState, User } from './types';

const mutations: MutationTree<ModuleState> = {
  SET_USER(state, payload: User) {
    if (payload) {
      Vue.set(state, 'user', payload);
    } else {
      Vue.set(state, 'user', null);
    }
  },
};

export default mutations;
