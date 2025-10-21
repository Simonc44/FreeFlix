import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

type FirebaseInstances = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

let firebaseInstances: FirebaseInstances | null = null;

export function initializeFirebase(): FirebaseInstances {
  if (typeof window !== 'undefined') {
    if (!firebaseInstances) {
      const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const firestore = getFirestore(app);
      firebaseInstances = { app, auth, firestore };
    }
    return firebaseInstances;
  }
  // This is for server-side rendering, which we aren't using for auth yet
  // but good to have a placeholder.
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}

export {
  FirebaseProvider,
  useFirebaseApp,
  useAuth as useFirebaseAuth, // Renaming to avoid conflict with our useAuth
  useFirestore,
} from './provider';

export { useUser } from './auth/use-user';