<template>
<div class="toast" :class="notification.type" @click="removeNotification(notification)">
  <span>{{ notification.text }}</span>
  <i v-if="notification.type === 'good'" class="el-icon-circle-check"/>
  <i v-if="notification.type === 'bad'" class="el-icon-circle-close"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'HubToast',

  props: {
    notification: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      timeout: null as ReturnType<typeof setTimeout> | null,
    };
  },

  mounted() {
    this.timeout = setTimeout(() => this.removeNotification(this.notification), 1500);
  },

  methods: mapActions('layout', ['removeNotification']),
});
</script>

<style lang="sass" scoped>
.toast
  min-height: 50px
  overflow-wrap: anywhere
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 10px
  border-radius: 5px
  width: 300px
  padding: 12px
  font-size: 16px
  color: white
  box-shadow: 0 0 6px -1px rgba(0,0,0,.7)
  animation: .5s disappear
  animation-delay: 1s
  background-color: #900000
  &.good
    background-color: #228C22

@keyframes disappear
  0%
    opacity: 1
  100%
    opacity: 0
</style>
