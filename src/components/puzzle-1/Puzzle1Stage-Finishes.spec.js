import { shallowMount } from '@vue/test-utils';
import Puzzle1Stage from './Puzzle1Stage';
import Vue from 'vue';
import MockVueFire from '../../test-utils/MockVueFire';

const givenAPuzzleStage = (initialStatus) => shallowMount(Puzzle1Stage, {
  propsData: { initialStatus },
});

describe('Puzzle 1 Stage End Detection', () => {
  it('emits "completed", when all transistors are Os', () => {
    const puzzle1 = givenAPuzzleStage(['XXXX', 'OOOO', 'OOOO', 'OOOO'])

    puzzle1.find('.handle-row1').trigger('click');

    expect(puzzle1.emitted().complete).toBeTruthy();
  });

  it('does not emit "complete" when transistors are not all Os', () => {
    const puzzle1 = givenAPuzzleStage(['XXXX', 'OOOO', 'OOOO', 'OOOO'])

    puzzle1.find('.handle-row2').trigger('click');

    expect(puzzle1.emitted().complete).toBeUndefined();
  });

  it('emits "complete", when all transistors are Os (with any handler)', () => {
    const puzzle1 = givenAPuzzleStage(['OOOO', 'XXXX', 'OOOO', 'OOOO'])

    puzzle1.find('.handle-row2').trigger('click');

    expect(puzzle1.emitted().complete).toBeTruthy();
  });
});
