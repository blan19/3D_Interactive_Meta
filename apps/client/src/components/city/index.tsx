import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const City = () => {
  const { scene } = useGLTF('/models/city/city.glb');

  return (
    <RigidBody type="fixed">
      <primitive
        object={scene}
        position={new THREE.Vector3(0, -3)}
        scale={0.02}
      />
    </RigidBody>
  );
};

useGLTF.preload('/models/city/city.glb');

export default City;
