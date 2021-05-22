import { mount } from '@vue/test-utils';
import Chess from './Chess';
import { givenPlayerNumber } from '../../test-utils/game-test-utils';
import { givenFirestore } from '../../test-utils/firestore-test-utils';
import { INITIAL_PIECES_BUILDER, PIECES } from './chess-constants';
import blankGameCodeBuilder from '../../lib/blank-game-code-builder';

const THE_OVERLAY = '[data-test-id=turn-overlay]';

const THE_CELL = (row,col) => `[data-test-id=cell-${row}-${col}]`;
const THE_PIECE = piece => `piece-${piece}`;

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

  `('shows pieces on each initial stage - $row / $col - $piece', async ( { row, col, piece }) => {
    givenFirestore({
      '/': { turn: 2 },
      '/puzzle-status/puzzle-2/pieces-location/current': INITIAL_PIECES_BUILDER.build()
    });

    const chess = mount(Chess);
    await chess.vm.$nextTick();

    expect(chess.find(THE_CELL(row, col)).classes().indexOf(THE_PIECE(piece))).toBeGreaterThanOrEqual(0);
  });

  it('shows pieces based on previous turn', async () => {
    let initialPieces = blankGameCodeBuilder.build()['puzzle-status']['puzzle-2']['pieces-location']['current'];
    initialPieces['0-0'] = null;
    initialPieces['0-1'] = PIECES.BLACK_TOWER;
    givenFirestore({
      '/': { turn: 2 },
      '/puzzle-status/puzzle-2/pieces-location/current': initialPieces
    });

    const chess = mount(Chess);
    await chess.vm.$nextTick();

    expect(chess.find(THE_CELL(0, 0)).classes().indexOf(THE_PIECE(PIECES.BLACK_TOWER))).toBe(-1);
    expect(chess.find(THE_CELL(0, 1)).classes().indexOf(THE_PIECE(PIECES.BLACK_TOWER))).toBeGreaterThanOrEqual(0);
  });

  const givenTurnForPlayer = (player) =>
    givenFirestore({
      '/': { turn: player },
      '/puzzle-status/puzzle-2/pieces-location/current': INITIAL_PIECES_BUILDER.build()
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
