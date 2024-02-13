import { useEffect } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import { Controls } from '../App';
import { useChatFocusStore, useUserStore } from '../store';
import { socket } from '../lib/socket';

export default function useKeyboard() {
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
}
