import Desktop from './Desktop';
import { shallowMount } from '@vue/test-utils';
import GetNumPlayer from '../lib/get-num-player';
import firebaseUtil from '../lib/firebase/firebase-util';

const CHANGE_TURN_BTN = '[data-test-id=desktop-change-turn-btn]';

const givenPlayerNumber = (playerNumber) => {
  jest.mock('@/lib/get-num-player.js');
  GetNumPlayer.get = jest.fn(() => playerNumber);
};

const givenTurnForPlayer = (player) =>
  firebaseUtil.doc.mockImplementation((path) => {
    if (path === '/') return { turn: player }
    return { [`stagePlayer${player}`]: 1 };
  });


describe('Desktop has a button to change turn', () => {

  it('does not show the button when its not your turn', () => {
    givenPlayerNumber(1);
    givenTurnForPlayer(2);

    const desktop = shallowMount(Desktop)

    expect(desktop.find(CHANGE_TURN_BTN).exists()).toBeFalsy();
  });

  it('shows the button ONLY when its your turn', () => {
    givenPlayerNumber(1);
    givenTurnForPlayer(1);

    const desktop = shallowMount(Desktop)

    expect(desktop.find(CHANGE_TURN_BTN).exists()).toBeTruthy();
  });

  it.each`
  player    | turnOfPlayer    | updatedTurnOfPlayer
  ${1}      | ${1}            | ${2}
  ${2}      | ${2}            | ${1}
  `('stores in firestore when player is: $player', async ( {player, turnOfPlayer, updatedTurnOfPlayer } ) => {
    givenPlayerNumber(player);
    givenTurnForPlayer(turnOfPlayer);
    const desktop = shallowMount(Desktop)

    desktop.find(CHANGE_TURN_BTN).trigger('click');
    await desktop.vm.$nextTick();

    expect(desktop.find(CHANGE_TURN_BTN).exists()).toBeFalsy();
    expect(desktop.vm.$firestoreRefs.globalStatus.update.mock.calls[0][0].turn).toBe(updatedTurnOfPlayer);
  });
})
