import { Module } from 'vuex';
import { RootState } from '../types';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { ModuleState } from './types';

export const state: ModuleState = {
  notifications: [],
  loading: false,
  checkedUser: false,
};

const namespaced = true;

const layout: Module<ModuleState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};

export default layout;
