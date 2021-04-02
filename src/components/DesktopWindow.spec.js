import { shallowMount } from '@vue/test-utils'
import DesktopWindow from './DesktopWindow.vue'

describe('DesktopWindow.vue', () => {
  it('renders the text', () => {
    const title = 'Networking';

    const wrapper = shallowMount(DesktopWindow, {
      propsData: { title }
    });

    expect(wrapper.text()).toMatch(title);
  });

  it('renders the icon', () => {
    const icon = 'the-icon';

    const wrapper = shallowMount(DesktopWindow, {
      propsData: { icon }
    });

    expect(wrapper.find('img').attributes('src')).toMatch('the-icon');
  });

  it('can be closed', async () => {
    const title = 'Networking';
    const wrapper = shallowMount(DesktopWindow, {
      propsData: { title }
    });

    wrapper.find('.close-handler').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().close).toBeTruthy();
  })
})
