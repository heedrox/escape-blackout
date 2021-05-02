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

const getLastAddedDocument = (path) => {
  const pathCalls = firebaseUtil.addToCollection.mock.calls.filter(call => call[0] === path);
  if (pathCalls.length === 0) return null;
  return pathCalls[pathCalls.length - 1][1];
};

export {
  givenFirestore,
  givenFirestoreCollection,
  getUpdatedField,
  getLastAddedDocument
}
