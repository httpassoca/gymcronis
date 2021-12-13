import { ActionTree } from 'vuex';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '@/services/firebase';

import { User, ModuleState } from './types';
import { RootState } from '../types';

const actions: ActionTree<ModuleState, RootState> = {
  async signUp({ commit, dispatch }) {
    // Google auth: https://firebase.google.com/docs/auth/web/google-signin

    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then(async (credentials) => {
        if (!credentials.user) throw new Error('Login with Google Failed');

        if (!credentials.user.displayName) {
          throw new Error('Missing information from Google Account');
        }

        const user: User = {
          name: credentials.user.displayName,
          id: credentials.user.uid,
          photoURL: credentials.user.photoURL,
          token: await credentials.user.getIdToken(),
        };

        localStorage.setItem('gymcronisUserToken', user.token);
        commit('SET_USER', user);
        return user;
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          'layout/createNotification',
          { text: 'Login with Google Failed 😞', type: 'bad' },
          { root: true },
        );
      });
  },

  checkAuth({ commit }) {
    // https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user
    commit('layout/SET_LOADING', true, { root: true });
    onAuthStateChanged(auth, async (user) => {
      if (!user || !user.displayName) {
        localStorage.removeItem('gymcronisUserToken');
        return;
      }
      const loggedUser: User = {
        name: user.displayName,
        id: user.uid,
        photoURL: user.photoURL,
        token: await user.getIdToken(),
      };
      commit('SET_USER', loggedUser);
    });
    commit('layout/SET_LOADING', false, { root: true });
  },

  async signOut({ commit }) {
    commit('SET_USER', null);
    return signOut(auth);
  },
};

export default actions;
