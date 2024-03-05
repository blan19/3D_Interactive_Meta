import { useGLTF } from '@react-three/drei';
import { RigidBody, vec3 } from '@react-three/rapier';

const City = () => {
  const { scene } = useGLTF('/models/city/city.glb');

  return (
    <RigidBody type="fixed">
      <primitive
        object={scene}
        position={vec3({ x: 0, y: -3, z: 0 })}
        scale={0.02}
      />
    </RigidBody>
  );
};

useGLTF.preload('/models/city/city.glb');

export default City;
