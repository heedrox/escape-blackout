import FileExplorer from './FileExplorer';
import { mount } from '@vue/test-utils';

describe('File Explorer', () => {
  it('should mount', () => {
    const fileExplorer = mount(FileExplorer);

    expect(fileExplorer).not.toBeUndefined();
  });
});
