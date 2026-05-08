import React, { useEffect } from 'react';
import { subscribeToAuth } from '../services/firebase/auth';
import { useAuthStore } from '../store/authStore';
import { db } from '../services/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { getLocalSession } from '../services/localAuth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser, setLoading, clearAuth } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToAuth(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              id: firebaseUser.uid,
              email: userData.email || firebaseUser.email || '',
              displayName: userData.displayName || userData.name || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
              photoURL: userData.photoURL || firebaseUser.photoURL || undefined,
              role: userData.role || 'renter',
              phone: userData.phone || '',
              state: userData.state || '',
              verified: userData.verified || false,
              createdAt: userData.createdAt || new Date().toISOString(),
            });
          } else {
            setUser({
              uid: firebaseUser.uid,
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
              photoURL: firebaseUser.photoURL || undefined,
              role: 'renter',
              phone: '',
              state: '',
              verified: false,
              createdAt: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            uid: firebaseUser.uid,
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
            photoURL: firebaseUser.photoURL || undefined,
            role: 'renter',
            phone: '',
            state: '',
            verified: false,
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        const localUser = getLocalSession();
        if (localUser) {
          setUser(localUser);
        } else {
          clearAuth();
        }
      }
    });

    return () => unsubscribe();
  }, [setUser, clearAuth, setLoading]);

  return <>{children}</>;
};
