import { shallowMount } from '@vue/test-utils'
import Icon from './Icon.vue'

describe('Icon.vue', () => {
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
})
