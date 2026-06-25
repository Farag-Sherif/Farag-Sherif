import React, { Suspense, useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';

/* ──────────────────────────── Particles ──────────────────────────── */

const PARTICLE_COUNT = 1500;

const Particles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useMousePosition();

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);

    const palette = [
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#06B6D4'),
      new THREE.Color('#F43F5E'),
      new THREE.Color('#7C3AED'),
      new THREE.Color('#0EA5E9'),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 15;

      const color = palette[i % palette.length];
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;

      siz[i] = 0.5 + Math.random() * 2;
    }

    return { positions: pos, colors: col, sizes: siz };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const ix = positions[i3];
      const iy = positions[i3 + 1];
      const iz = positions[i3 + 2];
      const speed = 0.3 + (i % 5) * 0.1;

      array[i3] =
        ix +
        Math.sin(time * speed + i * 0.01) * 0.5 +
        mouse.x * 0.3;
      array[i3 + 1] =
        iy +
        Math.cos(time * speed * 0.8 + i * 0.02) * 0.5 +
        mouse.y * -0.3;
      array[i3 + 2] =
        iz + Math.sin(time * speed * 0.5 + i * 0.015) * 0.3;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.slice(), 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/* ────────────────────── Wireframe Geometries ─────────────────────── */

interface WireframeShapeProps {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  color: string;
  rotationSpeed: number;
  scale?: number;
}

const WireframeShape: React.FC<WireframeShapeProps> = React.memo(
  ({ geometry, position, color, rotationSpeed, scale = 1 }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
      if (!meshRef.current) return;
      const t = clock.getElapsedTime();
      meshRef.current.rotation.x = t * rotationSpeed * 0.3;
      meshRef.current.rotation.y = t * rotationSpeed * 0.5;
      meshRef.current.rotation.z = t * rotationSpeed * 0.2;
    });

    return (
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={meshRef} position={position} scale={scale}>
          <primitive object={geometry} attach="geometry" />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>
    );
  }
);

WireframeShape.displayName = 'WireframeShape';

const FloatingGeometries: React.FC = () => {
  const geometries = useMemo(
    () => ({
      icosahedron: new THREE.IcosahedronGeometry(1.2, 1),
      torus: new THREE.TorusGeometry(1, 0.35, 16, 32),
      octahedron: new THREE.OctahedronGeometry(1, 0),
      dodecahedron: new THREE.DodecahedronGeometry(0.9, 0),
    }),
    []
  );

  return (
    <>
      <WireframeShape
        geometry={geometries.icosahedron}
        position={[-5, 2, -3]}
        color="#8B5CF6"
        rotationSpeed={0.4}
        scale={1.2}
      />
      <WireframeShape
        geometry={geometries.torus}
        position={[5, -1.5, -4]}
        color="#06B6D4"
        rotationSpeed={0.3}
        scale={1.0}
      />
      <WireframeShape
        geometry={geometries.octahedron}
        position={[-3, -3, -2]}
        color="#F43F5E"
        rotationSpeed={0.5}
        scale={0.9}
      />
      <WireframeShape
        geometry={geometries.dodecahedron}
        position={[4, 3, -5]}
        color="#8B5CF6"
        rotationSpeed={0.35}
        scale={0.8}
      />
    </>
  );
};

/* ───────────────────────── Dynamic Lights ────────────────────────── */

const DynamicLights: React.FC = () => {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const light3Ref = useRef<THREE.PointLight>(null);
  const mouse = useMousePosition();

  useFrame(() => {
    if (light1Ref.current) {
      light1Ref.current.position.x = mouse.x * 3;
      light1Ref.current.position.y = mouse.y * -2;
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = mouse.x * -2;
      light2Ref.current.position.y = mouse.y * 1.5;
    }
    if (light3Ref.current) {
      light3Ref.current.position.x = mouse.x * 1.5;
      light3Ref.current.position.y = mouse.y * -1;
    }
  });

  return (
    <>
      <pointLight
        ref={light1Ref}
        position={[3, 3, 5]}
        color="#8B5CF6"
        intensity={8}
        distance={15}
      />
      <pointLight
        ref={light2Ref}
        position={[-4, -2, 4]}
        color="#06B6D4"
        intensity={6}
        distance={12}
      />
      <pointLight
        ref={light3Ref}
        position={[0, 4, 3]}
        color="#F43F5E"
        intensity={4}
        distance={10}
      />
      <ambientLight intensity={0.08} color="#8B5CF6" />
    </>
  );
};

/* ────────────────────────── Camera Rig ───────────────────────────── */

const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const mouse = useMousePosition();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 8));

  useFrame(() => {
    targetPosition.current.x = mouse.x * 0.5;
    targetPosition.current.y = mouse.y * -0.3;
    targetPosition.current.z = 8;

    camera.position.lerp(targetPosition.current, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

/* ────────────────────────── Scene Content ────────────────────────── */

const SceneContent: React.FC = () => {
  return (
    <>
      <CameraRig />
      <DynamicLights />
      <Particles />
      <FloatingGeometries />
      <Sparkles
        count={60}
        scale={12}
        size={1.5}
        speed={0.4}
        opacity={0.5}
        color="#8B5CF6"
      />
      <Sparkles
        count={40}
        scale={10}
        size={1.2}
        speed={0.3}
        opacity={0.3}
        color="#06B6D4"
      />
      <fog attach="fog" args={['#030712', 5, 25]} />
    </>
  );
};

/* ──────────────────────────── Canvas ─────────────────────────────── */

const HeroScene: React.FC = () => {
  const handleCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      gl.setClearColor('#000000', 0);
      gl.toneMapping = THREE.ACESFilmicToneMapping;
      gl.toneMappingExposure = 1.2;
    },
    []
  );

  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          frameloop="always"
          camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
          onCreated={handleCreated}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        >
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default React.memo(HeroScene);
