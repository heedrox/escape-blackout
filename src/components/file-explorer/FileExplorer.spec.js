import FileExplorer from './FileExplorer';
import { mount } from '@vue/test-utils';
import { givenPlayerNumber } from '../../test-utils/game-test-utils';

describe('File Explorer', () => {
  it('shows 2 files when opening', () => {
    const fileExplorer = mount(FileExplorer);

    const files = fileExplorer.findAll('[data-test-id=file]');
    expect(files.length).toBe(2);
    expect(files.at(0).text()).toMatch('files.painting')
  });

  it('shows chess player 1 file when player 1', () => {
    givenPlayerNumber(1);

    const fileExplorer = mount(FileExplorer);

    const files = fileExplorer.findAll('[data-test-id=file]');
    expect(files.at(1).text()).toMatch('files.chess-player-1')
  });

  it('shows chess player 2 file when player 2', () => {
    givenPlayerNumber(2);

    const fileExplorer = mount(FileExplorer);

    const files = fileExplorer.findAll('[data-test-id=file]');
    expect(files.at(1).text()).toMatch('files.chess-player-2')
  });

  describe('Shows files bigger when file is selected', () => {
    it('no image is shown when no files are selected', () => {
      givenPlayerNumber(1);

      const fileExplorer = mount(FileExplorer);

      expect(fileExplorer.find('[data-test-id=zoom-image]').exists()).toBeFalsy();
    });

    it.each`
      playerNumber | expectedSrc
      ${1}         | ${'chess-player1.jpg'}
      ${2}         | ${'chess-player2.jpg'}
    `('image is shown when a file is selected - playerNumber: $playerNumber', async ( { playerNumber, expectedSrc } ) => {
      givenPlayerNumber(playerNumber);
      const fileExplorer = mount(FileExplorer);

      fileExplorer.findAll('[data-test-id=file]').at(1).trigger('click');
      await fileExplorer.vm.$nextTick();

      expect(fileExplorer.find('[data-test-id=zoom-image]').element.getAttribute("src")).toMatch(expectedSrc);
    });
  });
});
