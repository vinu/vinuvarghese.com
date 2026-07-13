import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 70;
const BOUNDS: [number, number, number] = [6, 3.4, 1.6];
const LINK = 1.5;

function useThemeColors() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains('dark'));
    update();
    const mo = new MutationObserver(update);
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);
  return dark
    ? { accent: '#ff8c4d', line: '#d6d3d1' }
    : { accent: '#bd4b12', line: '#44403c' };
}

function Network({ line }: { line: string }) {
  const data = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 2 * BOUNDS[i % 3];
      vel[i] = (Math.random() - 0.5) * 0.22;
    }
    return { pos, vel };
  }, []);
  const linePos = useMemo(
    () => new Float32Array(((COUNT * (COUNT - 1)) / 2) * 6),
    []
  );
  const pointsGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(data.pos, 3).setUsage(THREE.DynamicDrawUsage));
    return g;
  }, [data]);
  const linesGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage));
    return g;
  }, [linePos]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const { pos, vel } = data;
    for (let i = 0; i < COUNT * 3; i++) {
      pos[i] += vel[i] * dt;
      if (Math.abs(pos[i]) > BOUNDS[i % 3]) vel[i] *= -1;
    }
    // ponytail: O(n²) proximity scan; 70 nodes = 2.4k pairs/frame, fine. Spatial hash if COUNT grows.
    let seg = 0;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        if (Math.abs(dx) > LINK) continue;
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < LINK * LINK) {
          linePos[seg * 6] = pos[i * 3];
          linePos[seg * 6 + 1] = pos[i * 3 + 1];
          linePos[seg * 6 + 2] = pos[i * 3 + 2];
          linePos[seg * 6 + 3] = pos[j * 3];
          linePos[seg * 6 + 4] = pos[j * 3 + 1];
          linePos[seg * 6 + 5] = pos[j * 3 + 2];
          seg++;
        }
      }
    }
    pointsGeom.attributes.position.needsUpdate = true;
    linesGeom.attributes.position.needsUpdate = true;
    linesGeom.setDrawRange(0, seg * 2);
  });

  return (
    <group position={[0, 0, -1.5]}>
      <points geometry={pointsGeom}>
        <pointsMaterial color={line} size={0.04} sizeAttenuation transparent opacity={0.5} />
      </points>
      <lineSegments geometry={linesGeom}>
        <lineBasicMaterial color={line} transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

function WireCubes({ accent }: { accent: string }) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.LineSegments>(null);
  const outerGeom = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.7, 1.7, 1.7)), []);
  const innerGeom = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.9, 0.9, 0.9)), []);
  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    if (outer.current) {
      outer.current.rotation.x += dt * 0.12;
      outer.current.rotation.y += dt * 0.18;
    }
    if (inner.current) {
      inner.current.rotation.x -= dt * 0.22;
      inner.current.rotation.z -= dt * 0.16;
    }
  });
  return (
    <group ref={outer} position={[3.4, 0.4, -0.6]}>
      <lineSegments geometry={outerGeom}>
        <lineBasicMaterial color={accent} transparent opacity={0.55} />
      </lineSegments>
      <lineSegments ref={inner} geometry={innerGeom}>
        <lineBasicMaterial color={accent} transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

/* eases the whole scene toward the pointer for a parallax feel */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, target.current.x * 0.1, 2.5, dt);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, target.current.y * 0.06, 2.5, dt);
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const colors = useThemeColors();

  // stop rendering frames while the hero is scrolled out of view
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 6], fov: 55 }}
      >
        <Rig>
          <Network line={colors.line} />
          <WireCubes accent={colors.accent} />
        </Rig>
      </Canvas>
    </div>
  );
}
