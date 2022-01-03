import {
  onValue, orderByChild, push, ref, query, startAt, endAt, set, remove,
} from 'firebase/database';
import { ActionTree } from 'vuex';
import { database, auth } from '../../services/firebase';
import { RootState } from '../types';
import {
  ModuleState, Workout, DatabaseWorkouts, UpdateExercisePayload, UpdatePayload,
} from './types';

const actions: ActionTree<ModuleState, RootState> = {
  async create({ dispatch }, payload: Workout): Promise<void> {
    // https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data

    return new Promise((res, rej) => {
      if (!auth.currentUser) {
        dispatch(
          'layout/createNotification',
          { text: 'You have no permission to create a workout 😠', type: 'bad' },
          { root: true },
        );
        return rej(new Error('No authorization.'));
      }

      const { uid } = auth.currentUser;
      const workout = {
        name: payload.name,
        authorId: uid,
        marked: false,
      };

      const workoutRef = ref(database, `workouts/${uid}`);
      const { key } = push(workoutRef, workout);

      for (let i = 0; i < payload.exercises.length; i += 1) {
        const exercise = payload.exercises[i];
        const exerciseRef = ref(database, `workouts/${uid}/${key}/exercises/${exercise.value}`);
        set(exerciseRef, { marked: false, name: exercise.name });
      }
      dispatch('get');
      dispatch(
        'layout/createNotification',
        { text: 'Workout created 😁', type: 'good' },
        { root: true },
      );
      return res();
    });
  },

  get({ commit, dispatch }, payload: string): Promise<Workout[] | null > | null {
    // https://firebase.google.com/docs/database/web/read-and-write#read_data
    // https://stackoverflow.com/questions/38618953/how-to-do-a-simple-search-in-string-in-firebase-database

    return new Promise((res, rej) => {
      if (!auth.currentUser) {
        dispatch(
          'layout/createNotification',
          { text: 'You have no permission to get those workouts 😠', type: 'bad' },
          { root: true },
        );
        return rej(new Error('No authorization.'));
      }

      const { uid } = auth.currentUser;
      const search = payload;

      const workoutRef = query(
        ref(database, `workouts/${uid}`),
        orderByChild('name'),
        startAt(search),
        endAt(`${search}\uf8ff`),
      );

      onValue(workoutRef, (workouts) => {
        if (workouts.exists()) {
          const workoutsInDatabase: DatabaseWorkouts = workouts.val();
          const parsedWorkouts = Object.entries(workoutsInDatabase)
            .map(([key, workout]) => ({
              id: key,
              authorId: workout.authorId,
              name: workout.name,
              exercises: Object.entries(workout.exercises).map(([k, v]) => ({ ...v, value: k })),
              marked: workout.marked,
            }));
          const workoutsResult = parsedWorkouts.reverse();
          commit('SET_WORKOUTS', workoutsResult);
          return res(null);
        }
        commit('SET_WORKOUTS', []);
        return rej();
      }, { onlyOnce: true });
      return res(null);
    });
  },

  async update({ dispatch }, payload: UpdatePayload): Promise<Workout | null> {
    if (!auth.currentUser) {
      dispatch(
        'layout/createNotification',
        { text: 'You have no permission to update a workout 😠', type: 'bad' },
        { root: true },
      );
      return null;
    }

    const { uid } = auth.currentUser;
    const { value, id } = payload;

    const workoutRef = ref(database, `workouts/${uid}/${id}/marked`);
    return new Promise((res, rej) => {
      set(workoutRef, value)
        .then(() => dispatch('get'))
        .catch((err) => rej(new Error(err.code)));
      return res(null);
    });
  },

  async updateExercise({ dispatch }, payload: UpdateExercisePayload) {
    return new Promise((res, rej) => {
      if (!auth.currentUser) {
        dispatch(
          'layout/createNotification',
          { text: 'You have no permission to update a workout 😠', type: 'bad' },
          { root: true },
        );
        return rej(new Error('No authorization.'));
      }

      const { uid } = auth.currentUser;
      const { workoutId, id, value } = payload;

      const exerciseRef = ref(database, `workouts/${uid}/${workoutId}/exercises/${id}/marked`);
      set(exerciseRef, value)
        .then(() => dispatch('get'))
        .catch((err) => rej(new Error(err.code)));
      return res(null);
    });
  },

  async remove({ dispatch }, payload: string): Promise<void> {
    return new Promise((res, rej) => {
      if (!auth.currentUser) {
        dispatch(
          'layout/createNotification',
          { text: 'You have no permission to remove a workout 😠', type: 'bad' },
          { root: true },
        );
        return;
      }
      const { uid } = auth.currentUser;
      const id = payload;
      const workoutRef = ref(database, `workouts/${uid}/${id}`);

      remove(workoutRef)
        .then(() => {
          dispatch(
            'layout/createNotification',
            { text: 'Workout removed! ', type: 'good' },
            { root: true },
          );
          dispatch('get');
          res();
        })
        .catch((err) => rej(new Error(err.code)));
    });
  },
};

export default actions;
