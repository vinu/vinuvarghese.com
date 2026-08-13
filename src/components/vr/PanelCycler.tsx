import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useXRInputSourceState } from '@react-three/xr';

const FIRE_THRESHOLD = 0.6;
const REARM_THRESHOLD = 0.3;

interface PanelCyclerProps {
  onCycle: (direction: 1 | -1) => void;
}

/**
 * Reads the right controller's thumbstick X-axis each frame and fires
 * onCycle(1|-1) once per flick past FIRE_THRESHOLD, re-arming only once
 * the stick returns near neutral — a standard VR snap-turn debounce so a
 * held-over flick doesn't repeat-fire.
 */
export default function PanelCycler({ onCycle }: PanelCyclerProps) {
  const controller = useXRInputSourceState('controller', 'right');
  const armed = useRef(true);

  useFrame(() => {
    const xAxis = controller?.gamepad['xr-standard-thumbstick']?.xAxis ?? 0;

    if (Math.abs(xAxis) < REARM_THRESHOLD) {
      armed.current = true;
      return;
    }
    if (!armed.current) return;

    if (xAxis > FIRE_THRESHOLD) {
      onCycle(1);
      armed.current = false;
    } else if (xAxis < -FIRE_THRESHOLD) {
      onCycle(-1);
      armed.current = false;
    }
  });

  return null;
}
