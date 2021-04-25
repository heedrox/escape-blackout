import Desktop from './Desktop';
import { shallowMount } from '@vue/test-utils';
import GetNumPlayer from '../lib/get-num-player';
import { getUpdatedField, givenFirestore } from '../test-utils/firestore-test-utils';

const CHANGE_TURN_BTN = '[data-test-id=desktop-change-turn-btn]';

const givenPlayerNumber = (playerNumber) => {
  jest.mock('@/lib/get-num-player.js');
  GetNumPlayer.get = jest.fn(() => playerNumber);
};

const givenTurnForPlayer = (player) =>
  givenFirestore({
    '/puzzle-status/puzzle-1': { [`stagePlayer${player}`]: 1 },
    '/': { turn: player }
  });

describe('Desktop has a button to change turn', () => {

  it.each`
  playerNumber | playerTurn | btnShouldExist
  ${1}         | ${2}       | ${false}
  ${1}         | ${1}       | ${true}
  `('shows the button ONLY when its your turn', ({playerNumber, playerTurn, btnShouldExist}) => {
    givenPlayerNumber(playerNumber);
    givenTurnForPlayer(playerTurn);

    const desktop = shallowMount(Desktop)

    expect(desktop.find(CHANGE_TURN_BTN).exists()).toBe(btnShouldExist)
  });

  it.each`
  player    | turnOfPlayer    | updatedTurnOfPlayer
  ${1}      | ${1}            | ${2}
  ${2}      | ${2}            | ${1}
  `('stores in firestore when player is: $player', async ( {player, turnOfPlayer, updatedTurnOfPlayer } ) => {
    givenPlayerNumber(player);
    givenTurnForPlayer(turnOfPlayer);
    const desktop = shallowMount(Desktop)

    desktop.find(CHANGE_TURN_BTN).vm.$emit('click');
    await desktop.vm.$nextTick();

    expect(desktop.find(CHANGE_TURN_BTN).exists()).toBeFalsy();
    expect(getUpdatedField(desktop, 'globalStatus', 'turn')).toBe(updatedTurnOfPlayer);
  });
})
