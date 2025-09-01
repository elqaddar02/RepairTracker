import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthContextType, RegisterData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  // Mock login (no password check)
  const login = async (email: string, password: string): Promise<void> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email);
    if (!foundUser) throw new Error('User not found');
    // Password check can be added here if needed

    setUser(foundUser);
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
  };

  // Mock register
  const register = async (userData: RegisterData): Promise<void> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.email === userData.email)) throw new Error('Email already registered');

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    user,
    token: null, // no token needed
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
