import Vue from 'vue';
import MockVueFire from '../../test-utils/MockVueFire';
import { mount } from '@vue/test-utils';
import Puzzle1 from './Puzzle1';
import Puzzle1Stage from './Puzzle1Stage';
import firebaseUtil from '../../lib/firebase/firebase-util';
import GetNumPlayer from '../../lib/get-num-player.js';

Vue.use(MockVueFire);

const aTest = (numPlayer, puzzleStatus, expectedStatus, expectedPuzzle) =>
  ({ numPlayer, puzzleStatus, expectedStatus, expectedPuzzle });

const givenPlayerNumber = (playerNumber) => {
  jest.mock('@/lib/get-num-player.js');
  GetNumPlayer.get = jest.fn(() => playerNumber);
};

const andIntroductionMessageHasBeenPressed = async (puzzle) => {
  if (puzzle.find('[data-test-id=btn-message-ok]').exists()) {
    puzzle.find('[data-test-id=btn-message-ok]').trigger('click');
    await puzzle.vm.$nextTick();
  }
};

beforeEach(async () => {
  localStorage.clear();
});

describe('Puzzle 1 - When Initialized', () => {

  const TEST_CASES = [
    aTest(1, {}, ['XOO', 'OXX', 'XOO'], 'EASY'),
    aTest(1, { 'stagePlayer1': 2 }, ['XOXO', 'OXOX', 'XOXO', 'OXOX'], 'MEDIUM'),
    aTest(2, { 'stagePlayer2': 2 }, ['XOXO', 'OXOX', 'XOXO', 'OXOX'], 'MEDIUM')
  ];

  TEST_CASES.forEach(tc => {
    it(`shows the ${tc.expectedPuzzle} puzzle when numplayer ${tc.numPlayer}`, async () => {
      givenPlayerNumber(tc.numPlayer);
      firebaseUtil.doc.mockImplementation(() => (tc.puzzleStatus));

      const puzzle1 = mount(Puzzle1);
      await andIntroductionMessageHasBeenPressed(puzzle1);

      const theStage = puzzle1.findComponent(Puzzle1Stage);
      expect(theStage.vm.initialStatus).toEqual(tc.expectedStatus);
    });
  });

  it('blocks ROW handles when player is 2, and stage is HARD', async () => {
    givenPlayerNumber(2);
    firebaseUtil.doc.mockImplementation(() => ({ stagePlayer2: 3 }));

    const puzzle1 = mount(Puzzle1);
    await andIntroductionMessageHasBeenPressed(puzzle1);

    const theStage = puzzle1.findComponent(Puzzle1Stage);
    expect(theStage.vm.blockHandles).toEqual('ROW');
  })

  it('blocks COL handles when player is 1, and stage is HARD', async () => {
    givenPlayerNumber(1);
    firebaseUtil.doc.mockImplementation(() => ({ stagePlayer1: 3 }));

    const puzzle1 = mount(Puzzle1);
    await andIntroductionMessageHasBeenPressed(puzzle1);

    const theStage = puzzle1.findComponent(Puzzle1Stage);
    expect(theStage.vm.blockHandles).toEqual('COL');
  })

  it('does not persist the stage status for the EASY stage', async () => {
    givenPlayerNumber(1);
    firebaseUtil.doc.mockImplementation(() => ({ stagePlayer1: 1 }));

    const puzzle1 = mount(Puzzle1);
    await andIntroductionMessageHasBeenPressed(puzzle1);

    const theStage = puzzle1.findComponent(Puzzle1Stage);

    expect(theStage.vm.persistStatus).toEqual(false);
  });

  it('does not persist the stage status for the MEDIUM stage', async () => {
    givenPlayerNumber(1);
    firebaseUtil.doc.mockImplementation(() => ({ stagePlayer1: 2 }));

    const puzzle1 = mount(Puzzle1);
    await andIntroductionMessageHasBeenPressed(puzzle1);

    const theStage = puzzle1.findComponent(Puzzle1Stage);
    expect(theStage.vm.persistStatus).toEqual(false);
  });

  it('does persist the stage status for the HARD stage', async () => {
    givenPlayerNumber(1);
    firebaseUtil.doc.mockImplementation(() => ({ stagePlayer1: 3 }));

    const puzzle1 = mount(Puzzle1);
    await andIntroductionMessageHasBeenPressed(puzzle1);

    const theStage = puzzle1.findComponent(Puzzle1Stage);
    expect(theStage.vm.persistStatus).toEqual(true);
  });
});
