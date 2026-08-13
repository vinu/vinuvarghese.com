import { useState } from 'react';
import { Text } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { contactLinks } from '../../data/resume';
import type { VrPanelData } from '../../data/vrPanels';

const PLATE_WIDTH = 2.4;
const PLATE_HEIGHT = 2.2;

interface ContactRowProps {
  label: string;
  href: string;
  displayText: string;
  y: number;
}

function ContactRow({ label, href, displayText, y }: ContactRowProps) {
  const [hovered, setHovered] = useState(false);
  const clickable = !href.startsWith('#');

  return (
    <Text
      position={[-PLATE_WIDTH / 2 + 0.12, y, 0.01]}
      fontSize={0.06}
      color={clickable && hovered ? '#5b9fe8' : '#f5f2ea'}
      anchorX="left"
      anchorY="top"
      onPointerOver={clickable ? () => setHovered(true) : undefined}
      onPointerOut={clickable ? () => setHovered(false) : undefined}
      onClick={
        clickable
          ? (e: ThreeEvent<MouseEvent>) => {
              e.stopPropagation();
              window.open(href, '_blank', 'noopener,noreferrer');
            }
          : undefined
      }
    >
      {`${label}: ${displayText}`}
    </Text>
  );
}

interface ContactPanelProps {
  data: VrPanelData;
  position: [number, number, number];
  rotationY: number;
}

export default function ContactPanel({ data, position, rotationY }: ContactPanelProps) {
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
      {contactLinks.map((link, i) => (
        <ContactRow
          key={link.label}
          label={link.label}
          href={link.href}
          displayText={link.displayText}
          y={PLATE_HEIGHT / 2 - 0.4 - i * 0.18}
        />
      ))}
    </group>
  );
}
