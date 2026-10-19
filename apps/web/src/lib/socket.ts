import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const wsUrl = import.meta.env.VITE_WS_URL || 'http://localhost:4000';
    socket = io(wsUrl, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });
  }
  return socket;
};
