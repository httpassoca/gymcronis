import { ActionTree } from 'vuex';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/services/firebase';

import { User, ModuleState } from './types';
import { RootState } from '../types';

const actions: ActionTree<ModuleState, RootState> = {
  async signUp({ commit }) {
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
          token: await credentials.user.getIdToken(),
        };

        commit('SET_USER', user);
        return user;
      })
      .catch((err) => commit('notify', err));
  },
};

export default actions;
