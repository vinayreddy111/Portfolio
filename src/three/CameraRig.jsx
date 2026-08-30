import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { WAYPOINTS } from '../data/portfolio';

// Pre-allocated static vectors for zero garbage collection during camera animation
const targetPos = new THREE.Vector3();
const targetLookAt = new THREE.Vector3();
const finalTargetPos = new THREE.Vector3();

// Pre-compute waypoint vectors once
const WAYPOINT_VECTORS = WAYPOINTS.map((wp) => ({
  pos: new THREE.Vector3(...wp.cameraPos),
  lookAt: new THREE.Vector3(...wp.cameraLookAt),
}));

export default function CameraRig({ scrollProgress, reducedMotion }) {
  const { camera, pointer, size } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0.2, 0));
  const currentCamPos = useRef(new THREE.Vector3(0, 2, 8));

  useFrame((state, delta) => {
    const numWaypoints = WAYPOINT_VECTORS.length;
    const maxIndex = numWaypoints - 1;
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    const exactIndex = clampedProgress * maxIndex;
    const indexA = Math.floor(exactIndex);
    const indexB = Math.min(maxIndex, indexA + 1);
    const alpha = exactIndex - indexA;

    const wpA = WAYPOINT_VECTORS[indexA];
    const wpB = WAYPOINT_VECTORS[indexB];

    targetPos.copy(wpA.pos).lerp(wpB.pos, alpha);
    targetLookAt.copy(wpA.lookAt).lerp(wpB.lookAt, alpha);

    // Responsive Mobile Camera Adaptation: Adjust FOV/Distance for narrow screens
    const isMobile = size.width < 768;
    const isSmallMobile = size.width < 480;
    
    // Scale distance slightly on mobile so models fit in portrait view
    const mobileZMultiplier = isSmallMobile ? 1.3 : isMobile ? 1.18 : 1.0;
    const mobileYShift = isMobile ? 0.35 : 0.0;

    // Apply subtle mouse / gyroscope parallax (disabled if reduced motion or mobile)
    const parallaxFactor = (reducedMotion || isMobile) ? 0.0 : 0.35;
    const mouseOffsetX = pointer.x * parallaxFactor;
    const mouseOffsetY = pointer.y * (parallaxFactor * 0.4);

    finalTargetPos.set(
      targetPos.x + mouseOffsetX,
      targetPos.y + mouseOffsetY + mobileYShift,
      targetPos.z > 0 ? targetPos.z * mobileZMultiplier : targetPos.z - (mobileZMultiplier - 1.0) * 8
    );

    // Frame smoothing
    const smoothFactor = reducedMotion ? 6 : 3.8;
    currentCamPos.current.lerp(finalTargetPos, delta * smoothFactor);
    currentLookAt.current.lerp(targetLookAt, delta * smoothFactor);

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
