jest.mock('@/lib/firebase/firebase-util.js', () => ({
  doc: jest.fn(() => ({ mocked: true })),
}));

