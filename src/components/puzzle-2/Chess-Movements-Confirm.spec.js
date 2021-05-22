import Chess from './Chess';
import { mount } from '@vue/test-utils';
import { givenPlayerNumber } from '../../test-utils/game-test-utils';
import { getUpdatedField, givenFirestore } from '../../test-utils/firestore-test-utils';
import { INITIAL_PIECES_BUILDER, PIECES } from './chess-constants';

const THE_CELL = (row, col) => `[data-test-id=cell-${row}-${col}]`;

const THE_CELL_ORIGIN = THE_CELL(0, 3);
const THE_CELL_TARGET = THE_CELL(2, 3);
const ANOTHER_CELL_ORIGIN = THE_CELL(0,0);

const MOVEMENT_CONFIRM_ALERT = '[data-test-id=movement-confirm-alert]';
const MOVEMENT_CONFIRM_BTN_NO = '[data-test-id=movement-confirm-alert-btn-no]';
const MOVEMENT_CONFIRM_BTN_YES = '[data-test-id=movement-confirm-alert-btn-yes]';

const THE_MOVED_PIECE = 'piece-dn';

const clickButton = async (component, selector) => {
  component.find(selector).trigger('click');
  await component.vm.$nextTick();
}
describe('Chess Movements can be confirmed', () => {
  it('does not show movement-confirm-alert when it starts', () => {
    givenPlayerNumber(2);
    givenFirestore({
      '/': { turn: 2 },
      '/puzzle-status/puzzle-2/pieces-location/current': INITIAL_PIECES_BUILDER.build()
    });

    const chess = mount(Chess);

    expect(chess.find(MOVEMENT_CONFIRM_ALERT).exists()).toBeFalsy();
  });

  it('shows the confirm movement alert when a movement is executed', async () => {
    givenPlayerNumber(2);
    givenFirestore({
      '/': { turn: 2 },
      '/puzzle-status/puzzle-2/pieces-location/current': INITIAL_PIECES_BUILDER.build()
    });
    const chess = mount(Chess);
    await clickButton(chess, THE_CELL_ORIGIN);

    await clickButton(chess, THE_CELL_TARGET);

    expect(chess.find(MOVEMENT_CONFIRM_ALERT).exists()).toBeTruthy();
  });

  describe('when NO is selected', () => {

    let chess = null;

    beforeEach(async () => {
      givenPlayerNumber(2);
      givenFirestore({
        '/': { turn: 2 },
        '/puzzle-status/puzzle-2/pieces-location/current': INITIAL_PIECES_BUILDER.build()
      });
      chess = mount(Chess);
      await clickButton(chess, THE_CELL_ORIGIN);
      await clickButton(chess, THE_CELL_TARGET);

      await clickButton(chess, MOVEMENT_CONFIRM_BTN_NO);
    });

    it('hides the confirm movement alert', async () => {
      expect(chess.find(MOVEMENT_CONFIRM_ALERT).exists()).toBeFalsy();
    });

    it('undos the movement', async () => {
      expect(chess.find(THE_CELL_ORIGIN).classes().indexOf(THE_MOVED_PIECE)).toBeGreaterThanOrEqual(0);
      expect(chess.find(THE_CELL_TARGET).classes().indexOf(THE_MOVED_PIECE)).toBe(-1);
    });

    it('get ready for the next movement', async () => {
    await clickButton(chess, THE_CELL_ORIGIN);

    expect(chess.findAll('.possible-movement').length).toBeGreaterThan(0);
    });

  });

  describe('when YES is selected', () => {

    let chess = null;

    beforeEach(async () => {
      givenPlayerNumber(2);
      givenFirestore({
        '/': { turn: 2 },
        '/puzzle-status/puzzle-2/pieces-location/current': INITIAL_PIECES_BUILDER.build()
      });
      chess = mount(Chess);
      await clickButton(chess, THE_CELL_ORIGIN);
      await clickButton(chess, THE_CELL_TARGET);

      await clickButton(chess, MOVEMENT_CONFIRM_BTN_YES);
    });

    it('hides the confirm movement alert', async () => {
      expect(chess.find(MOVEMENT_CONFIRM_ALERT).exists()).toBeFalsy();
    });

    it('sets the movement', async () => {
      expect(chess.find(THE_CELL_TARGET).classes().indexOf(THE_MOVED_PIECE)).toBeGreaterThanOrEqual(0);
      expect(chess.find(THE_CELL_ORIGIN).classes().indexOf(THE_MOVED_PIECE)).toBe(-1);
    });

    it('persists the movement', async () => {
      expect(getUpdatedField(chess, 'piecesLocation', '0-3')).toBeNull();
      expect(getUpdatedField(chess, 'piecesLocation', '2-3')).toBe(PIECES.BLACK_QUEEN);
    });

    it('get ready for the next movement', async () => {
      await clickButton(chess, ANOTHER_CELL_ORIGIN);

      expect(chess.findAll('.possible-movement').length).toBeGreaterThan(0);
    });
  });

});
