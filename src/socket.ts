import { io } from 'socket.io-client';

//http://13.201.80.185:8080
export const socket = io('http://localhost:8080', {
  autoConnect: true,
  reconnection: true
});