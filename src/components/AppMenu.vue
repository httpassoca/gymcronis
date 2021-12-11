<template>
  <Menu
    class="menu"
    background-color="#900000"
    active-text-color="#ffd04b"
    :default-active="$route.path"
    text-color="#fff"
    router
    :collapse="value"
  >
    <MenuItem @click="$emit('change')">
      <i :class="`el-icon-${value ? 'menu' : 's-fold'}`"/>
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
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Menu,
  MenuItem,
} from 'element-ui';

export default Vue.extend({
  name: 'AppMenu',

  components: {
    Menu,
    MenuItem,
  },

  props: {
    value: Boolean,
  },
});
</script>

<style lang="sass">
.menu:not(.el-menu--collapse)
  width: 250px
.menu > .el-menu-item
  font-size: 16px !important
</style>
