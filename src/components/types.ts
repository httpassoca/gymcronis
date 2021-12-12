import Vue from 'vue';

// https://stackoverflow.com/questions/52109471/typescript-in-vue-property-validate-does-not-exist-on-type-vue-element
export type formType = Vue & {
  validate: () => Promise<boolean>;
  resetValidation: () => boolean;
  resetFields: () => void;
};
