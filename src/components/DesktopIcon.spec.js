import { shallowMount } from '@vue/test-utils'
import Icon from './DesktopIcon.vue'

describe('DesktopIcon.vue', () => {
  it('renders the text', () => {
    const text = 'Puzzle 1';

    const wrapper = shallowMount(Icon, {
      propsData: { text }
    });

    expect(wrapper.text()).toMatch(text);
  })
  it('renders the icon', () => {
    const icon = 'icon.png';
    const wrapper = shallowMount(Icon, {
      propsData: { icon }
    });

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toMatch(icon)
  })
  it('triggers click when image is clicked', async () => {
    const icon = 'icon.png';
    const wrapper = shallowMount(Icon, {
      propsData: { icon }
    });

    wrapper.find('img').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeTruthy();
  });
})
