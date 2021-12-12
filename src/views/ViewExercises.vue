<template>
<div class="full-w">
  <div class="header">
    <Form class="form" @submit.prevent.native="searchExercise">
      <Input v-model="search" placeholder="Search for a exercise..."/>
      <Button
        @click="searchExercise"
        icon="el-icon-search"
        type="primary"
        circle
      />
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
      await this.getExercises();
    },

    async searchExercise() {
      this.getExercises(this.search);
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
  grid-template-columns: 1fr
  grid-gap: 20px 25px
  width: 100%
  margin: 12px 0
  @media (min-width: 750px)
    grid-template-columns: repeat(2, 1fr)
  @media (min-width: 1050px)
    grid-template-columns: repeat(3, 1fr)
  @media (min-width: 1400px)
    grid-template-columns: repeat(4, 1fr)
  @media (min-width: 1700px)
    grid-template-columns: repeat(5, 1fr)
.header
  width: 100%
  display: flex
  justify-content: space-between
  .form
    display: flex
    gap: 12px
</style>
