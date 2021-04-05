import Vue from 'vue';
import MockVueFire from '../../test-utils/MockVueFire';
import { shallowMount } from '@vue/test-utils';
import Puzzle1 from './Puzzle1';
import Puzzle1Stage from './Puzzle1Stage';
import firebaseUtil from '../../lib/firebase/firebase-util';
import GetNumPlayer from '../../lib/get-num-player.js';

Vue.use(MockVueFire);

describe('Puzzle 1', () => {
  it('shows the EASY (3 transistors) puzzle stage', () => {
    jest.mock('@/lib/get-num-player.js');
    GetNumPlayer.get = jest.fn(() => 1);
    const puzzle1 = shallowMount(Puzzle1);

    const theStage = puzzle1.findComponent(Puzzle1Stage);

    expect(theStage.vm.initialStatus).toEqual([
      'XOO', 'OXX', 'XOO'
    ]);
  });

  it('shows the MEDIUM (4 transistors + monoplayer) puzzle stage', () => {
    jest.mock('@/lib/get-num-player.js');
    GetNumPlayer.get = jest.fn(() => 1);
    firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 2 }));

    const puzzle1 = shallowMount(Puzzle1);

    const theStage = puzzle1.findComponent(Puzzle1Stage);

    expect(theStage.vm.initialStatus).toEqual([
      'XOXO', 'OXOX', 'XOXO', 'OXOX',
    ]);
  });

  it('shows the MEDIUM puzzle stage, if player 2 is in stage 2', () => {
    jest.mock('@/lib/get-num-player.js');
    GetNumPlayer.get = jest.fn(() => 2);
    firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer2': 2 }));

    const puzzle1 = shallowMount(Puzzle1);

    const theStage = puzzle1.findComponent(Puzzle1Stage);

    expect(theStage.vm.initialStatus).toEqual([
      'XOXO', 'OXOX', 'XOXO', 'OXOX',
    ]);
  });

  describe('Stage Transitions', () => {
    it('shows the MEDIUM puzzle stage, after EASY puzzle stage has been completed', async () => {
      jest.mock('@/lib/get-num-player.js');
      GetNumPlayer.get = jest.fn(() => 1);
      firebaseUtil.doc.mockImplementation(() => ({ 'stagePlayer1': 1 }));

      const puzzle1 = shallowMount(Puzzle1);

      const theEasyStage = puzzle1.findComponent(Puzzle1Stage);
      theEasyStage.vm.$emit('complete');
      await puzzle1.vm.$nextTick();

      const theMediumStage = puzzle1.findComponent(Puzzle1Stage);
      expect(theMediumStage.vm.initialStatus.length).toEqual(4);
    });
  });
})
