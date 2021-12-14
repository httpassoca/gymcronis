<template>
<div class="full-w">
  <div class="header">
    <div>
      <PageHeader
        @back="goBack"
        :content="workout.name"
        title="Workouts"
      />
    </div>
    <div>
      <Button
        @click="remove"
        icon="el-icon-delete-solid"
      />
      <Button
        @click="showUpdateDialog = true"
        icon="el-icon-edit"
        type="primary"
      >
        Edit workout
      </Button>
    </div>
  </div>

  <WorkoutUpdateDialog
    v-model="showUpdateDialog"
    :workout="workout"
    @updated="updatedWorkout"
    @canceled="showUpdateDialog = false"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { PageHeader, Button } from 'element-ui';

import WorkoutUpdateDialog from '@/components/Workouts/WorkoutUpdateDialog.vue';

export default Vue.extend({
  name: 'ViewWorkout',

  components: {
    WorkoutUpdateDialog,
    PageHeader,
    Button,
  },

  data() {
    return {
      showUpdateDialog: false,
      workout: {},
    };
  },

  methods: {
    ...mapActions({
      getWorkout: 'workouts/getById',
      removeWorkout: 'workouts/removeActual',
    }),

    async updatedWorkout() {
      this.workout = await this.getWorkout(this.$route.params.id);
      this.showUpdateDialog = false;
    },

    goBack() {
      this.$router.replace('/workouts');
    },
  },

  async mounted() {
    this.workout = await this.getWorkout(this.$route.params.id);
  },
});
</script>

<style lang="sass" scoped>
.header
  width: 100%
  display: flex
  justify-content: space-between
  margin-bottom: 12px
.workout-info
  max-width: 800px
img
  margin: 12px 0
  max-width: 600px
p
  margin-top: 12px
  font-size: 18px

</style>

<style lang="sass">
.workouts .form .el-form-item
  margin-bottom: 12px !important
</style>
