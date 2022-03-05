import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyC96gCnqOo_dsjyCohuRs1pYkg6zrA3Soc',
  authDomain: 'crwn-db-21f2c.firebaseapp.com',
  projectId: 'crwn-db-21f2c',
  storageBucket: 'crwn-db-21f2c.appspot.com',
  messagingSenderId: '305457536313',
  appId: '1:305457536313:web:49ddf2a153a06d02429ce8',
  measurementId: 'G-FTVYWWLVT2',
};

// function to store userData in Firestore Database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error Creating User', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
