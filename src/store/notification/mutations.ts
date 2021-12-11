import { MutationTree } from 'vuex';
import { ModuleState, Notification } from './types';

let nextId = 0;
const mutations: MutationTree<ModuleState> = {
  create(state, payload: Notification) {
    state.notifications.push({
      ...payload,
      id: nextId += 1,
    });
  },
  remove(state, notification: Notification) {
    state.notifications = state.notifications.filter((
      toast: Notification,
    ) => toast.id !== notification.id);
  },
};

export default mutations;
