import { shallowMount } from '@vue/test-utils'
import DesktopWindow from './DesktopWindow.vue'
import Puzzle1 from './puzzle-1/Puzzle1';

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

  it('opens puzzle 1', () => {
    const wrapper = shallowMount(DesktopWindow);

    expect(wrapper.findComponent(Puzzle1).exists()).toBeTruthy();
  });
})
