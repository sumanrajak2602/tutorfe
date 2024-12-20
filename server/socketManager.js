import { NotificationStore } from './notificationStore.js';

export class SocketManager {
  constructor(io) {
    this.io = io;
    this.connectedUsers = new Map(); // userId -> socketId
    this.notificationStore = new NotificationStore();
  }

  handleConnection(socket) {
    console.log('Client connected:', socket.id);

    socket.on('register_user', (userId) => this.registerUser(socket, userId));
    socket.on('accept_notification', (data) => this.handleNotificationAcceptance(socket, data));
    socket.on('disconnect', () => this.handleDisconnect(socket));
  }

  registerUser(socket, userId) {
    this.connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ${socket.id}`);
    
    // Send any pending notifications to the user
    const pendingNotifications = this.notificationStore.getUserNotifications(userId);
    pendingNotifications.forEach(notification => {
      socket.emit('new_notification', notification);
    });
  }

  handleNotificationAcceptance(socket, data) {
    const { userId, notificationId, response } = data;
    console.log(`Notification ${notificationId} accepted by user ${userId}`);

    // Get all recipients who received this notification
    const recipients = this.notificationStore.getNotificationRecipients(notificationId);
    
    // Send cancellation to all other recipients
    recipients.forEach(recipientId => {
      if (recipientId !== userId) {
        const recipientSocketId = this.connectedUsers.get(recipientId);
        if (recipientSocketId) {
          this.io.to(recipientSocketId).emit('notification_cancelled', {
            notificationId,
            reason: 'accepted_by_other',
            acceptedBy: userId
          });
        }
      }
    });

    // Remove the notification from active notifications
    this.notificationStore.removeNotification(notificationId);

    // Emit acceptance confirmation
    this.io.emit('notification_accepted', {
      notificationId,
      acceptedBy: userId,
      response
    });
  }

  handleDisconnect(socket) {
    // Remove user from connected users
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === socket.id) {
        this.connectedUsers.delete(userId);
        break;
      }
    }
    console.log('Client disconnected:', socket.id);
  }

  sendNotificationToUsers(recipients, notification) {
    // Store the notification
    this.notificationStore.addNotification(notification, recipients);
    
    // Send to all connected recipients
    recipients.forEach(userId => {
      const socketId = this.connectedUsers.get(userId);
      if (socketId) {
        this.io.to(socketId).emit('new_notification', notification);
      }
    });
  }
}