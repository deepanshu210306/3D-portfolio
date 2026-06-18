import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const bladeMetal = { color: '#aeb6c2', metalness: 0.96, roughness: 0.1 };
const edgeMetal = { color: '#f0f3f8', metalness: 1, roughness: 0.04 };
const guardMetal = { color: '#2e2e2e', metalness: 0.88, roughness: 0.4 };
const habakiMetal = { color: '#c8cdd4', metalness: 0.94, roughness: 0.16 };
const handleCore = { color: '#14100e', metalness: 0.12, roughness: 0.9 };
const wrapColor = { color: '#3a2218', metalness: 0.18, roughness: 0.78 };
const fittingMetal = { color: '#7a6840', metalness: 0.9, roughness: 0.26 };

function createTsubaGeometry() {
  const shape = new THREE.Shape();
  shape.absellipse(0, 0, 0.34, 0.29, 0, Math.PI * 2, false, 0);
  const hole = new THREE.Path();
  hole.absellipse(0, 0, 0.052, 0.046, 0, Math.PI * 2, true, 0);
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.028,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  geo.rotateX(-Math.PI / 2);
  geo.center();
  return geo;
}

function createBladeGeometry() {
  const shape = new THREE.Shape();
  const length = 3.15;

  shape.moveTo(-0.048, 0);
  shape.lineTo(0.036, 0);
  shape.bezierCurveTo(0.12, 0.55, 0.1, 1.8, 0.006, length);
  shape.lineTo(-0.018, length - 0.015);
  shape.bezierCurveTo(-0.038, 2.0, -0.045, 0.7, -0.048, 0);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.034,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  // Profile length is along Y; extrusion depth is along Z — no X-rotation needed
  geo.translate(0, 0, -0.017);
  return geo;
}

function Katana() {
  const group = useRef();

  const tsubaGeometry = useMemo(createTsubaGeometry, []);
  const bladeGeometry = useMemo(createBladeGeometry, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.4;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.1 - 0.5;
  });

  const bladeLength = 3.15;
  const habakiHeight = 0.1;
  const handleLength = 1.05;
  const guardY = 0;
  const bladeBaseY = guardY + habakiHeight + 0.028;

  return (
    <group ref={group} dispose={null}>
      {/* Guard (Tsuba) — flat disc perpendicular to blade, origin at center */}
      <mesh geometry={tsubaGeometry} position={[0, guardY, 0]}>
        <meshStandardMaterial {...guardMetal} />
      </mesh>

      {/* Seppa washers */}
      {[-0.018, 0.018].map((y) => (
        <mesh key={y} position={[0, guardY + y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.05, 0.09, 32]} />
          <meshStandardMaterial {...guardMetal} metalness={0.75} roughness={0.5} />
        </mesh>
      ))}

      {/* Habaki — blade collar */}
      <mesh position={[0, guardY + habakiHeight / 2 + 0.014, 0]}>
        <boxGeometry args={[0.09, habakiHeight, 0.11]} />
        <meshStandardMaterial {...habakiMetal} />
      </mesh>

      {/* Blade */}
      <mesh geometry={bladeGeometry} position={[0, bladeBaseY, 0]} castShadow>
        <meshStandardMaterial {...bladeMetal} />
      </mesh>

      {/* Cutting edge highlight */}
      <mesh position={[0.022, bladeBaseY + bladeLength / 2, 0.01]}>
        <boxGeometry args={[0.004, bladeLength * 0.92, 0.006]} />
        <meshStandardMaterial
          {...edgeMetal}
          emissive="#dce4f0"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Hamon temper line */}
      <mesh position={[-0.028, bladeBaseY + bladeLength * 0.55, 0.012]}>
        <boxGeometry args={[0.003, bladeLength * 0.7, 0.004]} />
        <meshStandardMaterial
          color="#d8dde8"
          metalness={0.9}
          roughness={0.2}
          emissive="#c8d0e0"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Fuchi — handle collar */}
      <mesh position={[0, guardY - 0.038, 0]}>
        <boxGeometry args={[0.13, 0.05, 0.2]} />
        <meshStandardMaterial {...fittingMetal} />
      </mesh>

      {/* Handle core (Tsuka) */}
      <mesh position={[0, guardY - 0.06 - handleLength / 2, 0]}>
        <boxGeometry args={[0.1, handleLength, 0.18]} />
        <meshStandardMaterial {...handleCore} />
      </mesh>

      {/* Samegawa rayskin texture — subtle diamond panels */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1].map((col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              col === 0 ? -0.026 : 0.026,
              guardY - 0.14 - row * 0.22,
              0.092,
            ]}
            rotation={[0, 0, col === 0 ? 0.55 : -0.55]}
          >
            <boxGeometry args={[0.04, 0.1, 0.008]} />
            <meshStandardMaterial color="#0e0c0a" metalness={0.1} roughness={0.95} />
          </mesh>
        ))
      )}

      {/* Ito wrap — alternating diagonal bands */}
      {[...Array(9)].map((_, i) => (
        <mesh
          key={i}
          position={[0, guardY - 0.1 - i * 0.1, 0]}
          rotation={[0, 0, i % 2 === 0 ? 0.72 : -0.72]}
        >
          <boxGeometry args={[0.115, 0.018, 0.19]} />
          <meshStandardMaterial {...wrapColor} />
        </mesh>
      ))}

      {/* Menuki ornaments */}
      <mesh position={[0.03, guardY - 0.42, 0.095]}>
        <boxGeometry args={[0.025, 0.06, 0.012]} />
        <meshStandardMaterial {...fittingMetal} />
      </mesh>
      <mesh position={[-0.03, guardY - 0.62, 0.095]}>
        <boxGeometry args={[0.025, 0.06, 0.012]} />
        <meshStandardMaterial {...fittingMetal} />
      </mesh>

      {/* Kashira — pommel */}
      <mesh position={[0, guardY - 0.06 - handleLength - 0.03, 0]}>
        <cylinderGeometry args={[0.1, 0.09, 0.06, 24]} />
        <meshStandardMaterial {...fittingMetal} />
      </mesh>
    </group>
  );
}

const Avatar3D = () => {
  return (
    <div className="canvas-container" style={{ width: '100%', height: '100%', minHeight: '500px', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, -0.2, 5.2], fov: 42 }}>
        <ambientLight intensity={0.45} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.1} color="#ff3333" />
        <spotLight position={[-6, 4, 8]} angle={0.2} penumbra={0.8} intensity={0.6} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.35} color="#ffffff" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <group scale={1.22} position={[0, -0.55, 0]}>
            <Katana />
          </group>
        </Float>

        <Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#ff3300" />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
};

export default Avatar3D;
