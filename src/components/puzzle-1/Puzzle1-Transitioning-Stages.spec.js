import Vue from 'vue';
import MockVueFire from '../../test-utils/MockVueFire';
import { shallowMount } from '@vue/test-utils';
import Puzzle1 from './Puzzle1';
import Puzzle1Stage from './Puzzle1Stage';
import firebaseUtil from '../../lib/firebase/firebase-util';
import GetNumPlayer from '../../lib/get-num-player.js';

Vue.use(MockVueFire);

const aTest = (numPlayer, puzzleStatus, expectedStatus, expectedPuzzle) =>
  ({numPlayer, puzzleStatus, expectedStatus, expectedPuzzle});

const givenPlayerNumber = (playerNumber) => {
  jest.mock('@/lib/get-num-player.js');
  GetNumPlayer.get = jest.fn(() => playerNumber);
};

const givenIntroductionMessageHasBeenPressed = async () => {
  const puzzle1 = shallowMount(Puzzle1);
  puzzle1.find('[data-test-id=btn-message-ok]').trigger('click');
  await puzzle1.vm.$nextTick();
};

beforeEach(async () => {
  localStorage.clear();
  await givenIntroductionMessageHasBeenPressed();
});

describe('Puzzle 1 - When transitioning stage', () => {
  describe('When transitioning Easy -> Medium', () => {
    it('shows the second introduction message', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));
      const puzzle1 = shallowMount(Puzzle1);

      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      expect(puzzle1.text()).toMatch('Muy bien');
      expect(puzzle1.text()).not.toMatch('Te doy la bienvenida');
    });

    it('hides the second introduction message, when pressed OK', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));
      const puzzle1 = shallowMount(Puzzle1);
      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      puzzle1.find('[data-test-id=btn-message-ok]').trigger('click');
      await puzzle1.vm.$nextTick();

      expect(puzzle1.text()).not.toMatch('Muy bien');
    });

    it('shows the MEDIUM puzzle stage, when player 1 and introduction message has been read', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));
      const puzzle1 = shallowMount(Puzzle1);
      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      puzzle1.find('[data-test-id=btn-message-ok]').trigger('click');
      await puzzle1.vm.$nextTick();

      const theMediumStage = puzzle1.findComponent(Puzzle1Stage);
      expect(theMediumStage.vm.initialStatus.length).toEqual(4);
    });

    it('shows the MEDIUM puzzle stage, when player 2, after EASY puzzle stage has been completed', async () => {
      givenPlayerNumber(2);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer2': 1 }));
      const puzzle1 = shallowMount(Puzzle1);

      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      const theMediumStage = puzzle1.findComponent(Puzzle1Stage);
      expect(theMediumStage.vm.initialStatus.length).toEqual(4);
    });

  });

 describe('When transitioning MEDIUM -> HARD', () => {
    it('shows the HARD puzzle stage, after MEDIUM puzzle stage has been completed', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 2 }));
      const puzzle1 = shallowMount(Puzzle1);

      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      const theHardStage = puzzle1.findComponent(Puzzle1Stage);
      expect(theHardStage.vm.initialStatus.length).toEqual(4);
      expect(theHardStage.vm.blockHandles).not.toEqual('');
    });
  });

  describe('Stage is persisted', () => {
    it('persists data in firestore', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));

      const puzzle1 = shallowMount(Puzzle1);

      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      expect(puzzle1.vm.$firestoreRefs.puzzleStatus.update.mock.calls.length).toBe(1);
    });
  });

})
