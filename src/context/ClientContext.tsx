import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Store } from '../data/stores';

interface ClientContextType {
  favoriteStores: string[];
  addToFavorites: (storeId: string) => void;
  removeFromFavorites: (storeId: string) => void;
  isFavorite: (storeId: string) => boolean;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
}

interface Notification {
  id: string;
  type: 'repair_update' | 'store_promotion' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [favoriteStores, setFavoriteStores] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteStores');
    if (savedFavorites) {
      setFavoriteStores(JSON.parse(savedFavorites));
    }

    const savedNotifications = localStorage.getItem('clientNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favoriteStores', JSON.stringify(favoriteStores));
  }, [favoriteStores]);

  // Save notifications to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('clientNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const addToFavorites = (storeId: string) => {
    setFavoriteStores(prev => {
      if (!prev.includes(storeId)) {
        return [...prev, storeId];
      }
      return prev;
    });
  };

  const removeFromFavorites = (storeId: string) => {
    setFavoriteStores(prev => prev.filter(id => id !== storeId));
  };

  const isFavorite = (storeId: string) => {
    return favoriteStores.includes(storeId);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value: ClientContextType = {
    favoriteStores,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    notifications,
    addNotification,
    markNotificationAsRead,
    clearAllNotifications,
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContext;