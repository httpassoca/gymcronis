<template>
<Dialog
  :visible.sync="value"
  title="Create a workout"
>
  <Form
    :model="form"
    ref="form"
    size="small"
    :rules="rules"
  >
    <FormItem label="Name" prop="name">
      <Input
        v-model="form.name"
        placeholder="Light weight baby!!"
      />
    </FormItem>
    <FormItem label="Exercises" class="flex-col" prop="exercises">
      <Select
        v-model="form.exercises"
        :remote-method="searchExercise"
        :loading="loading"
        placeholder="Search exercise"
        loading-text="searching..."
        reserve-keyword
        filterable
        clearable
        multiple
        remote
      >
        <Option
          v-for="item in options"
          :label="item.name"
          :value="item"
          :key="item.value"
        />
      </Select>
    </FormItem>
  </Form>
  <span slot="footer" class="dialog-footer">
    <Button @click="cancelForm">Cancel</Button>
    <Button type="primary" @click="submitForm">Create</Button>
  </span>
</Dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import {
  Button,
  Form,
  FormItem,
  Input,
  Dialog,
  Select,
  Option,
} from 'element-ui';

import { Exercise } from '@/store/exercises/types';
import { formType } from '../types';

export type ListExercise = {
  value: string;
  name: string;
  marked: boolean;
}

export default Vue.extend({
  name: 'WorkoutCreateDialog',

  components: {
    Form,
    FormItem,
    Input,
    Dialog,
    Select,
    Option,
    Button,
  },

  props: {
    value: Boolean,
  },

  data() {
    return {
      form: {
        name: '',
        exercises: [],
      },
      rules: {
        name: [{
          required: true,
          message: 'Please input Workout name',
          trigger: 'blur',
        }],
        exercises: [
          { required: true, message: 'Please select at least one exercise', trigger: 'change' },
        ],
      },
      options: [],
      list: [],
      loading: false,
    };
  },

  computed: {
    formRef(): formType {
      return this.$refs.form as formType;
    },
  },

  methods: {
    ...mapActions({
      createWorkout: 'workouts/create',
      getExercises: 'exercises/get',
    }),

    cancelForm() {
      this.$emit('canceled');
      this.formRef.resetFields();
    },
    searchExercise(query: string) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item: ListExercise) => item.name.toLowerCase()
            .indexOf(query.toLowerCase()) > -1);
        }, 200);
      } else {
        this.options = this.list;
      }
    },

    async submitForm() {
      const valid = await this.formRef.validate();
      if (valid) {
        this.createWorkout(this.form);
        this.$emit('created');
        this.formRef.resetFields();
      }
    },
  },

  async mounted() {
    const exercises = await this.getExercises() || [];
    this.list = exercises.map((exercise: Exercise) => ({
      value: exercise.id,
      name: exercise.name,
      marked: false,
    }));
  },
});
</script>

<style lang="sass" scoped>
.flex-col
  display: flex
  flex-direction: column
  align-items: flex-start
</style>

<style lang="sass">
.el-select-dropdown.is-multiple
  .el-select-dropdown__item.selected
    color: #900000 !important
.flex-col
  .el-form-item__content
    width: 100%
  .el-select__tags
    max-width: unset
</style>
