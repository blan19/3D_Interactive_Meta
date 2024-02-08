import { useEffect } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import { Controls } from '../App';
import { useUserStore } from '../store';

export default function useKeyboard() {
  const { id } = useUserStore();
  const [sub] = useKeyboardControls<Controls>();

  useEffect(() => {
    if (!id) return;

    return sub(
      (state) => state,
      (pressed) => {
        console.log(pressed);
      }
    );
  }, [id]);
}
