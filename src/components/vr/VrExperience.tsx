import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import VrScene from './VrScene';

const store = createXRStore({
  hand: { teleportPointer: true },
  controller: { teleportPointer: true },
  offerSession: 'immersive-vr',
  emulate: import.meta.env.DEV,
});

interface VrExperienceProps {
  profileImage: string;
}

export default function VrExperience({ profileImage }: VrExperienceProps) {
  return (
    <div className="relative w-full h-svh overflow-hidden bg-night">
      <div className="absolute top-4 inset-x-0 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <button
          onClick={() => {
            store.enterVR().catch(() => {});
          }}
          className="pointer-events-auto font-mono text-xs border border-cobalt-bright text-cobalt-bright bg-night/90 px-4 py-2"
        >
          Enter VR
        </button>
        <p className="font-mono text-[10px] text-stone-400">
          no headset? drag to look, WASD to move
        </p>
      </div>
      <Canvas camera={{ position: [0, 1.5, 0], fov: 60 }} gl={{ antialias: true }}>
        <XR store={store}>
          <VrScene profileImage={profileImage} />
        </XR>
      </Canvas>
    </div>
  );
}
