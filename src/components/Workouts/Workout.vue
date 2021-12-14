<template>
<Card class="card--workout">
  <div class="label">
    <Checkbox v-model="marked"/>
    <!-- <img :src="workout.image" alt="workout image"> -->
    <div class="title">
      <h4>{{workout.name}}</h4> - <span>{{ workout.exercises.length }}</span>
   </div>
  </div>
  <Button
    @click="$router.replace(`/workout/${workout.id}`)"
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

  computed: {
    ...mapGetters({ user: 'user/user' }),
    marked: {
      get(): boolean { return this.workout.marked; },
      set(v: boolean) { this.markWorkout(this.workout.id, v); },
    },
  },

  methods: mapActions({ markWorkout: 'workouts/mark' }),
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
