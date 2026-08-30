import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { WAYPOINTS } from '../data/portfolio';

// Pre-allocated static vectors for zero garbage collection during camera animation
const tempPosA = new THREE.Vector3();
const tempPosB = new THREE.Vector3();
const tempLookA = new THREE.Vector3();
const tempLookB = new THREE.Vector3();
const targetPos = new THREE.Vector3();
const targetLookAt = new THREE.Vector3();
const finalTargetPos = new THREE.Vector3();

// Pre-compute waypoint vectors once
const WAYPOINT_VECTORS = WAYPOINTS.map((wp) => ({
  pos: new THREE.Vector3(...wp.cameraPos),
  lookAt: new THREE.Vector3(...wp.cameraLookAt),
}));

export default function CameraRig({ scrollProgress, reducedMotion }) {
  const { camera, pointer } = useThree();
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

    // Apply subtle mouse parallax
    const parallaxFactor = reducedMotion ? 0.0 : 0.35;
    const mouseOffsetX = pointer.x * parallaxFactor;
    const mouseOffsetY = pointer.y * (parallaxFactor * 0.4);

    finalTargetPos.set(
      targetPos.x + mouseOffsetX,
      targetPos.y + mouseOffsetY,
      targetPos.z
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
