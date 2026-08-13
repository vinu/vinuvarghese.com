import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const MOVE_SPEED = 2.5;
const LOOK_SPEED = 0.0025;
const MAX_PITCH = Math.PI / 2 - 0.05;

export default function DesktopFlyControls() {
  const { camera, gl } = useThree();
  const keys = useRef<Record<string, boolean>>({});
  const dragging = useRef(false);
  const yaw = useRef(camera.rotation.y);
  const pitch = useRef(camera.rotation.x);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
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
