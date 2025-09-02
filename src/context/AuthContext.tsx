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

// Static users data
const staticUsers = [
  {
    id: '1',
    email: 'client@demo.com',
    password: 'password',
    name: 'John Doe',
    role: 'client' as const,
    phone: '+1234567890',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'store@demo.com',
    password: 'password',
    shopName: 'Tech Repair Store',
    role: 'store' as const,
    city: 'New York',
    address: '123 Main St',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'admin@demo.com',
    password: 'password',
    name: 'Admin User',
    role: 'admin' as const,
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const foundUser = staticUsers.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const userToSave = { ...foundUser };
    delete (userToSave as any).password; // Remove password from stored user
    
    setUser(userToSave);
    localStorage.setItem('currentUser', JSON.stringify(userToSave));
  };

  const register = async (userData: RegisterData): Promise<void> => {
    // Check if email already exists
    if (staticUsers.some(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      role: userData.role,
      createdAt: new Date().toISOString(),
      ...(userData.role === 'client' 
        ? { name: userData.name, phone: userData.phone }
        : { shopName: userData.shopName, city: userData.city, address: userData.address }
      ),
    };

    // Add to static users (in real app, this would be API call)
    staticUsers.push({ ...newUser, password: userData.password } as any);
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    user,
    token: null,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};