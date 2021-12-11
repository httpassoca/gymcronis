<template>
<div id="app">
  <Container v-if="username" id="app">
    <AppMenu
      v-model="collapseMenu"
      @change="collapseMenu = !collapseMenu"
    />
    <div class="flex-column" :style="{width: `calc(100% - ${collapseMenu ? 64 : 250}px)`}">
      <Header class="header">
        <b>{{ username }}</b>
        <Tooltip effect="dark" content="Logout" placement="bottom-end">
          <svg @click="logout" stroke="#900000" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </Tooltip>
      </Header>
      <Main>
        <Container>
          <router-view/>
        </Container>
      </Main>
    </div>
  </Container>
  <router-view v-else/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import {
  Main, Container, Header, Tooltip,
} from 'element-ui';
import AppMenu from '@/components/AppMenu.vue';

export default Vue.extend({
  name: 'App',
  components: {

    Container,
    Main,
    Header,
    Tooltip,
    AppMenu,
  },

  data() {
    return {
      collapseMenu: false,
    };
  },

  computed: mapGetters({ username: 'user/userName' }),

  methods: {
    ...mapActions({ signOut: 'user/signOut' }),
    async logout() {
      await this.signOut();
      this.$router.replace('/auth');
    },
  },
});
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  outline: 0
  border: none !important
  box-sizing: border-box
html
  font-size: 16px
  line-height: 1.3
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased

</style>

<style lang="sass" scoped>
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  min-height: 100vh
.header
  background-color: #c1c1c1
  width: 100%
  color: white
  display: flex
  justify-content: flex-end
  align-items: center
  b
    color: black
    margin-right: 12px
.flex-column
  display: flex
  flex-direction: column
</style>
