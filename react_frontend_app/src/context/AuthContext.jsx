import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, subscribeAuth, googleProvider } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup
} from 'firebase/auth';

const AuthCtx = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const unsub = subscribeAuth(u => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = {
    user,
    loading,
    isAdmin: !!user && user.email?.endsWith('@admin.com'), // placeholder admin rule

    // PUBLIC_INTERFACE
    login: (email, password) => signInWithEmailAndPassword(auth, email, password),
    // PUBLIC_INTERFACE
    loginWithGoogle: () => signInWithPopup(auth, googleProvider),
    // PUBLIC_INTERFACE
    register: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    // PUBLIC_INTERFACE
    resetPassword: (email) => sendPasswordResetEmail(auth, email, { url: process.env.REACT_APP_SITE_URL || window.location.origin }),
    // PUBLIC_INTERFACE
    logout: () => signOut(auth),
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

// PUBLIC_INTERFACE
export function useAuthContext() {
  /** Access raw auth context if needed */
  return useContext(AuthCtx);
}
