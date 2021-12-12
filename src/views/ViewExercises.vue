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
    <Button
      type="primary"
      @click="showCreateDialog = true"
      icon="el-icon-plus"
      class="button--create"
    >
      Create exercise
    </Button>
  </div>
  <div class="exercises">
    <Exercise
      v-for="(exercise, i) in exercises"
      :key="i"
      :exercise="exercise"
    />
  </div>
  <ExerciseCreateDialog
    v-model="showCreateDialog"
    @created="createdExercise"
    @canceled="showCreateDialog = false"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { Button, Input, Form } from 'element-ui';

import Exercise from '@/components/Exercises/Exercise.vue';
import ExerciseCreateDialog from '@/components/Exercises/ExerciseCreateDialog.vue';

export default Vue.extend({
  name: 'ViewExercises',

  components: {
    Button,
    Exercise,
    Form,
    Input,
    ExerciseCreateDialog,
  },

  data() {
    return {
      search: '',
      showCreateDialog: false,
      showUpdateDialog: false,
    };
  },

  computed: mapGetters({ exercises: 'exercises/exercises' }),

  methods: {
    ...mapActions({ getExercises: 'exercises/get' }),

    async createdExercise() {
      this.showCreateDialog = false;
      await this.getExercises();
    },

    async updatedExercise() {
      this.showUpdateDialog = false;
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
.button--create
  margin-left: 12px

</style>

<style lang="sass">
.exercises .form .el-form-item
  margin-bottom: 12px !important
</style>
