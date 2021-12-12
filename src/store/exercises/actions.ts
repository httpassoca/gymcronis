import {
  onValue, orderByChild, push, ref, remove, query, startAt, endAt, limitToFirst,
} from 'firebase/database';
import { ActionTree } from 'vuex';
import { auth, database } from '@/services/firebase';
import { RootState } from '../types';
import {
  ModuleState, Exercise, DatabaseExercises,
} from './types';

const actions: ActionTree<ModuleState, RootState> = {
  async create({ dispatch }, payload: Exercise): Promise<Exercise | null> {
    // https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data

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
  get({ commit }, payload: string) {
    // https://firebase.google.com/docs/database/web/read-and-write#read_data
    // https://stackoverflow.com/questions/38618953/how-to-do-a-simple-search-in-string-in-firebase-database

    const search = payload;
    const exercisesRef = query(
      ref(database, 'exercises'),
      orderByChild('name'),
      startAt(search),
      endAt(`${payload}\uf8ff`),
    );
    onValue(exercisesRef, (exercises) => {
      if (exercises.exists()) {
        const exercisesInDatabase: DatabaseExercises = exercises.val();
        const parsedExercises = Object.entries(exercisesInDatabase)
          .map(([key, exercise]) => ({
            id: key,
            authorId: exercise.authorId,
            name: exercise.name,
            custom: exercise.custom,
            muscle: exercise.muscle,
            equipament: exercise.equipament,
            description: exercise.description,
            image: exercise.image,
          }));
        commit('SET_EXERCISES', parsedExercises);
      } else {
        commit('SET_EXERCISES', []);
      }
    }, { onlyOnce: true });
  },
  // update({ commit }, payload: Exercise) {
  // },
  async remove(state, payload: string) {
    // https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data

    const exerciseId = payload;
    const exercisesRef = ref(database, `exercises/${exerciseId}`);

    await remove(exercisesRef);
  },
};

export default actions;
