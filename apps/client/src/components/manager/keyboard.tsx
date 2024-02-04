import { useKeyboardControls } from '@react-three/drei';
import { Controls } from '../../App';
import { useEffect } from 'react';

const KeyBoardManager = () => {
  const [sub] = useKeyboardControls<Controls>();

  useEffect(() => {
    return sub(
      (state) => state,
      (pressed) => {
        console.log(pressed);
      }
    );
  }, []);

  return null;
};

export default KeyBoardManager;
