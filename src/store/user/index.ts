import { Module } from 'vuex';

import { RootState } from '../types';
import { ModuleState } from './types';

import actions from './actions';
import mutations from './mutations';

const state: ModuleState = {
  user: null,
};

const namespaced = true;
const user: Module<ModuleState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
};

export default user;
