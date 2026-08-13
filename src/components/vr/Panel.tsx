import { Text } from '@react-three/drei';
import type { VrPanelData } from '../../data/vrPanels';

const PLATE_WIDTH = 2.4;
const PLATE_HEIGHT = 2.2;

interface PanelProps {
  data: VrPanelData;
  position: [number, number, number];
  rotationY: number;
}

export default function Panel({ data, position, rotationY }: PanelProps) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[PLATE_WIDTH, PLATE_HEIGHT]} />
        <meshBasicMaterial color="#100f0d" transparent opacity={0.92} />
      </mesh>
      <Text
        position={[-PLATE_WIDTH / 2 + 0.12, PLATE_HEIGHT / 2 - 0.16, 0]}
        fontSize={0.09}
        color="#5b9fe8"
        anchorX="left"
        anchorY="top"
      >
        {`/${data.index} ${data.title}`}
      </Text>
      <Text
        position={[-PLATE_WIDTH / 2 + 0.12, PLATE_HEIGHT / 2 - 0.34, 0]}
        fontSize={0.055}
        lineHeight={1.5}
        maxWidth={PLATE_WIDTH - 0.24}
        color="#f5f2ea"
        anchorX="left"
        anchorY="top"
      >
        {data.body}
      </Text>
    </group>
  );
}
