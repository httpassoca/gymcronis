<template>
<Card class="card--workout">
  <div class="label">
    <Checkbox
      @change="v => mark(v)"
      :checked="workoutData.marked"
      size="medium"
    />
    <!-- <img :src="workout.image" alt="workout image"> -->
    <div class="title">
      <h4>{{workoutData.name}}</h4> - <span>{{ workoutData.exercises.length }}</span>
   </div>
  </div>
  <Button
    @click="$router.replace(`/workout/${workoutData.id}`)"
    icon="el-icon-arrow-right"
    class="button"
    type="primary"
    circle
  />
</Card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import {
  Card, Button, Checkbox,
} from 'element-ui';

export default Vue.extend({
  name: 'Workout',
  components: {
    Card,
    Button,
    Checkbox,
  },

  props: {
    workout: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      workoutData: this.workout,
    };
  },

  computed: mapGetters({ user: 'user/user' }),

  methods: {
    ...mapActions({ updateWorkout: 'workouts/update' }),
    async mark(value: boolean) {
      this.workoutData = await this.updateWorkout({
        ...this.workoutData,
        marked: value,
      });
    },
  },
});
</script>

<style lang="sass" scoped>
.label
  display: flex
  gap: 16px
  align-items: center
  > .title
    display: flex
    gap: 12px
</style>

<style lang="sass">
.card--workout
  .el-card__body
    display: flex
    justify-content: space-between
</style>
