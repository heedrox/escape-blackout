
const getUpdatedField = (wrapper, firestoreRef, field) => {
  const mock = wrapper.vm.$firestoreRefs[firestoreRef];
  const allCalls = mock.update.mock.calls;
  const theCall = allCalls.find(call => typeof call[0][field] !== 'undefined'); // { field: 2 }
  return theCall ? theCall[0][field] : undefined;
};

export {
  getUpdatedField
}
