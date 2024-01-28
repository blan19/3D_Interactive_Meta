import { Html, useProgress } from '@react-three/drei';

const Loading = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="w-[550px] rounded border bg-black p-4">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold tracking-tighter text-white">
            Welcome to 3D Interactive Meta
          </h1>
          <p className="text-lg tracking-tighter text-gray-300">
            Please wait a moment... {progress.toFixed()} loaded
          </p>
        </div>
      </div>
    </Html>
  );
};

export default Loading;
