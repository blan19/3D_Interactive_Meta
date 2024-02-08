import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { useUserStore, useWorldStore } from '../store';

export default function useSocket(socket: Socket) {
  const socketRef = useRef(socket);
  const { updateWorld } = useWorldStore();
  const { updateId } = useUserStore();

  const onConnect = () => {
    console.log('connected');
  };

  const onDisconnect = () => {
    console.log('disconnected');
  };

  const onWorldJoined = (value: any) => {
    const { character } = value;
    updateId(character.id);
  };

  const onWorld = (world: any) => {
    updateWorld(world);
  };

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on('connect', onConnect);
    socketRef.current.on('disconnect', onDisconnect);
    socketRef.current.on('worldJoined', onWorldJoined);
    socketRef.current.on('world', onWorld);

    return () => {
      socketRef.current.off('connect', onConnect);
      socketRef.current.off('disconnect', onDisconnect);
      socketRef.current.off('worldJoined', onWorldJoined);
      socketRef.current.off('world', onWorld);
    };
  }, []);

  return socketRef.current;
}
