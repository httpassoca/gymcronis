<template>
<Card class="card--workout">
  <div class="header">
    <div class="label">
      <Checkbox
        @change="v => mark(v)"
        :checked="workoutData.marked"
        :disabled="!isWorkoutCheckable"
        size="medium"
      />
      <div class="title">
        <h3>{{workout.name}}</h3> - <span>{{ workout.exercises.length }} exercises</span>
      </div>
    </div>
    <div class="buttons">
      <i
        @click="remove"
        class="el-icon-delete-solid"
      />
      <Button
        @click="open = !open"
        :icon="`el-icon-caret-${open ? 'top' : 'bottom'}`"
        class="button"
        type="primary"
        circle
      />
    </div>
  </div>
  <div class="body">
    <transition name="fadeHeight">
      <div v-if="open" class="exercises">
        <div v-for="exercise in workout.exercises" :key="exercise.id">
          <Checkbox
            @change="v => markExercise(exercise.value, v)"
            :checked="exercise.marked"
            :disabled="workout.marked"
            size="small"
          />
          <router-link
            :to="{ name: 'Exercise', params: {id: exercise.value}}"
            class="exercise-link"
          >
            {{exercise.name}}
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</Card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import {
  Card, Button, Checkbox,
} from 'element-ui';

import { WorkoutData, ListExercise as Exercise } from './types';
import { Workout } from '@/store/workouts/types';

export default Vue.extend({
  name: 'Workout',
  components: {
    Card,
    Button,
    Checkbox,
  },

  props: {
    workout: {
      type: Object as PropType<Workout>,
      required: true,
    },
  },

  data(): WorkoutData {
    return {
      workoutData: this.workout,
      open: false,
    };
  },

  computed: {
    ...mapGetters({ user: 'user/user' }),

    isWorkoutCheckable(): boolean {
      return this.workout.exercises.every((exercise: Exercise) => exercise.marked);
    },
  },

  methods: {
    ...mapActions({
      updateExercise: 'workouts/updateExercise',
      updateWorkout: 'workouts/update',
      removeWorkout: 'workouts/remove',
    }),

    async mark(value: boolean) {
      await this.updateWorkout({
        id: this.workoutData.id,
        value,
      });
    },

    async markExercise(id: string, value: boolean) {
      await this.updateExercise({
        workoutId: this.workoutData.id,
        value,
        id,
      });
    },

    async remove() {
      await this.removeWorkout(this.workout.id);
    },
  },
});
</script>

<style lang="sass" scoped>
.header
  display: flex
  justify-content: space-between
  width: 100%
.label
  display: flex
  gap: 16px
  align-items: center
  > .title
    display: flex
    gap: 12px
    align-items: center
    span
      font-size: 18px
.buttons
  display: flex
  align-items: center
  gap: 12px
  i
    cursor: pointer
.exercises
  padding: 12px 24px
  > div
    padding: 6px 0
    display: flex
    gap: 12px
    align-items: center
  .exercise-link
    text-decoration: none
    color: black

.fadeHeight-enter-active, .fadeHeight-leave-active
  transition: all .4s cubic-bezier(0.215,0.61,0.355,1)
  max-height: unset

.fadeHeight-enter, .fadeHeight-leave-to
  opacity: 0
  max-height: 0px

</style>

<style lang="sass">
.card--workout
  .el-card__body
    display: flex
    flex-direction: column
</style>
