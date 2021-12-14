import {
  onValue, orderByChild, push, ref, remove, query, startAt, endAt, set,
} from 'firebase/database';
import { ActionTree } from 'vuex';
import { database, auth } from '@/services/firebase';
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

    const { uid } = auth.currentUser;
    const workout: Workout = {
      ...payload,
      authorId: uid,
      marked: false,
    };

    const workoutRef = ref(database, `workouts/${uid}`);
    await push(workoutRef, workout)
      .then(() => dispatch(
        'layout/createNotification',
        { text: 'Workout created 😁', type: 'good' },
        { root: true },
      ))
      .catch((err) => {
        console.log(err.code);
        dispatch(
          'layout/createNotification',
          { text: 'Failed to create workout 😞 ', type: 'bad' },
          { root: true },
        );
      });
    return workout;
  },

  get({ commit, dispatch }, payload: string): Promise<Workout[] | null > | null {
    // https://firebase.google.com/docs/database/web/read-and-write#read_data
    // https://stackoverflow.com/questions/38618953/how-to-do-a-simple-search-in-string-in-firebase-database

    if (!auth.currentUser) {
      dispatch(
        'layout/createNotification',
        { text: 'You have no permission to get those workouts 😠', type: 'bad' },
        { root: true },
      );
      return null;
    }
    const { uid } = auth.currentUser;
    console.log(uid);
    const search = payload;

    const workoutRef = query(
      ref(database, `workouts/${uid}`),
      orderByChild('name'),
      startAt(search),
      endAt(`${search}\uf8ff`),
    );

    return new Promise((res, rej) => {
      onValue(workoutRef, (workouts) => {
        if (workouts.exists()) {
          const workoutsInDatabase: DatabaseWorkouts = workouts.val();
          const parsedWorkouts = Object.entries(workoutsInDatabase)
            .map(([key, workout]) => ({
              id: key,
              authorId: workout.authorId,
              name: workout.name,
              exercises: workout.exercises,
              marked: workout.marked,
            }));
          const workoutsResult = parsedWorkouts.reverse();
          commit('SET_WORKOUTS', workoutsResult);
          return res(workoutsResult);
        }
        commit('SET_WORKOUTS', []);
        return rej();
      }, { onlyOnce: true });
    });
  },

  getById({ dispatch }, payload: string): Promise<Workout | null > | null {
    if (!auth.currentUser) {
      dispatch(
        'layout/createNotification',
        { text: 'You have no permission to get this workout 😠', type: 'bad' },
        { root: true },
      );
      return null;
    }
    const { uid } = auth.currentUser;
    const id = payload;

    const workoutRef = ref(database, `workouts/${uid}/${id}`);
    return new Promise((res, rej) => {
      onValue(workoutRef, (workout) => {
        if (workout.exists()) {
          return res(workout.val());
        }

        dispatch(
          'layout/createNotification',
          { text: 'Workout not found ', type: 'bad' },
          { root: true },
        );
        return rej();
      }, { onlyOnce: true });
    });
  },

  async update({ dispatch }, payload: Workout): Promise<Workout | null> {
    if (!auth.currentUser) {
      dispatch(
        'layout/createNotification',
        { text: 'You have no permission to update a workout 😠', type: 'bad' },
        { root: true },
      );
      return null;
    }

    const { uid } = auth.currentUser;
    const workout = payload;

    const workoutRef = ref(database, `workouts/${uid}/${workout.id}`);
    return new Promise((res, rej) => {
      set(workoutRef, workout)
        .catch((err) => {
          console.log(err.code);
          return rej();
        });
      return res(workout);
    });
  },

  async remove({ dispatch }, payload: string): Promise<null> {
    if (!auth.currentUser) {
      dispatch(
        'layout/createNotification',
        { text: 'You have no permission to remove a workout 😠', type: 'bad' },
        { root: true },
      );
      return null;
    }
    const { uid } = auth.currentUser;
    const id = payload;
    const workoutRef = ref(database, `workouts/${uid}/${id}`);

    await remove(workoutRef)
      .then(() => {
        dispatch(
          'layout/createNotification',
          { text: 'Workout removed! ', type: 'good' },
          { root: true },
        );
      })
      .catch((err) => console.log(err));
    return null;
  },
};

export default actions;
