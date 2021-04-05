import Vue from 'vue';
import MockVueFire from '../../test-utils/MockVueFire';
import { shallowMount } from '@vue/test-utils';
import Puzzle1 from './Puzzle1';
import Puzzle1Stage from './Puzzle1Stage';
import firebaseUtil from '../../lib/firebase/firebase-util';

describe('Puzzle 1', () => {
  it('shows the EASY (3 transistors) puzzle stage', () => {
    const puzzle1 = shallowMount(Puzzle1);

    const theStage = puzzle1.findComponent(Puzzle1Stage);

    expect(theStage.vm.initialStatus).toEqual([
      'XOO', 'OXX', 'XOO'
    ]);
  });

  it('shows the MEDIUM (4 transistors + monoplayer) puzzle stage', () => {
    firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 2 }));
    Vue.use(MockVueFire);
    const puzzle1 = shallowMount(Puzzle1);

    const theStage = puzzle1.findComponent(Puzzle1Stage);

    expect(theStage.vm.initialStatus).toEqual([
      'XOXO', 'OXOX', 'XOXO', 'OXOX',
    ]);
  });
})
