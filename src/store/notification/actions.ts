import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { ModuleState, Notification } from './types';

const actions: ActionTree<ModuleState, RootState> = {
  create({ commit }, notification: Notification) {
    commit('create', notification);
  },
  remove({ commit }, notification: Notification) {
    commit('remove', notification);
  },
};

export default actions;
