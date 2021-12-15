import Vue from 'vue';
import { MutationTree } from 'vuex';
import { ModuleState, Notification } from './types';

let nextId = 0;
const mutations: MutationTree<ModuleState> = {
  CREATE_NOTIFICATION(state, payload: Notification) {
    const newNotifications = [
      ...state.notifications,
      { ...payload, id: nextId += 1 },
    ];

    Vue.set(state, 'notifications', newNotifications);
  },

  REMOVE_NOTIFICATION(state, notification: Notification) {
    const newNotifications = state.notifications.filter((
      toast: Notification,
    ) => toast.id !== notification.id);

    Vue.set(state, 'notifications', newNotifications);
  },

  SET_LOADING(state, status: boolean) {
    Vue.set(state, 'loading', status);
  },
  SET_CHECKED(state, status: boolean) {
    Vue.set(state, 'checkedUser', status);
  },
};

export default mutations;
