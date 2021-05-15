import { mount } from '@vue/test-utils';
import Chess from './Chess';
import { givenPlayerNumber } from '../../test-utils/game-test-utils';
import { givenFirestore } from '../../test-utils/firestore-test-utils';

const THE_OVERLAY = '[data-test-id=turn-overlay]';

describe('Chess', () => {
  it('starts with a chess board', () => {
    const chess = mount(Chess);

    expect(chess.findAll('.cell').length).toBe(64);
  });

  it.each`
  row   | col    | piece  
  ${0}  | ${0}   | ${'tn'}
  ${0}  | ${3}   | ${'dn'}
  ${0}  | ${4}   | ${'rn'}
  ${1}  | ${1}   | ${'an'}
  ${1}  | ${6}   | ${'an'}
  ${3}  | ${0}   | ${'pn'}
  ${3}  | ${3}   | ${'pn'}
  ${4}  | ${4}   | ${'pb'}
  ${6}  | ${0}   | ${'tb'}
  ${6}  | ${2}   | ${'pb'}
  ${7}  | ${2}   | ${'ab'}
  ${7}  | ${4}   | ${'rb'}
  ${7}  | ${5}   | ${'cb'}

  `('shows pieces on each initial stage - $row / $col', ( { row, col, piece }) => {
    const chess = mount(Chess);

    expect(chess.find(`[data-test-id=cell-${row}-${col}]`).classes().indexOf(`piece-${piece}`)).toBeGreaterThanOrEqual(0);
  });

  const givenTurnForPlayer = (player) =>
    givenFirestore({
      '/': { turn: player }
    });

  describe('Is turn based', () => {
    it.each`
      playerNumber | turnPlayer | overlayExists
      ${1}         | ${1}       | ${false}
      ${1}         | ${2}       | ${true}
      ${2}         | ${1}       | ${true}
      ${2}         | ${2}       | ${false}
    `('show overlay $overlayExists when player is $playerNumber and turn is $turnPlayer', ( { playerNumber, turnPlayer, overlayExists }) => {
      givenPlayerNumber(playerNumber);
      givenTurnForPlayer(turnPlayer);

      const chess=mount(Chess);

      expect(chess.find(THE_OVERLAY).exists()).toBe(overlayExists)
    });
  });
});
