import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SatelliteBeaconModel({ active }) {
  const groupRef = useRef();
  const dishRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    if (!active) return; // Skip off-screen updates for performance

    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = 1.2 + Math.sin(time * 1.2) * 0.1;
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.x = Math.sin(time * 0.7) * 0.05;
    }

    if (dishRef.current) {
      dishRef.current.rotation.z = Math.sin(time * 0.8) * 0.15;
    }

    // Expanding transmission beacon waves
    const animateWave = (mesh, offset) => {
      if (!mesh) return;
      const progress = ((time * 0.7 + offset) % 2) / 2;
      const scale = 0.8 + progress * 3.2;
      mesh.scale.set(scale, scale, scale);
      if (mesh.material) {
        mesh.material.opacity = Math.max(0, 0.75 * (1 - progress));
      }
    };

    animateWave(ring1Ref.current, 0.0);
    animateWave(ring2Ref.current, 0.66);
    animateWave(ring3Ref.current, 1.33);
  });

  return (
    <group position={[0, 0, -75]} visible={active}>
      <group ref={groupRef} position={[0, 1.2, 0]}>
        {/* Central Satellite Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.9, 1.4, 0.9]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.92, 1.42, 0.92]} />
          <meshBasicMaterial color="#00f0ff" wireframe={true} transparent opacity={0.35} />
        </mesh>

        {/* High-Gain Parabolic Communications Dish */}
        <group ref={dishRef} position={[0, 0.9, 0]} rotation={[0.4, 0, 0]}>
          <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.7, 0.3, 16, 1, true]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <mesh position={[0, 0.65, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <pointLight position={[0, 0.7, 0]} color="#00f0ff" intensity={2.5} distance={8} />
        </group>

        {/* Left Solar Panel Array */}
        <group position={[-1.6, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.0, 0.7, 0.04]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.02, 0.72, 0.05]} />
            <meshBasicMaterial color="#00f0ff" wireframe={true} transparent opacity={0.3} />
          </mesh>
          <mesh position={[1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        </group>

        {/* Right Solar Panel Array */}
        <group position={[1.6, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.0, 0.7, 0.04]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.02, 0.72, 0.05]} />
            <meshBasicMaterial color="#00f0ff" wireframe={true} transparent opacity={0.3} />
          </mesh>
          <mesh position={[-1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        </group>

        {/* Optical Sensor Aperture */}
        <mesh position={[0, -0.4, 0.5]}>
          <cylinderGeometry args={[0.12, 0.12, 0.15, 10]} rotation={[Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#f43f5e" />
        </mesh>
      </group>

      {/* Pulsing Beacon Spherical Wave Rings */}
      <group position={[0, 2.2, 0]}>
        <mesh ref={ring1Ref}>
          <ringGeometry args={[1.0, 1.04, 32]} />
          <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[1.0, 1.04, 32]} />
          <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
        <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, 0]}>
          <ringGeometry args={[1.0, 1.04, 32]} />
          <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}
