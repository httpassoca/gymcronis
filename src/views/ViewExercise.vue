<template>
<div v-if="exercise" class="full-w">
  <div class="header">
    <div>
      <PageHeader
        @back="goBack"
        :content="exercise.name"
        title="Back"
      />
    </div>
    <Button
      v-if="user.id === exercise.authorId"
      @click="showUpdateDialog = true"
      class="button--edit"
      icon="el-icon-edit"
      type="primary"
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
    <img :src="exercise.image" loading="lazy" alt="exercise image">
  </div>

  <ExerciseUpdateDialog
    v-model="showUpdateDialog"
    @change="e => showCreateDialog = e"
    @canceled="showUpdateDialog = false"
    @updated="updatedExercise"
    :exercise="exercise"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { PageHeader, Button, Tag } from 'element-ui';

import ExerciseUpdateDialog from '../components/Exercises/ExerciseUpdateDialog.vue';

export default Vue.extend({
  name: 'ViewExercise',

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

  computed: mapGetters({
    exercise: 'exercises/exercise',
    user: 'user/user',
  }),

  methods: {
    ...mapActions({
      getExercise: 'exercises/getById',
      removeExercise: 'exercises/removeActual',
    }),

    async updatedExercise() {
      this.showUpdateDialog = false;
    },

    async goBack() {
      await this.removeExercise();
      this.$router.back();
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
  margin-bottom: 12px
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
