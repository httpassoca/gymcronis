import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { ModuleState, Exercise } from './types';

const getters: GetterTree<ModuleState, RootState> = {
  exercises: (state): Exercise[] => state.exercises,
  exercise: (state): Exercise | null => state.exercise,
};

export default getters;
