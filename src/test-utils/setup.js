import Vue from 'vue';
import { config } from '@vue/test-utils'
import MockVueFire from './MockVueFire';

const IMAGES_TO_MOCK = [
  '@/components/file-explorer/files/chess-player1.jpg',
  '@/components/file-explorer/files/chess-player2.jpg',
  '@/components/file-explorer/files/cuadro-abstracto.jpg',
];

IMAGES_TO_MOCK.forEach((mockImage) => {
  jest.mock(mockImage, () => mockImage);
});

jest.mock('@/lib/firebase/firebase-util.js', () => ({
  doc: jest.fn(() => ({ mocked: true })),
  collection: jest.fn( () => [ { mocked: true }]),
  serverTimestamp: jest.fn( () => ({ isTimestamp: true })),
  addToCollection: jest.fn()
}));

Vue.use(MockVueFire);

config.mocks.$t = key => key
