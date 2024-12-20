export const vibrate = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200]);
  }
};