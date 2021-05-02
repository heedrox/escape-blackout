import { mount } from '@vue/test-utils'
import Desktop from './Desktop.vue'
import { givenFirestore, givenFirestoreCollection } from '../test-utils/firestore-test-utils';
import DesktopIcon from './DesktopIcon';
import Chat from './chat/Chat';

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

  it('opens puzzle window when app-network is clicked', async () => {
    givenFirestore({
      '/puzzle-status/puzzle-1': {},
      '/': { 'app-chat': true }
    });
    const desktop = mount(Desktop);

    desktop.find('[data-test-id="desktop-icon-clickable-apps.network"]').trigger('click');
    await desktop.vm.$nextTick();

    expect(desktop.findComponent(Chat).exists()).toBeFalsy();
  });

  it('opens chat desktop window when app-chat is clicked', async () => {
    jest.mock('./puzzle-1/puzzle-1-icon.svg', () => 'puzzle-1-icon.svg');
    jest.mock('./chat/chat-icon.svg', () => 'chat-icon.svg');
    givenFirestore({
      '/puzzle-status/puzzle-1': {},
      '/': { 'app-chat': true }
    });
    givenFirestoreCollection({
      '/chat': []
    });
    const desktop = mount(Desktop);

    desktop.find('[data-test-id="desktop-icon-clickable-apps.chat"]').trigger('click');
    await desktop.vm.$nextTick();

    expect(desktop.find('[data-test-id="desktop-window-title"]').text()).toEqual('apps.chat');
    expect(desktop.find('[data-test-id="desktop-window-toolbar-icon"]').element.src).toMatch('chat-icon.svg');
    expect(desktop.findComponent(Chat).exists()).toBeTruthy();
  });

})
