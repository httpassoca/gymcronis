import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import ViewError from '../../src/views/ViewError.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('ViewError.vue', () => {
  const $router = {
    currentRoute: { path: 'wrongPage' },
  };

  const factory = (options?: any) => (
    mount(ViewError, {
      localVue,
      ...options,
      mocks: { $router },
      stubs: ['router-link'],
    })
  );

  test('should render component', () => {
    expect(!!factory().html()).toBe(true);
  });

  test('should show the wrong page when 404 error', () => {
    const wrapper = factory();
    expect(wrapper.get('h2').text()).toContain('Page "wrongPage" does not exist');
  });

  test('should show "Unauthorized" when 401 error', () => {
    const wrapper = factory({ propsData: { error: '401' } });
    expect(wrapper.get('h2').text()).toContain('Unauthorized');
  });
});
