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

beforeEach(() => {
  localStorage.clear();
});

describe('Puzzle 1 shows messages between stages', () => {
  it('shows first message before puzzle stage 1', async () => {
    givenPlayerNumber(1);
    firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));

    const puzzle1 = shallowMount(Puzzle1);

    expect(puzzle1.text()).toMatch('puzzle1.intro-message-1');
  });

  it('hides puzzle before puzzle stage 1', async () => {
    givenPlayerNumber(1);
    firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));

    const puzzle1 = shallowMount(Puzzle1);

    expect(puzzle1.findComponent(Puzzle1Stage).exists()).toBeFalsy();
  });

  it('hides message when user presses button', async () => {
    givenPlayerNumber(1);
    firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));
    const puzzle1 = shallowMount(Puzzle1);

    puzzle1.find('[data-test-id=btn-message-ok]').trigger('click');
    await puzzle1.vm.$nextTick();

    expect(puzzle1.text()).not.toMatch('puzzle1.intro-message-1');
  });

  it('does not show the message when reloading if OK has been pressed', async () => {
    givenPlayerNumber(1);
    firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));
    const puzzle1 = shallowMount(Puzzle1);
    puzzle1.find('[data-test-id=btn-message-ok]').trigger('click');
    await puzzle1.vm.$nextTick();

    const puzzle1after = shallowMount(Puzzle1);

    expect(puzzle1after.text()).not.toMatch('puzzle1.intro-message-1');
    expect(puzzle1after.findComponent(Puzzle1Stage).exists()).toBeTruthy();
  });
})
