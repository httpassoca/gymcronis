<template>
<div class="full-w" v-if="exercise">
  <div class="header">
    <div>
      <PageHeader @back="$router.replace('/exercises')" title="Exercises" :content="exercise.name"/>
    </div>
    <Button
      type="primary"
      @click="showCreateDialog = true"
      icon="el-icon-edit"
      class="button--edit"
    >
      Edit exercise
    </Button>
  </div>
  <div class="exercise-info">
    <Tag
      v-for="(muscle, i) in exercise.muscles"
      :key="i"
      size="mini"
    >
      {{ muscle }}
    </Tag>
    <p>
      {{ exercise.description }}
    </p>
    <img loading="lazy" :src="exercise.image" alt="exercise image">
  </div>

  <ExerciseUpdateDialog
    v-model="showUpdateDialog"
    @updated="updatedExercise"
    @canceled="showUpdateDialog = false"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { PageHeader, Button, Tag } from 'element-ui';

import ExerciseUpdateDialog from '@/components/Exercises/ExerciseUpdateDialog.vue';

export default Vue.extend({
  name: 'ViewExercises',

  components: {
    ExerciseUpdateDialog,
    PageHeader,
    Button,
    Tag,
  },

  data() {
    return {
      showUpdateDialog: false,
    };
  },

  computed: mapGetters({ exercise: 'exercises/exercise' }),

  methods: {
    ...mapActions({ getExercise: 'exercises/getById' }),

    async updatedExercise() {
      this.showUpdateDialog = false;
    },
  },

  beforeMount() {
    this.getExercise(this.$route.params.id);
  },
});
</script>

<style lang="sass" scoped>
.header
  width: 100%
  display: flex
  justify-content: space-between
.exercise-info
  max-width: 800px
img
  margin: 12px 0
  max-width: 600px
p
  margin-top: 12px
  font-size: 18px

</style>

<style lang="sass">
.exercises .form .el-form-item
  margin-bottom: 12px !important
</style>
