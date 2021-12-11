<template>
  <div class="about">
    <h1>Error {{ error }}</h1>
    <div v-if="error == 404">
      <h2> Page not found</h2>
      <Button> Go to workouts page </Button>
    </div>
    <div v-else-if="error == 401">
      <h2> Unauthorized </h2>
      <Button @click="$router.replace('/auth')"> Go to login page </Button>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button } from 'element-ui';

export default Vue.extend({
  name: 'ViewError',

  components: {
    Button,
  },

  props: {
    error: {
      type: [String, Number],
      default: 404,
    },
  },
});
</script>
