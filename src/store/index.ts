import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import exercises from './exercises';
import layout from './layout';
import user from './user';

Vue.use(Vuex);

const initialState: RootState = {
  version: '1.0.0',
};

const store: StoreOptions<RootState> = {
  state: initialState,
  modules: {
    user,
    layout,
    exercises,
  },
};

export default new Vuex.Store<RootState>(store);
