import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  RoundedBox,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';
import {
  getSceneStateAtProgress,
  TOTAL_FRAMES,
} from '../../config/sections';
import { frameController } from '../../utils/FrameController';
import { useMousePosition } from '../../hooks/useMousePosition';

/* ──────────────────────────────────────────────────────────────────────────
 * Studio HDRI Lighting Rig — Warm Gold, Fiery Orange & Crimson Red Rim Lights
 * ────────────────────────────────────────────────────────────────────────── */
const MoltenStudioLighting: React.FC<{
  scrollRef: React.MutableRefObject<number>;
}> = ({ scrollRef }) => {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const crimsonLightRef = useRef<THREE.PointLight>(null);
  const goldLightRef = useRef<THREE.PointLight>(null);
  const camPointLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ camera }) => {
    const state = getSceneStateAtProgress(scrollRef.current);
    const mult = 0.75 + state.intensity * 0.45;

    if (keyLightRef.current) keyLightRef.current.intensity = 3.2 * mult;
    if (crimsonLightRef.current) {
      crimsonLightRef.current.position.z = camera.position.z - 5;
      crimsonLightRef.current.intensity = 26 * mult;
    }
    if (goldLightRef.current) {
      goldLightRef.current.position.z = camera.position.z - 6;
      goldLightRef.current.intensity = 26 * mult;
    }
    if (camPointLightRef.current) {
      camPointLightRef.current.position.set(
        camera.position.x,
        camera.position.y,
        camera.position.z - 2.5
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} color="#1c1917" />
      <directionalLight
        ref={keyLightRef}
        position={[6, 10, 8]}
        color="#fef3c7"
        intensity={3.2}
      />
      <pointLight
        ref={crimsonLightRef}
        position={[-6, 3, 4]}
        color="#EF4444"
        distance={28}
        decay={1.5}
      />
      <pointLight
        ref={goldLightRef}
        position={[6, -3, 4]}
        color="#FACC15"
        distance={28}
        decay={1.5}
      />
      {/* Camera-attached warm torch light so shapes right in front of the lens gleam as you fly through them */}
      <pointLight
        ref={camPointLightRef}
        color="#F97316"
        intensity={18}
        distance={16}
        decay={1.6}
      />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3.5, -0.25, 0]}>
          <Lightformer
            intensity={4.5}
            rotation-x={Math.PI / 2}
            position={[0, 8, -4]}
            scale={[16, 10, 1]}
            color="#FEF08A"
          />
          <Lightformer
            intensity={8}
            rotation-y={Math.PI / 2}
            position={[-10, 2, -2]}
            scale={[18, 3, 1]}
            color="#EF4444"
          />
          <Lightformer
            intensity={8}
            rotation-y={-Math.PI / 2}
            position={[10, -2, -2]}
            scale={[18, 3, 1]}
            color="#F59E0B"
          />
          <Lightformer
            form="ring"
            color="#F97316"
            intensity={6}
            scale={9}
            position={[0, 0, -10]}
          />
        </group>
      </Environment>

      <fog attach="fog" args={['#060608', 6, 19]} />
    </>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Small 3D Frontend Engineering Micro-Models (Used in Fly-Through Portals & Tunnel)
 * Kept deliberately compact (0.18 - 0.38) with authentic Frontend 3D geometry:
 *   0: 3D < / > JSX & Code Tag Sculpture
 *   1: 3D React-Inspired Atomic Component Core (3 Intersecting Elliptical Orbits)
 *   2: 3D Mini UI Browser / Component Window Card (with Traffic Lights & Bento Layers)
 *   3: 3D IDE Code Editor Slate (with Extruded 3D Syntax-Highlighted Code Bars)
 *   4: 3D Virtual DOM Tree / API Graph Hierarchy (Parent Node -> Pipes -> Child Nodes)
 *   5: 3D Responsive Multi-Device Viewport Stack (Desktop + Tablet + Mobile Frames)
 * ────────────────────────────────────────────────────────────────────────── */
interface SmallSculptureSpec {
  id: number;
  x: number;
  y: number;
  z: number;
  scale: number;
  kind: 0 | 1 | 2 | 3 | 4 | 5;
  color: string;
  rotSpeedX: number;
  rotSpeedY: number;
  phase: number;
}

const SmallSculptureNode: React.FC<{ spec: SmallSculptureSpec }> = React.memo(
  ({ spec }) => {
    const ref = useRef<THREE.Group>(null);
    const orbitSpinRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
      if (!ref.current) return;
      const t = clock.getElapsedTime();
      // Poised 3D floating + gentle multi-axis showcase tilt so < / >, UI Windows, and DOM trees
      // show off their full 3D depth without flipping upside down
      ref.current.rotation.y = Math.sin(t * spec.rotSpeedY + spec.phase) * 0.62;
      ref.current.rotation.x = Math.cos(t * spec.rotSpeedX + spec.phase) * 0.28;
      ref.current.rotation.z = Math.sin(t * 0.35 + spec.phase) * 0.12;

      if (orbitSpinRef.current) {
        orbitSpinRef.current.rotation.z = t * 1.1 + spec.phase;
        orbitSpinRef.current.rotation.y = t * 0.7;
      }
    });

    return (
      <group
        ref={ref}
        position={[spec.x, spec.y, spec.z]}
        scale={spec.scale}
      >
        {/* KIND 0: 3D < / > JSX & Code Tag Sculpture */}
        {spec.kind === 0 && (
          <group>
            {/* Left Chevron '<' */}
            <RoundedBox
              args={[0.52, 0.14, 0.16]}
              radius={0.04}
              smoothness={3}
              position={[-0.64, 0.17, 0]}
              rotation={[0, 0, Math.PI / 4]}
            >
              <meshPhysicalMaterial
                color="#14141A"
                emissive={spec.color}
                emissiveIntensity={0.45}
                metalness={0.92}
                roughness={0.12}
                clearcoat={1}
              />
            </RoundedBox>
            <RoundedBox
              args={[0.52, 0.14, 0.16]}
              radius={0.04}
              smoothness={3}
              position={[-0.64, -0.17, 0]}
              rotation={[0, 0, -Math.PI / 4]}
            >
              <meshPhysicalMaterial
                color="#14141A"
                emissive={spec.color}
                emissiveIntensity={0.45}
                metalness={0.92}
                roughness={0.12}
                clearcoat={1}
              />
            </RoundedBox>

            {/* Center Slash '/' */}
            <RoundedBox
              args={[0.13, 0.98, 0.18]}
              radius={0.04}
              smoothness={3}
              position={[0, 0, 0.02]}
              rotation={[0, 0, -0.32]}
            >
              <meshStandardMaterial
                color="#FACC15"
                emissive="#F97316"
                emissiveIntensity={0.75}
                metalness={0.9}
                roughness={0.1}
              />
            </RoundedBox>

            {/* Right Chevron '>' */}
            <RoundedBox
              args={[0.52, 0.14, 0.16]}
              radius={0.04}
              smoothness={3}
              position={[0.64, 0.17, 0]}
              rotation={[0, 0, -Math.PI / 4]}
            >
              <meshPhysicalMaterial
                color="#14141A"
                emissive={spec.color}
                emissiveIntensity={0.45}
                metalness={0.92}
                roughness={0.12}
                clearcoat={1}
              />
            </RoundedBox>
            <RoundedBox
              args={[0.52, 0.14, 0.16]}
              radius={0.04}
              smoothness={3}
              position={[0.64, -0.17, 0]}
              rotation={[0, 0, Math.PI / 4]}
            >
              <meshPhysicalMaterial
                color="#14141A"
                emissive={spec.color}
                emissiveIntensity={0.45}
                metalness={0.92}
                roughness={0.12}
                clearcoat={1}
              />
            </RoundedBox>
          </group>
        )}

        {/* KIND 1: 3D React-Inspired Atomic Component Node */}
        {spec.kind === 1 && (
          <group ref={orbitSpinRef}>
            {/* Glowing Component State Nucleus */}
            <mesh>
              <sphereGeometry args={[0.22, 20, 20]} />
              <meshStandardMaterial
                color="#FACC15"
                emissive="#EF4444"
                emissiveIntensity={0.85}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            {/* 3 Intersecting Elliptical Component Orbits */}
            {[0, Math.PI / 3, -Math.PI / 3].map((angle, idx) => (
              <group key={idx} rotation={[0.35, 0, angle]} scale={[1.15, 0.46, 1]}>
                <mesh>
                  <torusGeometry args={[0.85, 0.045, 12, 48]} />
                  <meshPhysicalMaterial
                    color="#16161D"
                    emissive={idx === 0 ? '#FACC15' : idx === 1 ? '#EF4444' : '#F97316'}
                    emissiveIntensity={0.45}
                    metalness={0.95}
                    roughness={0.12}
                    clearcoat={1}
                  />
                </mesh>
                {/* Orbiting State Electron */}
                <mesh position={[0.85, 0, 0]}>
                  <sphereGeometry args={[0.09, 12, 12]} />
                  <meshStandardMaterial
                    color="#FACC15"
                    emissive="#FACC15"
                    emissiveIntensity={0.9}
                  />
                </mesh>
              </group>
            ))}
          </group>
        )}

        {/* KIND 2: 3D Mini UI Browser / Component Window Card */}
        {spec.kind === 2 && (
          <group>
            {/* Dark Obsidian Glass Browser Body */}
            <RoundedBox args={[1.55, 1.05, 0.12]} radius={0.07} smoothness={4}>
              <meshPhysicalMaterial
                color="#0D0D12"
                metalness={0.92}
                roughness={0.14}
                clearcoat={1}
                emissive={spec.color}
                emissiveIntensity={0.12}
              />
            </RoundedBox>
            {/* Top Window Bar */}
            <RoundedBox
              args={[1.42, 0.16, 0.06]}
              radius={0.03}
              position={[0, 0.37, 0.06]}
            >
              <meshStandardMaterial
                color="#1A1822"
                metalness={0.9}
                roughness={0.2}
              />
            </RoundedBox>
            {/* 3 Traffic Light Dots (Crimson, Orange, Gold) */}
            <mesh position={[-0.56, 0.37, 0.1]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[-0.42, 0.37, 0.1]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[-0.28, 0.37, 0.1]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial color="#FACC15" emissive="#FACC15" emissiveIntensity={0.8} />
            </mesh>
            {/* Floating 3D UI Sidebar Component */}
            <RoundedBox
              args={[0.34, 0.66, 0.08]}
              radius={0.03}
              position={[-0.5, -0.1, 0.11]}
            >
              <meshPhysicalMaterial
                color="#181620"
                emissive="#EF4444"
                emissiveIntensity={0.28}
                metalness={0.9}
                roughness={0.15}
              />
            </RoundedBox>
            {/* Floating 3D UI Hero Banner Block */}
            <RoundedBox
              args={[0.92, 0.28, 0.1]}
              radius={0.03}
              position={[0.2, 0.08, 0.13]}
            >
              <meshPhysicalMaterial
                color="#1E1B26"
                emissive={spec.color}
                emissiveIntensity={0.42}
                metalness={0.9}
                roughness={0.12}
              />
            </RoundedBox>
            {/* Two Floating 3D Bento Grid Cards */}
            <RoundedBox
              args={[0.42, 0.3, 0.1]}
              radius={0.03}
              position={[-0.04, -0.26, 0.14]}
            >
              <meshStandardMaterial
                color="#181620"
                emissive="#F97316"
                emissiveIntensity={0.35}
                metalness={0.88}
                roughness={0.18}
              />
            </RoundedBox>
            <RoundedBox
              args={[0.42, 0.3, 0.1]}
              radius={0.03}
              position={[0.44, -0.26, 0.14]}
            >
              <meshStandardMaterial
                color="#181620"
                emissive="#FACC15"
                emissiveIntensity={0.35}
                metalness={0.88}
                roughness={0.18}
              />
            </RoundedBox>
          </group>
        )}

        {/* KIND 3: 3D IDE Code Editor Slate with Extruded Syntax Bars */}
        {spec.kind === 3 && (
          <group>
            {/* Beveled 3D IDE Slate */}
            <RoundedBox args={[1.45, 1.08, 0.11]} radius={0.07} smoothness={4}>
              <meshPhysicalMaterial
                color="#0E0E14"
                metalness={0.94}
                roughness={0.14}
                clearcoat={1}
              />
            </RoundedBox>
            {/* Glowing Left Gutter Bar */}
            <RoundedBox
              args={[0.06, 0.86, 0.06]}
              radius={0.02}
              position={[-0.58, 0, 0.07]}
            >
              <meshStandardMaterial
                color="#EF4444"
                emissive="#EF4444"
                emissiveIntensity={0.65}
              />
            </RoundedBox>
            {/* 4 Rows of Extruded 3D Syntax-Highlighted Code Tokens */}
            <RoundedBox args={[0.38, 0.09, 0.08]} radius={0.02} position={[-0.26, 0.32, 0.09]}>
              <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.6} />
            </RoundedBox>
            <RoundedBox args={[0.46, 0.09, 0.08]} radius={0.02} position={[0.24, 0.32, 0.09]}>
              <meshStandardMaterial color="#FACC15" emissive="#FACC15" emissiveIntensity={0.65} />
            </RoundedBox>

            <RoundedBox args={[0.56, 0.09, 0.08]} radius={0.02} position={[-0.06, 0.11, 0.1]}>
              <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={0.6} />
            </RoundedBox>
            <RoundedBox args={[0.28, 0.09, 0.08]} radius={0.02} position={[0.44, 0.11, 0.1]}>
              <meshStandardMaterial color="#FACC15" emissive="#FACC15" emissiveIntensity={0.5} />
            </RoundedBox>

            <RoundedBox args={[0.68, 0.09, 0.08]} radius={0.02} position={[0.02, -0.1, 0.1]}>
              <meshStandardMaterial color="#FACC15" emissive="#F97316" emissiveIntensity={0.65} />
            </RoundedBox>

            <RoundedBox args={[0.42, 0.09, 0.08]} radius={0.02} position={[-0.22, -0.31, 0.09]}>
              <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.55} />
            </RoundedBox>
          </group>
        )}

        {/* KIND 4: 3D Virtual DOM Tree / API Graph Hierarchy */}
        {spec.kind === 4 && (
          <group>
            {/* Root Component Node (Top) */}
            <RoundedBox
              args={[0.44, 0.32, 0.24]}
              radius={0.05}
              position={[0, 0.44, 0]}
            >
              <meshStandardMaterial
                color="#FACC15"
                emissive="#F97316"
                emissiveIntensity={0.7}
                metalness={0.9}
                roughness={0.12}
              />
            </RoundedBox>
            {/* Left Child Component Node */}
            <RoundedBox
              args={[0.38, 0.28, 0.22]}
              radius={0.05}
              position={[-0.54, -0.36, 0]}
            >
              <meshPhysicalMaterial
                color="#16141C"
                emissive="#EF4444"
                emissiveIntensity={0.55}
                metalness={0.92}
                roughness={0.12}
              />
            </RoundedBox>
            {/* Right Child Component Node */}
            <RoundedBox
              args={[0.38, 0.28, 0.22]}
              radius={0.05}
              position={[0.54, -0.36, 0]}
            >
              <meshPhysicalMaterial
                color="#16141C"
                emissive="#FACC15"
                emissiveIntensity={0.55}
                metalness={0.92}
                roughness={0.12}
              />
            </RoundedBox>
            {/* 3D Data Pipe Left */}
            <mesh position={[-0.27, 0.04, 0]} rotation={[0, 0, -0.58]}>
              <cylinderGeometry args={[0.035, 0.035, 0.92, 12]} />
              <meshStandardMaterial
                color="#F97316"
                emissive="#EF4444"
                emissiveIntensity={0.65}
              />
            </mesh>
            {/* 3D Data Pipe Right */}
            <mesh position={[0.27, 0.04, 0]} rotation={[0, 0, 0.58]}>
              <cylinderGeometry args={[0.035, 0.035, 0.92, 12]} />
              <meshStandardMaterial
                color="#FACC15"
                emissive="#F97316"
                emissiveIntensity={0.65}
              />
            </mesh>
          </group>
        )}

        {/* KIND 5: 3D Responsive Multi-Device Viewport Stack (Desktop + Tablet + Mobile) */}
        {spec.kind === 5 && (
          <group>
            {/* Back Layer: Wide Desktop Monitor Frame */}
            <RoundedBox
              args={[1.55, 0.96, 0.08]}
              radius={0.05}
              position={[0.1, 0.08, -0.14]}
            >
              <meshPhysicalMaterial
                color="#101016"
                emissive="#EF4444"
                emissiveIntensity={0.22}
                metalness={0.92}
                roughness={0.15}
                clearcoat={1}
              />
            </RoundedBox>
            {/* Middle Layer: Tablet Viewport Frame */}
            <RoundedBox
              args={[0.98, 0.72, 0.08]}
              radius={0.05}
              position={[0.26, -0.06, 0.02]}
            >
              <meshPhysicalMaterial
                color="#16141E"
                emissive="#F97316"
                emissiveIntensity={0.35}
                metalness={0.92}
                roughness={0.14}
                clearcoat={1}
              />
            </RoundedBox>
            {/* Front Layer: Vertical Mobile Phone Frame */}
            <RoundedBox
              args={[0.46, 0.84, 0.09]}
              radius={0.06}
              position={[-0.42, -0.12, 0.18]}
            >
              <meshPhysicalMaterial
                color="#1C1824"
                emissive="#FACC15"
                emissiveIntensity={0.5}
                metalness={0.95}
                roughness={0.1}
                clearcoat={1}
              />
            </RoundedBox>
          </group>
        )}
      </group>
    );
  }
);
SmallSculptureNode.displayName = 'SmallSculptureNode';

/* ──────────────────────────────────────────────────────────────────────────
 * Clean, Spacious Fly-Through Frontend Cluster (Centered at x=0, y=0)
 * Only 4 well-spaced 3D Frontend models per station so the screen stays
 * refined and uncluttered as the camera flies straight through the center.
 * ────────────────────────────────────────────────────────────────────────── */
const FlyThroughPortalCluster: React.FC<{
  zPos: number;
  index: number;
}> = React.memo(({ zPos, index }) => {
  const clusterRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const palette = ['#FACC15', '#F97316', '#EF4444', '#F59E0B'];
    const list: SmallSculptureSpec[] = [];

    // Only 4 clean Frontend 3D models per station, spaced 90 degrees apart around the center
    const count = 4;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + index * 0.55 + 0.35;
      const r = 1.65 + (i % 2) * 0.55;
      list.push({
        id: i,
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r * 0.75,
        z: ((i % 2) - 0.5) * 1.1,
        scale: 0.24 + (i % 2) * 0.05,
        kind: ((i + index * 2) % 6) as 0 | 1 | 2 | 3 | 4 | 5,
        color: palette[(i + index) % palette.length],
        rotSpeedX: 0.35 + (i % 3) * 0.12,
        rotSpeedY: 0.45 + (i % 2) * 0.15,
        phase: i * 1.1 + index,
      });
    }

    return list;
  }, [index]);

  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    const dir = index % 2 === 0 ? 1 : -1;

    if (ringRef.current) {
      ringRef.current.rotation.z = Math.sin(t * 0.18 + index) * 0.14 * dir;
    }

    // Subtle expansion as the camera passes right through the middle of the 4 shapes
    if (clusterRef.current) {
      const dist = Math.abs(camera.position.z - zPos);
      const proximity = Math.max(0, 1 - dist / 5);
      const scaleBoost = 1 + proximity * 0.22;
      clusterRef.current.scale.setScalar(scaleBoost);
    }
  });

  return (
    <group ref={clusterRef} position={[0, 0, zPos]}>
      <group ref={ringRef}>
        {nodes.map((spec) => (
          <SmallSculptureNode key={spec.id} spec={spec} />
        ))}
      </group>
    </group>
  );
});
FlyThroughPortalCluster.displayName = 'FlyThroughPortalCluster';

/* ──────────────────────────────────────────────────────────────────────────
 * Sparse Ambient 3D Frontend Models Along the Scroll Tunnel
 * Only 14 subtle outer-periphery shapes across the entire 60-unit depth
 * ────────────────────────────────────────────────────────────────────────── */
const TunnelMicroSculptureField: React.FC = React.memo(() => {
  const items = useMemo(() => {
    const list: SmallSculptureSpec[] = [];
    const palette = ['#FACC15', '#F97316', '#EF4444', '#F59E0B'];
    const total = 14;

    for (let i = 0; i < total; i++) {
      const z = 6 - (i / total) * 56;
      const theta = i * 2.3999632;
      const r = 2.4 + (i % 3) * 0.65;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r * 0.72;

      list.push({
        id: i + 1000,
        x,
        y,
        z,
        scale: 0.2 + (i % 3) * 0.04,
        kind: (i % 6) as 0 | 1 | 2 | 3 | 4 | 5,
        color: palette[i % palette.length],
        rotSpeedX: 0.3 + (i % 3) * 0.1,
        rotSpeedY: 0.35 + (i % 2) * 0.12,
        phase: i * 0.8,
      });
    }
    return list;
  }, []);

  return (
    <group>
      {items.map((spec) => (
        <SmallSculptureNode key={spec.id} spec={spec} />
      ))}
    </group>
  );
});
TunnelMicroSculptureField.displayName = 'TunnelMicroSculptureField';

/* ──────────────────────────────────────────────────────────────────────────
 * Scroll-Driven Fly-Through Camera Stage
 * Moves the camera smoothly through the 6 well-spaced Frontend Stations
 * ────────────────────────────────────────────────────────────────────────── */
const FlyThroughStage: React.FC<{
  scrollRef: React.MutableRefObject<number>;
}> = ({ scrollRef }) => {
  const { camera } = useThree();
  const mouse = useMousePosition();
  const smoothedScroll = useRef(0);

  // 6 well-spaced stations (10 units apart) so the scene never looks crowded
  const portalZPositions = useMemo(
    () => [4, -6, -16, -26, -36, -46],
    []
  );

  useFrame((_, delta) => {
    const targetP = Math.max(0, Math.min(1, scrollRef.current));
    smoothedScroll.current = THREE.MathUtils.damp(
      smoothedScroll.current,
      targetP,
      4.5,
      delta
    );
    const p = smoothedScroll.current;

    // Camera flies from z = +10.5 down to z = -49
    const targetCamZ = 10.5 - p * 59.5;
    // Subtle spiral camera weave + mouse parallax
    const targetCamX = Math.sin(p * Math.PI * 3) * 0.3 + mouse.x * 0.5;
    const targetCamY = Math.cos(p * Math.PI * 2.5) * 0.2 + mouse.y * -0.35;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 5, delta);

    camera.lookAt(
      camera.position.x * 0.3,
      camera.position.y * 0.3,
      camera.position.z - 10
    );
  });

  return (
    <group>
      {portalZPositions.map((zPos, idx) => (
        <FlyThroughPortalCluster key={zPos} zPos={zPos} index={idx} />
      ))}
      <TunnelMicroSculptureField />
    </group>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * GPU Shader Compile & Rendered Frame Verification Gate
 * Ensures the 3D scene has compiled all PBR materials and rendered real frames
 * before notifying the application to reveal the UI.
 * ────────────────────────────────────────────────────────────────────────── */
const SceneReadyNotifier: React.FC<{ onReady?: () => void }> = ({ onReady }) => {
  const { gl, scene, camera } = useThree();
  const frameCount = useRef(0);
  const notified = useRef(false);

  useEffect(() => {
    try {
      gl.compile(scene, camera);
    } catch {
      // Ignore compile warnings on fallback contexts
    }
  }, [gl, scene, camera]);

  useFrame(() => {
    if (notified.current) return;
    frameCount.current += 1;
    if (frameCount.current >= 4) {
      notified.current = true;
      onReady?.();
    }
  });

  return null;
};

/* ──────────────────────────────────────────────────────────────────────────
 * GlobalCanvas Component
 * ────────────────────────────────────────────────────────────────────────── */
interface GlobalCanvasProps {
  onReady?: () => void;
}

const GlobalCanvas: React.FC<GlobalCanvasProps> = ({ onReady }) => {
  const scrollProgressRef = useRef(0);
  const frameCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasExternalFrames, setHasExternalFrames] = useState(false);
  const [hudScene, setHudScene] = useState(() => getSceneStateAtProgress(0));

  useEffect(() => {
    let mounted = true;
    frameController.probeAvailability().then((available) => {
      if (mounted) {
        setHasExternalFrames(available);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0;
      scrollProgressRef.current = progress;

      const sceneState = getSceneStateAtProgress(progress);
      setHudScene((prev) =>
        prev.currentScene.index !== sceneState.currentScene.index ||
        Math.abs(prev.intensity - sceneState.intensity) > 0.04
          ? sceneState
          : prev
      );

      if (frameController.hasFrames() && frameCanvasRef.current) {
        const targetFrame = Math.max(
          1,
          Math.min(TOTAL_FRAMES, Math.round(progress * (TOTAL_FRAMES - 1)) + 1)
        );
        frameController.preloadFrames(targetFrame, 12);

        const img = frameController.getClosestLoadedFrame(targetFrame);
        const canvas = frameCanvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx && img) {
          if (
            canvas.width !== window.innerWidth ||
            canvas.height !== window.innerHeight
          ) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
          }
          const scale = Math.max(
            canvas.width / img.width,
            canvas.height / img.height
          );
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (canvas.width - w) / 2;
          const y = (canvas.height - h) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = sceneState.intensity;
          ctx.drawImage(img, x, y, w, h);
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [hasExternalFrames]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#060608]"
      aria-hidden="true"
    >
      {/* Subtle Warm Gold/Crimson Center Horizon Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: 0.35 * hudScene.intensity,
          background:
            'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.14) 0%, rgba(249, 115, 22, 0.10) 35%, rgba(250, 204, 21, 0.04) 60%, transparent 80%)',
        }}
      />

      {/* 3D Fly-Through Constellation Tunnel Canvas */}
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 11.5], fov: 52, near: 0.1, far: 42 }}
          gl={{
            alpha: true,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.25,
            powerPreference: 'high-performance',
          }}
        >
          <MoltenStudioLighting scrollRef={scrollProgressRef} />
          <FlyThroughStage scrollRef={scrollProgressRef} />
          <SceneReadyNotifier onReady={onReady} />

          {/* Subtle Golden & Crimson Ember Particles */}
          <Sparkles
            count={40}
            scale={[16, 12, 50]}
            size={1.6}
            speed={0.3}
            opacity={0.4}
            color="#FACC15"
          />
          <Sparkles
            count={25}
            scale={[14, 10, 50]}
            size={1.8}
            speed={0.35}
            opacity={0.35}
            color="#EF4444"
          />
        </Canvas>
      </Suspense>

      {/* Optional Pre-Rendered Frame Sequence Layer */}
      <canvas
        ref={frameCanvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hasExternalFrames ? 'opacity-90' : 'opacity-0'
        }`}
      />

      {/* Soft Edge Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(6, 6, 8, 0.72) 100%)',
        }}
      />
    </div>
  );
};

export default GlobalCanvas;

