import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { ModuleState, User } from './types';

const getters: GetterTree<ModuleState, RootState> = {
  user(state): User | null {
    return state.user;
  },
};

export default getters;
