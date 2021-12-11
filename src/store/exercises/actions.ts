import { push, ref } from 'firebase/database';
import { ActionTree } from 'vuex';
import { auth, database } from '@/services/firebase';
import { RootState } from '../types';
import { ModuleState, Exercise } from './types';

const actions: ActionTree<ModuleState, RootState> = {
  async create({ dispatch }, payload: Exercise): Promise<Exercise | null> {
    if (!auth.currentUser) {
      dispatch(
        'layout/createNotification',
        { text: 'You have no permission to create an exercise 😠', type: 'bad' },
        { root: true },
      );
      return null;
    }

    const firebaseExercise = {
      ...payload,
      authorId: auth.currentUser.uid,
    };

    const exerciseRef = ref(database, 'exercises');
    await push(exerciseRef, firebaseExercise)
      .then(() => dispatch('layout/createNotification', { text: 'Exercise created 😁', type: 'good' }, { root: true }))
      .catch((err) => {
        console.log(err);
        dispatch(
          'layout/createNotification',
          { text: 'Failed to create exercise 😞 ', type: 'bad' },
          { root: true },
        );
      });

    return firebaseExercise;
  },
  // get({ commit }, payload: string) {
  // },
  // update({ commit }, payload: Exercise) {
  // },
  // remove({ commit }, payload: Exercise) {
  // },
};

export default actions;
