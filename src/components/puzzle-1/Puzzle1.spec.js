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

describe('Puzzle 1', () => {
  describe('When initialized', () => {
    const TEST_CASES = [
      aTest(1, { }, ['XOO', 'OXX', 'XOO'], 'EASY'),
      aTest(1, { 'stagePlayer1': 2 }, ['XOXO', 'OXOX', 'XOXO', 'OXOX'], 'MEDIUM'),
      aTest(2, { 'stagePlayer2': 2 }, ['XOXO', 'OXOX', 'XOXO', 'OXOX'], 'MEDIUM')
    ];

    TEST_CASES.forEach(tc => {
      it(`shows the ${tc.expectedPuzzle} puzzle when numplayer ${tc.numPlayer}`, () => {
        givenPlayerNumber(tc.numPlayer);
        firebaseUtil.doc.mockImplementation(() => (tc.puzzleStatus));

        const puzzle1 = shallowMount(Puzzle1);

        const theStage = puzzle1.findComponent(Puzzle1Stage);
        expect(theStage.vm.initialStatus).toEqual(tc.expectedStatus);
      });
    });

    it('blocks ROW handles when player is 2, and stage is HARD', () => {
      givenPlayerNumber(2);
      firebaseUtil.doc.mockImplementation(() => ({ stagePlayer2: 3 }));

      const puzzle1 = shallowMount(Puzzle1);

      const theStage = puzzle1.findComponent(Puzzle1Stage);
      expect(theStage.vm.blockHandles).toEqual('ROW');

    })
  });

  describe('When advancing stage', () => {
    it('shows the MEDIUM puzzle stage, after EASY puzzle stage has been completed', async () => {
      givenPlayerNumber(1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));
      const puzzle1 = shallowMount(Puzzle1);

      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      const theMediumStage = puzzle1.findComponent(Puzzle1Stage);
      expect(theMediumStage.vm.initialStatus.length).toEqual(4);
    });

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

    it('persists data in firestore, after EASY puzzle stage has been completed', async () => {
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
