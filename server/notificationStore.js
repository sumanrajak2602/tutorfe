// Store to manage active notifications
export class NotificationStore {
  constructor() {
    this.activeNotifications = new Map(); // notificationId -> { notification, recipients }
    this.userNotifications = new Map();   // userId -> Set of notificationIds
  }

  addNotification(notification, recipients) {
    this.activeNotifications.set(notification.id, {
      notification,
      recipients: new Set(recipients)
    });
    
    // Map users to their notifications
    recipients.forEach(userId => {
      if (!this.userNotifications.has(userId)) {
        this.userNotifications.set(userId, new Set());
      }
      this.userNotifications.get(userId).add(notification.id);
    });
  }

  removeNotification(notificationId) {
    const notificationData = this.activeNotifications.get(notificationId);
    if (notificationData) {
      // Remove notification from user mappings
      notificationData.recipients.forEach(userId => {
        const userNotifs = this.userNotifications.get(userId);
        if (userNotifs) {
          userNotifs.delete(notificationId);
        }
      });
      this.activeNotifications.delete(notificationId);
    }
  }

  getNotificationRecipients(notificationId) {
    return this.activeNotifications.get(notificationId)?.recipients || new Set();
  }

  getUserNotifications(userId) {
    const notificationIds = this.userNotifications.get(userId) || new Set();
    return Array.from(notificationIds)
      .map(id => this.activeNotifications.get(id)?.notification)
      .filter(Boolean);
  }
}