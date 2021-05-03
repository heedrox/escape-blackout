import Chat from './chat/Chat';
import Puzzle1 from './puzzle-1/Puzzle1';
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
  CHANGE_TURN: {
    title: 'apps.change-turn',
    icon: () => require('./change-turn/change-turn-icon.svg'),
    component: ChangeTurn
  }
};
