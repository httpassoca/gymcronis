<template>
<Card class="card">
  <div slot="header">
    <div class="header">
      <span>{{exercise.name}}</span>
      <div v-if="user.id === exercise.authorId" class="action--buttons">
        <Tooltip effect="dark" content="Remove" placement="top">
          <i @click="remove" class="el-icon-delete-solid"/>
        </Tooltip>
      </div>
    </div>
  </div>
  <div class="exercise-info">
    <Tag
      v-for="(muscle, i) in exercise.muscles"
      :key="i"
      size="mini"
    >
      {{ muscle }}
    </Tag>
    <p class="description">
      {{ exercise.description }}
    </p>
  </div>
  <Button class="button" @click="$router.push(`/exercise/${exercise.id}`)"> See more </Button>
</Card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import {
  Card, Tag, Button, Tooltip,
} from 'element-ui';

export default Vue.extend({
  name: 'Exercise',
  components: {
    Card,
    Tag,
    Button,
    Tooltip,
  },

  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },

  computed: mapGetters({ user: 'user/user' }),

  methods: {
    ...mapActions({
      removeExercise: 'exercises/remove',
      getExercises: 'exercises/get',
    }),

    async remove() {
      await this.removeExercise(this.exercise.id);
      await this.getExercises();
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
.exercise-info .el-tag
  margin-right: 6px
</style>
