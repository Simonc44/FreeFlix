import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const requiredFirebaseVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

export const areFirebaseCredentialsSet = () => {
    return requiredFirebaseVars.every(varName => !!process.env[varName]);
}

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

export function initializeFirebase() {
  if (!areFirebaseCredentialsSet()) {
    console.warn("Les informations d'identification Firebase ne sont pas définies dans les variables d'environnement. Les fonctionnalités de Firebase seront désactivées.");
    return null;
  }
  
  const apps = getApps();
  if (apps.length) {
    firebaseApp = apps[0];
  } else {
    firebaseApp = initializeApp(firebaseConfig);
  }
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
  
  return { app: firebaseApp, auth, firestore };
}
