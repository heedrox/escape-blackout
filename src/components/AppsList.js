import Chat from './chat/Chat';
import Puzzle1 from './puzzle-1/Puzzle1';
import ChangeTurn from './change-turn/ChangeTurn';

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
  CHANGE_TURN: {
    title: 'apps.change-turn',
    icon: () => require('./change-turn/change-turn-icon.svg'),
    component: ChangeTurn
  }
};
