import { shallowMount } from '@vue/test-utils';
import Puzzle1 from './Puzzle1';
import firebaseUtil from '../../lib/firebase/firebase-util';
import GetNumPlayer from '../../lib/get-num-player';

const givenPlayerNumber = (playerNumber) => {
  jest.mock('@/lib/get-num-player.js');
  GetNumPlayer.get = jest.fn(() => playerNumber);
};

describe('Puzzle 1 Stage Controls Turns', () => {

  it('shows its your turn', () => {
    givenPlayerNumber(1);
    firebaseUtil.doc.mockImplementation((path) => {
      if (path === '/') return { 'turn': 1 }
      return { 'stagePlayer1': 1 };
    });

    const puzzle = shallowMount(Puzzle1);

    expect(puzzle.text()).toMatch('global.your-turn')
  });

  it('shows not your turn', () => {
    givenPlayerNumber(2);
    firebaseUtil.doc.mockImplementation((path) => {
      if (path === '/') return { 'turn': 1 }
      return { 'stagePlayer1': 1 };
    });

    const puzzle = shallowMount(Puzzle1);

    expect(puzzle.text()).not.toMatch('global.your-turn')
    expect(puzzle.text()).toMatch('global.not-your-turn')
  });
});
