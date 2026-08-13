import * as THREE from 'three';
import { Text, useTexture } from '@react-three/drei';

const PORTRAIT_SIZE = 1.1;

interface HubProps {
  profileImage: string;
  position: [number, number, number];
}

export default function Hub({ profileImage, position }: HubProps) {
  const texture = useTexture(profileImage);
  const image = texture.image as { width: number; height: number };
  const aspect = image.width / image.height;
  // crop to a centered square, matching the 2D site's `object-cover` portrait treatment
  if (aspect > 1) {
    texture.repeat.set(1 / aspect, 1);
    texture.offset.set((1 - 1 / aspect) / 2, 0);
  } else {
    texture.repeat.set(1, aspect);
    texture.offset.set(0, (1 - aspect) / 2);
  }

  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[PORTRAIT_SIZE, PORTRAIT_SIZE]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <lineSegments position={[0, 0, 0.005]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(PORTRAIT_SIZE + 0.05, PORTRAIT_SIZE + 0.05)]} />
        <lineBasicMaterial color="#5b9fe8" />
      </lineSegments>
      <Text
        position={[0, -PORTRAIT_SIZE / 2 - 0.14, 0]}
        fontSize={0.075}
        color="#5b9fe8"
        anchorX="center"
        anchorY="top"
      >
        Vinu Varghese
      </Text>
      <Text
        position={[0, -PORTRAIT_SIZE / 2 - 0.28, 0]}
        fontSize={0.045}
        color="#f5f2ea"
        anchorX="center"
        anchorY="top"
      >
        Technical Architect
      </Text>
      <Text
        position={[0, -PORTRAIT_SIZE / 2 - 0.44, 0]}
        fontSize={0.04}
        color="#7c8a94"
        anchorX="center"
        anchorY="top"
        maxWidth={2}
        textAlign="center"
      >
        point & select the floor to teleport — WASD/drag if no headset
      </Text>
    </group>
  );
}
