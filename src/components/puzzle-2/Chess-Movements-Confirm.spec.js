import Chess from './Chess';
import { mount } from '@vue/test-utils';
import { givenPlayerNumber } from '../../test-utils/game-test-utils';
import { getNumberTimesFieldIsUpdated, getUpdatedField, givenFirestore } from '../../test-utils/firestore-test-utils';
import { INITIAL_PIECES_BUILDER, PIECES } from './chess-constants';

const THE_CELL = (row, col) => `[data-test-id=cell-${row}-${col}]`;

const THE_CELL_ORIGIN = THE_CELL(0, 0);
const THE_CELL_TARGET = THE_CELL(0, 2);
const ANOTHER_CELL_ORIGIN = THE_CELL(0,3);
const LOCATION_ORIGIN = '0-0';
const LOCATION_TARGET = '0-2';

const MOVEMENT_CONFIRM_ALERT = '[data-test-id=movement-confirm-alert]';
const MOVEMENT_CONFIRM_BTN_NO = '[data-test-id=movement-confirm-alert-btn-no]';
const MOVEMENT_CONFIRM_BTN_YES = '[data-test-id=movement-confirm-alert-btn-yes]';

const THE_MOVED_PIECE = PIECES.BLACK_TOWER;
const THE_MOVED_PIECE_CLASS = `piece-${THE_MOVED_PIECE}`;

const MOVEMENT_LIST_EACH = '[data-test-id=chess-movement]';

const clickButton = async (component, selector) => {
  component.find(selector).trigger('click');
  await component.vm.$nextTick();
}
describe('Chess Movements are executed', () => {
  describe('when initialized', () => {
    it('does not show movement-confirm-alert when it starts', () => {
      const chess = mount(Chess);

      expect(chess.find(MOVEMENT_CONFIRM_ALERT).exists()).toBeFalsy();
    });
    it('does not show any movement in the movement list', () => {
      const chess = mount(Chess);

      expect(chess.findAll(MOVEMENT_LIST_EACH).length).toBe(0);
    });
  });

  describe('when a movement is executed', () => {
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
    it('shows the movement in the movement list', async () => {
      givenPlayerNumber(2);
      givenFirestore({
        '/': { turn: 2 },
        '/puzzle-status/puzzle-2/pieces-location/current': INITIAL_PIECES_BUILDER.build()
      });
      const chess = mount(Chess);
      await clickButton(chess, THE_CELL_ORIGIN);

      await clickButton(chess, THE_CELL_TARGET);

      expect(chess.findAll(MOVEMENT_LIST_EACH).length).toBe(1);
      expect(chess.find('[data-test-id=chess-movement-0-left-piece]').classes().indexOf(THE_MOVED_PIECE_CLASS)).toBeGreaterThanOrEqual(0);
      expect(chess.find('[data-test-id=chess-movement-0-left-text]').text()).toBe('C8');
    });
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
      expect(chess.find(THE_CELL_ORIGIN).classes().indexOf(THE_MOVED_PIECE_CLASS)).toBeGreaterThanOrEqual(0);
      expect(chess.find(THE_CELL_TARGET).classes().indexOf(THE_MOVED_PIECE_CLASS)).toBe(-1);
    });

    it('removes the movement from the list', async () => {
      expect(chess.findAll(MOVEMENT_LIST_EACH).length).toBe(0);
    });

    it('get ready for the next movement', async () => {
    await clickButton(chess, THE_CELL_ORIGIN);

    expect(chess.findAll('.possible-movement').length).toBeGreaterThan(0);
    });

  });

  describe('when window closed or component destroyed', () => {
    it('undoes movement', async () => {
      givenPlayerNumber(2);
      givenFirestore({
        '/': { turn: 2 },
        '/puzzle-status/puzzle-2/pieces-location/current': INITIAL_PIECES_BUILDER.build()
      });
      const chess = mount(Chess);
      await clickButton(chess, THE_CELL_ORIGIN);
      await clickButton(chess, THE_CELL_TARGET);

      await chess.vm.$destroy();

      expect(getNumberTimesFieldIsUpdated(chess, 'piecesLocation', '0-0')).toBe(2);
      expect(getNumberTimesFieldIsUpdated(chess, 'piecesLocation', '0-2')).toBe(2);
    });

    it('does not fail when no movement was created', async () => {
      givenPlayerNumber(2);
      givenFirestore({
        '/': { turn: 2 },
        '/puzzle-status/puzzle-2/pieces-location/current': INITIAL_PIECES_BUILDER.build()
      });
      const chess = mount(Chess);

      expect(async () => {
        await chess.vm.$destroy();
        await chess.vm.$nextTick();
      }).not.toThrow();
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
      expect(chess.find(THE_CELL_TARGET).classes().indexOf(THE_MOVED_PIECE_CLASS)).toBeGreaterThanOrEqual(0);
      expect(chess.find(THE_CELL_ORIGIN).classes().indexOf(THE_MOVED_PIECE_CLASS)).toBe(-1);
    });

    it('persists the movement', async () => {
      expect(getUpdatedField(chess, 'piecesLocation', LOCATION_ORIGIN)).toBeNull();
      expect(getUpdatedField(chess, 'piecesLocation', LOCATION_TARGET)).toBe(THE_MOVED_PIECE);
    });

    it('get ready for the next movement', async () => {
      await clickButton(chess, ANOTHER_CELL_ORIGIN);

      expect(chess.findAll('.possible-movement').length).toBeGreaterThan(0);
    });

    it('persists the current movement in firebase', () => {
      expect(getUpdatedField(chess, 'puzzle2Status', 'movements')).toBe('tn02');
    });
  });

  describe('When movements are persisted', () => {
    it('shows movements when 1 movement has been made', async () => {
      givenPlayerNumber(2);
      givenFirestore({
        '/': { turn: 2 },
        '/puzzle-status/puzzle-2/pieces-location/current': INITIAL_PIECES_BUILDER.build(),
        '/puzzle-status/puzzle-2': { movements: 'tn20' },
      });

      const chess = mount(Chess);
      await chess.vm.$nextTick();

      expect(chess.findAll(MOVEMENT_LIST_EACH).length).toBe(1);
      expect(chess.find('[data-test-id=chess-movement-0-left-piece]').classes().indexOf(THE_MOVED_PIECE_CLASS)).toBeGreaterThanOrEqual(0);
      expect(chess.find('[data-test-id=chess-movement-0-left-text]').text()).toBe('A6');
    });
  });

  it.todo('when a movement is done and confirmed, i cannot move again, until se cambia el turno');
});
