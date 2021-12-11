<template>
<div class="error">
  <Card>
    <div v-if="!error">
      <h2>{{`Page "${$router.currentRoute.path}" does not exist`}}</h2>
      <p>Bro, here is lonely and empty. Go to a better place 🤜</p>
      <router-link :to="{name: 'Workouts'}">
        <Button type="primary"> Go to workouts page </Button>
      </router-link>
    </div>
    <div v-else-if="error === '401'">
      <h2> Unauthorized 🔐 </h2>
      <p>Seems you dont have access to this page...</p>
      <router-link :to="{name: 'Auth'}">
        <Button type="primary"> Go to login page </Button>
      </router-link>
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
    error: {
      type: String,
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
