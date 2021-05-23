const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');
const dbOptions = require('../config/db-options');

class BrowserTestOverlay {
  constructor() {
    this.initialized = false;
    console.log('initializing plugin BrowserTestOverlay - Watch how your tests are in a browser and include it in OBS!');
    this.init();
  }

  async init() {
    try {
      firebase.initializeApp(dbOptions);
      this.auth = firebase.auth();
      console.log('BrowserTestOverlay - Logging into Firebase with user: ', dbOptions.customEscape.auth.email);
      await this.auth.signInWithEmailAndPassword(dbOptions.customEscape.auth.email, dbOptions.customEscape.auth.password);
      this.firestore = firebase.firestore();
      this.initialized = true;
      console.log('BrowserTestOverlay - Initialization finished. Now tests will change browser light.');
    } catch (error) {
      console.log('BrowserTestOverlay - Error logging firebase. This plugin will not work.', error);
      this.initialized = false;

    }
  }

  apply(jestHooks) {
    jestHooks.onTestRunComplete(results => {
      if (this.initialized) {
        this.changeColorTest(results.success);
      }
    });
  }

  changeColorTest(result) {
    this.firestore.doc('/browser-test-overlay/color-test-result').set({ result })
      .catch(err => console.error(err));
  }
}

module.exports = BrowserTestOverlay;
