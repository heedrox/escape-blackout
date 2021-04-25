import Chat from './chat/Chat';
import Puzzle1 from './puzzle-1/Puzzle1';

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
};
