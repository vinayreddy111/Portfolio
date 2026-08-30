import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FPVDroneModel({ active }) {
  const groupRef = useRef();
  const prop1Ref = useRef();
  const prop2Ref = useRef();
  const prop3Ref = useRef();
  const prop4Ref = useRef();
  const radarRef = useRef();
  const blip1Ref = useRef();
  const blip2Ref = useRef();
  const blip3Ref = useRef();

  useFrame((state, delta) => {
    if (!active) return; // Skip off-screen updates for performance

    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Dynamic banking/yawing FPV drone flight motion
      groupRef.current.position.y = 1.2 + Math.sin(time * 2.0) * 0.18;
      groupRef.current.rotation.x = 0.2 + Math.sin(time * 1.4) * 0.08;
      groupRef.current.rotation.z = Math.sin(time * 1.8) * 0.15;
      groupRef.current.rotation.y = -0.3 + Math.sin(time * 0.9) * 0.2;
    }

    // High RPM propeller rotation
    const propSpeed = 40;
    if (prop1Ref.current) prop1Ref.current.rotation.y += propSpeed * delta;
    if (prop2Ref.current) prop2Ref.current.rotation.y -= propSpeed * delta;
    if (prop3Ref.current) prop3Ref.current.rotation.y -= propSpeed * delta;
    if (prop4Ref.current) prop4Ref.current.rotation.y += propSpeed * delta;

    // 3D Radar Sweep disk rotation
    if (radarRef.current) {
      radarRef.current.rotation.z = -time * 1.2;
    }

    // Target blips pulsing
    if (blip1Ref.current) {
      const s = 0.8 + Math.sin(time * 4) * 0.3;
      blip1Ref.current.scale.set(s, s, s);
    }
    if (blip2Ref.current) {
      const s = 0.8 + Math.sin(time * 4 + 2) * 0.3;
      blip2Ref.current.scale.set(s, s, s);
    }
    if (blip3Ref.current) {
      const s = 0.8 + Math.sin(time * 4 + 4) * 0.3;
      blip3Ref.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[-10, 0, -18]} visible={active}>
      {/* Tactical FPV Airframe Group */}
      <group ref={groupRef} position={[0, 1.2, 0]}>
        {/* Carbon Fiber X-Frame Base Plate */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.7, 0.08, 1.4]} />
          <meshStandardMaterial color="#1a2016" metalness={0.8} roughness={0.3} />
        </mesh>
        
        {/* Top Plate */}
        <mesh position={[0, 0.3, 0.1]}>
          <boxGeometry args={[0.6, 0.06, 1.2]} />
          <meshStandardMaterial color="#1a2016" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Tactical Corner Standoffs (4 Aluminum Columns) */}
        {[
          [-0.25, 0.15, 0.4],
          [0.25, 0.15, 0.4],
          [-0.25, 0.15, -0.2],
          [0.25, 0.15, -0.2],
        ].map((pos, i) => (
          <mesh key={`standoff-${i}`} position={pos}>
            <cylinderGeometry args={[0.02, 0.02, 0.28, 8]} />
            <meshStandardMaterial color="#84cc16" metalness={0.9} />
          </mesh>
        ))}

        {/* 4 Carbon Fiber Motor Arms (True-X Layout) */}
        {[
          { pos: [1.1, 0, 0.9], rot: [0, Math.PI / 4, 0], ref: prop1Ref },
          { pos: [-1.1, 0, 0.9], rot: [0, -Math.PI / 4, 0], ref: prop2Ref },
          { pos: [1.1, 0, -0.9], rot: [0, -Math.PI / 4, 0], ref: prop3Ref },
          { pos: [-1.1, 0, -0.9], rot: [0, Math.PI / 4, 0], ref: prop4Ref },
        ].map((arm, i) => (
          <group key={`fpv-arm-${i}`}>
            {/* Carbon Fiber Arm Tube */}
            <mesh position={[arm.pos[0] * 0.5, 0, arm.pos[2] * 0.5]} rotation={[0, arm.rot[1], 0]}>
              <boxGeometry args={[0.15, 0.08, 1.3]} />
              <meshStandardMaterial color="#0f140f" metalness={0.9} />
            </mesh>

            {/* Brushless 2207 Motor Bell */}
            <group position={arm.pos}>
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.18, 16]} />
                <meshStandardMaterial color="#2d3a24" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Motor Stator Windings Glow Accent */}
              <mesh position={[0, 0.05, 0]}>
                <torusGeometry args={[0.21, 0.02, 8, 16]} rotation={[Math.PI / 2, 0, 0]} />
                <meshBasicMaterial color="#84cc16" />
              </mesh>

              {/* Tri-Blade Freestyle Propeller */}
              <group ref={arm.ref} position={[0, 0.22, 0]}>
                <mesh>
                  <boxGeometry args={[1.3, 0.015, 0.1]} />
                  <meshStandardMaterial color="#84cc16" transparent opacity={0.8} />
                </mesh>
                <mesh rotation={[0, Math.PI / 3, 0]}>
                  <boxGeometry args={[1.3, 0.015, 0.1]} />
                  <meshStandardMaterial color="#84cc16" transparent opacity={0.8} />
                </mesh>
                <mesh rotation={[0, -Math.PI / 3, 0]}>
                  <boxGeometry args={[1.3, 0.015, 0.1]} />
                  <meshStandardMaterial color="#84cc16" transparent opacity={0.8} />
                </mesh>
              </group>
            </group>
          </group>
        ))}

        {/* Tilted FPV Camera (40-degree up-tilt) */}
        <group position={[0, 0.15, 0.75]} rotation={[-0.45, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial color="#1a2016" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.14]}>
            <cylinderGeometry args={[0.09, 0.09, 0.08, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#00ff66" metalness={0.9} roughness={0.1} />
          </mesh>
          <pointLight position={[0, 0, 0.2]} color="#84cc16" intensity={1.2} distance={3} />
        </group>

        {/* 6S LiPo Battery Block on Top */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.45, 0.3, 0.8]} />
          <meshStandardMaterial color="#2d3748" metalness={0.5} roughness={0.6} />
        </mesh>
        {/* Battery Strap */}
        <mesh position={[0, 0.51, 0]}>
          <boxGeometry args={[0.48, 0.32, 0.15]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>

        {/* Vertical VTX Antenna (Lollipop / Omni) */}
        <group position={[0, 0.4, -0.6]} rotation={[-0.3, 0, 0]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
            <meshStandardMaterial color="#1a2016" />
          </mesh>
          <mesh position={[0, 0.42, 0]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshBasicMaterial color="#84cc16" />
          </mesh>
        </group>

        {/* Flight Controller Stack LED Status Indicators */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.35, 0.1, 0.35]} />
          <meshStandardMaterial color="#0b120c" />
        </mesh>
        <pointLight position={[0, 0.2, 0]} color="#84cc16" intensity={1.5} distance={4} />
      </group>

      {/* Rotating 3D Tactical Radar Sweep Disk & Distance Grids on Ground */}
      <group position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Outer Distance Concentric Rings */}
        <mesh>
          <ringGeometry args={[3.8, 3.84, 48]} />
          <meshBasicMaterial color="#84cc16" side={THREE.DoubleSide} transparent opacity={0.4} />
        </mesh>
        <mesh>
          <ringGeometry args={[2.5, 2.53, 36]} />
          <meshBasicMaterial color="#84cc16" side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>
        <mesh>
          <ringGeometry args={[1.2, 1.22, 24]} />
          <meshBasicMaterial color="#84cc16" side={THREE.DoubleSide} transparent opacity={0.2} />
        </mesh>

        {/* Crosshair Grids */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={8}
              array={new Float32Array([
                -4, 0, 0,  4, 0, 0,
                0, -4, 0,  0, 4, 0,
                -2.8, -2.8, 0,  2.8, 2.8, 0,
                -2.8, 2.8, 0,  2.8, -2.8, 0,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#84cc16" transparent opacity={0.15} />
        </lineSegments>

        {/* Rotating Radar Sweep Cone Sector */}
        <group ref={radarRef}>
          <mesh position={[0, 0, 0.01]}>
            <circleGeometry args={[3.8, 24, 0, Math.PI / 3]} />
            <meshBasicMaterial color="#84cc16" transparent opacity={0.18} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[1.8, 0, 0.02]}>
            <boxGeometry args={[3.8, 0.04, 0.01]} />
            <meshBasicMaterial color="#84cc16" transparent opacity={0.7} />
          </mesh>
        </group>

        {/* Target Blips */}
        <mesh ref={blip1Ref} position={[2.2, 1.5, 0.05]}>
          <circleGeometry args={[0.12, 12]} />
          <meshBasicMaterial color="#eab308" side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={blip2Ref} position={[-1.8, 2.1, 0.05]}>
          <circleGeometry args={[0.1, 12]} />
          <meshBasicMaterial color="#eab308" side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={blip3Ref} position={[-2.4, -1.2, 0.05]}>
          <circleGeometry args={[0.09, 12]} />
          <meshBasicMaterial color="#84cc16" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
