<template>
<div class="full-w">
  <div class="header">
    <Form class="form">
      <Input v-model="search" placeholder="Search for a exercise..."/>
      <Button icon="el-icon-search" circle type="primary"/>
    </Form>
    <div class="buttons">
      <Button type="primary" @click="create">Create exercise</Button>
    </div>
  </div>
  <div class="exercises">
    <Exercise
      v-for="(exercise, i) in exercises"
      :key="i"
      :exercise="exercise"
    />
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import {
  Button, Form, Input,
} from 'element-ui';
import Exercise from '@/components/Exercise.vue';

export default Vue.extend({
  name: 'Exercises',

  components: {
    Button,
    Exercise,
    Form,
    Input,
  },

  data() {
    return {
      search: '',
    };
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

  beforeMount() {
    this.getExercises();
  },
});
</script>

<style lang="sass" scoped>
.exercises
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  grid-gap: 20px 25px
  width: 100%
  margin: 12px 0
.header
  width: 100%
  display: flex
  justify-content: space-between
  .form
    display: flex
    gap: 12px
</style>
