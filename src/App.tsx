import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Bell } from 'lucide-react';
import { useNotification } from './hooks/useNotification';
import { NotificationModal } from './components/NotificationModal';

export function App() {
  const userId = "676326736d21f5ba55fac0c5";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notifications, acceptNotification, declineNotification } = useNotification(userId);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Notification Demo</h1>
            </div>
            <div className="flex items-center space-x-4">
              {notifications.length > 0 && (
                <span className="text-sm text-gray-600">
                  {notifications.length} Active Notification{notifications.length !== 1 ? 's' : ''}
                </span>
              )}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <Bell className="h-6 w-6 text-gray-500" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            No active notifications
          </div>
        ) : (
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
                      onClick={() => declineNotification(notification.id)}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border rounded"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => acceptNotification(notification, { 
                        status: 'accepted', 
                        timestamp: new Date() 
                      })}
                      className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <NotificationModal
          notifications={notifications}
          onAccept={(notification) => {
            acceptNotification(notification, { 
              status: 'accepted', 
              timestamp: new Date() 
            });
            if (notifications.length === 1) {
              setIsModalOpen(false);
            }
          }}
          onDecline={(notificationId) => {
            declineNotification(notificationId);
            if (notifications.length === 1) {
              setIsModalOpen(false);
            }
          }}
        />
      )}
    </div>
  );
}