const aCell = (row, col) => ({ row, col });

const PIECES = {
  BLACK_TOWER: 'tn',
  BLACK_QUEEN: 'dn',
  BLACK_KING: 'rn',
  BLACK_BISHOP: 'an',
  BLACK_PAWN: 'pn',
  WHITE_PAWN: 'pb',
  WHITE_TOWER: 'tb',
  WHITE_BISHOP: 'ab',
  WHITE_KING: 'rb',
  WHITE_HORSE: 'cb'
};

const INITIAL_PIECES_BUILDER = {
  build: () => ({
    '0-0': PIECES.BLACK_TOWER,
    '0-3': PIECES.BLACK_QUEEN,
    '0-4': PIECES.BLACK_KING,
    '1-1': PIECES.BLACK_BISHOP,
    '1-6': PIECES.BLACK_BISHOP,
    '3-0': PIECES.BLACK_PAWN,
    '3-3': PIECES.BLACK_PAWN,
    '4-4': PIECES.WHITE_PAWN,
    '6-0': PIECES.WHITE_TOWER,
    '6-2': PIECES.WHITE_PAWN,
    '7-2': PIECES.WHITE_BISHOP,
    '7-4': PIECES.WHITE_KING,
    '7-5': PIECES.WHITE_HORSE
  })
};

const POSSIBLE_MOVEMENTS = {
  '0-0': [aCell(0, 1), aCell(0,2), aCell(1,0), aCell(2,0)],
  '0-3': [aCell(0, 1), aCell(0,2), aCell(1,3), aCell(2,3)],
  '0-4': [aCell(0, 5), aCell(1,4)],
  '1-1': [aCell(0, 2), aCell(2,2), aCell(2,0)],
  '1-6': [aCell(0, 5), aCell(0,7), aCell(2,7), aCell(2,5), aCell(3,4), aCell(4,3), aCell(5,2), aCell(6,1), aCell(7,0)],
  '3-0': [aCell(4, 0)],
  '3-3': [aCell(4, 3)],
  '4-4': [aCell(3, 3), aCell(3, 4)],
  '6-0': [aCell(5, 0),aCell(4, 0),aCell(6, 1)],
  '6-2': [aCell(5, 2),aCell(4, 2)],
  '7-2': [aCell(6, 1),aCell(5, 0),aCell(6, 3),aCell(5, 4),aCell(4, 5), aCell(3, 6),aCell(2, 7)],
  '7-4': [aCell(7, 3),aCell(6, 4)],
  '7-5': [aCell(6, 3),aCell(5, 4),aCell(5, 6),aCell(6, 7)]


}

export {
  PIECES,
  INITIAL_PIECES_BUILDER,
  POSSIBLE_MOVEMENTS
}
