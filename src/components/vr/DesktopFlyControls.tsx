import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { vrPanels } from '../../data/vrPanels';

const MOVE_SPEED = 2.5;
const LOOK_SPEED = 0.0025;
const MAX_PITCH = Math.PI / 2 - 0.05;
const PANEL_COUNT = vrPanels.length;

// same "-angle" convention used for each panel's own inward-facing rotation
function yawForPanel(index: number) {
  return -((index * Math.PI) / 2);
}

export default function DesktopFlyControls() {
  const { camera, gl } = useThree();
  const keys = useRef<Record<string, boolean>>({});
  const dragging = useRef(false);
  // Seeded to a fixed level/forward start rather than read from camera.rotation:
  // R3F's default camera auto-lookAt(0,0,0), and this camera sits directly
  // above the origin, so its initial rotation is a broken straight-down pitch.
  const yaw = useRef(0);
  const pitch = useRef(0);
  const panelIndex = useRef(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
      if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
        const direction = e.code === 'ArrowRight' ? 1 : -1;
        panelIndex.current = (panelIndex.current + direction + PANEL_COUNT) % PANEL_COUNT;
        camera.position.set(0, 1.5, 0);
        pitch.current = 0;
        yaw.current = yawForPanel(panelIndex.current);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };
    const onPointerDown = () => {
      dragging.current = true;
    };
    const onPointerUp = () => {
      dragging.current = false;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      yaw.current -= e.movementX * LOOK_SPEED;
      pitch.current = Math.max(
        -MAX_PITCH,
        Math.min(MAX_PITCH, pitch.current - e.movementY * LOOK_SPEED)
      );
    };

    const canvas = gl.domElement;
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [gl]);

  useFrame((_, delta) => {
    camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ');

    const forward = keys.current['KeyW'] ? 1 : keys.current['KeyS'] ? -1 : 0;
    const strafe = keys.current['KeyD'] ? 1 : keys.current['KeyA'] ? -1 : 0;
    if (forward === 0 && strafe === 0) return;

    const sinYaw = Math.sin(yaw.current);
    const cosYaw = Math.cos(yaw.current);
    const distance = MOVE_SPEED * delta;
    camera.position.x += (-sinYaw * forward + cosYaw * strafe) * distance;
    camera.position.z += (-cosYaw * forward - sinYaw * strafe) * distance;
  });

  return null;
}
