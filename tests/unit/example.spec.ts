import { shallowMount, createLocalVue } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

const localVue = createLocalVue();
localVue.config.silent = true;

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
      localVue,
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
