import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Initialize Firebase app using environment-configured public keys.
 * The .env must provide the REACT_APP_FIREBASE_* variables.
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// PUBLIC_INTERFACE
export const auth = getAuth(app);
/** Google provider for social login */
export const googleProvider = new GoogleAuthProvider();
// PUBLIC_INTERFACE
export const db = getFirestore(app);

/** Helper to subscribe to auth state changes. */
// PUBLIC_INTERFACE
export function subscribeAuth(callback) {
  /** Subscribe to Firebase auth state updates.
   * @param {(user: import('firebase/auth').User|null)=>void} callback
   * @returns {() => void} unsubscribe function
   */
  return onAuthStateChanged(auth, callback);
}
