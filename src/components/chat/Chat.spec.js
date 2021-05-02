import { mount } from '@vue/test-utils';
import Chat from './Chat';
import { givenFirestoreCollection } from '../../test-utils/firestore-test-utils';
import { givenPlayerNumber } from '../../test-utils/game-test-utils';

const aDoc = (player, message, timestamp) => ({player, message, timestamp});
const A_MESSAGE = 'This is A message';

const ANOTHER_MESSAGE = 'This is ANOTHER message';

const A_DOC = aDoc(1, A_MESSAGE, null);
const ANOTHER_DOC = aDoc(2, ANOTHER_MESSAGE, null);

const A_TYPED_MESSAGE = 'This is a message sent by player';

describe('Chat', () => {
  describe('Shows messages', () => {
    it.each`
    docsInFirestore           | expectedMessages
    ${[]}                     | ${[]}
    ${[ A_DOC ]}              | ${[ `${A_DOC.player}> ${A_DOC.message}` ]}
    ${[ A_DOC, ANOTHER_DOC ]} | ${[ `${A_DOC.player}> ${A_DOC.message}`, `${ANOTHER_DOC.player}> ${ANOTHER_DOC.message}` ]}
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

  describe('Sends messages', () => {
    it('shows an input text', () => {
      const chat = mount(Chat);

      expect(chat.find('[data-test-id=input-text]').exists()).toBeTruthy();
    });

    it('adds message when <RETURN> is typed', () => {
      const chat = mount(Chat);

      chat.find('[data-test-id=input-text]').setValue(A_TYPED_MESSAGE);
      chat.find('[data-test-id=input-submit').trigger('submit');

      expect(chat.vm.$firestoreRefs.messages.add.mock.calls.length).toEqual(1);
      const theMessage = chat.vm.$firestoreRefs.messages.add.mock.calls[0][0];
      expect(theMessage.message).toEqual(A_TYPED_MESSAGE);
    });

    it.skip('adds player number when sending message', () => {
      givenPlayerNumber(1);
      const chat = mount(Chat);

      chat.find('[data-test-id=input-text]').setValue(A_TYPED_MESSAGE);
      chat.find('[data-test-id=input-submit').trigger('submit');

      const theMessage = chat.vm.$firestoreRefs.messages.add.mock.calls[0][0];
      expect(theMessage.player).toEqual(1);
    });
    // solo puedes mandar mensajes en tu turno
  })

});
