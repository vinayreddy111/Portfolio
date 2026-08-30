import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PCBAndSignalModel({ active }) {
  const pcbGroupRef = useRef();
  const wave1Ref = useRef();
  const wave2Ref = useRef();
  const wave3Ref = useRef();
  const wave4Ref = useRef();
  const antennaRef = useRef();
  const chipGlowRef = useRef();

  useFrame((state, delta) => {
    if (!active) return; // Skip off-screen updates for performance

    const time = state.clock.getElapsedTime();

    // Subtle levitating and tumbling motion
    if (pcbGroupRef.current) {
      pcbGroupRef.current.position.y = 2.5 + Math.sin(time * 1.3) * 0.12;
      pcbGroupRef.current.rotation.x = 0.4 + Math.sin(time * 0.9) * 0.08;
      pcbGroupRef.current.rotation.y = time * 0.35;
      pcbGroupRef.current.rotation.z = Math.sin(time * 1.1) * 0.06;
    }

    // Expanding sinusoidal RF electromagnetic waves
    const animateWave = (mesh, offset) => {
      if (!mesh) return;
      const progress = ((time * 0.8 + offset) % 2) / 2;
      const scale = 0.5 + progress * 3.5;
      mesh.scale.set(scale, scale, scale);
      if (mesh.material) {
        mesh.material.opacity = Math.max(0, 0.8 * (1 - progress));
      }
    };

    animateWave(wave1Ref.current, 0.0);
    animateWave(wave2Ref.current, 0.5);
    animateWave(wave3Ref.current, 1.0);
    animateWave(wave4Ref.current, 1.5);

    // Microcontroller glowing pulse
    if (chipGlowRef.current) {
      const pulse = 1 + Math.sin(time * 6) * 0.05;
      chipGlowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={[-9, 0, -56]} visible={active}>
      {/* Floating Circuit Board Assembly */}
      <group ref={pcbGroupRef} position={[0, 2.5, 0]}>
        {/* PCB Substrate FR-4 Board */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 0.08, 2.2]} />
          <meshStandardMaterial color="#061a10" roughness={0.4} metalness={0.6} />
        </mesh>
        
        {/* Board Edge Gold Chamfer Accent */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.24, 0.09, 2.24]} />
          <meshBasicMaterial color="#00ff66" wireframe={true} transparent opacity={0.4} />
        </mesh>

        {/* Glowing Circuit Trace Pathways (Line Grid Network) */}
        {[
          { pos: [0, 0.05, 0], scale: [2.8, 1, 1.8] },
          { pos: [0.6, 0.05, -0.4], scale: [1.2, 1, 0.8] },
          { pos: [-0.6, 0.05, 0.4], scale: [1.4, 1, 0.9] },
        ].map((trace, i) => (
          <mesh key={`trace-${i}`} position={trace.pos}>
            <planeGeometry args={[trace.scale[0], trace.scale[2], 4, 4]} />
            <meshBasicMaterial
              color="#00ff66"
              wireframe={true}
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Central MCU (ESP32/STM32 QFP Package) */}
        <group ref={chipGlowRef} position={[0, 0.1, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.1, 0.8]} />
            <meshStandardMaterial color="#0d1117" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <planeGeometry args={[0.6, 0.6]} />
            <meshBasicMaterial color="#00ff66" side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, -0.02, 0]}>
            <boxGeometry args={[0.95, 0.02, 0.95]} />
            <meshBasicMaterial color="#eab308" />
          </mesh>
        </group>

        {/* Auxiliary IC Chips */}
        <mesh position={[1.0, 0.08, 0.5]}>
          <boxGeometry args={[0.5, 0.07, 0.4]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[-1.0, 0.08, -0.5]}>
          <boxGeometry args={[0.4, 0.07, 0.6]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[-0.8, 0.08, 0.5]}>
          <boxGeometry args={[0.3, 0.06, 0.3]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>

        {/* Surface Mount Capacitors / Resistors */}
        {[-0.4, -0.2, 0.2, 0.4].map((offset, i) => (
          <group key={`smd-${i}`} position={[offset, 0.06, 0.7]}>
            <mesh>
              <boxGeometry args={[0.1, 0.04, 0.06]} />
              <meshBasicMaterial color="#eab308" />
            </mesh>
          </group>
        ))}

        {/* High-Gain Helical Antenna Array */}
        <group ref={antennaRef} position={[1.2, 0.3, -0.7]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.2, 8]} />
            <meshStandardMaterial color="#eab308" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
            <meshStandardMaterial color="#00ff66" metalness={0.8} />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshBasicMaterial color="#00ff66" />
          </mesh>
          <pointLight position={[0, 1.2, 0]} color="#00ff66" intensity={2.0} distance={5} />
        </group>
      </group>

      {/* Pulsing Concentric RF Sinusoidal Wave Rings in 3D Space */}
      <group position={[0, 3.7, 0]} rotation={[0, 0, 0]}>
        <mesh ref={wave1Ref}>
          <torusGeometry args={[1.5, 0.02, 6, 32]} />
          <meshBasicMaterial color="#00ff66" transparent opacity={0.6} />
        </mesh>
        <mesh ref={wave2Ref}>
          <torusGeometry args={[1.5, 0.02, 6, 32]} />
          <meshBasicMaterial color="#00ff66" transparent opacity={0.4} />
        </mesh>
        <mesh ref={wave3Ref}>
          <torusGeometry args={[1.5, 0.02, 6, 32]} />
          <meshBasicMaterial color="#00ff66" transparent opacity={0.3} />
        </mesh>
        <mesh ref={wave4Ref}>
          <torusGeometry args={[1.5, 0.02, 6, 32]} />
          <meshBasicMaterial color="#00ff66" transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  );
}
