import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraRig from './CameraRig';
import EnvironmentController from './EnvironmentController';
import HybridDroneRoverModel from './models/HybridDroneRoverModel';
import FPVDroneModel from './models/FPVDroneModel';
import RoverGroundModel from './models/RoverGroundModel';
import PCBAndSignalModel from './models/PCBAndSignalModel';
import ConstellationModel from './models/ConstellationModel';
import SatelliteBeaconModel from './models/SatelliteBeaconModel';

export default function SceneCanvas({ scrollProgress, activeWaypointIndex, reducedMotion }) {
  // Compute active visibility for each waypoint model to pause off-screen updates and draw calls
  const isHeroActive = activeWaypointIndex <= 1;
  const isAerialActive = Math.abs(activeWaypointIndex - 1) <= 1;
  const isGroundActive = Math.abs(activeWaypointIndex - 2) <= 1;
  const isSignalActive = Math.abs(activeWaypointIndex - 3) <= 1;
  const isSkillsActive = Math.abs(activeWaypointIndex - 4) <= 1;
  const isContactActive = Math.abs(activeWaypointIndex - 5) <= 1;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={reducedMotion ? [1, 1] : [1, 1.5]}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <CameraRig scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
          <EnvironmentController
            scrollProgress={scrollProgress}
            activeWaypointIndex={activeWaypointIndex}
            reducedMotion={reducedMotion}
          />

          {/* Persistent 3D Scene Graph Models with Off-Screen Update Pausing */}
          <HybridDroneRoverModel active={isHeroActive} />
          <FPVDroneModel active={isAerialActive} />
          <RoverGroundModel active={isGroundActive} />
          <PCBAndSignalModel active={isSignalActive} />
          <ConstellationModel active={isSkillsActive} />
          <SatelliteBeaconModel active={isContactActive} />
        </Suspense>
      </Canvas>
    </div>
  );
}
