import Chess from './Chess';
import { mount } from '@vue/test-utils';
import { givenPlayerNumber } from '../../test-utils/game-test-utils';

const THE_CELL = (row, col) => `[data-test-id=cell-${row}-${col}]`;

const THE_CELL_ORIGIN = THE_CELL(0, 3);
const THE_CELL_TARGET = THE_CELL(2, 3);

const MOVEMENT_CONFIRM_ALERT = '[data-test-id=movement-confirm-alert]';

const THE_MOVED_PIECE = 'piece-dn';

const clickButton = async (component, selector) => {
  component.find(selector).trigger('click');
  await component.vm.$nextTick();
}
describe('Chess Movements can be confirmed', () => {
  it('does not show movement-confirm-alert when it starts', () => {
    givenPlayerNumber(2);

    const chess = mount(Chess);

    expect(chess.find(MOVEMENT_CONFIRM_ALERT).exists()).toBeFalsy();
  });

  it('shows the confirm movement alert when a movement is executed', async () => {
    givenPlayerNumber(2);
    const chess = mount(Chess);
    await clickButton(chess, THE_CELL_ORIGIN);

    await clickButton(chess, THE_CELL_TARGET);

    expect(chess.find(MOVEMENT_CONFIRM_ALERT).exists()).toBeTruthy();
  });

  describe('when NO is selected', () => {

    let chess = null;

    beforeEach(async () => {
      givenPlayerNumber(2);
      chess = mount(Chess);
      await clickButton(chess, THE_CELL_ORIGIN);
      await clickButton(chess, THE_CELL_TARGET);

      await clickButton(chess, '[data-test-id=movement-confirm-alert-btn-no]');
    });

    it('hides the confirm movement alert', async () => {
      expect(chess.find(MOVEMENT_CONFIRM_ALERT).exists()).toBeFalsy();
    });

    it('undos the movement', async () => {
      expect(chess.find(THE_CELL_ORIGIN).classes().indexOf(THE_MOVED_PIECE)).toBeGreaterThanOrEqual(0);
      expect(chess.find(THE_CELL_TARGET).classes().indexOf(THE_MOVED_PIECE)).toBe(-1);
    });

    it.todo('resets the movement when NO is selected'/*, async () => {
    await clickButton(chess, THE_CELL_ORIGIN);

    expect(chess.findAll('.possible-movement').length).toBeGreaterThan(0);
  }*/);

  });

});
