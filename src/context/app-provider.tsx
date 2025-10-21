'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Movie } from '@/lib/types';
import { movies } from '@/lib/data';
import { useUser, FirebaseUser } from '@/firebase/auth/use-user';
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

// Auth Context
type AuthContextType = {
  user: FirebaseUser | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (name: string, email: string, pass: string) => Promise<any>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé au sein d'un AuthProvider");
  }
  return context;
};

// Watchlist Context
type WatchlistContextType = {
  watchlist: string[];
  addToWatchlist: (movieId: string) => void;
  removeFromWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  getWatchlistMovies: () => Movie[];
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist doit être utilisé au sein d'un WatchlistProvider");
  }
  return context;
};

// App Provider
export function AppProvider({ children }: { children: ReactNode }) {
  // Auth State
  const { user, isLoading } = useUser();
  const auth = getAuth();
  
  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };
  
  const signup = async (name: string, email: string, pass: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential;
  };
  
  const logout = () => {
    return signOut(auth);
  };

  // Watchlist State
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedWatchlist = localStorage.getItem('watchlist');
      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }
    } catch (error) {
      console.error("Échec de l'analyse de la watchlist depuis localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  }, [watchlist, isLoaded]);

  const addToWatchlist = useCallback((movieId: string) => {
    setWatchlist((prev) => (prev.includes(movieId) ? prev : [...prev, movieId]));
  }, []);

  const removeFromWatchlist = useCallback((movieId: string) => {
    setWatchlist((prev) => prev.filter((id) => id !== movieId));
  }, []);

  const isInWatchlist = useCallback((movieId: string) => {
    return watchlist.includes(movieId);
  }, [watchlist]);
  
  const getWatchlistMovies = useCallback(() => {
     return movies.filter(movie => watchlist.includes(movie.id));
  }, [watchlist]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, getWatchlistMovies }}>
        {children}
      </WatchlistContext.Provider>
    </AuthContext.Provider>
  );
}
