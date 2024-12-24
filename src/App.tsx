import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Bell } from 'lucide-react';
import { useNotification } from './hooks/useNotification';
import { NotificationModal } from './components/NotificationModal';

export function App() {
  // In a real app, this would come from your auth system
  const userId = "6764ee38cd35e66c574c7cb9";
  const { notifications, acceptNotification, declineNotification } = useNotification(userId);

  // Show the most recent notification if any
  const currentNotification = notifications[0];

  // return (
  //   <div className="min-h-screen bg-gray-100">
  //     <Toaster position="top-right" />
      
  //     <nav className="bg-white shadow-sm">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex justify-between h-16">
  //           <div className="flex items-center">
  //             <h1 className="text-xl font-semibold">Notification Demo</h1>
  //           </div>
  //           <div className="flex items-center">
  //             <div className="relative">
  //               <Bell className="h-6 w-6 text-gray-500" />
  //               {notifications.length > 0 && (
  //                 <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
  //                   {notifications.length}
  //                 </span>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </nav>

  //     <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
  //       <div className="px-4 py-6 sm:px-0">
  //         <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
  //           <p className="text-gray-500">
  //             {notifications.length === 0 
  //               ? "Waiting for notifications..." 
  //               : `You have ${notifications.length} active notification(s)`}
  //           </p>
  //         </div>
  //       </div>
  //     </main>

  //     {currentNotification && (
  //       <NotificationModal
  //         notification={currentNotification}
  //         onAccept={() => acceptNotification(currentNotification, { 
  //           status: 'accepted', 
  //           timestamp: new Date() 
  //         })}
  //         onDecline={() => declineNotification(currentNotification.id)}
  //       />
  //     )}
  //   </div>
  // );
  return (<div>Under maintenance</div>)


}