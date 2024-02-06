import { io } from 'socket.io-client';
import { config } from './config';

const socket = io(`${config.env.VITE_PUBLIC_SERVER_URL}`);

export { socket };
