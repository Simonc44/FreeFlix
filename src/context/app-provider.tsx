'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Movie } from '@/lib/types';
import { movies } from '@/lib/data';

// Auth Context
type User = {
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
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
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};


// App Provider
export function AppProvider({ children }: { children: ReactNode }) {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  
  const login = () => setUser({ name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' });
  const logout = () => setUser(null);

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
      console.error('Failed to parse watchlist from localStorage', error);
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
    <AuthContext.Provider value={{ user, login, logout }}>
      <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, getWatchlistMovies }}>
        {children}
      </WatchlistContext.Provider>
    </AuthContext.Provider>
  );
}
