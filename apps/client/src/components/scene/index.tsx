import { Suspense } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useAvatarStore } from '../../store';
import { Physics } from '@react-three/rapier';
import Avatar from '../avatar';
import City from '../city';

const Scene = () => {
  const { url } = useAvatarStore((state) => state);
  return (
    <Suspense>
      <Physics debug>
        <ambientLight />
        <directionalLight />
        <City />
        <OrbitControls />
        <PerspectiveCamera />
        {url && (
          <Suspense fallback={null}>
            <Avatar url={url} />
          </Suspense>
        )}
      </Physics>
    </Suspense>
  );
};

export default Scene;
