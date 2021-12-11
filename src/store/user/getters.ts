import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { ModuleState } from './types';

const getters: GetterTree<ModuleState, RootState> = {
  userName(state): string | undefined {
    return state.user?.name;
  },
};

export default getters;
