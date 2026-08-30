# K Vinay Reddy — Robotics Engineer 3D Portfolio

An immersive, fully 3D interactive portfolio website for **K Vinay Reddy** (Robotics Engineer — UAV Systems & Autonomous Machines).

Built from the ground up as a continuous 3D camera flythrough across 6 military/tactical mission control waypoints, featuring persistent WebGL rendering, dynamic environment theme-morphing, procedural wireframe robotics models, interactive skills matrix, and deep-dive technical HUD inspection overlays.

---

## 🚀 Live Tech Stack

- **Core Framework**: React 18 + Vite
- **3D Graphics & Canvas**: Three.js via `@react-three/fiber` and `@react-three/drei`
- **UI Chrome & Styling**: Tailwind CSS with custom tactical HUD palettes and scanline animations
- **Motion & Micro-interactions**: Framer Motion
- **Icons**: Lucide React + custom inline tactical vector SVGs
- **Tactical Audio**: Procedural Web Audio API synthesizer (no external audio files needed)
- **Data Layer**: Centralized structured schema in `src/data/portfolio.js`

---

## 🛰️ 3D Waypoint Architecture & Zones

1. **Waypoint 0: MISSION CONTROL (Hero)**
   - **3D Scene**: Rotating procedural wireframe Hybrid Drone/Rover model with 4 spinning carbon rotors, hovering levitation, optical gimbal, and concentric holographic gyroscopic telemetry rings.
   - **Theme**: Carbon-fiber dark void (`#080a0f`) with Cyan glow accents (`#00f0ff`).
   - **UI**: Callsign badge (`KVR-01`), status indicators (`STATUS: ACTIVE // LOC: ON-GRID`), quick stats counters, and `DEPLOY MISSION` action buttons.

2. **Waypoint 1: AERIAL OPERATIONS**
   - **3D Scene**: High-speed tactical FPV racing quadcopter airframe, 4 brushless motors with tri-blade props, tilted FPV camera, 6S LiPo battery, vertical VTX antenna, and rotating 3D Radar Sweep disk with tactical target blips.
   - **Theme**: Military Tactical HUD (Olive / Lime Green `#84cc16`, Radar Amber `#eab308`).
   - **Projects**:
     - *FPV Drone Development* (10+ custom builds, Betaflight, ArduPilot, Fusion 360, **9 National FPV Competition Wins** trophy badge).
     - *VTOL UAV Development (Team Contribution)* (Multirotor + fixed-wing hybrid transition logic).
     - *Fixed-Wing UAV Operations* (Aerodynamic cruise efficiency, stability tuning, long-range patrol).

3. **Waypoint 2: GROUND OPERATIONS**
   - **3D Scene**: Autonomous 6-wheel heavy-duty rover with active spinning 360° LiDAR turret emitting green laser scan fan rings and dynamic point-cloud particles, flanked by an 18-DOF Hexapod Spider Robot and an articulated 6-DOF Robotic Arm.
   - **Theme**: Rugged Industrial Blueprint (Hazard Amber `#f59e0b`, Brushed Steel `#94a3b8`).
   - **Projects**:
     - *Autonomous Rover (LiDAR-Based Navigation)* (Raspberry Pi perception, SLAM mapping, OpenCV obstacle avoidance).
     - *Hexapod Robot (Spider Robot)* (18-servo multi-legged robot, inverse kinematics solver, tripod gait planning).
     - *6-DOF Robotic Arm* (6-axis articulated manipulator, servo forward kinematics, multi-axis precision motion).

4. **Waypoint 3: SIGNAL OPERATIONS**
   - **3D Scene**: Floating multi-layer circuit board (PCB) with glowing green trace pathways, microcontrollers, high-gain antenna array, and animated expanding sinusoidal RF electromagnetic wave rings.
   - **Theme**: Hacker / Terminal CRT Scanlines (Matrix Green `#00ff66`, Signal Cyan `#06b6d4`).
   - **Projects**:
     - *Voice-Controlled Home Automation System* (Edge speech recognition, NLP intent parsing, Wi-Fi/Bluetooth IoT mesh).
     - *RF Interference Analysis System* (Multi-band wireless propagation, RF interference analysis, antenna design).

5. **Waypoint 4: TECH CORES & ACADEMIC DOSSIER**
   - **3D Scene**: Wide vantage high command constellation core with multi-axis orbital rings and volumetric data beams connecting all previous subsystems.
   - **Theme**: Blueprint Grid Slate (`#38bdf8`, `#818cf8`).
   - **Content**:
     - **Complete 27-Skill Matrix** with interactive category filtering (`Avionics & UAV`, `Robotics & Kinematics`, `Embedded & Hardware`, `Software & Vision`, `CAD & Mechanical`), proficiency bars, and telemetry inspection panel.
     - **Education Timeline**: Lovely Professional University (B.Tech Robotics & Automation 2nd year ongoing), Narayana PU College (12th Grade), St. Xavier's School (10th Grade CBSE).
     - **Languages**: Telugu (Native), English (Fluent), Hindi (Fluent).

6. **Waypoint 5: MISSION TRANSMIT (Contact)**
   - **3D Scene**: Orbital communications satellite terminal beacon with high-gain parabolic dish, solar arrays, and pulsing transmission spherical wave rings.
   - **Theme**: Mission Cyan Beacon (`#00f0ff`, `#f43f5e`).
   - **Content**:
     - HUD Contact Buttons with instant copy & direct links for Email (`kvrredy11@gmail.com`), Phone (`+91 9900583305`), LinkedIn (`linkedin.com/in/k-vinay-reddy-`), and Location (`Bangalore, Karnataka`).
     - Tactical Transmission Message Form with encryption animation and feedback.
     - Live system telemetry footer.

---

## 📋 Complete Content Verification Checklist

- [x] **Bug Fix Pass 1 (Stray Comments Cleaned)**: Zero comment syntax or leaked raw text in JSX/DOM across all 6 waypoints, modals, and tooltips.
- [x] **Bug Fix Pass 2 (60 FPS Performance Optimizations)**:
  - Off-screen model `useFrame` updates and WebGL draw calls paused when distant (`visible={active}`).
  - Instanced / BufferGeometry particles capped to optimal counts (80 LiDAR points, 200 starfield points).
  - Throttled environment interpolation inside `useFrame` using static zero-GC color vectors.
  - Shadow calculations disabled (`shadowMap: { enabled: false }`).
  - Device Pixel Ratio capped (`dpr={[1, 1.5]}` on standard, `[1, 1]` on performance mode).
  - Manual Performance / Reduced Motion toggle supported directly from top HUD.
- [x] **Hero Identity**: K Vinay Reddy, Robotics Engineer — UAV Systems & Autonomous Machines
- [x] **Status & Callsign**: `CALLSIGN: KVR-01`, `STATUS: ACTIVE // LOC: ON-GRID`
- [x] **Aerial Project 1**: FPV Drone Development (10+ builds, Betaflight, ArduPilot, ESC/propulsion tuning, Fusion 360, **9 National FPV Competition Wins**)
- [x] **Aerial Project 2**: VTOL UAV Development (Team Contribution) (Multirotor + fixed-wing hybrid, flight mode transitions)
- [x] **Aerial Project 3**: Fixed-Wing UAV Operations (Aerodynamics, flight stability, hands-on flight ops)
- [x] **Ground Project 1**: Autonomous Rover (LiDAR-Based Navigation) (Raspberry Pi, SLAM, OpenCV sensor fusion, obstacle avoidance)
- [x] **Ground Project 2**: Hexapod Robot (Spider Robot) (18-servo multi-legged robot, inverse kinematics, gait planning)
- [x] **Ground Project 3**: 6-DOF Robotic Arm (6-DOF manipulator, servo actuation, forward kinematics, multi-axis control)
- [x] **Signal Project 1**: Voice-Controlled Home Automation System (Speech recognition, NLP, Wi-Fi/Bluetooth appliance control)
- [x] **Signal Project 2**: RF Interference Analysis System (RF behavior, signal propagation, interference analysis, antenna design)
- [x] **All 27 Skills Present**:
  - *Avionics & UAV*: FPV Drone Development, Betaflight, ArduPilot, UAV Tuning, Flight Testing, Fixed-Wing UAVs, VTOL Systems, Flight Controller Configuration, ESC Tuning, Propulsion Systems.
  - *Robotics & Kinematics*: Forward Kinematics, Inverse Kinematics, Gait Planning, PID Control, Path Planning, SLAM (Basics).
  - *Embedded & Hardware*: Raspberry Pi, Arduino, Sensor Integration, Motor Drivers, UART, PWM, DShot (Basic), Wi-Fi Communication, Bluetooth Communication.
  - *Software & Vision*: C, Python, OpenCV (Basics).
  - *CAD & Mechanical Design*: Fusion 360, AutoCAD, Creo.
- [x] **Education Milestones**:
  - B.Tech in Robotics and Automation, Lovely Professional University, Punjab, India (2026–Present, 2nd Year ongoing)
  - Intermediate (12th Grade), Narayana PU College, Bangalore (2022–2024)
  - Secondary Education (10th Grade), CBSE, St. Xavier's School, Bangalore (2021–2022)
- [x] **Languages Spoken**: Telugu (Native), English (Fluent), Hindi (Fluent)
- [x] **Contact Channels**: Email (`kvrredy11@gmail.com`), Phone (`+91 9900583305`), LinkedIn (`linkedin.com/in/k-vinay-reddy-`), Geolocation (`Bangalore, Karnataka`)
- [x] **Interactive HUD Deep-Dive Modal**: Available on all project cards with full technical specs and telemetry
- [x] **Tactical Controls**: Synthesized HUD audio toggle and `prefers-reduced-motion` toggle
- [x] **Global Theme Morphing**: Dynamic fog, lighting, and grid floor interpolation synchronized to scroll progress

---

## 🛠️ Local Development & Running Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### Installation
```bash
# Install all required dependencies
npm install
```

### Start Development Server
```bash
# Runs the Vite dev server at http://localhost:3000
npm run dev
```

### Production Build
```bash
# Bundles optimized JS/CSS chunks to /dist
npm run build
```

### Preview Production Build
```bash
# Serves the production build locally
npm run preview
```

---

## 📂 Project Structure

```
PORTFOLIO/
├── index.html                     # HTML5 shell with Google Fonts & HUD favicon
├── package.json                   # Dependencies & build scripts
├── postcss.config.js              # PostCSS Tailwind plugins
├── tailwind.config.js             # Tactical HUD color themes & animations
├── vite.config.js                 # Vite bundler & chunk splitting config
├── src/
│   ├── main.jsx                   # React root mount
│   ├── App.jsx                    # Root layout, scroll listener, DOM section mounts
│   ├── index.css                  # Global Tailwind directives, glow filters, scanlines
│   ├── context/
│   │   └── ThemeContext.jsx       # Theme morphing, active zone, scroll & audio state
│   ├── data/
│   │   └── portfolio.js           # Structured master data (all projects, skills, edu)
│   ├── utils/
│   │   └── audio.js               # Web Audio API procedural sound synthesizer
│   ├── three/
│   │   ├── SceneCanvas.jsx        # Persistent background Three.js Canvas
│   │   ├── CameraRig.jsx          # Waypoint interpolation & mouse parallax
│   │   ├── EnvironmentController.jsx # Dynamic fog, grid floor & particle starfield
│   │   └── models/
│   │       ├── HybridDroneRoverModel.jsx # Hero waypoint 3D model
│   │       ├── FPVDroneModel.jsx         # Aerial Ops quadcopter & radar sweep
│   │       ├── RoverGroundModel.jsx      # Ground Ops LiDAR rover, hexapod & arm
│   │       ├── PCBAndSignalModel.jsx     # Signal Ops PCB & RF waves
│   │       ├── ConstellationModel.jsx    # Skills & Cores high overview
│   │       └── SatelliteBeaconModel.jsx  # Contact orbital satellite beacon
│   └── components/
│       ├── HeaderNav.jsx                 # Top tactical sticky HUD navigation
│       ├── VerticalScrollHUD.jsx         # Right vertical waypoint track & telemetry
│       ├── HeroSection.jsx               # Zone 00 DOM overlay & callsign
│       ├── AerialOpsSection.jsx          # Zone 01 DOM overlay & 3 project cards
│       ├── GroundOpsSection.jsx          # Zone 02 DOM overlay & 3 project cards
│       ├── SignalOpsSection.jsx          # Zone 03 DOM overlay & 2 project cards
│       ├── SkillsAndEducationSection.jsx # Zone 04 DOM overlay & skills matrix
│       ├── ContactSection.jsx            # Zone 05 DOM overlay & contact terminal
│       └── ProjectModal.jsx              # Schematic deep-dive inspection modal
└── README.md
```
