import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ConstellationModel({ active }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (!active) return; // Skip off-screen updates for performance

    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15;
    }

    if (ring1Ref.current) ring1Ref.current.rotation.x = time * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.y = time * 0.4;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.25;

    if (coreRef.current) {
      const s = 1 + Math.sin(time * 2) * 0.1;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 3, -28]} visible={active}>
      <group ref={groupRef}>
        {/* Central Icosahedron Core */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.6, 0]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.9}
            roughness={0.1}
            wireframe={true}
          />
        </mesh>
        
        {/* Inner Glowing Crystal */}
        <mesh>
          <octahedronGeometry args={[0.9, 0]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <pointLight color="#38bdf8" intensity={2.5} distance={12} />

        {/* Multi-Axis Orbital Tech Rings */}
        <group ref={ring1Ref}>
          <mesh>
            <torusGeometry args={[3.2, 0.03, 6, 36]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
          </mesh>
        </group>

        <group ref={ring2Ref}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[4.2, 0.025, 6, 36]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.4} />
          </mesh>
        </group>

        <group ref={ring3Ref}>
          <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
            <torusGeometry args={[5.2, 0.02, 6, 36]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
          </mesh>
        </group>

        {/* Orbiting Satellite Data Nodes */}
        {[
          { pos: [3.2, 0, 0], col: "#84cc16" },
          { pos: [-3.2, 0, 0], col: "#f59e0b" },
          { pos: [0, 3.2, 0], col: "#00ff66" },
          { pos: [0, -3.2, 0], col: "#38bdf8" },
        ].map((node, i) => (
          <group key={`node-${i}`} position={node.pos}>
            <mesh>
              <dodecahedronGeometry args={[0.25, 0]} />
              <meshBasicMaterial color={node.col} wireframe={true} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.1, 6, 6]} />
              <meshBasicMaterial color={node.col} />
            </mesh>
          </group>
        ))}

        {/* Volumetric Data Beam Lines Connecting Models */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={8}
              array={new Float32Array([
                0, 0, 0,  -10, -2, 10,
                0, 0, 0,  12, -2, -8,
                0, 0, 0,  -9, -1, -28,
                0, 0, 0,  0, -2, -47,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.3} />
        </lineSegments>
      </group>
    </group>
  );
}
