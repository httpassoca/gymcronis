import Vue from 'vue';
import { MutationTree } from 'vuex';
import { ModuleState, User } from './types';

export enum UserMutations {
  SET_USER = 'SET_USER',
  REMOVE_USER = 'REMOVE_USER',
}

const mutations: MutationTree<ModuleState> = {
  [UserMutations.SET_USER](state, payload: User) {
    localStorage.setItem('gymcronisUserToken', payload.token);
    Vue.set(state, 'user', payload);
  },
  [UserMutations.REMOVE_USER](state, payload: User) {
    localStorage.setItem('gymcronisUserToken', '');
    Vue.set(state, 'user', payload);
  },
};

export default mutations;
