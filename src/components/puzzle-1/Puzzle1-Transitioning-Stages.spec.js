import Vue from 'vue';
import MockVueFire from '../../test-utils/MockVueFire';
import { shallowMount } from '@vue/test-utils';
import Puzzle1 from './Puzzle1';
import Puzzle1Stage from './Puzzle1Stage';
import firebaseUtil from '../../lib/firebase/firebase-util';
import GetNumPlayer from '../../lib/get-num-player.js';
import { getUpdatedField } from '../../test-utils/firestore-utils';

Vue.use(MockVueFire);

const givenPlayerNumber = (playerNumber) => {
  jest.mock('@/lib/get-num-player.js');
  GetNumPlayer.get = jest.fn(() => playerNumber);
};

const andIntroductionMessageHasBeenPressed = async (puzzle) => {
  puzzle.find('[data-test-id=btn-message-ok]').trigger('click');
  await puzzle.vm.$nextTick();
};

beforeEach(async () => {
  localStorage.clear();
});

describe('Puzzle 1 - When transitioning stage', () => {
  describe('When transitioning Easy -> Medium', () => {
    it('shows the second introduction message', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));
      const puzzle1 = shallowMount(Puzzle1);
      await andIntroductionMessageHasBeenPressed(puzzle1);

      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      expect(puzzle1.text()).toMatch('puzzle1.intro-message-2');
      expect(puzzle1.text()).not.toMatch('puzzle1.intro-message-1');
    });

    it('hides the second introduction message, when pressed OK', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));
      const puzzle1 = shallowMount(Puzzle1);
      await andIntroductionMessageHasBeenPressed(puzzle1);
      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      puzzle1.find('[data-test-id=btn-message-ok]').trigger('click');
      await puzzle1.vm.$nextTick();

      expect(puzzle1.text()).not.toMatch('puzzle1.intro-message-2');
    });

    it('shows the MEDIUM puzzle stage, when player 1 and introduction message has been read', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));
      const puzzle1 = shallowMount(Puzzle1);
      await andIntroductionMessageHasBeenPressed(puzzle1);
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
      await andIntroductionMessageHasBeenPressed(puzzle1);

      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();
      await andIntroductionMessageHasBeenPressed(puzzle1);

      const theMediumStage = puzzle1.findComponent(Puzzle1Stage);
      expect(theMediumStage.vm.initialStatus.length).toEqual(4);
    });

  });

  describe('When transitioning MEDIUM -> HARD', () => {
    it('shows the third introduction message', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 2 }));
      const puzzle1 = shallowMount(Puzzle1);
      await andIntroductionMessageHasBeenPressed(puzzle1);

      const theMediumStage = puzzle1.findComponent(Puzzle1Stage);
      theMediumStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      expect(puzzle1.text()).toMatch('puzzle1.intro-message-3');
      expect(puzzle1.text()).not.toMatch('puzzle1.intro-message-2');

    });
    it('shows the HARD puzzle stage, after MEDIUM puzzle stage has been completed', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 2 }));
      const puzzle1 = shallowMount(Puzzle1);
      await andIntroductionMessageHasBeenPressed(puzzle1);

      const theMediumStage = puzzle1.findComponent(Puzzle1Stage);
      theMediumStage.vm.$emit('complete');
      await theMediumStage.vm.$nextTick();
      await andIntroductionMessageHasBeenPressed(puzzle1);

      const theHardStage = puzzle1.findComponent(Puzzle1Stage);
      expect(theHardStage.vm.initialStatus.length).toEqual(4);
      expect(theHardStage.vm.blockHandles).not.toEqual('');
    });
  });

  describe('unlocking chat', () => {
    it.each`
    stage | expectedUpdate
    ${1}  | ${undefined}
    ${2}  | ${true}
    `('unlocks CHAT ONLY transitioning from stage 2 to 3 - STAGE $stage / $expectedUpdate', async ( { stage, expectedUpdate }) => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': stage }));
      const puzzle1 = shallowMount(Puzzle1);
      await andIntroductionMessageHasBeenPressed(puzzle1);

      const theMediumStage = puzzle1.findComponent(Puzzle1Stage);
      theMediumStage.vm.$emit('complete');

      expect(getUpdatedField(puzzle1, 'globalStatus', 'app-chat')).toBe(expectedUpdate)
    });

  });
  describe('When transitioning HARD - > puzzle 2', () => {
    it('does not increase stage number in puzzle1 data', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ stagePlayer1: 3 }));
      const puzzle1 = shallowMount(Puzzle1);
      await andIntroductionMessageHasBeenPressed(puzzle1);

      const theStage = puzzle1.findComponent(Puzzle1Stage);
      theStage.vm.$emit('complete')

      expect(puzzle1.vm.puzzleStatus.stagePlayer1).toEqual(3);
    });

    it.each`
     stage | sentPuzzle
     ${1}  | ${undefined}
     ${2}  | ${undefined}
     ${3}  | ${2}
     `('stores puzzle number 2 when completed puzzle 1 stage 3 ONLY (case: $stage - $sentPuzzle)', async ({ stage, sentPuzzle }) => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ stagePlayer1: stage }));
      const puzzle1 = shallowMount(Puzzle1);
      await andIntroductionMessageHasBeenPressed(puzzle1);

      const theStage = puzzle1.findComponent(Puzzle1Stage);
      theStage.vm.$emit('complete')

      expect(getUpdatedField(puzzle1, 'globalStatus', 'puzzle')).toEqual(sentPuzzle)
    });
  });

  describe('Stage is persisted', () => {
    it('persists data in firestore', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));
      const puzzle1 = shallowMount(Puzzle1);
      await andIntroductionMessageHasBeenPressed(puzzle1);

      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      expect(getUpdatedField(puzzle1, 'puzzleStatus', 'stagePlayer1')).toBe(2)
    });
  });

})
