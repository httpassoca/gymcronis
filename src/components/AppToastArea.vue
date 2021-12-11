<template>
<div class="toast-area">
  <transition-group
    ref="toast-container"
    name="list-complete"
    tag="p"
  >
    <AppToast
      v-for="notification in notifications"
      :notification="notification"
      :key="notification.id"
      class="notification"
    />
  </transition-group>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import AppToast from '@/components/AppToast.vue';

export default Vue.extend({
  name: 'AppToastArea',

  components: { AppToast },

  computed: mapGetters({ notifications: 'layout/notifications' }),
});
</script>

<style lang="sass" scoped>

.toast-area
  position: fixed
  top: 10px
  right: 10px
  z-index: 9999

.list-complete-item
  transition: all .5s
  display: inline-block
  margin-right: 10px

.list-complete-enter, .list-complete-leave-to
  opacity: 0
  transform: translateX(30px)

.list-complete-leave-active
  position: absolute
</style>
