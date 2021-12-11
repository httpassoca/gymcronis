import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import user from './user';

Vue.use(Vuex);

const initialState: RootState = {
  version: '1.0.0',
};

const store: StoreOptions<RootState> = {
  state: initialState,
  modules: {
    user,
  },
};

export default new Vuex.Store<RootState>(store);
