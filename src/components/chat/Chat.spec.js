import { mount } from '@vue/test-utils';
import Chat from './Chat';
import { givenFirestoreCollection } from '../../test-utils/firestore-test-utils';

const A_MESSAGE = 'This is A message';
const ANOTHER_MESSAGE = 'This is ANOTHER message';

const aDoc = (player, message, timestamp) => ({player, message, timestamp});

describe('Chat', () => {
  describe('Shows messages', () => {
    it('shows no messages when there are not messages', () => {
      givenFirestoreCollection({
        '/chat': [ ]
      });

      const chat = mount(Chat);

      expect(chat.findAll('[data-test-id*=message]').length).toEqual(0);
    });

    it('shows one message when there is message', () => {
      givenFirestoreCollection({
        '/chat': [ aDoc(1, A_MESSAGE, null) ]
      });


      const chat = mount(Chat);

      expect(chat.findAll('[data-test-id*=message]').length).toEqual(1);
      expect(chat.findAll('[data-test-id*=message]').at(0).text()).toEqual(A_MESSAGE);
    });

    it('shows two messages when there are two messages', () => {
      givenFirestoreCollection({
        '/chat': [
          aDoc(1, A_MESSAGE, null),
          aDoc(2, ANOTHER_MESSAGE, null),
        ]
      });


      const chat = mount(Chat);

      expect(chat.findAll('[data-test-id*=message]').length).toEqual(2);
      expect(chat.findAll('[data-test-id*=message]').at(0).text()).toEqual(A_MESSAGE);
      expect(chat.findAll('[data-test-id*=message]').at(1).text()).toEqual(ANOTHER_MESSAGE);
    });
  });

  /*describe.todo('Can write messages', () => {

  })*/

});
