<template>
<div id="app" class="customStyle">
  <Container v-if="checked && user && $route.name !== 'Error'" id="app">
    <AppMenu
      v-model="collapseMenu"
      @change="collapseMenu = !collapseMenu"
    />
    <div class="flex-column" :style="{width: `calc(100% - ${collapseMenu ? 64 : 250}px)`}">
      <Header class="header">
        <b>{{ user.name }}</b>
        <Avatar :src="user.photoURL || './assets/profile_pic.png'"/>
        <Tooltip effect="dark" content="Logout" placement="bottom-end">
          <svg @click="logout" stroke="#900000" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </Tooltip>
      </Header>
      <Main>
        <Container>
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </Container>
      </Main>
    </div>
  </Container>
  <transition name="fade" mode="out-in">
    <router-view v-if="checked && (!user || $route.name === 'Error')"/>
  </transition>
  <AppToastArea/>
  <AppLoading v-if="loading"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import {
  Main,
  Container,
  Header,
  Tooltip,
  Avatar,
} from 'element-ui';
import AppMenu from '@/components/AppMenu.vue';
import AppToastArea from '@/components/AppToastArea.vue';
import AppLoading from '@/components/AppLoading.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Container,
    Main,
    Header,
    Tooltip,
    AppMenu,
    AppToastArea,
    AppLoading,
    Avatar,
  },

  data() {
    return {
      collapseMenu: false,
      checked: false,
    };
  },

  computed: mapGetters({
    user: 'user/user',
    loading: 'layout/loading',
  }),

  methods: {
    ...mapActions({
      signOut: 'user/signOut',
      checkAuth: 'user/checkAuth',
      createToast: 'layout/createNotification',
    }),
    async logout() {
      await this.signOut();
      this.createToast({ text: 'Bye! 👋' });
      this.$router.push({ name: 'Auth' });
    },
  },

  async beforeMount() {
    await this.checkAuth();
    this.checked = true;
  },
});
</script>

<style lang="sass">
@import './sass/element_overrides'

*
  margin: 0
  padding: 0
  outline: 0
  box-sizing: border-box
html
  font-size: 20px
  line-height: 1.3
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
.full-w
  width: 100%
</style>

<style lang="sass" scoped>
#app
  font-family: 'Source Sans 3', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
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
  svg
    margin-left: 12px
    cursor: pointer
.flex-column
  display: flex
  flex-direction: column

.fade-enter-active, .fade-leave-active
  transition-duration: 0.3s
  transition-property: opacity
  transition-timing-function: cubic-bezier(0.215,0.61,0.355,1)

.fade-enter, .fade-leave-active
  opacity: 0

</style>
