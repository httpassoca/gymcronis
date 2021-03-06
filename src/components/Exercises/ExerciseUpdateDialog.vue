<template>
<Dialog
  @close="e => $emit('change', false)"
  :visible.sync="value"
  title="Edit exercise"
>
  <Form
    :rules="rules"
    :model="form"
    size="small"
    ref="form"
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
    <Button @click="$emit('canceled')">Cancel</Button>
    <Button type="primary" @click="submitForm">Edit</Button>
  </span>
</Dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
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
import { DialogDataType } from './types';
import { Exercise } from '../../store/exercises/types';

export default Vue.extend({
  name: 'ExerciseUpdateDialog',

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
    exercise: {
      type: Object as PropType<Exercise>,
      required: true,
    },
  },

  data(): DialogDataType {
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
          message: 'Please input exercise name',
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
    ...mapActions({ updateExercise: 'exercises/update' }),

    async submitForm() {
      const valid = await this.formRef.validate();
      if (valid) {
        this.updateExercise(this.form);
        this.$emit('updated');
      }
    },
  },

  mounted() {
    this.form = {
      id: this.$route.params.id,
      name: this.exercise.name,
      authorId: this.exercise.authorId,
      description: this.exercise.description,
      image: this.exercise.image || '',
      muscles: this.exercise.muscles || [],
    };
  },
});
</script>
