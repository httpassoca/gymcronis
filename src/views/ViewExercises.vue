<template>
<div>
  <Button @click="create">create exercise</Button>
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
    }),

    async create() {
      const newUser = await this.createExercise({
        id: 'id',
        muscle: 'muscle',
        name: 'name',
      });
      console.log(newUser);
    },
  },
});
</script>
