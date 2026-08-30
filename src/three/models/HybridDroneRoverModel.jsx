import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HybridDroneRoverModel({ active }) {
  const groupRef = useRef();
  const rotor1Ref = useRef();
  const rotor2Ref = useRef();
  const rotor3Ref = useRef();
  const rotor4Ref = useRef();
  const ringsRef = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (!active) return; // Skip off-screen updates for performance

    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating levitation
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.15;
      groupRef.current.rotation.y = time * 0.25;
      groupRef.current.rotation.z = Math.sin(time * 0.8) * 0.04;
    }

    // Spin propellers
    const rotorSpeed = 25;
    if (rotor1Ref.current) rotor1Ref.current.rotation.y += rotorSpeed * delta;
    if (rotor2Ref.current) rotor2Ref.current.rotation.y -= rotorSpeed * delta;
    if (rotor3Ref.current) rotor3Ref.current.rotation.y -= rotorSpeed * delta;
    if (rotor4Ref.current) rotor4Ref.current.rotation.y += rotorSpeed * delta;

    // Telemetry holographic rings
    if (ringsRef.current) ringsRef.current.rotation.z = time * 0.4;
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = time * 0.6;
      innerRingRef.current.rotation.y = time * 0.3;
    }

    // Core pulsing glow
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 3) * 0.08;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, 0]} visible={active}>
      <group ref={groupRef}>
        {/* Central Aerodynamic Fuselage */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 0.4, 2.0]} />
          <meshStandardMaterial
            color="#0e1726"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Fuselage Wireframe Overlay */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.42, 0.42, 2.02]} />
          <meshBasicMaterial color="#00f0ff" wireframe={true} transparent opacity={0.4} />
        </mesh>

        {/* Glowing Energy Core */}
        <mesh ref={coreRef} position={[0, 0.1, 0]}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshBasicMaterial color="#00f0ff" wireframe={true} />
        </mesh>
        <pointLight position={[0, 0.2, 0]} color="#00f0ff" intensity={2.5} distance={5} />

        {/* Front Optical Gimbal Sensor */}
        <group position={[0, -0.05, 1.1]}>
          <mesh>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#05080f" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.15]}>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* 4 Diagonal Carbon Fiber Rotor Arms */}
        {[
          { pos: [1.3, 0.15, 1.1], rot: [0, Math.PI / 4, 0], ref: rotor1Ref },
          { pos: [-1.3, 0.15, 1.1], rot: [0, -Math.PI / 4, 0], ref: rotor2Ref },
          { pos: [1.3, 0.15, -1.1], rot: [0, -Math.PI / 4, 0], ref: rotor3Ref },
          { pos: [-1.3, 0.15, -1.1], rot: [0, Math.PI / 4, 0], ref: rotor4Ref },
        ].map((arm, i) => (
          <group key={`arm-${i}`} position={arm.pos}>
            {/* Motor Pod */}
            <mesh>
              <cylinderGeometry args={[0.22, 0.22, 0.25, 16]} />
              <meshStandardMaterial color="#1f293d" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Motor Ring Accent */}
            <mesh position={[0, 0.08, 0]}>
              <torusGeometry args={[0.24, 0.02, 8, 24]} rotation={[Math.PI / 2, 0, 0]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
            {/* Propeller Blades */}
            <group ref={arm.ref} position={[0, 0.2, 0]}>
              <mesh>
                <boxGeometry args={[1.5, 0.02, 0.12]} />
                <meshStandardMaterial color="#00f0ff" transparent opacity={0.7} />
              </mesh>
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[1.5, 0.02, 0.12]} />
                <meshStandardMaterial color="#00f0ff" transparent opacity={0.7} />
              </mesh>
            </group>
            {/* Structural Arm Link to Fuselage */}
            <mesh position={[-arm.pos[0] * 0.45, -0.1, -arm.pos[2] * 0.45]}>
              <cylinderGeometry
                args={[0.06, 0.06, 1.5, 8]}
                rotation={[0, 0, Math.PI / 2.3 * (arm.pos[0] > 0 ? -1 : 1)]}
              />
              <meshStandardMaterial color="#0b1120" metalness={0.7} />
            </mesh>
          </group>
        ))}

        {/* 4 Ground All-Terrain Wheels with Suspension Struts */}
        {[
          [-0.9, -0.4, 0.9],
          [0.9, -0.4, 0.9],
          [-0.9, -0.4, -0.9],
          [0.9, -0.4, -0.9],
        ].map((pos, i) => (
          <group key={`wheel-${i}`} position={pos}>
            {/* Wheel Tyre */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
              <meshStandardMaterial color="#111827" roughness={0.9} />
            </mesh>
            {/* Rim Wireframe Accent */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.22, 0.03, 8, 16]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
            {/* Suspension Arm */}
            <mesh position={[0, 0.25, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
              <meshStandardMaterial color="#64748b" metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Orbiting Holographic Telemetry Rings */}
        <group ref={ringsRef} position={[0, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.8, 2.84, 48]} />
            <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.35} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3.2, 3.22, 36]} />
            <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.25} />
          </mesh>
        </group>

        {/* Gyroscopic Inner Ring */}
        <group ref={innerRingRef} position={[0, 0, 0]}>
          <mesh>
            <torusGeometry args={[2.4, 0.015, 8, 48]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
