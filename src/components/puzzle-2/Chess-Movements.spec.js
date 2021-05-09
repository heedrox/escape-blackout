import Chess from './Chess';
import { mount } from '@vue/test-utils';

describe('Chess Movements', () => {
  it('does not show any possible movement when no piece is selected', () => {
    const chess = mount(Chess);

    expect(chess.findAll('.possible-movement').length).toBe(0);
  });

  it.each`
    clickedRow | clickedCol | possibleMovements
    ${0}       | ${0}       | ${[[0,1], [0,2], [1,0], [2,0]]}
    ${0}       | ${3}       | ${[[0,1], [0,2], [1,3], [2,3]]}
    ${1}       | ${1}       | ${[[0,2], [2,0], [2,2]]}
  `('shows possible movements when a piece is selected - $clickedRow / $clickedCol', async ( {clickedRow, clickedCol, possibleMovements}) => {
    const chess = mount(Chess);

    chess.find(`[data-test-id=cell-${clickedRow}-${clickedCol}]`).trigger('click');
    await chess.vm.$nextTick();

    possibleMovements.forEach(pm => {
      expect(chess.find(`[data-test-id=cell-${pm[0]}-${pm[1]}]`).classes().indexOf('possible-movement')).toBeGreaterThanOrEqual(0);
    });
    expect(chess.findAll('.possible-movement').length).toBe(possibleMovements.length);
  });
});
