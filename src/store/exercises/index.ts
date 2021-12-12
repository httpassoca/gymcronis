import { Module } from 'vuex';
import { RootState } from '../types';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { ModuleState } from './types';

export const state: ModuleState = {
  exercises: [],
  exercise: null,
};

const namespaced = true;

const exercises: Module<ModuleState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};

export default exercises;
