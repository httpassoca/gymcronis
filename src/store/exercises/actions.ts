import {
  onValue, orderByChild, push, ref, remove, query, startAt, endAt, set,
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
        console.log(err.code);
        dispatch(
          'layout/createNotification',
          { text: 'Failed to create exercise 😞 ', type: 'bad' },
          { root: true },
        );
      });

    return firebaseExercise;
  },

  get({ commit }, payload: string): Promise<Exercise[] | null> {
    // https://firebase.google.com/docs/database/web/read-and-write#read_data
    // https://stackoverflow.com/questions/38618953/how-to-do-a-simple-search-in-string-in-firebase-database

    const search = payload;
    const exercisesRef = query(
      ref(database, 'exercises'),
      orderByChild('name'),
      startAt(search),
      endAt(`${search}\uf8ff`),
    );
    return new Promise((res, rej) => {
      onValue(exercisesRef, (exercises) => {
        if (exercises.exists()) {
          const exercisesInDatabase: DatabaseExercises = exercises.val();
          const parsedExercises = Object.entries(exercisesInDatabase)
            .map(([key, exercise]) => ({
              id: key,
              authorId: exercise.authorId,
              name: exercise.name,
              muscles: exercise.muscles,
              description: exercise.description,
            }));
          const exercisesResult = parsedExercises.reverse();
          commit('SET_EXERCISES', exercisesResult);
          return res(exercisesResult);
        }
        commit('SET_EXERCISES', []);
        return rej();
      }, { onlyOnce: true });
    });
  },

  getById({ dispatch, commit }, payload: string) {
    const id = payload;
    const exerciseRef = ref(database, `exercises/${id}`);
    onValue(exerciseRef, (exercise) => {
      if (exercise.exists()) commit('SET_EXERCISE', exercise.val());
      else {
        dispatch(
          'layout/createNotification',
          { text: 'exercise not found ', type: 'bad' },
          { root: true },
        );
        commit('SET_EXERCISE', null);
      }
    }, { onlyOnce: true });
  },

  async update({ dispatch }, payload: Exercise) {
    const exerciseRef = ref(database, `exercises/${payload.id}`);
    await set(exerciseRef, payload)
      .catch((err) => {
        console.log(err.code);
      });
    dispatch('getById', payload.id);
  },

  async remove({ dispatch }, payload: string) {
    // https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data

    const exerciseId = payload;
    const exercisesRef = ref(database, `exercises/${exerciseId}`);

    await remove(exercisesRef)
      .then(() => {
        dispatch(
          'layout/createNotification',
          { text: 'Exercise removed! ', type: 'good' },
          { root: true },
        );
      })
      .catch((err) => {
        if (err.code === 'PERMISSION_DENIED') {
          dispatch(
            'layout/createNotification',
            { text: 'You cannot remove a exercise that isnt yours 💁‍♂️ ', type: 'bad' },
            { root: true },
          );
        }
      });
  },

  removeActual({ commit }) {
    commit('SET_EXERCISE', null);
  },
};

export default actions;
