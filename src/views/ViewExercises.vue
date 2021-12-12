<template>
<div class="full-w">
  <div class="header">
    <Form class="form" @submit.prevent.native="searchExercise">
      <Input v-model="search" placeholder="Search for a exercise..."/>
      <Button
        @click="searchExercise"
        icon="el-icon-search"
        type="primary"
        circle
      />
    </Form>
    <Button
      type="primary"
      @click="showDialog = true"
      icon="el-icon-plus"
      class="button--create"
    >
      Create exercise
    </Button>
  </div>
  <div class="exercises">
    <Exercise
      v-for="(exercise, i) in exercises"
      :key="i"
      :exercise="exercise"
    />
  </div>
  <Dialog
    :visible.sync="showDialog"
    title="Create an exercise"
  >
    <Form
      :model="formCreate"
      class="formCreate"
      ref="formCreate"
      size="small"
      :rules="rules"
    >
      <FormItem label="Name" prop="name">
        <Input
          v-model="formCreate.name"
          placeholder="Push up"
        />
      </FormItem>
      <FormItem label="Muscles" class="flex-col" prop="muscles">
        <CheckboxGroup v-model="formCreate.muscles">
          <Checkbox label="Shoulders" name="muscle"/>
          <Checkbox label="Chest" name="muscle"/>
          <Checkbox label="Backs" name="muscle"/>
          <Checkbox label="Arms" name="muscle"/>
          <Checkbox label="Core muscles" name="muscle"/>
          <Checkbox label="Legs" name="muscle"/>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="Image url">
        <Input v-model="formCreate.image"/>
      </FormItem>
      <FormItem label="Description" prop="description">
        <Input
          v-model="formCreate.description"
          type="textarea"
          placeholder="Push the ground! Not with your foot, bro, with the hands."
        />
      </FormItem>
    </Form>
    <span slot="footer" class="dialog-footer">
      <Button @click="cancelForm">Cancel</Button>
      <Button type="primary" @click="submitForm">Confirm</Button>
    </span>
  </Dialog>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import {
  Button, Input, Dialog, Form, FormItem, CheckboxGroup, Checkbox,
} from 'element-ui';

import Exercise from '@/components/Exercise.vue';

// https://stackoverflow.com/questions/52109471/typescript-in-vue-property-validate-does-not-exist-on-type-vue-element
type formType = Vue & {
  validate: () => Promise<boolean>;
  resetValidation: () => boolean;
  resetFields: () => void;
};

export default Vue.extend({
  name: 'ViewExercises',

  components: {
    Button,
    Exercise,
    Form,
    FormItem,
    Input,
    Dialog,
    CheckboxGroup,
    Checkbox,
  },

  data() {
    return {
      search: '',
      showDialog: false,
      formCreate: {
        name: '',
        description: '',
        image: '',
        muscles: ['Chest', 'Arms'],
      },
      rules: {
        name: [{
          required: true,
          message: 'Please input Exercise name',
          trigger: 'blur',
        }],
        description: [{
          required: true,
          message: 'Please input a description',
          trigger: 'blur',
        }],
        muscles: [{
          type: 'array',
          required: true,
          message: 'Please select at least one muscle',
          trigger: 'change',
        }],
      },
    };
  },

  computed: {
    ...mapGetters({ exercises: 'exercises/exercises' }),
    formRef(): formType {
      return this.$refs.formCreate as formType;
    },
  },

  methods: {
    ...mapActions({
      createExercise: 'exercises/create',
      getExercises: 'exercises/get',
    }),

    cancelForm() {
      this.showDialog = false;
      this.formRef.resetFields();
    },

    async submitForm() {
      const valid = await this.formRef.validate();
      if (valid) {
        this.create();
        this.cancelForm();
      }
    },

    async create() {
      await this.createExercise(this.formCreate);
      await this.getExercises();
    },

    async searchExercise() {
      this.getExercises(this.search);
    },
  },

  beforeMount() {
    this.getExercises();
  },
});
</script>

<style lang="sass" scoped>
.exercises
  display: grid
  grid-template-columns: 1fr
  grid-gap: 20px 25px
  width: 100%
  margin: 12px 0
  @media (min-width: 750px)
    grid-template-columns: repeat(2, 1fr)
  @media (min-width: 1050px)
    grid-template-columns: repeat(3, 1fr)
  @media (min-width: 1400px)
    grid-template-columns: repeat(4, 1fr)
  @media (min-width: 1700px)
    grid-template-columns: repeat(5, 1fr)
.header
  width: 100%
  display: flex
  justify-content: space-between
  .form
    display: flex
    gap: 12px
.button--create
  margin-left: 12px

</style>

<style lang="sass">
.formCreate .el-form-item
  margin-bottom: 12px !important
.flex-col
  display: flex
  flex-direction: column
  align-items: flex-start
</style>
