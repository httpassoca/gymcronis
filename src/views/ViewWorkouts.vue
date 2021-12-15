<template>
<div class="full-w">
  <div class="header">
    <Form class="form" @submit.prevent.native="searchWorkout">
      <Input v-model="search" placeholder="Search for a workout..."/>
      <Button
        @click="searchWorkout"
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
      Create workout
    </Button>
  </div>
  <div v-if="workouts.length" class="workouts">
    <Workout
      v-for="(workout, i) in workouts"
      :key="i"
      :workout="workout"
    />
  </div>
  <Empty v-else description="0 workouts found" />
  <WorkoutCreateDialog
    v-model="showCreateDialog"
    @created="showCreateDialog = false"
    @canceled="showCreateDialog = false"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import {
  Button, Input, Form, Empty,
} from 'element-ui';
import Workout from '@/components/Workouts/Workout.vue';
import WorkoutCreateDialog from '@/components/Workouts/WorkoutCreateDialog.vue';

export default Vue.extend({
  name: 'ViewWorkouts',

  components: {
    Button,
    Workout,
    Form,
    Input,
    Empty,
    WorkoutCreateDialog,
  },

  data() {
    return {
      search: '',
      showCreateDialog: false,
      showUpdateDialog: false,
    };
  },

  computed: mapGetters({ workouts: 'workouts/workouts' }),

  methods: {
    ...mapActions({
      getWorkouts: 'workouts/get',
    }),

    async searchWorkout() {
      await this.getWorkouts(this.search);
    },
  },

  async mounted() {
    await this.getWorkouts();
  },
});
</script>

<style lang="sass" scoped>
.workouts
  display: grid
  grid-template-columns: 1fr
  grid-gap: 20px 25px
  width: 100%
  margin: 12px 0
  @media (min-width: 1400px)
    grid-template-columns: repeat(2, 1fr)

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
.workouts .form .el-form-item
  margin-bottom: 12px !important
</style>
