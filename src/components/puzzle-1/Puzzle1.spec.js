import { shallowMount } from '@vue/test-utils';
import Puzzle1 from './Puzzle1';

describe('Puzzle 1', () => {
  describe('inverts Xs and Os through handles', () => {

    const aTest = (input, handle, expected) => ({input, handle, expected});
    const TEST_CASES = [
      aTest(['XXX', 'XOX', 'OXX'], '.handle-a', ['OOO', 'XOX', 'OXX']),
      aTest(['XOX', 'XXO', 'OXX'], '.handle-b', ['XOX', 'OOX', 'OXX']),
      aTest(['XOX', 'XXO', 'OXX'], '.handle-c', ['XOX', 'XXO', 'XOO']),
      aTest(['XOX', 'XXO', 'OXX'], '.handle-1', ['OOX', 'OXO', 'XXX']),
      aTest(['XOX', 'XXO', 'OXX'], '.handle-2', ['XXX', 'XOO', 'OOX']),
      aTest(['XOX', 'XXO', 'OXX'], '.handle-3', ['XOO', 'XXX', 'OXO']),
    ];

    TEST_CASES.forEach((testCase) => {
      it(`changes when pressed handle ${testCase.handle}`, async () => {
        const puzzle1 = shallowMount(Puzzle1);
        puzzle1.vm.status = testCase.input;

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
      it(`shows the transistor at position ${testCase.expectedPosition}`, async () => {
        const puzzle1 = shallowMount(Puzzle1);

        puzzle1.vm.status = testCase.input;
        await puzzle1.vm.$nextTick();

        expect(puzzle1.findAll('.transistor').at(testCase.expectedPosition).text())
          .toMatch(testCase.expectedValue);
      });

      it(`shows a hint as the class at position ${testCase.expectedPosition}`, async () => {
        const puzzle1 = shallowMount(Puzzle1);

        puzzle1.vm.status = testCase.input;
        await puzzle1.vm.$nextTick();

        expect(puzzle1.findAll('.transistor').at(testCase.expectedPosition).classes('success'))
          .toBe(testCase.expectedSuccess);
      });
    });
  });

});
