import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, ContactShadows, SpotLight } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const DigitalArtifact = () => {
  const meshRef = useRef<THREE.Group>(null);
  const scrollProgress = useScrollProgress();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Base rotation + Scroll-based rotation
    meshRef.current.rotation.y = t * 0.1 + scrollProgress * Math.PI * 2;
    meshRef.current.rotation.x = t * 0.05 + scrollProgress * Math.PI;
    
    // Slight floating effect is handled by <Float> but we can add some scroll depth
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.1 - scrollProgress * 2;
    meshRef.current.position.z = scrollProgress * -5;
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh castShadow receiveShadow>
          <octahedronGeometry args={[1.5, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            color="#ffffff"
          />
        </mesh>
        
        {/* Inner core */}
        <mesh castShadow receiveShadow scale={0.5}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#8B5CF6" wireframe opacity={0.5} transparent />
        </mesh>
      </Float>
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <SpotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <DigitalArtifact />
      <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
    </>
  );
};

const GlobalCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-background">
      <Suspense fallback={null}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default GlobalCanvas;
