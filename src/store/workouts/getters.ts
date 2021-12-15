import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { ModuleState, Workout } from './types';

const getters: GetterTree<ModuleState, RootState> = {
  workouts: (state): Workout[] => state.workouts,
};

export default getters;
