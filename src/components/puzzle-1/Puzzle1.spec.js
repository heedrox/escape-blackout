import { shallowMount } from '@vue/test-utils';
import Puzzle1 from './Puzzle1';

describe('Puzzle 1', () => {
  it('changes with handle row1', () => {
    const puzzle1 = shallowMount(Puzzle1);
    puzzle1.vm.status = ['XXX', 'XOX', 'OXX'];

    puzzle1.find('.handle-a').trigger('click');

    expect(puzzle1.vm.status).toEqual([
      'OOO', 'XOX', 'OXX'
    ]);
  });

  it('changes with handle row1 (case b)', () => {
    const puzzle1 = shallowMount(Puzzle1);
    puzzle1.vm.status = ['XOX', 'XOX', 'OXX'];

    puzzle1.find('.handle-a').trigger('click');

    expect(puzzle1.vm.status).toEqual([
      'OXO', 'XOX', 'OXX'
    ]);
  })

  it('changes with handle row2', () => {
    const puzzle1 = shallowMount(Puzzle1);
    puzzle1.vm.status = ['XOX', 'XXO', 'OXX'];

    puzzle1.find('.handle-b').trigger('click');

    expect(puzzle1.vm.status).toEqual([
      'XOX', 'OOX', 'OXX'
    ]);
  });

  it('changes with handle row3', () => {
    const puzzle1 = shallowMount(Puzzle1);
    puzzle1.vm.status = ['XOX', 'XXO', 'OXX'];

    puzzle1.find('.handle-c').trigger('click');

    expect(puzzle1.vm.status).toEqual([
      'XOX', 'XXO', 'XOO'
    ]);
  });

  it('changes with handle col1', () => {
    const puzzle1 = shallowMount(Puzzle1);
    puzzle1.vm.status = ['XOX', 'XXO', 'OXX'];

    puzzle1.find('.handle-1').trigger('click');

    expect(puzzle1.vm.status).toEqual([
      'OOX', 'OXO', 'XXX'
    ]);
  });

  it('changes with handle col2', () => {
    const puzzle1 = shallowMount(Puzzle1);
    puzzle1.vm.status = ['XOX', 'XXO', 'OXX'];

    puzzle1.find('.handle-2').trigger('click');

    expect(puzzle1.vm.status).toEqual([
      'XXX', 'XOO', 'OOX'
    ]);
  });

  it('changes with handle col3', () => {
    const puzzle1 = shallowMount(Puzzle1);
    puzzle1.vm.status = ['XOX', 'XXO', 'OXX'];

    puzzle1.find('.handle-3').trigger('click');

    expect(puzzle1.vm.status).toEqual([
      'XOO', 'XXX', 'OXO'
    ]);
  });
});
