import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { WAYPOINTS } from '../data/portfolio';

// Pre-allocated reusable THREE.Color objects for zero GC per frame
const tempColorA = new THREE.Color();
const tempColorB = new THREE.Color();
const targetFogColor = new THREE.Color();
const targetGridColor = new THREE.Color();
const targetAmbientColor = new THREE.Color();

export default function EnvironmentController({ scrollProgress, activeWaypointIndex, reducedMotion }) {
  const { scene } = useThree();
  const ambientLightRef = useRef();
  const dirLightRef = useRef();
  const gridHelperRef = useRef();
  const particlesRef = useRef();

  // Floating volumetric particle field (capped to 200 for optimal 60fps performance)
  const particleCount = reducedMotion ? 60 : 200;
  const { particlePositions, particleColors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 25 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120 - 30;

      colors[i * 3] = 0.4 + Math.random() * 0.6;
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
    }
    return { particlePositions: positions, particleColors: colors };
  }, [particleCount]);

  // Setup fog once on mount
  useMemo(() => {
    scene.fog = new THREE.Fog(
      WAYPOINTS[0].theme.fogColor,
      WAYPOINTS[0].theme.fogNear,
      WAYPOINTS[0].theme.fogFar
    );
  }, [scene]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Throttled per-frame color & fog interpolation driven smoothly by scroll progress
    const numSegments = WAYPOINTS.length - 1;
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    const segment = clampedProgress * numSegments;
    const lowerIndex = Math.floor(segment);
    const upperIndex = Math.min(numSegments, lowerIndex + 1);
    const factor = segment - lowerIndex;

    const themeA = WAYPOINTS[lowerIndex].theme;
    const themeB = WAYPOINTS[upperIndex].theme;

    tempColorA.set(themeA.fogColor);
    tempColorB.set(themeB.fogColor);
    targetFogColor.copy(tempColorA).lerp(tempColorB, factor);

    tempColorA.set(themeA.gridColor);
    tempColorB.set(themeB.gridColor);
    targetGridColor.copy(tempColorA).lerp(tempColorB, factor);

    tempColorA.set(themeA.ambientColor);
    tempColorB.set(themeB.ambientColor);
    targetAmbientColor.copy(tempColorA).lerp(tempColorB, factor);

    const targetNear = THREE.MathUtils.lerp(themeA.fogNear, themeB.fogNear, factor);
    const targetFar = THREE.MathUtils.lerp(themeA.fogFar, themeB.fogFar, factor);
    const targetAmbientIntensity = THREE.MathUtils.lerp(themeA.ambientIntensity, themeB.ambientIntensity, factor);

    // Apply smooth frame updates
    if (scene.fog) {
      scene.fog.color.lerp(targetFogColor, delta * 3.5);
      scene.fog.near = THREE.MathUtils.damp(scene.fog.near, targetNear, 3.5, delta);
      scene.fog.far = THREE.MathUtils.damp(scene.fog.far, targetFar, 3.5, delta);
    }

    if (ambientLightRef.current) {
      ambientLightRef.current.color.lerp(targetAmbientColor, delta * 3.5);
      ambientLightRef.current.intensity = THREE.MathUtils.damp(
        ambientLightRef.current.intensity,
        targetAmbientIntensity,
        3.5,
        delta
      );
    }

    if (gridHelperRef.current && gridHelperRef.current.material) {
      gridHelperRef.current.material.color.lerp(targetGridColor, delta * 3.5);
    }

    if (particlesRef.current && !reducedMotion) {
      particlesRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.8} />
      <directionalLight
        ref={dirLightRef}
        position={[20, 30, 20]}
        intensity={1.2}
        color="#ffffff"
      />

      {/* Cyber Grid Floor */}
      <group position={[0, -0.6, -30]}>
        <gridHelper
          ref={gridHelperRef}
          args={[140, 60, 0x00f0ff, 0x1f293d]}
          position={[0, 0, 0]}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
          <planeGeometry args={[160, 160]} />
          <meshStandardMaterial
            color="#05080e"
            roughness={0.85}
            metalness={0.4}
          />
        </mesh>
      </group>

      {/* Volumetric Floating Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleColors.length / 3}
            array={particleColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  );
}
