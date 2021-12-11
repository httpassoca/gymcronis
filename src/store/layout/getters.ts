import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { ModuleState, Notification } from './types';

const getters: GetterTree<ModuleState, RootState> = {
  loading: (state): boolean => state.loading,
  notifications: (state): Notification[] => state.notifications,
};

export default getters;
