<template>
<Dialog
  :visible.sync="value"
  title="Create an exercise"
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
        placeholder="Push up"
      />
    </FormItem>
    <FormItem label="Muscles" class="flex-col" prop="muscles">
      <CheckboxGroup v-model="form.muscles">
        <Checkbox label="Shoulders" name="muscle"/>
        <Checkbox label="Chest" name="muscle"/>
        <Checkbox label="Backs" name="muscle"/>
        <Checkbox label="Arms" name="muscle"/>
        <Checkbox label="Core muscles" name="muscle"/>
        <Checkbox label="Legs" name="muscle"/>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="Image url">
      <Input v-model="form.image"/>
    </FormItem>
    <FormItem label="Description" prop="description">
      <Input
        v-model="form.description"
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
  CheckboxGroup,
  Checkbox,
} from 'element-ui';

import { formType } from '../types';

export default Vue.extend({
  name: 'ExerciseCreateDialog',

  components: {
    Form,
    FormItem,
    Input,
    Dialog,
    CheckboxGroup,
    Checkbox,
    Button,
  },

  props: {
    value: Boolean,
  },

  data() {
    return {
      form: {
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
    formRef(): formType {
      return this.$refs.form as formType;
    },
  },

  methods: {
    ...mapActions({ createExercise: 'exercises/create' }),

    cancelForm() {
      this.$emit('canceled');
      this.formRef.resetFields();
    },

    async submitForm() {
      const valid = await this.formRef.validate();
      if (valid) {
        this.createExercise(this.form);
        this.$emit('created');
        this.formRef.resetFields();
      }
    },
  },
});
</script>
