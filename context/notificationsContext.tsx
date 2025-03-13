// contexts/NotificationContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface Notification {
  id: string | number;
  title: string;
  body?: string;
  content?: string;
  timestamp: string;
  priority?: string;
  type?: string;
  urgent?: boolean;
  read?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string | number) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string | number) => void;
  connected: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children, userId }: { children: ReactNode, userId?: string }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  
  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  useEffect(() => {
    if (!userId) return;
    
    console.log("Setting up persistent WebSocket connection for user:", userId);
    
    // Create WebSocket connection
    const socketInstance = io("http://localhost:4001", {
      query: { userId }
    });
    
    socketInstance.on("connect", () => {
      console.log("WebSocket connected");
      setConnected(true);
    });
    
    socketInstance.on("disconnect", () => {
      console.log("WebSocket disconnected");
      setConnected(false);
    });
    
    socketInstance.on("notification", (data) => {
      console.log("Received notification:", data);
      
      // Format the notification
      const newNotification: Notification = {
        id: data.id,
        title: data.title,
        body: data.body,
        content: data.body,
        timestamp: new Date(data.timestamp || Date.now()).toLocaleString(),
        priority: data.urgent ? "Urgent" : "Normal",
        type: data.type,
        urgent: data.urgent,
        read: false
      };
      
      // Add to state
      setNotifications(prev => [newNotification, ...prev]);
      
      // Acknowledge receipt
      socketInstance.emit("notification:ack", data.id);
    });
    
    setSocket(socketInstance);
    
    return () => {
      console.log("Cleaning up WebSocket connection");
      socketInstance.disconnect();
    };
  }, [userId]);
  
  // Functions to manage notifications
  const markAsRead = (id: string | number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const removeNotification = (id: string | number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      removeNotification,
      connected
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};