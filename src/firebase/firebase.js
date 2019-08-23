import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const prodConfig = {
  apiKey: 'AIzaSyBBrAg87GFtKpxDWdmNQOqTx0RKyPOr8c4',
  authDomain: 'nijivents.firebaseapp.com',
  databaseURL: 'https://nijivents.firebaseio.com',
  projectId: 'nijivents',
  storageBucket: 'nijivents.appspot.com',
  messagingSenderId: '101794041246',
};

const devConfig = {
  apiKey: 'AIzaSyBBrAg87GFtKpxDWdmNQOqTx0RKyPOr8c4',
  authDomain: 'nijivents.firebaseapp.com',
  databaseURL: 'https://nijivents.firebaseio.com',
  projectId: 'nijivents',
  storageBucket: 'nijivents.appspot.com',
  messagingSenderId: '101794041246',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const db = firebase.firestore();
const settings = {
  /* your settings... */
};
db.settings(settings);

const storage = firebase.storage().ref();

export {
  auth,
  db,
  storage,
};
