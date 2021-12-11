import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { ModuleState, Notification } from './types';

const actions: ActionTree<ModuleState, RootState> = {
  createNotification({ commit }, notification: Notification) {
    commit('CREATE_NOTIFICATION', notification);
  },
  removeNotification({ commit }, notification: Notification) {
    commit('REMOVE_NOTIFICATION', notification);
  },
  setLoading({ commit }, status: boolean) {
    commit('SET_LOADING', status);
  },
};

export default actions;
