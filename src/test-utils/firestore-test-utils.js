import firebaseUtil from '../lib/firebase/firebase-util';

const givenFirestore = (mappings) =>
  firebaseUtil.doc.mockImplementation((path) => mappings[path]);

const givenFirestoreCollection = (mappings) =>
  firebaseUtil.collection.mockImplementation((path) => mappings[path]);

const getUpdatedField = (wrapper, firestoreRef, field) => {
  const mock = wrapper.vm.$firestoreRefs[firestoreRef];
  const allCalls = mock.update.mock.calls;
  const theCall = allCalls.find(call => typeof call[0][field] !== 'undefined'); // { field: 2 }
  return theCall ? theCall[0][field] : undefined;
};

export {
  givenFirestore,
  givenFirestoreCollection,
  getUpdatedField
}
