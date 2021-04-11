import Vue from 'vue';
import MockVueFire from './MockVueFire';

jest.mock('@/lib/firebase/firebase-util.js', () => ({
  doc: jest.fn(() => ({ mocked: true })),
}));

Vue.use(MockVueFire);
