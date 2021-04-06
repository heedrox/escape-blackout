import { shallowMount } from '@vue/test-utils';
import Puzzle1Stage from './Puzzle1Stage';

describe('Puzzle 1 Stage can be multiplayer', () => {
  it('accepts a multiplayer property, false by default', () => {
    const puzzle1 = shallowMount(Puzzle1Stage, {
      propsData: { },
    });

    expect(puzzle1.vm.multiplayer).toEqual(false);
  })

});
