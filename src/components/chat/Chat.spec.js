import { mount } from '@vue/test-utils';
import Chat from './Chat';
import { getLastAddedDocument, givenFirestoreCollection } from '../../test-utils/firestore-test-utils';
import { givenPlayerNumber } from '../../test-utils/game-test-utils';
import firebaseUtil from '../../lib/firebase/firebase-util';
import GetNumPlayer from '../../lib/get-num-player';

const aDoc = (player, message, timestamp) => ({player, message, timestamp});
const A_MESSAGE = 'This is A message';

const ANOTHER_MESSAGE = 'This is ANOTHER message';

const A_DOC = aDoc(1, A_MESSAGE, null);
const ANOTHER_DOC = aDoc(2, ANOTHER_MESSAGE, null);

const A_DOC_OLD = aDoc(1, 'An old document', { seconds: 10 });
const A_DOC_RECENT = aDoc(1, 'A more recent document', { seconds: 100 });
const A_DOC_SUPER_OLD = aDoc(1, 'A SUPER old document', { seconds: 1 });

const A_TYPED_MESSAGE = 'This is a message sent by player';

const THE_OVERLAY = '[data-test-id=turn-overlay]';

const givenTurnForPlayer = (player) =>
  firebaseUtil.doc.mockImplementation((path) => {
    if (path === '/') return { turn: player }
    return { [`stagePlayer${player}`]: 1 };
  });

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

    it('shows them sorted by timestamp desc', () => {
      givenFirestoreCollection({
        '/chat': [ A_DOC_SUPER_OLD, A_DOC_OLD, A_DOC_RECENT ]
      });

      mount(Chat);

      expect(firebaseUtil.collection.mock.calls[0][1].field).toBe('timestamp');
    });
  });

  describe('Sends messages', () => {
    it('shows an input text', () => {
      const chat = mount(Chat);

      expect(chat.find('[data-test-id=input-text]').exists()).toBeTruthy();
    });


    describe('when sending message', () => {

      let chat;

      beforeEach(() => {
        givenPlayerNumber(1);
        chat = mount(Chat);

        chat.find('[data-test-id=input-text]').setValue(A_TYPED_MESSAGE);
        chat.find('[data-test-id=input-submit').trigger('submit');
      });

      it('adds message', () => {
        const theMessage = getLastAddedDocument('/chat');
        expect(theMessage.message).toEqual(A_TYPED_MESSAGE);
      });

      it('adds player number', () => {
        const theMessage = getLastAddedDocument('/chat');
        expect(theMessage.player).toEqual(1);
      });

      it('adds timestamp ', () => {
        const theMessage = getLastAddedDocument('/chat');
        expect(theMessage.timestamp.isTimestamp).toBeTruthy();
      });

      it('clears the input text', () => {
        expect(chat.find('[data-test-id=input-text]').element.value).toEqual('');
      });
    });

    describe('Checking turn for sending', () => {
      describe('when it is your turn', () => {
        it.todo('en vez de mostrar un overlay, lo que haremos sera habilitar / deshabilitar input');
        it.skip('enables the input text', () => {
          givenPlayerNumber(1);
          givenTurnForPlayer(1);

          const chat = mount(Chat);

          // expect(...).not.toBeDisabled();
        });
      });
      describe('when it is NOT your turn', () => {
        it.skip('disables the input text', () => {
          givenPlayerNumber(1);
          givenTurnForPlayer(2);

          const chat = mount(Chat);

          // expect(...).toBeDisabled();
        });
      });
    });
  })

});
