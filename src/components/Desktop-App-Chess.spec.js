import { mount } from '@vue/test-utils'
import Desktop from './Desktop.vue'
import { givenFirestore } from '../test-utils/firestore-test-utils';
import DesktopIcon from './DesktopIcon';

describe('Chess.vue', () => {

  it('is not shown when puzzle number is less than 2', () => {
    givenFirestore({
      '/': { puzzle: 1 }
    });

    const desktop = mount(Desktop);

    expect(desktop.text()).not.toMatch('apps.chess')
  });

  it.each`
    puzzle 
    ${2}   
    ${3}   
    ${10}  
  `('is shown when puzzle number is 2 or greater than 2 - puzzleNumber: $puzzle', ( { puzzle }) => {
    givenFirestore({
      '/': { puzzle }
    });

    const desktop = mount(Desktop);

    expect(desktop.findAllComponents(DesktopIcon).at(2).text()).toMatch('apps.chess');
  });
})
