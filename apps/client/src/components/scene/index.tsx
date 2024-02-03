import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import City from '../city';

const Scene = () => {
  return (
    <>
      <ambientLight />
      <directionalLight />
      <City />
      <OrbitControls />
      <PerspectiveCamera />
    </>
  );
};

export default Scene;
