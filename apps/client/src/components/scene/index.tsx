import { Suspense } from 'react';
import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei';
import { useWorldStore } from '../../store';
import { Physics } from '@react-three/rapier';
import Avatar from '../avatar';
import City from '../city';
import useKeyboard from '../../hooks/useKeyboard';

const Scene = () => {
  const { world } = useWorldStore();

  useKeyboard();

  return (
    <Suspense>
      <Sky />
      <Physics debug>
        <ambientLight />
        <directionalLight />
        <City />
        <OrbitControls />
        <PerspectiveCamera />
        {world.map((character) => (
          <Suspense key={character.id} fallback={null}>
            <Avatar
              id={character.id}
              url={character.avatar}
              nickname={character.nickname}
            />
          </Suspense>
        ))}
      </Physics>
    </Suspense>
  );
};

export default Scene;
