import { shallowMount } from '@vue/test-utils';
import Puzzle1 from './Puzzle1';
import firebaseUtil from '../../lib/firebase/firebase-util';
import GetNumPlayer from '../../lib/get-num-player';

const givenPlayerNumber = (playerNumber) => {
  jest.mock('@/lib/get-num-player.js');
  GetNumPlayer.get = jest.fn(() => playerNumber);
};

const THE_OVERLAY = '[data-test-id=turn-overlay]';

const givenTurnForPlayer = (player) =>
  firebaseUtil.doc.mockImplementation((path) => {
  if (path === '/') return { turn: player }
  return { [`stagePlayer${player}`]: 1 };
});

describe('Puzzle 1 Stage Controls Turns', () => {

  describe('When its your turn', () => {
    it('does not show overlay', () => {
      givenPlayerNumber(1);
      givenTurnForPlayer(1);

      const puzzle = shallowMount(Puzzle1);

      expect(puzzle.find(THE_OVERLAY).exists()).toBeFalsy();
    });
  });

  describe('When its NOT your turn', () => {

    beforeEach(() => {
      givenPlayerNumber(2);
      givenTurnForPlayer(1);
    });

    it('shows overlay', () => {
      const puzzle = shallowMount(Puzzle1);

      expect(puzzle.find(THE_OVERLAY).exists()).toBeTruthy();
    });

    it('does not show any message', () => {
      const puzzle = shallowMount(Puzzle1);

      expect(puzzle.find(THE_OVERLAY).text()).not.toMatch('global.not-your-turn');
    });

    it('shows a message when when you click on the overlay', async () => {
      const puzzle = shallowMount(Puzzle1);

      puzzle.find(THE_OVERLAY).trigger('click');
      await puzzle.vm.$nextTick();

      expect(puzzle.find(THE_OVERLAY).text()).toMatch('global.not-your-turn');
    });

    it('hides message after 5 secs', async () => {
      jest.useFakeTimers();
      const puzzle = shallowMount(Puzzle1);
      puzzle.find(THE_OVERLAY).trigger('click');
      await puzzle.vm.$nextTick();

      jest.advanceTimersByTime(5000);
      await puzzle.vm.$nextTick();

      expect(puzzle.find(THE_OVERLAY).text()).not.toMatch('global.not-your-turn');
    });
  });
});
