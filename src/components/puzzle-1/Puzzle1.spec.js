import { shallowMount } from '@vue/test-utils';
import Puzzle1 from './Puzzle1';
import Puzzle1Stage from './Puzzle1Stage';

describe('Puzzle 1', () => {
  it('shows the EASY (3 transistors) puzzle stage', () => {
    const puzzle1 = shallowMount(Puzzle1);

    const theStage = puzzle1.findComponent(Puzzle1Stage);
    expect(theStage.exists()).toBeTruthy();

    expect(theStage.vm.initialStatus).toEqual([
      'XOO', 'OXX', 'XOO'
    ]);
  });

  it('shows the MEDIUM (4 transistors + monoplayer) puzzle stage', () => {
    const puzzle1 = shallowMount(Puzzle1, {
      data() {
        return {
          stage: 2
        };
      },
    });

    const theStage = puzzle1.findComponent(Puzzle1Stage);
    expect(theStage.exists()).toBeTruthy();

    expect(theStage.vm.initialStatus).toEqual([
      'XOXO', 'OXOX', 'XOXO', 'OXOX',
    ]);
  });
})
