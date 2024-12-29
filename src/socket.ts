import { io } from 'socket.io-client';

export const socket = io('http://13.201.80.185:8080', {
  autoConnect: true,
  reconnection: true
});