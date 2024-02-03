import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export default function useLoaded() {
  const { progress } = useProgress();
  const [loaded, set] = useState(false);

  useEffect(() => {
    if (progress === 100) set(true);
  }, [progress]);

  return { loaded };
}
