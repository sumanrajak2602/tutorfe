import { io } from 'socket.io-client';

export const socket = io('http://3.111.33.229:8080/', {
  autoConnect: true,
  reconnection: true
});