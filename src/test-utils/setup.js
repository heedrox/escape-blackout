import Vue from 'vue';
import { config } from '@vue/test-utils'
import MockVueFire from './MockVueFire';

jest.mock('@/lib/firebase/firebase-util.js', () => ({
  doc: jest.fn(() => ({ mocked: true })),
  collection: jest.fn( () => [ { mocked: true }]),
  serverTimestamp: jest.fn( () => ({ isTimestamp: true })),
  addToCollection: jest.fn()
}));

Vue.use(MockVueFire);

config.mocks.$t = key => key
