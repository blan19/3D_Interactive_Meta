import { Canvas } from '@react-three/fiber';
import Scene from './components/scene';
import OnBoarding from './components/ui/onboarding';
import useLoaded from './hooks/useLoaded';
import Loading from './components/loading';

function App() {
  const { loaded } = useLoaded();

  return (
    <main className="h-full w-full">
      <OnBoarding />
      <Canvas>
        <Scene />
      </Canvas>
      {!loaded && <Loading />}
    </main>
  );
}

export default App;
