import GetNumPlayer from '../lib/get-num-player';

export const givenPlayerNumber = (playerNumber) => {
  jest.mock('@/lib/get-num-player.js');
  GetNumPlayer.get = jest.fn(() => playerNumber);
};
