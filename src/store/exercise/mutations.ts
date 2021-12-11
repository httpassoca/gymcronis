import Vue from 'vue';
import { MutationTree } from 'vuex';
import { ModuleState, Exercise } from './types';

let nextId = 0;
const mutations: MutationTree<ModuleState> = {
  CREATE_EXERCISE(state, payload: Exercise) {
    const newExercises = [
      ...state.exercises,
      { ...payload, id: nextId += 1 },
    ];

    Vue.set(state, 'exercises', newExercises);
  },

  REMOVE_EXERCISE(state, payload: number) {
    const id = payload;
    const newExercises = state.exercises.filter((
      exercise: Exercise,
    ) => exercise.id !== id);

    Vue.set(state, 'exercises', newExercises);
  },
};

export default mutations;
