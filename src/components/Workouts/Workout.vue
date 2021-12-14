<template>
<Card class="card">
  <div slot="header">
    <div class="header">
      <span>{{workout.name}}</span>
      <div v-if="user.id === workout.authorId" class="action--buttons">
        <Tooltip effect="dark" content="Remove" placement="top">
          <i @click="remove" class="el-icon-delete-solid"/>
        </Tooltip>
      </div>
    </div>
  </div>
  <div class="workout-info">
    <Tag
      v-for="(muscle, i) in workout.muscles"
      :key="i"
      size="mini"
    >
      {{ muscle }}
    </Tag>
    <p class="description">
      {{ workout.description }}
    </p>
  </div>
  <Button class="button" @click="$router.replace(`/workout/${workout.id}`)"> See more </Button>
</Card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import {
  Card, Tag, Button, Tooltip,
} from 'element-ui';

export default Vue.extend({
  name: 'Workout',
  components: {
    Card,
    Tag,
    Button,
    Tooltip,
  },

  props: {
    workout: {
      type: Object,
      required: true,
    },
  },

  computed: mapGetters({ user: 'user/user' }),

  methods: {
    ...mapActions({
      removeWorkout: 'workouts/remove',
      getWorkouts: 'workouts/get',
    }),

    async remove() {
      await this.removeWorkout(this.workout.id);
      await this.getWorkouts();
    },
  },
});
</script>

<style lang="sass" scoped>
.header
  display: flex
  justify-content: space-between
  .action--buttons
    display: flex
    gap: 12px
    > *
      cursor: pointer
.button
  margin: 12px auto 0 auto
.description
  text-overflow: ellipsis
  overflow: hidden
  display: -webkit-box
  -webkit-line-clamp: 3
  -webkit-box-orient: vertical
  font-size: 16px
  margin-top: 12px
.tag
  margin: 6px
</style>

<style lang="sass">
.workout-info .el-tag
  margin-right: 6px
</style>
