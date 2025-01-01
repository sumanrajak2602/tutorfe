import { useState, useEffect } from 'react';

const STORAGE_KEY = 'declined-notifications';

interface DeclinedNotification {
  userId: string;
  notificationId: string;
  timestamp: number;
}

export const getDeclinedNotifications = (userId: string): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const declined: DeclinedNotification[] = JSON.parse(stored);
    return declined
      .filter(item => item.userId === userId)
      .map(item => item.notificationId);
  } catch (error) {
    console.error('Error reading declined notifications:', error);
    return [];
  }
};

export const addDeclinedNotification = (userId: string, notificationId: string) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const declined: DeclinedNotification[] = stored ? JSON.parse(stored) : [];
    
    declined.push({
      userId,
      notificationId,
      timestamp: Date.now()
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(declined));
  } catch (error) {
    console.error('Error saving declined notification:', error);
  }
};