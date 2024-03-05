import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  KeyboardControls,
  type KeyboardControlsEntry,
} from '@react-three/drei';
import Scene from './components/scene';
import OnBoarding from './components/ui/onboarding';
import useLoaded from './hooks/useLoaded';
import Loading from './components/loading';
import { ChatForm } from './components/ui';

export enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

function App() {
  const { loaded } = useLoaded();
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ],
    []
  );

  return (
    <main className="relative h-full w-full">
      <OnBoarding />
      <ChatForm />
      <KeyboardControls map={map}>
        <Canvas>
          <Scene />
        </Canvas>
      </KeyboardControls>
      {!loaded && <Loading />}
    </main>
  );
}

export default App;
