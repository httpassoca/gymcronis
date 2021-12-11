<template>
  <div>
    <h1>auth</h1>
    <button @click="login"> Login </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ViewAuth',
  methods: {
    async login() {
      const result = await this.$store.dispatch('user/signUp');
      if (result) {
        this.$router.replace('/workouts');
      }
    },
  },
});
</script>
