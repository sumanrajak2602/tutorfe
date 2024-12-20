import { useEffect, useState, useCallback } from 'react';
import { socket } from '../socket';
import toast from 'react-hot-toast';
import { playNotificationSound } from '../utils/sound';
import { vibrate } from '../utils/vibration';
import type { Notification, NotificationResponse } from '../types/notification';

export const useNotification = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    socket.emit('register_user', userId);

    socket.on('new_notification', (data: Notification) => {
      setNotifications(prev => [...prev, data]);
      playNotificationSound();
      vibrate();
    });

    socket.on('notification_cancelled', ({ notificationId, acceptedBy }) => {
      setNotifications(prev => 
        prev.filter(notif => notif.id !== notificationId)
      );
      toast.info(`Notification was accepted by another user`);
    });

    return () => {
      socket.off('new_notification');
      socket.off('notification_cancelled');
    };
  }, [userId]);

  const acceptNotification = useCallback((
    notification: Notification, 
    responseData: NotificationResponse
  ) => {
    socket.emit('accept_notification', {
      userId,
      notificationId: notification.id,
      response: responseData
    });
    
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notification.id)
    );
    
    toast.success('Notification accepted successfully');
  }, [userId]);

  const declineNotification = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
    toast.error('Notification declined');
  }, []);

  return {
    notifications,
    acceptNotification,
    declineNotification
  };
};