import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const COUNT = 50;
const RISE_SPEED = 0.05;
const MAX_HEIGHT = 4;
const MIN_HEIGHT = 0.5;

export default function ParticleField() {
  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = MIN_HEIGHT + Math.random() * (MAX_HEIGHT - MIN_HEIGHT);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    return g;
  }, [positions]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const arr = geom.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += RISE_SPEED * dt;
      if (arr[i * 3 + 1] > MAX_HEIGHT) arr[i * 3 + 1] = MIN_HEIGHT;
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points geometry={geom}>
      <pointsMaterial color="#5b9fe8" size={0.03} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}
