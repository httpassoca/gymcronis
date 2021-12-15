import {
  onValue, orderByChild, push, ref, remove, query, startAt, endAt, set,
} from 'firebase/database';
import { ActionTree } from 'vuex';
import { auth, database } from '../../services/firebase';
import { RootState } from '../types';
import {
  ModuleState, Exercise, DatabaseExercises,
} from './types';

const actions: ActionTree<ModuleState, RootState> = {
  async create({ dispatch }, payload: Exercise): Promise<null> {
    // https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data

    return new Promise((res, rej) => {
      if (!auth.currentUser) {
        dispatch(
          'layout/createNotification',
          { text: 'You have no permission to create an exercise 😠', type: 'bad' },
          { root: true },
        );
        return rej(new Error('No authorization'));
      }

      const firebaseExercise = {
        ...payload,
        authorId: auth.currentUser.uid,
      };

      const exerciseRef = ref(database, 'exercises');
      push(exerciseRef, firebaseExercise)
        .then(() => {
          dispatch(
            'layout/createNotification',
            { text: 'Exercise created 😁', type: 'good' },
            { root: true },
          );
          dispatch('get');
          res(null);
        })
        .catch((err) => {
          dispatch(
            'layout/createNotification',
            { text: 'Failed to create exercise 😞 ', type: 'bad' },
            { root: true },
          );
          rej(new Error(err.code));
        });

      return res(null);
    });
  },

  get({ commit }, payload: string): Promise<null> {
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
          return res(null);
        }
        commit('SET_EXERCISES', []);
        return rej();
      }, { onlyOnce: true });
    });
  },

  getById({ dispatch, commit }, payload: string): Promise<null> {
    const id = payload;
    const exerciseRef = ref(database, `exercises/${id}`);

    return new Promise((res, rej) => {
      onValue(exerciseRef, (exercise) => {
        if (exercise.exists()) {
          commit('SET_EXERCISE', exercise.val());
          res(null);
        } else {
          dispatch(
            'layout/createNotification',
            { text: 'exercise not found ', type: 'bad' },
            { root: true },
          );
          commit('SET_EXERCISE', null);
          rej();
        }
      }, { onlyOnce: true });
    });
  },

  async update({ dispatch }, payload: Exercise): Promise<null> {
    const exerciseRef = ref(database, `exercises/${payload.id}`);

    return new Promise((res, rej) => {
      set(exerciseRef, payload)
        .then(() => {
          dispatch('getById', payload.id);
          dispatch('get');
          res(null);
        })
        .catch((err) => rej(new Error(err.code)));
    });
  },

  async remove({ dispatch }, payload: string): Promise<null> {
    // https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data

    const exerciseId = payload;
    const exercisesRef = ref(database, `exercises/${exerciseId}`);

    return new Promise((res, rej) => {
      remove(exercisesRef)
        .then(() => {
          dispatch(
            'layout/createNotification',
            { text: 'Exercise removed! ', type: 'good' },
            { root: true },
          );
          dispatch('get');
          res(null);
        })
        .catch((err) => {
          if (err.code === 'PERMISSION_DENIED') {
            dispatch(
              'layout/createNotification',
              { text: 'You cannot remove a exercise that isnt yours 💁‍♂️ ', type: 'bad' },
              { root: true },
            );
          }
          rej(new Error(err.code));
        });
    });
  },

  removeActual({ commit }) {
    commit('SET_EXERCISE', null);
  },
};

export default actions;
