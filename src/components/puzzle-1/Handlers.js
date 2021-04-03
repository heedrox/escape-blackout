const invertLetter = letter => letter === 'X' ? 'O' : 'X';

const invertRow = (str) => str.split('').map(invertLetter).join('');
const invertOnlyOneRow = (numRow) => (row, idx) => idx === (numRow - 1) ? invertRow(row) : row;
const invertByRow = (transistors, numRow) => transistors.map(invertOnlyOneRow(numRow));

const invertOnlyOneLetter = numCol =>  (letter, idx) => idx === (numCol-1) ? invertLetter(letter) : letter;
const invertOneColInRow = numCol => (row) => row.split('').map(invertOnlyOneLetter(numCol)).join('')
const invertByCol = (transistors, numCol) => transistors.map(invertOneColInRow(numCol));

const HANDLER_BEHAVIOUR = {
  'row1': (transistors) => invertByRow(transistors, 1),
  'row2': (transistors) => invertByRow(transistors, 2),
  'row3': (transistors) => invertByRow(transistors, 3),
  'row4': (transistors) => invertByRow(transistors, 4),
  'col1': (transistors) => invertByCol(transistors, 1),
  'col2': (transistors) => invertByCol(transistors, 2),
  'col3': (transistors) => invertByCol(transistors, 3),
  'col4': (transistors) => invertByCol(transistors, 4),
};

export default {
  execute: (transistors, handle) => HANDLER_BEHAVIOUR[handle](transistors),
};
