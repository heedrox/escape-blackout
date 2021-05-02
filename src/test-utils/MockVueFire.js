
const existsFirestore = (t) => t.$options && t.$options.firestore;
const MockVueFire = {
  install: function(Vue, _) {
    Vue.mixin({
      created: function() {
        if (existsFirestore(this)) {
          const firestoreObj = this.$options.firestore;
          if (typeof firestoreObj !== 'function') {
            console.warn('VueFire does NOT support plain firestore objects.' +
              ' Use a firestore method if you want to use firebaseUtil, to be evaluated ' +
              ' in execution time, instead of import time.');
            return;
          }
          const result = firestoreObj();
          Object.entries(result).forEach((entry => {
            const [key, value] = entry;
            this[key] = value;
          }));
          this.$firestoreRefs = {};
          Object.keys(result).forEach((key => {
            this.$firestoreRefs[key] = {
              set: jest.fn(newValue => { this[key] = newValue; }),
              update: jest.fn(newValue => { this[key] = newValue; }),
              add: jest.fn( newValue => { this[key].push(newValue); })
            };
          }));
        }
      }
    });
  },
};

export default MockVueFire;
