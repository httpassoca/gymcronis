import { Module } from 'vuex';
import { RootState } from '../types';

import actions from './actions';
import mutations from './mutations';
import { ModuleState } from './types';

export const state: ModuleState = {
  notifications: [],
};

const namespaced = true;

const notification: Module<ModuleState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
};

export default notification;
