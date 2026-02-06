'use client';

import { useMemo, type ReactNode } from 'react';
import { initializeFirebase } from './init';
import { FirebaseProvider } from './provider';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const firebaseInstances = useMemo(() => {
    const instances = initializeFirebase();
    if (!instances) {
      return { app: null, auth: null, firestore: null };
    }
    return instances;
  }, []);

  return (
    <FirebaseProvider
      app={firebaseInstances.app as FirebaseApp}
      auth={firebaseInstances.auth as Auth}
      firestore={firebaseInstances.firestore as Firestore}
    >
      {children}
    </FirebaseProvider>
  );
}