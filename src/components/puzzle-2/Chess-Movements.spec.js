import Chess from './Chess';
import { mount } from '@vue/test-utils';
import { givenPlayerNumber } from '../../test-utils/game-test-utils';

const THE_CELL = (row, col) => `[data-test-id=cell-${row}-${col}]`;

describe('Chess Movements', () => {
  it('does not show any possible movement when no piece is selected', () => {
    const chess = mount(Chess);

    expect(chess.findAll('.possible-movement').length).toBe(0);
  });

  describe('Chess movements are restricted by player number', () => {
    it.each`
    playerNumber | row  | col  | expectedMovements | pieceMoving
    ${1}         | ${0} | ${0} | ${0}              | ${'blacks'}
    ${1}         | ${6} | ${0} | ${3}              | ${'whites'}
    ${2}         | ${0} | ${0} | ${4}              | ${'blacks'}
    ${2}         | ${6} | ${0} | ${0}              | ${'whites'}
    `('shows possible movements: $expectedMovements, when player $playerNumber moving $pieceMoving', async ( { playerNumber, row, col, expectedMovements }) => {
      givenPlayerNumber(playerNumber);
      const chess = mount(Chess);

      chess.find(THE_CELL(row, col)).trigger('click');
      await chess.vm.$nextTick();

      expect(chess.findAll('.possible-movement').length).toBe(expectedMovements);
    });
  });

  it.each`
    clickedRow | clickedCol | possibleMovements
    ${0}       | ${0}       | ${[[0,1], [0,2], [1,0], [2,0]]}
    ${0}       | ${3}       | ${[[0,1], [0,2], [1,3], [2,3]]}
    ${1}       | ${1}       | ${[[0,2], [2,0], [2,2]]}
  `('shows possible movements when a piece is selected - $clickedRow / $clickedCol', async ( {clickedRow, clickedCol, possibleMovements}) => {
    givenPlayerNumber(2);
    const chess = mount(Chess);

    chess.find(THE_CELL(clickedRow, clickedCol)).trigger('click');
    await chess.vm.$nextTick();

    possibleMovements.forEach(pm => {
      expect(chess.find(THE_CELL(pm[0], pm[1])).classes().indexOf('possible-movement')).toBeGreaterThanOrEqual(0);
    });
    expect(chess.findAll('.possible-movement').length).toBe(possibleMovements.length);
  });

  describe('When moves are executed', () => {
    it('does not move if DN is not selected', async () => {
      givenPlayerNumber(2);
      const chess = mount(Chess);
      chess.find(THE_CELL(0, 0)).trigger('click');
      await chess.vm.$nextTick();

      chess.find(THE_CELL(2, 3)).trigger('click');
      await chess.vm.$nextTick();

      expect(chess.find(THE_CELL(2,3)).classes().indexOf('piece-dn')).toBe(-1);
    });

    it('does not move when piece not selected', async () => {
      givenPlayerNumber(2);
      const chess = mount(Chess);

      chess.find(THE_CELL(2, 3)).trigger('click');
      await chess.vm.$nextTick();

      expect(chess.find(THE_CELL(2,3)).classes().indexOf('piece-dn')).toBe(-1);
    });

    it.each`
      originRow | originCol | targetRow | targetCol | movedPiece
      ${0}      | ${3}      | ${2}      | ${3}      | ${'piece-dn'}
      ${0}      | ${3}      | ${0}      | ${2}      | ${'piece-dn'}
      ${0}      | ${3}      | ${0}      | ${1}      | ${'piece-dn'}
      ${0}      | ${3}      | ${1}      | ${3}      | ${'piece-dn'}
      ${0}      | ${0}      | ${0}      | ${1}      | ${'piece-tn'}
    `('moves $movedPiece from $originRow-$originCol to $targetRow-$targetCol', async ( { originRow, originCol, targetRow, targetCol, movedPiece }) => {
      givenPlayerNumber(2);
      const chess = mount(Chess);
      chess.find(THE_CELL(originRow, originCol)).trigger('click');
      await chess.vm.$nextTick();

      chess.find(THE_CELL(targetRow, targetCol)).trigger('click');
      await chess.vm.$nextTick();

      expect(chess.find(THE_CELL(targetRow,targetCol)).classes().indexOf(movedPiece)).toBeGreaterThanOrEqual(0);
      expect(chess.find(THE_CELL(originRow,originCol)).classes().indexOf(movedPiece)).toBe(-1);
    });

    it('does not move the DN again', async () => {
      givenPlayerNumber(2);
      const chess = mount(Chess);
      chess.find(THE_CELL(0, 3)).trigger('click');
      await chess.vm.$nextTick();
      chess.find(THE_CELL(2, 3)).trigger('click');
      await chess.vm.$nextTick();

      chess.find(THE_CELL(0, 3)).trigger('click');
      await chess.vm.$nextTick();

      expect(chess.findAll('.possible-movement').length).toBe(0);
    });
  });
});
