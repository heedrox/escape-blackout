import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import dbOptions from '../../config/db-options';

firebase.initializeApp(dbOptions);

const auth = firebase.auth();
const firestore = firebase.firestore();

const GAME_CODE = 'xxx';

const FIREBASE_URL = `/escape-blackout/${GAME_CODE}`;

const firebaseUtil = {
  login: () => auth.signInWithEmailAndPassword(dbOptions.customEscape.auth.email, dbOptions.customEscape.auth.password),
  doc: (path) => firestore.doc(`${FIREBASE_URL}${path}`),
};

export default firebaseUtil;
