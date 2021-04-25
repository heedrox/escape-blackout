import { shallowMount } from '@vue/test-utils'
import Desktop from './Desktop.vue'
import DesktopIcon from './DesktopIcon';
import DesktopWindow from './DesktopWindow';

describe('Desktop.vue', () => {

  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(Desktop);
  });

  it('shows an icon', () => {
    expect(wrapper.findComponent(DesktopIcon).exists()).toBe(true);
  });

  it('hides window when starts', () => {
    expect(wrapper.findComponent(DesktopWindow).exists()).toBe(false);
  });

  describe('the full window', () => {
    it('shows when icon is clicked', async () => {
      wrapper.findComponent(DesktopIcon).vm.$emit('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(DesktopWindow).exists()).toBe(true);
    });

    it('shows the title of the clicked icon', async () => {
      wrapper.findComponent(DesktopIcon).vm.$emit('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(DesktopWindow).props('title')).toBe('Network');
    });
  });

  it('closes window', async () => {
    wrapper.findComponent(DesktopIcon).vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(DesktopWindow).exists()).toBe(true);

    wrapper.findComponent(DesktopWindow).vm.$emit('close');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(DesktopWindow).exists()).toBe(false);
  });
})
