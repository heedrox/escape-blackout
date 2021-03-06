import { shallowMount } from '@vue/test-utils';
import Puzzle1Stage from './Puzzle1Stage';

const givenAPuzzleWithInitialStatus = (initialStatus) => shallowMount(Puzzle1Stage, {
  propsData: { initialStatus },
});

describe('Puzzle 1 Stage', () => {
  it('instantiates with a initial status', () => {
    const puzzle1 = givenAPuzzleWithInitialStatus(['XXXX', 'XOOX', 'OOOX', 'OOOO'])

    expect(puzzle1.vm.status).toEqual(['XXXX', 'XOOX', 'OOOX', 'OOOO']);
  });

  it('creates the right amount of transistors (when 3)', () => {
    const puzzle1 = givenAPuzzleWithInitialStatus(['XXX', 'XXX', 'XXX'])

    expect(puzzle1.findAll('.transistor').length).toEqual(9);
  });

  it('creates the right amount of transistors (when 4)', () => {
    const puzzle1 = givenAPuzzleWithInitialStatus(['XXXX', 'XXXX', 'XXXX', 'XXXX'])

    expect(puzzle1.findAll('.transistor').length).toEqual(16);
  });

  it('creates the right amount of handlers (when 3)', () => {
    const puzzle1 = givenAPuzzleWithInitialStatus(['XXX', 'XXX', 'XXX'])

    expect(puzzle1.findAll('.handle').length).toEqual(6);
  });

  it('creates the right amount of handlers (when 4)', () => {
    const puzzle1 = givenAPuzzleWithInitialStatus(['XXXX', 'XXXX', 'XXXX', 'XXXX'])

    expect(puzzle1.findAll('.handle').length).toEqual(8);
  });

  it('sets size of class when instantiates (3)', () => {
    const puzzle1 = givenAPuzzleWithInitialStatus(['XXX', 'XXX', 'XXX'])

    expect(puzzle1.find('.panel-3').exists()).toBeTruthy();
  });

  it('sets size of class when instantiates (4)', () => {
    const puzzle1 = givenAPuzzleWithInitialStatus(['XXXX', 'XXXX', 'XXXX', 'XXXX'])

    expect(puzzle1.find('.panel-4').exists()).toBeTruthy();
  });

  describe('inverts Xs and Os through handles', () => {

    const aTest = (input, handle, expected) => ({input, handle, expected});
    const TEST_CASES = [
      aTest(['XXX', 'XOX', 'OXX'], '.handle-row1', ['OOO', 'XOX', 'OXX']),
      aTest(['XOX', 'XXO', 'OXX'], '.handle-row2', ['XOX', 'OOX', 'OXX']),
      aTest(['XOX', 'XXO', 'OXX'], '.handle-row3', ['XOX', 'XXO', 'XOO']),
      aTest(['XOX', 'XXO', 'OXX'], '.handle-col1', ['OOX', 'OXO', 'XXX']),
      aTest(['XOX', 'XXO', 'OXX'], '.handle-col2', ['XXX', 'XOO', 'OOX']),
      aTest(['XOX', 'XXO', 'OXX'], '.handle-col3', ['XOO', 'XXX', 'OXO']),
      aTest(['XXXX', 'XXXX', 'XXXX', 'XXXX'], '.handle-row4', ['XXXX', 'XXXX', 'XXXX', 'OOOO']),
      aTest(['XXXX', 'XXXX', 'XXXX', 'XXXX'], '.handle-col4', ['XXXO', 'XXXO', 'XXXO', 'XXXO']),
    ];

    TEST_CASES.forEach((testCase) => {
      it(`changes when pressed handle ${testCase.handle}`, async () => {
        const puzzle1 = givenAPuzzleWithInitialStatus(testCase.input)

        puzzle1.find(testCase.handle).trigger('click');
        await puzzle1.vm.$nextTick();

        expect(puzzle1.vm.status).toEqual(testCase.expected);
      });
    });

  });

  describe('The Panel status is shown', () => {

    const aTest = (input, expectedPosition, expectedValue, expectedSuccess) =>
      ({input, expectedPosition, expectedValue, expectedSuccess});

    const TEST_CASES = [
      aTest(['OOO', 'OOO', 'OOO'], 0, 'O', true),
      aTest(['XOO', 'OOO', 'OOO'], 0, 'X', false),
      aTest(['OXO', 'OOO', 'OOO'], 1, 'X', false),
      aTest(['OOO', 'OOO', 'OOO'], 1, 'O', true),
      aTest(['OOX', 'OOO', 'OOO'], 2, 'X', false),
      aTest(['OOO', 'OOO', 'OOO'], 2, 'O', true),
      aTest(['OOO', 'XOO', 'OOO'], 3, 'X', false),
      aTest(['OOO', 'OOO', 'OOO'], 3, 'O', true),
      aTest(['OOO', 'OXO', 'OOO'], 4, 'X', false),
      aTest(['OOO', 'OOO', 'OOO'], 4, 'O', true),
      aTest(['OOO', 'OOX', 'OOO'], 5, 'X', false),
      aTest(['OOO', 'OOO', 'OOO'], 5, 'O', true),
      aTest(['OOO', 'OOO', 'XOO'], 6, 'X', false),
      aTest(['OOO', 'OOO', 'OOO'], 6, 'O', true),
      aTest(['OOO', 'OOO', 'OXO'], 7, 'X', false),
      aTest(['OOO', 'OOO', 'OOO'], 7, 'O', true),
      aTest(['OOO', 'OOO', 'OOX'], 8, 'X', false),
      aTest(['OOO', 'OOO', 'OOO'], 8, 'O', true),
    ];

    TEST_CASES.forEach((testCase) => {
      it(`shows the transistor at position ${testCase.expectedPosition}`, () => {
        const puzzle1 = givenAPuzzleWithInitialStatus(testCase.input)

        expect(puzzle1.findAll('.transistor').at(testCase.expectedPosition).text())
          .toMatch(testCase.expectedValue);
      });

      it(`shows a hint as the class at position ${testCase.expectedPosition}`, () => {
        const puzzle1 = givenAPuzzleWithInitialStatus(testCase.input)

        expect(puzzle1.findAll('.transistor').at(testCase.expectedPosition).classes('success'))
          .toBe(testCase.expectedSuccess);
      });
    });
  });

  describe('Handles turn', () => {

    const HANDLES = [ 'row1', 'row2', 'row3', 'row4', 'col1', 'col2', 'col3', 'col4'];

    HANDLES.forEach(handle => {
      it(`changes to | when - ${handle}`, async () => {
        const puzzle1 = givenAPuzzleWithInitialStatus(['XXXX', 'XXXX', 'XXXX', 'XXXX'])

        puzzle1.find(`.handle-${handle}`).trigger('click');
        await puzzle1.vm.$nextTick();

        expect(puzzle1.find(`.handle-${handle}`).text()).toEqual('|');
      });
    });
  });
});
