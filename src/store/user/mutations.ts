import Vue from 'vue';
import { MutationTree } from 'vuex';
import { ModuleState, User } from './types';

export enum UserMutations {
  SET_USER = 'SET_USER',
  REMOVE_USER = 'REMOVE_USER',
}

const mutations: MutationTree<ModuleState> = {
  [UserMutations.SET_USER](state, payload: User) {
    if (payload) {
      Vue.set(state, 'user', payload);
    } else {
      Vue.set(state, 'user', null);
    }
  },
};

export default mutations;
