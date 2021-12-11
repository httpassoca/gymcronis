import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import notification from './notification';
import user from './user';

Vue.use(Vuex);

const initialState: RootState = {
  version: '1.0.0',
};

const store: StoreOptions<RootState> = {
  state: initialState,
  modules: {
    user,
    notification,
  },
};

export default new Vuex.Store<RootState>(store);
