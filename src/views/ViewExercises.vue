<template>
<div>
  <Button @click="create">create exercise</Button>
  <Button @click="getExercises">get exercises</Button>
  {{ exercises }}
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { Button } from 'element-ui';

export default Vue.extend({
  name: 'Exercises',

  components: {
    Button,
  },

  computed: mapGetters({ exercises: 'exercises/exercises' }),

  methods: {
    ...mapActions({
      createExercise: 'exercises/create',
      getExercises: 'exercises/get',
    }),

    async create() {
      await this.createExercise({
        muscle: 'muscle',
        name: 'name',
      });
    },
  },
});
</script>
