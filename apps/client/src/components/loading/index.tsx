import { useProgress } from '@react-three/drei';

const Loading = () => {
  const { progress } = useProgress();

  return (
    <div className="fixed left-0 top-0 z-[999] h-screen w-screen">
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-black">
        <h1 className="text-4xl font-bold tracking-tighter text-white">
          Welcome to 3D Interactive Meta
        </h1>
        <p className="text-lg tracking-tighter text-gray-300">
          Please wait a moment... {progress.toFixed()}% loaded
        </p>
      </div>
    </div>
  );
};

export default Loading;
