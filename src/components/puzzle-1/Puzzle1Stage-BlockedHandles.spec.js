import { shallowMount } from '@vue/test-utils';
import Puzzle1Stage from './Puzzle1Stage';

describe('Puzzle 1 Stage can block some handles', () => {
  it('accepts a block-handles property, empty by default', () => {
    const puzzle1 = shallowMount(Puzzle1Stage, {
      propsData: { },
    });

    expect(puzzle1.vm.blockHandles).toEqual('');
  });

  it('blocks COL handles', async () => {
    const puzzle1 = shallowMount(Puzzle1Stage, {
      propsData: {
        initialStatus: ['XXX', 'XXX', 'XXX'],
        blockHandles: 'COL'
      },
    });

    puzzle1.find('.handle-col1').trigger('click');
    await puzzle1.vm.$nextTick();

    expect(puzzle1.vm.status).toEqual([
      'XXX', 'XXX', 'XXX'
    ]);
  })

  it('inverts row transistors when blocked COL handles', async () => {
    const puzzle1 = shallowMount(Puzzle1Stage, {
      propsData: {
        initialStatus: ['XXX', 'XXX', 'XXX'],
        blockHandles: 'COL'
      },
    });

    puzzle1.find('.handle-row1').trigger('click');
    await puzzle1.vm.$nextTick();

    expect(puzzle1.vm.status).toEqual([
      'OOO', 'XXX', 'XXX'
    ]);
  })

  it('blocks ROW handles', async () => {
    const puzzle1 = shallowMount(Puzzle1Stage, {
      propsData: {
        initialStatus: ['XXX', 'XXX', 'XXX'],
        blockHandles: 'ROW'
      },
    });

    puzzle1.find('.handle-row1').trigger('click');
    await puzzle1.vm.$nextTick();

    expect(puzzle1.vm.status).toEqual([
      'XXX', 'XXX', 'XXX'
    ]);
  })

});
