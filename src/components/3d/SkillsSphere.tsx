import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, TrackballControls } from '@react-three/drei';
import * as THREE from 'three';
import { skills } from '../../data/skills';

// Calculate spherical positions using Fibonacci sphere algorithm
function getPointsOnSphere(count: number, radius: number) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // radius at y
    const theta = phi * i; // golden angle increment

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

function SkillWord({ position, children, color }: { position: THREE.Vector3; children: string; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ camera }) => {
    if (ref.current) {
      // Make text always face camera
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <Text
      ref={ref}
      position={position}
      color={hovered ? color : '#94a3b8'}
      fontSize={hovered ? 1.2 : 0.8}
      font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
      anchorX="center"
      anchorY="middle"
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {children}
    </Text>
  );
}

function SphereCloud({ radius = 8 }) {
  const group = useRef<THREE.Group>(null);
  
  // Create points based on the number of skills
  const points = useMemo(() => getPointsOnSphere(skills.length, radius), [radius]);

  // Slowly rotate the entire cloud
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {skills.map((skill, i) => (
        <SkillWord key={skill.name} position={points[i]} color={skill.color}>
          {skill.name}
        </SkillWord>
      ))}
    </group>
  );
}

export default function SkillsSphere() {
  return (
    <div className="h-[400px] w-full md:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 18], fov: 60 }} dpr={[1, 2]}>
        <fog attach="fog" args={['#030712', 10, 30]} />
        <ambientLight intensity={1} />
        <SphereCloud />
        <TrackballControls noZoom noPan dynamicDampingFactor={0.1} />
      </Canvas>
    </div>
  );
}
