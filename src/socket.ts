import { io } from 'socket.io-client';

export const socket = io('https://tutor-virid.vercel.app/', {
  autoConnect: true,
  reconnection: true
});