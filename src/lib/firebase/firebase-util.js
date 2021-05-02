import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import dbOptions from '../../config/db-options';

const isTestEnv = () => process && process.env && process.env['NODE_ENV'] === 'test';

let auth, firestore;

const GAME_CODE = 'codigo-juego-1';

const FIREBASE_URL = `/escape-blackout/${GAME_CODE}`;

const init = () => {
  if (isTestEnv()) throw Error('Firebase should not be executed on test environment.');
  firebase.initializeApp(dbOptions);
  auth = firebase.auth();
  firestore = firebase.firestore();
  console.log('inicializado');
};

init();

const firebaseUtil = {
  login: () => auth.signInWithEmailAndPassword(dbOptions.customEscape.auth.email, dbOptions.customEscape.auth.password),
  doc: (path) => firestore.doc(`${FIREBASE_URL}${path}`),
  collection: (path) => firestore.collection(`${FIREBASE_URL}${path}`),
  serverTimestamp: () => firebase.firestore.FieldValue.serverTimestamp()
};

export default firebaseUtil;
