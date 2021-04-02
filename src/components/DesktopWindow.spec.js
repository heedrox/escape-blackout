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
