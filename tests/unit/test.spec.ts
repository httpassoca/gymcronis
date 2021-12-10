import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import About from '@/views/Auth.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('test', () => {
  test('1 is 1 ? Or are we living a lie?', () => {
    const test = 'test';
    const wrapper = mount(About, {
      localVue,
      stubs: ['el-button'],
    });
    expect(wrapper.text()).toBe(test);
  });
});
