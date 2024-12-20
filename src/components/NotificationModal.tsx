import React from 'react';
import { X } from 'lucide-react';

interface NotificationModalProps {
  notification: {
    title: string;
    message: string;
    payload: any;
  };
  onAccept: () => void;
  onDecline: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notification,
  onAccept,
  onDecline,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{notification.title}</h2>
          <button
            onClick={onDecline}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mb-6">
          <p className="text-gray-600">{notification.message}</p>
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <pre className="text-sm">
              {JSON.stringify(notification.payload, null, 2)}
            </pre>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onDecline}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};