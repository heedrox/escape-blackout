import Chat from './chat/Chat';
import Puzzle1 from './puzzle-1/Puzzle1';
import Chess from './puzzle-2/Chess';
import ChangeTurn from './change-turn/ChangeTurn';
import FileExplorer from './file-explorer/FileExplorer';

export default {
  NETWORK: {
    title: 'apps.network',
    icon: () => require('./puzzle-1/puzzle-1-icon.svg'),
    component: Puzzle1
  },
  CHAT: {
    title: 'apps.chat',
    icon: () => require('./chat/chat-icon.svg'),
    component: Chat
  },
  FILE_EXPLORER: {
    title: 'apps.file-explorer',
    icon: () => require('./file-explorer/file-explorer.svg'),
    component: FileExplorer
  },
  CHESS: {
    title: 'apps.chess',
    icon: () => require('./puzzle-2/chess-icon.png'),
    component: Chess
  },
  CHANGE_TURN: {
    title: 'apps.change-turn',
    icon: () => require('./change-turn/change-turn-icon.svg'),
    component: ChangeTurn
  }
};
