
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  signup: (name: string, email: string) => Promise<void>;
  logout: () => void;
  toggleSavedEvent: (eventId: string) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Check local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('showgo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('showgo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('showgo_user');
    }
  }, [user]);

  const login = async (email: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          name: email.split('@')[0], // Mock name from email
          email: email,
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=A855F7&color=fff`,
          savedEventIds: []
        });
        setIsAuthModalOpen(false);
        resolve();
      }, 800);
    });
  };

  const signup = async (name: string, email: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          name: name,
          email: email,
          avatar: `https://ui-avatars.com/api/?name=${name}&background=A855F7&color=fff`,
          savedEventIds: []
        });
        setIsAuthModalOpen(false);
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSavedEvent = (eventId: string) => {
    if (!user) {
      openAuthModal();
      return;
    }

    const isSaved = user.savedEventIds.includes(eventId);
    const newSavedIds = isSaved
      ? user.savedEventIds.filter(id => id !== eventId)
      : [...user.savedEventIds, eventId];

    setUser({
      ...user,
      savedEventIds: newSavedIds
    });
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      toggleSavedEvent,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};
