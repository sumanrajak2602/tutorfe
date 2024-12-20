import { io } from 'socket.io-client';

export const socket = io('https://tutor-9lu8jqh4s-suman-rajaks-projects.vercel.app/', {
  autoConnect: true,
  reconnection: true
});