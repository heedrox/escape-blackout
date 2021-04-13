import { shallowMount } from '@vue/test-utils';
import Puzzle1Stage from './Puzzle1Stage';

describe('Puzzle 1 Stage can block some handles', () => {
  it('accepts a block-handles property, empty by default', () => {
    const puzzle1 = shallowMount(Puzzle1Stage, {
      propsData: { },
    });

    expect(puzzle1.vm.blockHandles).toEqual('');
  });

  describe('when block-handles = COL', () => {
    it('hides COL handles', () => {
      const puzzle1 = shallowMount(Puzzle1Stage, {
        propsData: {
          initialStatus: ['XXXX', 'XXXX', 'XXXX', 'XXXX'],
          blockHandles: 'COL'
        },
      });

      expect(puzzle1.find('.handle-col1').text()).toEqual('');
      expect(puzzle1.find('.handle-col2').text()).toEqual('');
      expect(puzzle1.find('.handle-col3').text()).toEqual('');
      expect(puzzle1.find('.handle-col4').text()).toEqual('');
    });

    it('inverts row transistors', async () => {
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
  });

  describe('when block-handles = ROW', () => {
    it('hides ROW handles', () => {
      const puzzle1 = shallowMount(Puzzle1Stage, {
        propsData: {
          initialStatus: ['XXXX', 'XXXX', 'XXXX', 'XXXX'],
          blockHandles: 'ROW'
        },
      });

      expect(puzzle1.find('.handle-row1').text()).toEqual('');
      expect(puzzle1.find('.handle-row2').text()).toEqual('');
      expect(puzzle1.find('.handle-row3').text()).toEqual('');
      expect(puzzle1.find('.handle-row4').text()).toEqual('');
    });
  });
});
