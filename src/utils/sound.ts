export const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3');
  audio.play().catch(error => {
    console.warn('Could not play notification sound:', error);
  });
};