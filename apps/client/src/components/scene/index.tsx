import { Suspense, useEffect } from 'react';
import { PerspectiveCamera, Sky, useKeyboardControls } from '@react-three/drei';
import { useChatFocusStore, useUserStore, useWorldStore } from '../../store';
import { Physics } from '@react-three/rapier';
import { socket as socketInstance } from '../../lib/socket';
import Avatar from '../avatar';
import City from '../city';
import useSocket from '../../hooks/useSocket';
import { Controls } from '../../App';

const Scene = () => {
  const socket = useSocket(socketInstance);
  const { world } = useWorldStore();
  const { id } = useUserStore();
  const { focus } = useChatFocusStore();
  const [sub] = useKeyboardControls<Controls>();

  useEffect(() => {
    if (!id) return;

    return sub(
      (state) => state,
      (pressed) => {
        if (focus) return;
        socket.emit('pressed', pressed);
      }
    );
  }, [id, focus]);

  return (
    <Suspense>
      <Sky />
      <Physics>
        <ambientLight />
        <directionalLight />
        <City />
        <PerspectiveCamera />
        {world.map((character) => (
          <Suspense key={character.id} fallback={null}>
            <Avatar
              id={character.id}
              url={character.avatar}
              nickname={character.nickname}
              position={character.position}
              socket={socket}
            />
          </Suspense>
        ))}
      </Physics>
    </Suspense>
  );
};

export default Scene;
