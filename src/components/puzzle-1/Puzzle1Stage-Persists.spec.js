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

  it('gets data from firebase path /escape-blackout/codigo-juego-1/puzzle-status/puzzle-1', () => {
    firebaseUtil.doc.mockImplementation(() => ( { commonStatus: COMMON_STATUS }));

    givenAPuzzleStageWithPersistStatus(INITIAL_STATUS, false);

    expect(firebaseUtil.doc.mock.calls[0][0]).toEqual('/puzzle-status/puzzle-1');
  });

  describe('When PersistStatus = false', () => {
    it('sets the status from initialStatus prop when persistStatus = false', () => {
      firebaseUtil.doc.mockImplementation(() => ( { commonStatus: COMMON_STATUS }));

      const puzzle1Stage = givenAPuzzleStageWithPersistStatus(INITIAL_STATUS, false);

      expect(puzzle1Stage.vm.status).toEqual(INITIAL_STATUS);
    });
    it('does not send to firestore the status when persistStatus = false', () => {
      firebaseUtil.doc.mockImplementation(() => ( { commonStatus: INITIAL_STATUS }));
      const puzzle1Stage = givenAPuzzleStageWithPersistStatus(INITIAL_STATUS, false);

      puzzle1Stage.find('.handle-row1').trigger('click');

      expect(puzzle1Stage.vm.$firestoreRefs.puzzleStatus.update.mock.calls.length).toEqual(0);
    });
  });

  describe('When PersistStatus = true', () => {
    it('sets the status from firestore when persistStatus = true', () => {
      firebaseUtil.doc.mockImplementation(() => ( { commonStatus: COMMON_STATUS }));

      const puzzle1Stage = givenAPuzzleStageWithPersistStatus(INITIAL_STATUS, true);

      expect(puzzle1Stage.vm.status).toEqual(COMMON_STATUS);
    });

    it('does not fail when status is not ready', async () => {
      firebaseUtil.doc.mockImplementation(() => ({ }));

      const whenPuzzleIsMounted = () => givenAPuzzleStageWithPersistStatus(INITIAL_STATUS, true);

      expect(whenPuzzleIsMounted).not.toThrow();
    });

    xit('updates the status from firestore when persistStatus = true and commonStatus is ready', async () => {
      firebaseUtil.doc.mockImplementation(() => ({ }));
      const puzzle1Stage = givenAPuzzleStageWithPersistStatus(INITIAL_STATUS, true);

      //al cabo de unos microsecs
      //se updatea la info de commonStatus.
      puzzle1Stage.vm.puzzleStatus.commonStatus = COMMON_STATUS;
      await puzzle1Stage.vm.$nextTick();

      expect(puzzle1Stage.vm.status).toEqual(COMMON_STATUS);
    });

    it('sends to firestore the status when persistStatus = true', () => {
      firebaseUtil.doc.mockImplementation(() => ( { commonStatus: INITIAL_STATUS }));
      const puzzle1Stage = givenAPuzzleStageWithPersistStatus(INITIAL_STATUS, true);

      puzzle1Stage.find('.handle-row1').trigger('click');

      expect(puzzle1Stage.vm.status).toEqual(INITIAL_STATUS_AFTER_ROW_CLICKED);
      expect(puzzle1Stage.vm.$firestoreRefs.puzzleStatus.update.mock.calls.length).toEqual(1);
      expect(puzzle1Stage.vm.$firestoreRefs.puzzleStatus.update.mock.calls[0][0]).toEqual({ commonStatus: INITIAL_STATUS_AFTER_ROW_CLICKED });
    });
  });
});
