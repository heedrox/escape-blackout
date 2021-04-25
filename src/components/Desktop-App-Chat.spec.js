import { mount } from '@vue/test-utils'
import Desktop from './Desktop.vue'
import { givenFirestore } from '../test-utils/firestore-test-utils';
import DesktopIcon from './DesktopIcon';

describe('Desktop App Chat.vue', () => {

  it('is not shown when app-chat: false', () => {
    givenFirestore({
      '/': { }
    });

    const desktop = mount(Desktop);

    expect(desktop.text()).not.toMatch('apps.chat')
  });

  it('is shown when app-chat: true', () => {
    givenFirestore({
      '/': { 'app-chat': true }
    });

    const desktop = mount(Desktop);

    const icons = desktop.findAllComponents(DesktopIcon);
    expect(icons.filter(icon => icon.props('text') === 'apps.chat').length).toBe(1);
  });
})
