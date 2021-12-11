<template>
<Card class="card">
  <div slot="header">
    <div class="header">
      <span>{{exercise.name}}</span>
      <div class="action--buttons">
        <i class="el-icon-edit"/>
        <i @click="remove" class="el-icon-delete-solid"/>
      </div>
    </div>
  </div>
  <div>
    <Tag>{{ exercise.muscle }}</Tag>
    {{ exercise.description }}
  </div>
  <Button class="button"> See more </Button>
</Card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Card, Tag, Button } from 'element-ui';

export default Vue.extend({
  name: 'Exercise',
  components: {
    Card,
    Tag,
    Button,
  },

  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },

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
.button
  margin: 12px auto 0 auto
[class^="el-icon"]
  cursor: pointer
</style>
