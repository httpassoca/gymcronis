import Vue from 'vue';
import { MutationTree } from 'vuex';
import { ModuleState, Exercise } from './types';

const nextId = 0;
const mutations: MutationTree<ModuleState> = {
  // CREATE_EXERCISE(state, payload: Exercise) {
  //   const newExercises = [
  //     ...state.exercises,
  //     { ...payload, id: nextId += 1 },
  //   ];

  //   Vue.set(state, 'exercises', newExercises);
  // },

  // REMOVE_EXERCISE(state, payload: number) {

  //   Vue.set(state, 'exercises', newExercises);
  // },
};

export default mutations;
