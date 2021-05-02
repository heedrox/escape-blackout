import { mount } from '@vue/test-utils';
import Chat from './Chat';
import { givenFirestoreCollection } from '../../test-utils/firestore-test-utils';

const aDoc = (player, message, timestamp) => ({player, message, timestamp});
const A_MESSAGE = 'This is A message';

const ANOTHER_MESSAGE = 'This is ANOTHER message';

const A_DOC = aDoc(1, A_MESSAGE, null);
const ANOTHER_DOC = aDoc(2, ANOTHER_MESSAGE, null);

describe('Chat', () => {
  describe('Shows messages', () => {
    it.each`
    docsInFirestore           | expectedMessages
    ${[]}                     | ${[]}
    ${[ A_DOC ]}              | ${[ A_DOC.message ]}
    ${[ A_DOC, ANOTHER_DOC ]} | ${[ A_DOC.message, ANOTHER_DOC.message ]}
    `('shows messages with messages: $expectedMessages', ({ docsInFirestore, expectedMessages }) => {
      givenFirestoreCollection({
        '/chat': docsInFirestore
      });

      const chat = mount(Chat);

      const messages = chat.findAll('[data-test-id*=message]');

      expect(messages.length).toEqual(expectedMessages.length);
      expectedMessages.forEach(expectedMessage => {
        expect(messages.filter(m => m.text() === expectedMessage).exists()).toBeTruthy();
      });
    });
  });

  /*describe.todo('Can write messages', () => {

  })*/

});
