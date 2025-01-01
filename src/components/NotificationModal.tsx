import React from 'react';
import { X } from 'lucide-react';
import type { Notification } from '../types/notification';

interface NotificationModalProps {
  notifications: Notification[];
  onAccept: (notification: Notification) => void;
  onDecline: (notificationId: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onAccept,
  onDecline,
}) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Active Notifications ({notifications.length})</h2>
          <button
            onClick={() => onDecline(notifications[0].id)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{notification.title}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{notification.message}</p>
                
                <div className="mt-4 bg-gray-50 rounded-md p-3 max-h-32 overflow-y-auto">
                  <pre className="text-xs whitespace-pre-wrap">
                    {JSON.stringify(notification.payload, null, 2)}
                  </pre>
                </div>
                
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => onDecline(notification.id)}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border rounded"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => onAccept(notification)}
                    className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};