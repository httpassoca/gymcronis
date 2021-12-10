<template>
<Container id="app">
  <Menu
    class="menu"
    background-color="#900000"
    active-text-color="#ffd04b"
    :default-active="$route.path"
    text-color="#fff"
    router
    :collapse="collapseMenu"
  >
    <MenuItem @click="collapseMenu = !collapseMenu">
      <i :class="`el-icon-${collapseMenu ? 'menu' : 's-fold'}`"/>
      <span slot="title">Close menu</span>
    </MenuItem>
    <MenuItem index="/workouts" route="/workouts">
      <i class="el-icon-trophy"/>
      <span slot="title">Workouts</span>
    </MenuItem>
    <MenuItem index="/exercises" route="/exercises">
      <i class="el-icon-user-solid"/>
      <span slot="title">Exercises</span>
    </MenuItem>
  </Menu>
  <div class="flex-column" :style="{width: `calc(100% - ${collapseMenu ? 64 : 250}px)`}">
    <Header class="header">
      <Tooltip effect="dark" content="Logout" placement="bottom-end">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
      </Tooltip>
    </Header>
    <Main>
      <Container>
        <router-view/>
      </Container>
    </Main>
  </div>
</Container>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Main, Menu, MenuItem, Container, Header, Tooltip,
} from 'element-ui';

export default Vue.extend({
  name: 'App',
  components: {
    Menu,
    MenuItem,
    Container,
    Main,
    Header,
    Tooltip,
  },

  data() {
    return {
      collapseMenu: false,
    };
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
  font-size: 20px
  line-height: 1.3
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
.menu:not(.el-menu--collapse)
  width: 250px
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
.flex-column
  display: flex
  flex-direction: column
</style>
