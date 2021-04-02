import { shallowMount } from '@vue/test-utils';
import Puzzle1 from './Puzzle1';

describe('Puzzle 1', () => {
  it('changes with handle a', () => {
    const puzzle1 = shallowMount(Puzzle1);
    puzzle1.vm.status = ['XXX', 'XOX', 'OXX'];

    puzzle1.find('.handle-a').trigger('click');

    expect(puzzle1.vm.status).toEqual([
      'OOO', 'XOX', 'OXX'
    ]);
  });

  it('changes with handle a (case b)', () => {
    const puzzle1 = shallowMount(Puzzle1);
    puzzle1.vm.status = ['XOX', 'XOX', 'OXX'];

    puzzle1.find('.handle-a').trigger('click');

    expect(puzzle1.vm.status).toEqual([
      'OXO', 'XOX', 'OXX'
    ]);
  })

  xit('changes with handle b', () => {
    const puzzle1 = shallowMount(Puzzle1);
    puzzle1.vm.status = ['XOX', 'XXO', 'OXX'];

    puzzle1.find('.handle-b').trigger('click');

    expect(puzzle1.vm.status).toEqual([
      'OXO', 'XXO', 'OXX'
    ]);
  })

});
