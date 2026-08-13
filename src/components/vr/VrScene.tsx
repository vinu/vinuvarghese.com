import { Suspense, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { Grid } from '@react-three/drei';
import { TeleportTarget, XROrigin, useXR } from '@react-three/xr';
import { vrPanels } from '../../data/vrPanels';
import Panel from './Panel';
import ContactPanel from './ContactPanel';
import Hub from './Hub';
import ParticleField from './ParticleField';
import DesktopFlyControls from './DesktopFlyControls';
import PanelCycler from './PanelCycler';

const PANEL_RADIUS = 3;
const PANEL_HEIGHT = 1.5;
const PANEL_COUNT = vrPanels.length;

// same "-angle" convention used for each panel's own inward-facing rotation
function yawForPanel(index: number) {
  return -((index * Math.PI) / 2);
}

interface VrSceneProps {
  profileImage: string;
}

export default function VrScene({ profileImage }: VrSceneProps) {
  const [position, setPosition] = useState(new Vector3(0, 0, 0));
  const [originYaw, setOriginYaw] = useState(0);
  const panelIndex = useRef(0);
  const session = useXR((state) => state.session);

  const cycleToPanel = (direction: 1 | -1) => {
    panelIndex.current = (panelIndex.current + direction + PANEL_COUNT) % PANEL_COUNT;
    setPosition(new Vector3(0, 0, 0));
    setOriginYaw(yawForPanel(panelIndex.current));
  };

  return (
    <>
      <color attach="background" args={['#100f0d']} />
      <fog attach="fog" args={['#0d1a26', 4, 18]} />

      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 2]} intensity={0.6} />

      <XROrigin position={position} rotation={[0, originYaw, 0]} />

      <Suspense fallback={null}>
        <Hub profileImage={profileImage} position={[0, 1.55, -1.4]} />
      </Suspense>

      <ParticleField />

      {vrPanels.map((panel, i) => {
        const angle = (i * Math.PI) / 2;
        const panelPosition: [number, number, number] = [
          Math.sin(angle) * PANEL_RADIUS,
          PANEL_HEIGHT,
          -Math.cos(angle) * PANEL_RADIUS,
        ];
        const rotationY = -angle;
        const PanelComponent = panel.index === '04' ? ContactPanel : Panel;
        return (
          <Suspense key={panel.index} fallback={null}>
            <PanelComponent data={panel} position={panelPosition} rotationY={rotationY} />
          </Suspense>
        );
      })}

      <Grid
        position={[0, 0.001, 0]}
        args={[16, 16]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#1d5fa8"
        sectionSize={4}
        sectionThickness={1}
        sectionColor="#5b9fe8"
        fadeDistance={12}
        fadeStrength={1}
        infiniteGrid
      />

      <TeleportTarget onTeleport={setPosition}>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[16, 1, 16]} />
          <meshStandardMaterial color="#1e1c18" />
        </mesh>
      </TeleportTarget>

      {session != null && <PanelCycler onCycle={cycleToPanel} />}
      {session == null && <DesktopFlyControls />}
    </>
  );
}
