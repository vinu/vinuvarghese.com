import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// A procedural tensegrity-style lattice: rigid "rods" that never touch,
// held apart by tensioned "cables" — the product's own metaphor (balance
// across many domains, no single point of failure) built as geometry
// rather than illustrated. Rendered as a subtle, ambient background layer
// that tilts gently toward the cursor — a physical structure responding
// to a force, not a decorative showpiece competing for attention.

const LEVELS = 5;
const RADIUS = 1.1;
const LEVEL_HEIGHT = 0.9;

function buildLattice() {
  const rods: [THREE.Vector3, THREE.Vector3][] = [];
  const cables: [THREE.Vector3, THREE.Vector3][] = [];
  const ringPoints: THREE.Vector3[][] = [];

  for (let level = 0; level < LEVELS; level++) {
    // stacked along X so the lattice reads as a horizontal beam spanning
    // the wide hero section, not a vertical column
    const x = level * LEVEL_HEIGHT - ((LEVELS - 1) * LEVEL_HEIGHT) / 2;
    const angleOffset = level % 2 === 0 ? 0 : Math.PI / 3;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 3; i++) {
      const angle = angleOffset + (i * (Math.PI * 2)) / 3;
      points.push(new THREE.Vector3(x, Math.cos(angle) * RADIUS, Math.sin(angle) * RADIUS));
    }
    ringPoints.push(points);
  }

  // rods: diagonal struts crossing between alternating levels (floating, never touching)
  for (let level = 0; level < LEVELS - 1; level++) {
    const a = ringPoints[level];
    const b = ringPoints[level + 1];
    for (let i = 0; i < 3; i++) {
      rods.push([a[i], b[(i + 1) % 3]]);
    }
  }

  // cables: tension lines around each ring and connecting rings vertically
  for (let level = 0; level < LEVELS; level++) {
    const pts = ringPoints[level];
    for (let i = 0; i < 3; i++) {
      cables.push([pts[i], pts[(i + 1) % 3]]);
    }
  }
  for (let level = 0; level < LEVELS - 1; level++) {
    const a = ringPoints[level];
    const b = ringPoints[level + 1];
    for (let i = 0; i < 3; i++) {
      cables.push([a[i], b[i]]);
    }
  }

  const joints = ringPoints.flat();

  return { rods, cables, joints };
}

function Strut({ a, b, radius, color, metalness, roughness, emissive }: {
  a: THREE.Vector3; b: THREE.Vector3; radius: number; color: string;
  metalness: number; roughness: number; emissive?: string;
}) {
  const mid = useMemo(() => a.clone().add(b).multiplyScalar(0.5), [a, b]);
  const dir = useMemo(() => b.clone().sub(a), [a, b]);
  const len = dir.length();
  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return q;
  }, [dir]);

  return (
    <mesh position={mid} quaternion={quat}>
      <cylinderGeometry args={[radius, radius, len, 10]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} emissive={emissive} emissiveIntensity={emissive ? 0.35 : 0} />
    </mesh>
  );
}

// tracks normalized pointer position (-1..1) across the whole viewport,
// shared by the lattice for its cursor-parallax tilt
function usePointerRef() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);
  return pointer;
}

function Lattice() {
  const group = useRef<THREE.Group>(null);
  const { rods, cables, joints } = useMemo(() => buildLattice(), []);
  const start = useRef(performance.now());
  const pointer = usePointerRef();
  const { camera } = useThree();

  useFrame(() => {
    // drei's <PerspectiveCamera> does not auto-aim at the origin the way
    // R3F's own default camera does — without this the lattice sits
    // entirely outside the view frustum and renders nothing.
    camera.lookAt(0, 0, 0);
    if (!group.current) return;
    const t = (performance.now() - start.current) / 1000;
    group.current.rotation.y = t * 0.1;
    group.current.scale.setScalar(1 + Math.sin(t * 0.45) * 0.012);
    // gentle tilt toward the cursor, like a suspended structure catching
    // a breeze — eased, never snapping directly to pointer position
    const targetX = pointer.current.y * 0.12;
    const targetZ = -pointer.current.x * 0.12;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.03;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.03;
  });

  return (
    <group ref={group}>
      {rods.map(([a, b], i) => (
        <Strut key={`rod-${i}`} a={a} b={b} radius={0.028} color="#54524c" roughness={0.5} metalness={0.4} />
      ))}
      {cables.map(([a, b], i) => (
        <Strut key={`cable-${i}`} a={a} b={b} radius={0.007} color="#f59e0b" roughness={0.5} metalness={0.05} emissive="#f59e0b" />
      ))}
      {joints.map((p, i) => (
        <mesh key={`joint-${i}`} position={p}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#3a3934" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export default function TensegrityScene() {
  useEffect(() => {
    // R3F's canvas resize observer occasionally misses its first reading
    // when mounted via lazy()+Suspense (the container is already sized,
    // but the observer's initial callback races the commit); nudging a
    // resize event forces it to re-measure and pick up the real size.
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.75]}>
      <PerspectiveCamera makeDefault position={[2.2, 2.6, 5.4]} fov={32} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1} />
      <directionalLight position={[-3, -1, -2]} intensity={0.25} color="#f59e0b" />
      <Lattice />
      <ContactShadows position={[0, -1.25, 0]} opacity={0.2} scale={6} blur={2.6} far={2} color="#000000" />
    </Canvas>
  );
}
