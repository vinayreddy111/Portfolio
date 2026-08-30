import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RoverGroundModel({ active }) {
  const roverGroupRef = useRef();
  const lidarRef = useRef();
  const lidarBeamRef = useRef();
  const hexapodRef = useRef();
  const armJoint1Ref = useRef();
  const armJoint2Ref = useRef();
  const armJoint3Ref = useRef();
  const armClawLeftRef = useRef();
  const armClawRightRef = useRef();

  // Create optimized point cloud particles for LiDAR scan (capped to 80 points for high fps)
  const pointCloudPoints = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.1;
      const radius = 2.2 + Math.sin(angle * 5) * 0.6 + Math.random() * 0.4;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!active) return; // Skip off-screen updates for performance

    const time = state.clock.getElapsedTime();

    // High speed spinning LiDAR turret
    if (lidarRef.current) {
      lidarRef.current.rotation.y += 18 * delta;
    }

    // LiDAR laser beam pulse
    if (lidarBeamRef.current) {
      lidarBeamRef.current.rotation.y = time * 8;
      const s = 1 + Math.sin(time * 6) * 0.05;
      lidarBeamRef.current.scale.set(s, 1, s);
    }

    // Rover subtle engine vibration
    if (roverGroupRef.current) {
      roverGroupRef.current.position.y = Math.sin(time * 5) * 0.01;
    }

    // Hexapod spider leg walking animation
    if (hexapodRef.current) {
      hexapodRef.current.position.y = Math.sin(time * 3) * 0.05;
      hexapodRef.current.rotation.y = -0.4 + Math.sin(time * 0.8) * 0.1;
    }

    // 6-DOF Robotic Arm kinematic articulation
    if (armJoint1Ref.current) {
      armJoint1Ref.current.rotation.y = Math.sin(time * 0.7) * 0.6;
    }
    if (armJoint2Ref.current) {
      armJoint2Ref.current.rotation.z = -0.4 + Math.sin(time * 1.1) * 0.3;
    }
    if (armJoint3Ref.current) {
      armJoint3Ref.current.rotation.z = 0.6 + Math.cos(time * 1.1) * 0.35;
    }
    if (armClawLeftRef.current && armClawRightRef.current) {
      const pinch = Math.sin(time * 2.5) * 0.08;
      armClawLeftRef.current.position.x = 0.08 + pinch;
      armClawRightRef.current.position.x = -0.08 - pinch;
    }
  });

  return (
    <group position={[12, 0, -36]} visible={active}>
      {/* ========================================================= */}
      {/* 1. AUTONOMOUS 6-WHEEL ROVER (CENTRAL)                    */}
      {/* ========================================================= */}
      <group ref={roverGroupRef} position={[0, 0, 0]}>
        {/* Heavy-Duty Armored Chassis */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[1.6, 0.5, 2.6]} />
          <meshStandardMaterial color="#1f242d" metalness={0.7} roughness={0.4} />
        </mesh>
        
        {/* Chassis Wireframe / Hazard Highlights */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[1.62, 0.52, 2.62]} />
          <meshBasicMaterial color="#f59e0b" wireframe={true} transparent opacity={0.3} />
        </mesh>

        {/* Hazard Stripes Plate on Front/Back */}
        <mesh position={[0, 0.65, 1.32]}>
          <boxGeometry args={[1.2, 0.2, 0.04]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        <mesh position={[0, 0.65, -1.32]}>
          <boxGeometry args={[1.2, 0.2, 0.04]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>

        {/* Raspberry Pi / Perception Compute Module Enclosure */}
        <mesh position={[0, 0.95, -0.3]}>
          <boxGeometry args={[0.9, 0.25, 1.1]} />
          <meshStandardMaterial color="#111827" metalness={0.8} />
        </mesh>

        {/* Status LED Bar */}
        <mesh position={[0, 0.95, 0.28]}>
          <boxGeometry args={[0.7, 0.06, 0.04]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>

        {/* 360° LiDAR Sensor Mount Tower */}
        <group position={[0, 1.15, 0.5]}>
          {/* Base Standoff Column */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 0.2, 12]} />
            <meshStandardMaterial color="#374151" metalness={0.9} />
          </mesh>

          {/* Spinning LiDAR Turret */}
          <group ref={lidarRef} position={[0, 0.3, 0]}>
            <mesh>
              <cylinderGeometry args={[0.22, 0.22, 0.22, 12]} />
              <meshStandardMaterial color="#0b0f17" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Optical Laser Emitter Aperture */}
            <mesh position={[0, 0, 0.12]}>
              <boxGeometry args={[0.12, 0.06, 0.06]} />
              <meshBasicMaterial color="#00ff66" />
            </mesh>
            <pointLight position={[0, 0, 0.2]} color="#00ff66" intensity={1.5} distance={4} />
          </group>

          {/* Active LiDAR Laser Scan Cone / Fan Wave */}
          <group ref={lidarBeamRef} position={[0, 0.3, 0]}>
            <mesh rotation={[0, 0, 0]}>
              <ringGeometry args={[0.4, 3.5, 24, 1, 0, Math.PI / 4]} />
              <meshBasicMaterial color="#00ff66" side={THREE.DoubleSide} transparent opacity={0.2} />
            </mesh>
            <mesh rotation={[Math.PI, 0, 0]}>
              <ringGeometry args={[0.4, 3.5, 24, 1, 0, Math.PI / 4]} />
              <meshBasicMaterial color="#00ff66" side={THREE.DoubleSide} transparent opacity={0.2} />
            </mesh>
          </group>

          {/* LiDAR Point Cloud Particles */}
          <points position={[0, 0.2, 0]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={pointCloudPoints.length / 3}
                array={pointCloudPoints}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial size={0.06} color="#00ff66" transparent opacity={0.8} />
          </points>
        </group>

        {/* 6 Rugged All-Terrain Wheels with Deep Tread */}
        {[
          [-1.0, 0.35, 0.9],
          [1.0, 0.35, 0.9],
          [-1.0, 0.35, 0],
          [1.0, 0.35, 0],
          [-1.0, 0.35, -0.9],
          [1.0, 0.35, -0.9],
        ].map((pos, i) => (
          <group key={`rover-wheel-${i}`} position={pos}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.38, 0.38, 0.3, 12]} />
              <meshStandardMaterial color="#0f172a" roughness={0.9} />
            </mesh>
            {/* Outer Hazard Rim */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.26, 0.03, 6, 12]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
            {/* Heavy Axle Hub */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.36, 8]} />
              <meshStandardMaterial color="#64748b" metalness={0.9} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================= */}
      {/* 2. HEXAPOD SPIDER ROBOT (POSITIONED TO THE LEFT)          */}
      {/* ========================================================= */}
      <group ref={hexapodRef} position={[-3.5, 0.3, 0]}>
        {/* Hexagonal Central Body */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.2, 6]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.21, 6]} />
          <meshBasicMaterial color="#f59e0b" wireframe={true} transparent opacity={0.4} />
        </mesh>

        {/* 6 Articulated Spider Legs */}
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = (index / 6) * Math.PI * 2;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          return (
            <group key={`hex-leg-${index}`} position={[cos * 0.55, 0.25, sin * 0.55]} rotation={[0, -angle, 0]}>
              <mesh position={[0.2, 0, 0]}>
                <boxGeometry args={[0.3, 0.08, 0.08]} />
                <meshStandardMaterial color="#475569" />
              </mesh>
              <mesh position={[0.45, 0.15, 0]} rotation={[0, 0, 0.5]}>
                <boxGeometry args={[0.4, 0.06, 0.06]} />
                <meshStandardMaterial color="#f59e0b" />
              </mesh>
              <mesh position={[0.7, -0.15, 0]} rotation={[0, 0, -0.8]}>
                <boxGeometry args={[0.55, 0.05, 0.05]} />
                <meshStandardMaterial color="#334155" metalness={0.9} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ========================================================= */}
      {/* 3. 6-DOF ARTICULATED ROBOTIC ARM (TO THE RIGHT)           */}
      {/* ========================================================= */}
      <group position={[3.5, 0, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.6, 0.7, 0.3, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>

        {/* Joint 1: Base Turntable (Yaw) */}
        <group ref={armJoint1Ref} position={[0, 0.3, 0]}>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.2, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>

          {/* Joint 2: Shoulder (Pitch) */}
          <group ref={armJoint2Ref} position={[0, 0.3, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.35, 12]} />
              <meshStandardMaterial color="#f59e0b" />
            </mesh>

            <mesh position={[0, 0.6, 0]}>
              <boxGeometry args={[0.18, 1.1, 0.18]} />
              <meshStandardMaterial color="#1e293b" metalness={0.7} />
            </mesh>

            {/* Joint 3: Elbow (Pitch) */}
            <group ref={armJoint3Ref} position={[0, 1.15, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.16, 0.16, 0.3, 12]} />
                <meshStandardMaterial color="#f59e0b" />
              </mesh>

              <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[0.14, 0.9, 0.14]} />
                <meshStandardMaterial color="#334155" metalness={0.7} />
              </mesh>

              {/* Joint 4/5: Wrist Assembly */}
              <group position={[0, 0.95, 0]}>
                <mesh>
                  <sphereGeometry args={[0.14, 10, 10]} />
                  <meshStandardMaterial color="#f59e0b" />
                </mesh>

                {/* Joint 6: 2-Jaw Gripper End-Effector */}
                <group position={[0, 0.18, 0]}>
                  <mesh>
                    <boxGeometry args={[0.3, 0.06, 0.12]} />
                    <meshStandardMaterial color="#0f172a" />
                  </mesh>

                  <mesh ref={armClawLeftRef} position={[0.08, 0.12, 0]}>
                    <boxGeometry args={[0.04, 0.2, 0.08]} />
                    <meshBasicMaterial color="#f59e0b" />
                  </mesh>

                  <mesh ref={armClawRightRef} position={[-0.08, 0.12, 0]}>
                    <boxGeometry args={[0.04, 0.2, 0.08]} />
                    <meshBasicMaterial color="#f59e0b" />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
