import { INITIAL_PIECES_BUILDER } from '../components/puzzle-2/chess-constants';

export default {
  build: () => ({
    'puzzle-status': {
      'puzzle-1': {},
      'puzzle-2': {
        'pieces-location': {
          current: INITIAL_PIECES_BUILDER.build(),
        }
      }
    },
    turn: 1,
    puzzle: 1
  })
};
