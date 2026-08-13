import { useState } from 'react';
import { Vector3 } from 'three';
import { TeleportTarget, XROrigin, useXR } from '@react-three/xr';
import { vrPanels } from '../../data/vrPanels';
import Panel from './Panel';
import DesktopFlyControls from './DesktopFlyControls';

const PANEL_RADIUS = 3;
const PANEL_HEIGHT = 1.5;

export default function VrScene() {
  const [position, setPosition] = useState(new Vector3(0, 0, 0));
  const session = useXR((state) => state.session);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 2]} intensity={0.6} />

      <XROrigin position={position} />

      {vrPanels.map((panel, i) => {
        const angle = (i * Math.PI) / 2;
        return (
          <Panel
            key={panel.index}
            data={panel}
            position={[
              Math.sin(angle) * PANEL_RADIUS,
              PANEL_HEIGHT,
              -Math.cos(angle) * PANEL_RADIUS,
            ]}
            rotationY={-angle}
          />
        );
      })}

      <TeleportTarget onTeleport={setPosition}>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[16, 1, 16]} />
          <meshStandardMaterial color="#1e1c18" />
        </mesh>
      </TeleportTarget>

      {session == null && <DesktopFlyControls />}
    </>
  );
}
