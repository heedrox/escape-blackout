import { shallowMount } from '@vue/test-utils';
import Puzzle1Stage from './Puzzle1Stage';
import firebaseUtil from '../../lib/firebase/firebase-util';

const givenAPuzzleStageWithPersistStatus = (initialStatus, persistStatus) => shallowMount(Puzzle1Stage, {
  propsData: { initialStatus, persistStatus },
});

const COMMON_STATUS = ['XOXO', 'XOXO', 'XOXO', 'XOXO'];
const INITIAL_STATUS = ['XXXX', 'XXXX', 'OOOO', 'OOOO'];
const INITIAL_STATUS_AFTER_ROW_CLICKED = ['OOOO', 'XXXX', 'OOOO', 'OOOO'];

describe('Puzzle 1 Stage Persist', () => {
  xit('sets the status from firestore when persistStatus = true', () => {
    firebaseUtil.doc.mockImplementation(() => ( { commonStatus: COMMON_STATUS }));

    const puzzle1Stage = givenAPuzzleStageWithPersistStatus(INITIAL_STATUS, true);

    expect(puzzle1Stage.vm.status).toEqual(COMMON_STATUS);
  });

  it('sends to firestore the status when persistStatus = true', () => {
    const puzzle1Stage = givenAPuzzleStageWithPersistStatus(INITIAL_STATUS, true);

    puzzle1Stage.find('.handle-row1').trigger('click');

    expect(puzzle1Stage.vm.status).toEqual(INITIAL_STATUS_AFTER_ROW_CLICKED);
    expect(puzzle1Stage.vm.$firestoreRefs.gameStatus.update.mock.calls.length).toEqual(1);
    expect(puzzle1Stage.vm.$firestoreRefs.gameStatus.update.mock.calls[0][0]).toEqual({ commonStatus: INITIAL_STATUS_AFTER_ROW_CLICKED });
  });
});
