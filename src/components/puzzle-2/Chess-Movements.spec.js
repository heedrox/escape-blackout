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
});
