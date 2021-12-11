<template>
<div class="error">
  <Card>
    <div v-if="wrongPage">
      <h2>{{`Page "${this.wrongPage}" does not exist`}}</h2>
      <p>Bro, here is lonely and empty. Go to a better place 🤜</p>
      <Button @click="$router.replace('/workouts')"> Go to workouts page </Button>
    </div>
    <div v-else-if="error === '401'">
      <h2> Unauthorized 🔐 </h2>
      <p>Seems you dont have access to this page...</p>
      <Button type="primary" @click="$router.replace('/auth')"> Go to login page </Button>
    </div>
  </Card>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button, Card } from 'element-ui';

export default Vue.extend({
  name: 'ViewError',

  components: {
    Button,
    Card,
  },

  props: {
    wrongPage: {
      type: String,
    },
    error: {
      type: String,
      default: '401',
    },
  },
});
</script>

<style lang="sass" scoped>
@import '../sass/mixins'

.error
  @include visitorPage
  p
    margin: 12px 0
</style>
