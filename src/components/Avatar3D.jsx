import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles } from '@react-three/drei';

function Katana() {
  const group = useRef();
  
  // Rotate the katana slowly
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.4;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.1 - 0.5; // Slight tilt
  });

  return (
    <group ref={group} dispose={null}>
      {/* Blade */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.05, 3.5, 0.3]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Blade Edge Highlight */}
      <mesh position={[0.03, 1.2, 0]}>
        <boxGeometry args={[0.01, 3.5, 0.28]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>

      {/* Guard (Tsuba) */}
      <mesh position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.08, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Handle (Tsuka) */}
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[0.12, 1.3, 0.25]} />
        <meshStandardMaterial color="#8B0000" metalness={0.2} roughness={0.8} />
      </mesh>
      
      {/* Handle Wrap detail (simplified as bands) */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[0, -0.8 - (i * 0.2), 0]}>
          <boxGeometry args={[0.14, 0.05, 0.27]} />
          <meshStandardMaterial color="#111111" metalness={0.1} roughness={0.9} />
        </mesh>
      ))}

      {/* Pommel (Kashira) */}
      <mesh position={[0, -2.0, 0]}>
        <boxGeometry args={[0.13, 0.1, 0.26]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

const Avatar3D = () => {
  return (
    <div className="canvas-container" style={{ width: '100%', height: '100%', minHeight: '500px', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ff3333" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Katana />
        </Float>
        
        {/* Floating cinematic embers */}
        <Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#ff3300" />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
};

export default Avatar3D;
