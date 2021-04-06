import { shallowMount } from '@vue/test-utils';
import Puzzle1Stage from './Puzzle1Stage';

describe('Puzzle 1 Stage can block some handles', () => {
  it('accepts a block-handles property, empty by default', () => {
    const puzzle1 = shallowMount(Puzzle1Stage, {
      propsData: { },
    });

    expect(puzzle1.vm.blockHandles).toEqual('');
  });

  it('blocks COL handles', () => {
    const puzzle1 = shallowMount(Puzzle1Stage, {
      propsData: { blockHandles: 'COL' },
    });

    expect(puzzle1.vm.blockHandles).toEqual('COL');

  })

});
