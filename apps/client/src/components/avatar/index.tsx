/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 public/models/city city.glb -o src/components/city/index.jsx -r public
*/

import { Html, useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SkeletonUtils } from 'three-stdlib';
import { Vector3 } from '../../lib/three';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { socket } from '../../lib/socket';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AvatarProps {
  url: string;
  id: string;
  nickname: string;
  speed?: number;
  direction?: InstanceType<typeof Vector3>;
  frontVector?: InstanceType<typeof Vector3>;
  sideVector?: InstanceType<typeof Vector3>;
  position?: InstanceType<typeof Vector3>;
}

interface PressedType {
  back: boolean;
  forward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
}

const PRESSED_INITIAL_STATE = {
  back: false,
  forward: false,
  left: false,
  right: false,
  jump: false,
};

type ANIMATIONS_STATE = 'M_Standing_Idle_001' | 'M_Walk_001';

const Avatar = ({
  url,
  id,
  nickname,
  speed = 3,
  direction = new Vector3(),
  frontVector = new Vector3(),
  sideVector = new Vector3(),
  ...props
}: AvatarProps) => {
  const ref = useRef<InstanceType<typeof RapierRigidBody>>(null);
  const avatar = useRef<InstanceType<typeof THREE.Group>>(null);
  const group = useRef<InstanceType<typeof THREE.Group>>(null);
  const { scene } = useGLTF(url);
  const pressed = useRef<PressedType>(PRESSED_INITIAL_STATE);

  // animation
  const { animations: walkAnimation } = useGLTF('/animations/M_Walk_001.glb');
  const { animations: idleAnimation } = useGLTF(
    '/animations/M_Standing_Idle_001.glb'
  );
  const { actions } = useAnimations(
    [walkAnimation[0], idleAnimation[0]],
    avatar
  );
  const [animation, setAnimation] = useState<ANIMATIONS_STATE>(
    'M_Standing_Idle_001'
  );

  // memorized position
  const position = useMemo(
    () => new Vector3(props.position?.x, props.position?.y, props.position?.z),
    []
  );

  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const onPlayerMove = (value: any) => {
    const { id: socketId, pressed: newPressed } = value;
    if (socketId === id) {
      pressed.current = newPressed;
      socket.emit('updatePosition', socketId, ref.current?.translation());
    }
  };

  useEffect(() => {
    clone.traverse((child) => {
      if (child.isObject3D) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clone]);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.25).play();

    return () => {
      actions[animation]?.fadeOut(0.25);
    };
  }, [animation, url]);

  useEffect(() => {
    socket.on('playerMove', onPlayerMove);

    return () => {
      socket.off('playerMove', onPlayerMove);
    };
  }, [id]);

  useFrame((_state) => {
    const { forward, back, left, right } = pressed.current;
    const hips = avatar.current?.getObjectByName('Hips');
    hips?.position.set(0, hips.position.y, 0);

    if (!(avatar.current && ref.current)) return;

    const velocity = ref.current.linvel();

    const isMove = back || forward || left || right;

    frontVector.set(0, 0, Number(back) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed);

    ref.current.setLinvel(
      { x: direction.x, y: velocity.y, z: direction.z },
      true
    );

    if (direction.lengthSq() > 0) {
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        direction.clone().normalize()
      );

      avatar.current.quaternion.copy(quaternion);
    }

    if (isMove) {
      setAnimation('M_Walk_001');
    } else {
      setAnimation('M_Standing_Idle_001');
    }
  });

  return (
    <RigidBody lockRotations ref={ref} position={position} type="dynamic">
      <Html
        center
        style={{
          color: '#ffffff',
        }}
        position={new Vector3(0, 2, 0)}
      >
        {nickname}
      </Html>
      <group name={`player-${id}`} ref={group} dispose={null}>
        <primitive object={clone} ref={avatar} />
      </group>
    </RigidBody>
  );
};

export default Avatar;

useGLTF.preload('/animations/M_Walk_001.glb');
useGLTF.preload('/animations/M_Standing_Idle_001.glb');
