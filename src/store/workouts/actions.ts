import {
  onValue, orderByChild, push, ref, remove, query, startAt, endAt, set,
} from 'firebase/database';
import { ActionTree } from 'vuex';
import { auth, database } from '@/services/firebase';
import { RootState } from '../types';
import {
  ModuleState, Workout, DatabaseWorkouts,
} from './types';

const actions: ActionTree<ModuleState, RootState> = {
  async create({ dispatch }, payload: Workout): Promise<Workout | null> {
    // https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data

    if (!auth.currentUser) {
      dispatch(
        'layout/createNotification',
        { text: 'You have no permission to create a workout 😠', type: 'bad' },
        { root: true },
      );
      return null;
    }

    const firebaseWorkout = {
      ...payload,
      authorId: auth.currentUser.uid,
    };

    const workoutRef = ref(database, 'workouts');
    await push(workoutRef, firebaseWorkout)
      .then(() => dispatch('layout/createNotification', { text: 'Workout created 😁', type: 'good' }, { root: true }))
      .catch((err) => {
        console.log(err.code);
        dispatch(
          'layout/createNotification',
          { text: 'Failed to create workout 😞 ', type: 'bad' },
          { root: true },
        );
      });

    return firebaseWorkout;
  },

  get({ commit }, payload: string) {
    // https://firebase.google.com/docs/database/web/read-and-write#read_data
    // https://stackoverflow.com/questions/38618953/how-to-do-a-simple-search-in-string-in-firebase-database

    const search = payload;
    const workoutRef = query(
      ref(database, 'workout'),
      orderByChild('name'),
      startAt(search),
      endAt(`${payload}\uf8ff`),
    );
    onValue(workoutRef, (workouts) => {
      if (workouts.exists()) {
        const workoutsInDatabase: DatabaseWorkouts = workouts.val();
        const parsedWorkouts = Object.entries(workoutsInDatabase)
          .map(([key, workout]) => ({
            id: key,
            authorId: workout.authorId,
            name: workout.name,
            exercises: workout.exercises,
          }));
        commit('SET_WORKOUTS', parsedWorkouts.reverse());
      } else {
        commit('SET_WORKOUTS', []);
      }
    }, { onlyOnce: true });
  },

  getById({ dispatch, commit }, payload: string) {
    const id = payload;
    const workoutRef = ref(database, `workouts/${id}`);
    onValue(workoutRef, (workout) => {
      if (workout.exists()) commit('SET_WORKOUT', workout.val());
      else {
        dispatch(
          'layout/createNotification',
          { text: 'Workout not found ', type: 'bad' },
          { root: true },
        );
        commit('SET_WORKOUT', null);
      }
    }, { onlyOnce: true });
  },

  async update({ dispatch }, payload: Workout) {
    const workoutRef = ref(database, `workouts/${payload.id}`);
    await set(workoutRef, payload)
      .catch((err) => {
        console.log(err.code);
      });
    dispatch('getById', payload.id);
  },

  async remove({ dispatch }, payload: string) {
    // https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data

    const workoutId = payload;
    const workoutRef = ref(database, `workouts/${workoutId}`);

    await remove(workoutRef)
      .then(() => {
        dispatch(
          'layout/createNotification',
          { text: 'Workout removed! ', type: 'good' },
          { root: true },
        );
      })
      .catch((err) => {
        if (err.code === 'PERMISSION_DENIED') {
          dispatch(
            'layout/createNotification',
            { text: 'You cannot remove a workout that isnt yours 💁‍♂️ ', type: 'bad' },
            { root: true },
          );
        }
      });
  },

  removeActual({ commit }) {
    commit('SET_WORKOUT', null);
  },
};

export default actions;
