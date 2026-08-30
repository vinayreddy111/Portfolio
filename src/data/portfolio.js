/**
 * PORTFOLIO MASTER DATA CONFIGURATION
 * K VINAY REDDY — Robotics Engineer (UAV Systems & Autonomous Machines)
 * 
 * Contains all structured data, waypoint coordinates, theme color mappings,
 * project cards, skills taxonomy, education history, and communication channels.
 */

export const PERSONAL_INFO = {
  name: "K VINAY REDDY",
  callsign: "KVR-01",
  title: "Robotics Engineer",
  subtitle: "UAV Systems & Autonomous Machines",
  tagline: "Designing, building, and deploying high-performance autonomous aerial, ground, and embedded robotics systems.",
  status: "ACTIVE // OPERATIONAL",
  location: "Bangalore, Karnataka, India",
  coords: "12.9716° N, 77.5946° E",
  activeYear: "2026",
  email: "kvrredy11@gmail.com",
  phone: "+91 9900583305",
  phoneDisplay: "+91 99005 83305",
  linkedin: "https://www.linkedin.com/in/k-vinay-reddy-",
  linkedinDisplay: "linkedin.com/in/k-vinay-reddy-",
  github: "https://github.com",
  summary: "Robotics and UAV engineer with deep expertise in custom FPV quadcopter engineering (9x national champion), autonomous ground rovers with LiDAR SLAM, multi-axis robotic manipulators, and RF signal telemetry.",
  stats: [
    { label: "FPV DRONES BUILT", value: "10+", subtext: "Custom high-speed airframes" },
    { label: "NATIONAL WINS", value: "9", subtext: "FPV Drone Racing & Tech" },
    { label: "DOF MANIPULATION", value: "6-DOF", subtext: "Articulated kinematics" },
    { label: "SYSTEM DOMAINS", value: "3", subtext: "Aerial, Ground & Signal" },
  ]
};

export const WAYPOINTS = [
  {
    id: "hero",
    index: 0,
    navLabel: "MISSION",
    code: "SEC-00",
    title: "MISSION CONTROL // INITIALIZATION",
    subtext: "System Core & Hybrid Telemetry",
    cameraPos: [0, 2, 8],
    cameraLookAt: [0, 0.2, 0],
    theme: {
      id: "hero",
      primary: "#00f0ff", // Cyan
      secondary: "#0284c7",
      accent: "#38bdf8",
      glow: "rgba(0, 240, 255, 0.4)",
      bg: "#080a0f",
      fogColor: "#080a0f",
      fogNear: 5,
      fogFar: 35,
      ambientColor: "#0f172a",
      ambientIntensity: 0.8,
      gridColor: "#00f0ff",
      cardBorder: "border-cyan-500/30",
      hudTag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    }
  },
  {
    id: "aerial",
    index: 1,
    navLabel: "AERIAL OPS",
    code: "SEC-01",
    title: "AERIAL OPERATIONS // FLIGHT AVIONICS",
    subtext: "Tactical FPV & Autonomous UAV Platforms",
    cameraPos: [-10, 3.5, -10],
    cameraLookAt: [-10, 1.2, -18],
    theme: {
      id: "aerial",
      primary: "#84cc16", // Tactical Olive / Lime Green
      secondary: "#eab308", // Radar Amber
      accent: "#22c55e",
      glow: "rgba(132, 204, 22, 0.4)",
      bg: "#090d09",
      fogColor: "#070c08",
      fogNear: 6,
      fogFar: 38,
      ambientColor: "#0c150c",
      ambientIntensity: 0.9,
      gridColor: "#84cc16",
      cardBorder: "border-lime-500/30",
      hudTag: "bg-lime-500/10 text-lime-400 border-lime-500/30",
    }
  },
  {
    id: "ground",
    index: 2,
    navLabel: "GROUND OPS",
    code: "SEC-02",
    title: "GROUND OPERATIONS // RUGGED ROBOTICS",
    subtext: "Autonomous Rovers, LiDAR SLAM & Kinematics",
    cameraPos: [12, 3.8, -28],
    cameraLookAt: [12, 1.0, -36],
    theme: {
      id: "ground",
      primary: "#f59e0b", // Industrial Hazard Amber
      secondary: "#94a3b8", // Brushed Steel
      accent: "#fbbf24",
      glow: "rgba(245, 158, 11, 0.45)",
      bg: "#0d0b08",
      fogColor: "#0e0c08",
      fogNear: 5,
      fogFar: 36,
      ambientColor: "#1a140c",
      ambientIntensity: 0.85,
      gridColor: "#f59e0b",
      cardBorder: "border-amber-500/30",
      hudTag: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    }
  },
  {
    id: "signal",
    index: 3,
    navLabel: "SIGNAL OPS",
    code: "SEC-03",
    title: "SIGNAL OPERATIONS // RF & TELEMETRY",
    subtext: "Embedded Electronics, Voice NLP & RF Interference",
    cameraPos: [-9, 5.0, -48],
    cameraLookAt: [-9, 2.5, -56],
    theme: {
      id: "signal",
      primary: "#00ff66", // Matrix Hacker Green
      secondary: "#06b6d4", // Signal Cyan
      accent: "#10b981",
      glow: "rgba(0, 255, 102, 0.4)",
      bg: "#060d09",
      fogColor: "#050d07",
      fogNear: 5,
      fogFar: 35,
      ambientColor: "#07170e",
      ambientIntensity: 0.9,
      gridColor: "#00ff66",
      cardBorder: "border-emerald-500/30",
      hudTag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    }
  },
  {
    id: "skills",
    index: 4,
    navLabel: "CORES & EDU",
    code: "SEC-04",
    title: "TECH CORES & ACADEMIC DOSSIER",
    subtext: "Kinematic Algorithms, Avionics Stack & Academic Milestones",
    cameraPos: [0, 14.0, -32],
    cameraLookAt: [0, 1.5, -28],
    theme: {
      id: "skills",
      primary: "#38bdf8", // Blueprint Cyan/Slate
      secondary: "#818cf8", // Indigo Core
      accent: "#a855f7",
      glow: "rgba(56, 189, 248, 0.4)",
      bg: "#080c14",
      fogColor: "#080b12",
      fogNear: 8,
      fogFar: 45,
      ambientColor: "#0c1322",
      ambientIntensity: 0.9,
      gridColor: "#38bdf8",
      cardBorder: "border-sky-500/30",
      hudTag: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    }
  },
  {
    id: "contact",
    index: 5,
    navLabel: "TRANSMIT",
    code: "SEC-05",
    title: "TRANSMIT // GET IN TOUCH",
    subtext: "Direct Communications Beacon & Terminal Link",
    cameraPos: [0, 2.8, -66],
    cameraLookAt: [0, 1.2, -75],
    theme: {
      id: "contact",
      primary: "#00f0ff", // Mission Cyan
      secondary: "#f43f5e", // Crimson Beacon
      accent: "#38bdf8",
      glow: "rgba(0, 240, 255, 0.4)",
      bg: "#080a0f",
      fogColor: "#080a0f",
      fogNear: 5,
      fogFar: 35,
      ambientColor: "#0f172a",
      ambientIntensity: 0.85,
      gridColor: "#00f0ff",
      cardBorder: "border-cyan-500/30",
      hudTag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    }
  }
];

export const PROJECTS = [
  // -------------------------------------------------------------
  // ZONE 1: AERIAL OPS
  // -------------------------------------------------------------
  {
    id: "fpv-drone-development",
    zone: "aerial",
    zoneTitle: "AERIAL OPERATIONS",
    badge: "9x NATIONAL COMPETITION WINNER",
    featuredBadge: "FLAGSHIP AERIAL SYSTEM",
    title: "FPV Drone Development",
    subtitle: "High-Speed Freestyle & Racing UAVs with Custom Propulsion Tuning",
    tagline: "Over 10+ custom-engineered carbon-fiber FPV drones with sub-millisecond PID tuning and national tournament pedigree.",
    description: "Designed, fabricated, tuned, and deployed over 10+ custom FPV quadcopters built for extreme speed, agility, and flight stability. Configured Betaflight and ArduPilot flight controllers, optimized ESC commutation protocols (DShot), and tuned propulsion dynamics for maximum thrust-to-weight ratio. Created custom 3D aerodynamic camera mounts and armor in Fusion 360, verified through real-world aggressive flight testing.",
    highlights: [
      "9 National-Level FPV Competition Wins across India",
      "10+ Custom airframes engineered, built, and flight-tested",
      "Sub-millisecond PID loop & dynamic notch filtering in Betaflight / ArduPilot",
      "Custom Fusion 360 aerodynamic TPU mounts, arm guards & VTX brackets",
      "High-C LiPo battery telemetry & ESC burst current management"
    ],
    techStack: [
      "Betaflight",
      "ArduPilot",
      "Fusion 360",
      "DShot Protocol",
      "ESC Telemetry",
      "Propulsion Dynamics",
      "PID Tuning",
      "VTX / RF Links",
      "Carbon Fiber Fabrication"
    ],
    telemetry: {
      thrustRatio: "9.2 : 1",
      maxSpeed: "165+ km/h",
      latency: "< 4.2 ms",
      firmware: "Betaflight 4.5 / ArduPilot Copter",
      winCount: "9 National Victories"
    },
    iconName: "Plane",
    stats: { builds: "10+", wins: "9 Wins", rating: "Class 1 High-G" }
  },
  {
    id: "vtol-uav-development",
    zone: "aerial",
    zoneTitle: "AERIAL OPERATIONS",
    badge: "HYBRID FLIGHT PLATFORM",
    title: "VTOL UAV Development",
    subtitle: "Multirotor + Fixed-Wing Hybrid Transition Architecture (Team Contribution)",
    tagline: "Dual-mode aerial vehicle bridging vertical takeoff hover and high-efficiency long-endurance horizontal cruise.",
    description: "Contributed as a core team robotics specialist to engineer a hybrid VTOL (Vertical Takeoff and Landing) UAV platform. Handled flight controller configuration and mode-transition tuning between vertical multicopter thrust and aerodynamic forward-wing lift. Diagnosed aerodynamic stress, performed sensor calibration, and stress-tested fail-safes under demanding outdoor field environments.",
    highlights: [
      "Smooth multirotor-to-fixed-wing transition logic and stability tuning",
      "ArduPilot QuadPlane / VTOL firmware architecture setup and debugging",
      "Aerodynamic transition stall prevention & differential thrust management",
      "Extensive real-world flight testing and telemetry logging under wind disturbances"
    ],
    techStack: [
      "VTOL Systems",
      "ArduPilot QuadPlane",
      "Flight Mode Transitions",
      "Fixed-Wing Aerodynamics",
      "ESC Calibration",
      "PWM / UART Telemetry",
      "Sensor Fusion"
    ],
    telemetry: {
      flightModes: "Hover / Cruise / RTL",
      transitionTime: "3.4s Smooth Blend",
      payloadCap: "1.8 kg Sensor Rig",
      stabilityIndex: "98.4% Nominal"
    },
    iconName: "Zap",
    stats: { mode: "Dual VTOL", flight: "Hybrid", endurance: "45+ Mins" }
  },
  {
    id: "fixed-wing-uav-operations",
    zone: "aerial",
    zoneTitle: "AERIAL OPERATIONS",
    badge: "AERODYNAMIC OPERATIONS",
    title: "Fixed-Wing UAV Operations",
    subtitle: "High-Efficiency Aerodynamic Flight Control & Autonomous Patrols",
    tagline: "Hands-on flight dynamics, glide ratio optimization, and long-range surveillance mission testing.",
    description: "Hands-on flight piloting and operational tuning of fixed-wing aerial systems. Optimized wing loading, center of gravity (CG) calculations, elevator/aileron deflection kinematics, and motor thrust angles for peak cruise efficiency. Conducted field operations analyzing aerodynamic stall margins, airframe stability, and autonomous waypoint routing.",
    highlights: [
      "Hands-on precision RC manual control and autonomous waypoint mission execution",
      "Aerodynamic lift-to-drag analysis and CG balancing for extended range",
      "Control surface linkage tuning (ailerons, elevators, rudder) for agile stability",
      "Field diagnostics, wind-drift compensation, and autonomous return-to-launch (RTL)"
    ],
    techStack: [
      "Fixed-Wing UAVs",
      "Aerodynamics",
      "Flight Stability Tuning",
      "Airframe Balancing",
      "ArduPlane",
      "Telemetry Links",
      "Field Operations"
    ],
    telemetry: {
      glideRatio: "14:1",
      cruiseSpeed: "68 km/h",
      rangeEst: "18 km",
      controlFreq: "2.4 GHz ELRS / 915 MHz Telemetry"
    },
    iconName: "Compass",
    stats: { wingspan: "1400 mm", patrol: "Long Range", efficiency: "High L/D" }
  },

  // -------------------------------------------------------------
  // ZONE 2: GROUND OPS
  // -------------------------------------------------------------
  {
    id: "autonomous-rover-lidar",
    zone: "ground",
    zoneTitle: "GROUND OPERATIONS",
    badge: "AUTONOMOUS NAVIGATION & SLAM",
    featuredBadge: "FLAGSHIP GROUND ROBOT",
    title: "Autonomous Rover (LiDAR-Based)",
    subtitle: "Real-Time 2D/3D SLAM Mapping, OpenCV Perception & Obstacle Avoidance",
    tagline: "LiDAR-guided heavy-duty ground vehicle executing real-time obstacle avoidance and spatial occupancy grid generation.",
    description: "Engineered an intelligent autonomous ground rover powered by an onboard Raspberry Pi companion computer integrated with a 360-degree LiDAR sensor. Implemented 2D SLAM (Simultaneous Localization and Mapping) to dynamically construct high-resolution spatial occupancy grids of unstructured indoor and outdoor environments. Developed OpenCV vision algorithms and sensor fusion filters to calculate collision-free trajectory paths.",
    highlights: [
      "360° LiDAR perception running on Raspberry Pi companion computer",
      "Real-time SLAM map generation & spatial occupancy grid tracking",
      "Computer vision obstacle classification using OpenCV and distance estimation",
      "Dynamic path planning with obstacle evasion and differential steering control"
    ],
    techStack: [
      "LiDAR Sensor",
      "Raspberry Pi",
      "SLAM (Basics)",
      "OpenCV (Basics)",
      "Python",
      "Path Planning",
      "Sensor Fusion",
      "Motor Drivers (H-Bridge)"
    ],
    telemetry: {
      scanRate: "10 Hz 360° Scan",
      rangeRadius: "12 Meters",
      mappingAccuracy: "±1.5 cm",
      compute: "Raspberry Pi 4B (4GB)"
    },
    iconName: "Radar",
    stats: { sensor: "360° LiDAR", compute: "RPi 4B", nav: "SLAM Vision" }
  },
  {
    id: "hexapod-spider-robot",
    zone: "ground",
    zoneTitle: "GROUND OPERATIONS",
    badge: "MULTI-LEGGED KINEMATICS",
    title: "Hexapod Robot (Spider Robot)",
    subtitle: "18-Servo Biomimetic Multi-Legged Locomotion with Inverse Kinematics",
    tagline: "Dynamic tripodal and wave gait planning for multi-terrain adaptation across steep and rough surfaces.",
    description: "Designed and programmed an 18-degree-of-freedom bio-inspired hexapod walking robot. Developed geometric Inverse Kinematics (IK) algorithms to compute individual servo joint angles based on desired 3D foot position coordinates. Implemented dynamic tripodal and ripple gait cycles that maintain the robot's center of gravity inside the polygon of support for ultra-stable locomotion over rough terrain.",
    highlights: [
      "18-DOF multi-joint inverse kinematics solver computed in real-time",
      "Tripod & ripple gait sequencing for uninterrupted dynamic balance",
      "Smooth terrain clearance trajectory generation for each robotic leg",
      "Multi-channel PWM servo driver integration and power distribution management"
    ],
    techStack: [
      "Inverse Kinematics",
      "Forward Kinematics",
      "Gait Planning",
      "Arduino",
      "PWM Servo Arrays",
      "C++ / Python",
      "Fusion 360 Chassis",
      "Biomimetic Robotics"
    ],
    telemetry: {
      legCount: "6 Articulated Limbs",
      totalDOF: "18 Active Servos",
      gaitTypes: "Tripod / Wave / Ripple",
      payloadMargin: "1.2 kg Chassis Capacity"
    },
    iconName: "Cpu",
    stats: { dof: "18-DOF", gait: "Tripod", balance: "Active IK" }
  },
  {
    id: "6-dof-robotic-arm",
    zone: "ground",
    zoneTitle: "GROUND OPERATIONS",
    badge: "INDUSTRIAL MANIPULATOR",
    title: "6-DOF Robotic Arm",
    subtitle: "Articulated Multi-Axis Servo Manipulator with Forward Kinematics",
    tagline: "Sub-millimeter Cartesian coordinate positioning and coordinated multi-axis trajectory execution.",
    description: "Built and calibrated a 6-Degree-of-Freedom articulated robotic manipulator arm with custom end-effector gripping mechanism. Implemented Denavit-Hartenberg (D-H) forward kinematics and trajectory interpolation to translate target end-effector coordinates into synchronized multi-servo rotational displacements. Designed rigid structural brackets in CAD with stress-bearing bearing points.",
    highlights: [
      "6-axis articulated kinematic chain with high-torque metal gear servo actuators",
      "Mathematical forward kinematics matrix transforms for tool-center-point (TCP)",
      "Smooth multi-axis velocity interpolation and Cartesian coordinate jogging",
      "Custom Fusion 360 engineered arm links and adaptive claw gripper"
    ],
    techStack: [
      "Forward Kinematics",
      "Inverse Kinematics",
      "Fusion 360 CAD",
      "Servo Actuation",
      "PID Control",
      "Arduino / Microcontrollers",
      "Serial Telemetry"
    ],
    telemetry: {
      reachRadius: "480 mm",
      payloadRating: "500 g at Full Reach",
      repeatability: "±0.8 mm",
      axes: "6 Fully Articulated"
    },
    iconName: "Wrench",
    stats: { axes: "6-DOF", reach: "480 mm", precision: "±0.8 mm" }
  },

  // -------------------------------------------------------------
  // ZONE 3: SIGNAL OPS
  // -------------------------------------------------------------
  {
    id: "voice-controlled-home-automation",
    zone: "signal",
    zoneTitle: "SIGNAL OPERATIONS",
    badge: "IOT & EMBEDDED NLP",
    title: "Voice-Controlled Home Automation",
    subtitle: "Edge Speech Recognition & Wireless IoT Mesh Appliance Control",
    tagline: "Natural speech parsing for multi-device relay switching over Wi-Fi and Bluetooth communication protocols.",
    description: "Developed an embedded smart automation hub utilizing voice recognition and NLP intent parsing to actuate electrical appliances and relays. Configured Wi-Fi (HTTP/MQTT) and Bluetooth serial communication protocols on microcontrollers (ESP32/Arduino) to establish low-latency wireless command execution with optical isolation safety.",
    highlights: [
      "Voice recognition pipeline with noise-filtering and keyword intent parsing",
      "Dual wireless communication channels (Wi-Fi 802.11 b/g/n & Bluetooth BLE/SPP)",
      "Optoisolated multi-channel high-voltage relay safety actuation",
      "Status telemetry feedback and automated device reconnection handshake"
    ],
    techStack: [
      "Voice Recognition",
      "NLP Processing",
      "Wi-Fi Communication",
      "Bluetooth Communication",
      "Arduino / ESP32",
      "Relay Actuation",
      "C / Python",
      "IoT Protocols"
    ],
    telemetry: {
      responseLatency: "< 120 ms",
      channelModes: "Wi-Fi 2.4GHz + Bluetooth 4.2",
      isolatedRelays: "8 High-Load Channels",
      statusCheck: "Continuous Keepalive"
    },
    iconName: "Radio",
    stats: { wireless: "Wi-Fi/BLE", latency: "< 120ms", channels: "8 Relays" }
  },
  {
    id: "rf-interference-analysis",
    zone: "signal",
    zoneTitle: "SIGNAL OPERATIONS",
    badge: "RF & TELEMETRY SYSTEMS",
    title: "RF Interference Analysis System",
    subtitle: "Wireless Propagation Diagnostics & Embedded Antenna Optimization",
    tagline: "Deep RF telemetry analysis investigating noise floors, multi-path fading, and electromagnetic interference.",
    description: "Researched and built an RF interference measurement setup to diagnose signal degradation, harmonic interference, and antenna impedance matching across 2.4 GHz, 5.8 GHz (FPV video), and sub-GHz (915 MHz) frequencies. Optimized PCB antenna layout and ground plane shielding to boost packet link quality (LQ) and transmission range in electromagnetically noisy environments.",
    highlights: [
      "Multi-band RSSI, SNR, and Packet Loss telemetry analysis across 915MHz / 2.4GHz / 5.8GHz",
      "Electromagnetic Interference (EMI) isolation for high-power drone ESCs and electronics",
      "Antenna polarization and radiation pattern assessment for omni/directional cloverleaves",
      "Diagnostic serial UART packet decoding and live spectrum visualization"
    ],
    techStack: [
      "RF Interference Analysis",
      "Antenna Design",
      "UART",
      "Embedded Electronics",
      "Signal Propagation",
      "Spectrum Diagnostics",
      "C / Python",
      "Hardware Shielding"
    ],
    telemetry: {
      analyzedBands: "915 MHz / 2.4 GHz / 5.8 GHz",
      snrThreshold: "> 18 dB Target",
      packetLossReduction: "34% Improvement",
      shielding: "Faraday Copper Foil + Chokes"
    },
    iconName: "Activity",
    stats: { bands: "3 Frequencies", snr: "> 18 dB", linkQuality: "99.8%" }
  }
];

export const SKILLS_DATA = [
  {
    category: "Avionics & UAV Engineering",
    color: "lime",
    icon: "Plane",
    skills: [
      { name: "FPV Drone Development", level: 98, tag: "Expert", desc: "Custom builds, tuning, racing pedigree (9 national wins)" },
      { name: "Betaflight", level: 96, tag: "Expert", desc: "PID loop optimization, dynamic filtering, RPM telemetry" },
      { name: "ArduPilot", level: 90, tag: "Advanced", desc: "Autonomous missions, Copter, Plane & QuadPlane VTOL" },
      { name: "UAV Tuning", level: 94, tag: "Expert", desc: "Step response, TPA, anti-gravity, filter cutoff calibration" },
      { name: "Flight Testing", level: 95, tag: "Expert", desc: "Stress testing, vibration analysis, aerodynamic envelope validation" },
      { name: "Fixed-Wing UAVs", level: 88, tag: "Advanced", desc: "Aerodynamic stability, cruise efficiency, long-range patrol" },
      { name: "VTOL Systems", level: 86, tag: "Advanced", desc: "Multirotor-to-plane transitions, hybrid control logic" },
      { name: "Flight Controller Configuration", level: 95, tag: "Expert", desc: "STM32 F4/F7/H7 target flashing, resource remapping" },
      { name: "ESC Tuning", level: 92, tag: "Advanced", desc: "BLHeli_32 / AM32 timing, PWM frequency, braking strength" },
      { name: "Propulsion Systems", level: 90, tag: "Advanced", desc: "Thrust-to-weight optimization, prop pitch vs kV selection" },
    ]
  },
  {
    category: "Robotics & Kinematics",
    color: "amber",
    icon: "Cpu",
    skills: [
      { name: "Forward Kinematics", level: 90, tag: "Advanced", desc: "Denavit-Hartenberg matrices for multi-axis arms" },
      { name: "Inverse Kinematics", level: 88, tag: "Advanced", desc: "Geometric & trigonometric solvers for 18-DOF hexapods" },
      { name: "Gait Planning", level: 86, tag: "Advanced", desc: "Tripod, wave, and ripple gait stabilization algorithms" },
      { name: "PID Control", level: 92, tag: "Advanced", desc: "Closed-loop feedback tuning for velocity, heading & rate" },
      { name: "Path Planning", level: 84, tag: "Proficient", desc: "A*, Dijkstra, and obstacle avoidance costmaps" },
      { name: "SLAM (Basics)", level: 82, tag: "Proficient", desc: "2D spatial occupancy grid generation with 360° LiDAR" },
    ]
  },
  {
    category: "Embedded & Hardware",
    color: "emerald",
    icon: "Zap",
    skills: [
      { name: "Raspberry Pi", level: 90, tag: "Advanced", desc: "Linux SBC companion computing, GPIO, OpenCV pipelines" },
      { name: "Arduino", level: 94, tag: "Expert", desc: "Low-level C/C++ firmware, timing interrupts, hardware timers" },
      { name: "Sensor Integration", level: 92, tag: "Advanced", desc: "IMUs (gyro/accel), LiDAR, ultrasonic, barometers, GPS" },
      { name: "Motor Drivers", level: 88, tag: "Advanced", desc: "MOSFET H-bridges, stepper drivers, high-power DC drivers" },
      { name: "UART", level: 95, tag: "Expert", desc: "Serial debugging, GPS NMEA, SBUS/CRSF telemetry protocols" },
      { name: "PWM", level: 94, tag: "Expert", desc: "Servo command pulse generation, hardware timer capture" },
      { name: "DShot (Basic)", level: 88, tag: "Advanced", desc: "Digital ESC packet communication and bidirectional telemetry" },
      { name: "Wi-Fi Communication", level: 86, tag: "Advanced", desc: "ESP32/ESP8266 sockets, HTTP endpoints, IoT mesh" },
      { name: "Bluetooth Communication", level: 85, tag: "Proficient", desc: "BLE peripheral services, SPP serial wireless data" },
    ]
  },
  {
    category: "Software & Vision",
    color: "cyan",
    icon: "Activity",
    skills: [
      { name: "C", level: 88, tag: "Advanced", desc: "Microcontroller bare-metal programming, memory management" },
      { name: "Python", level: 90, tag: "Advanced", desc: "Data processing, ROS interfaces, OpenCV, script automation" },
      { name: "OpenCV (Basics)", level: 82, tag: "Proficient", desc: "Color masking, edge detection, obstacle contour tracking" },
    ]
  },
  {
    category: "CAD & Mechanical Design",
    color: "sky",
    icon: "Layers",
    skills: [
      { name: "Fusion 360", level: 94, tag: "Expert", desc: "Parametric solid modeling, TPU mounts, stress assembly" },
      { name: "AutoCAD", level: 84, tag: "Proficient", desc: "2D engineering schematics, dimensioning & shop drawings" },
      { name: "Creo", level: 80, tag: "Proficient", desc: "3D part modeling, mechanical assembly constraint modeling" },
    ]
  }
];

export const EDUCATION_DATA = [
  {
    degree: "B.Tech in Robotics and Automation",
    institution: "Lovely Professional University",
    location: "Punjab, India",
    duration: "2026 – Present",
    status: "2nd Year Ongoing",
    badge: "CURRENT ACADEMIC DEGREE",
    focus: "Specializing in Autonomous Robotics Systems, Kinematics, Control Systems, Embedded Avionics, and Machine Perception.",
    highlights: [
      "Rigorous coursework in Robotics Kinematics, Control Engineering & Sensors",
      "Hands-on lab research in multirotor aerodynamics and autonomous ground vehicles",
      "Active leader in collegiate robotics competitions and technical UAV workshops"
    ]
  },
  {
    degree: "Intermediate (12th Grade)",
    institution: "Narayana PU College",
    location: "Bangalore, Karnataka, India",
    duration: "2022 – 2024",
    status: "Completed",
    badge: "PRE-UNIVERSITY",
    focus: "Physics, Mathematics, Chemistry (PCM) foundation with advanced analytical focus on mechanics and electricity.",
    highlights: [
      "Deep foundation in Newtonian Mechanics, Vector Calculus, and Electromagnetism",
      "Developed passion for hardware tinkering, RC flight dynamics, and microcontrollers"
    ]
  },
  {
    degree: "Secondary Education (10th Grade)",
    institution: "St. Xavier's School (CBSE)",
    location: "Bangalore, Karnataka, India",
    duration: "2021 – 2022",
    status: "Completed",
    badge: "SECONDARY EDUCATION",
    focus: "CBSE Board curriculum with excellence in Science, Mathematics, and Computer Applications.",
    highlights: [
      "Early project exhibitions in electronics, robotics principles, and basic coding",
      "Represented school in regional science olympiads and technical symposiums"
    ]
  }
];

export const LANGUAGES_DATA = [
  {
    name: "Telugu",
    proficiency: "Native / Mother Tongue",
    level: 100,
    type: "Native"
  },
  {
    name: "English",
    proficiency: "Fluent / Professional Working",
    level: 95,
    type: "Fluent"
  },
  {
    name: "Hindi",
    proficiency: "Fluent / Conversational & Technical",
    level: 90,
    type: "Fluent"
  }
];

export const CONTACT_CHANNELS = [
  {
    id: "email",
    label: "DIRECT EMAIL",
    value: "kvrredy11@gmail.com",
    href: "mailto:kvrredy11@gmail.com",
    icon: "Mail",
    badge: "PRIMARY COMMS",
    subtext: "Encrypted direct transmission"
  },
  {
    id: "phone",
    label: "SECURE VOICE / TEL",
    value: "+91 9900583305",
    display: "+91 99005 83305",
    href: "tel:+919900583305",
    icon: "Phone",
    badge: "VOICE LINK",
    subtext: "Mon-Sat 09:00 - 19:00 IST"
  },
  {
    id: "linkedin",
    label: "LINKEDIN DOSSIER",
    value: "linkedin.com/in/k-vinay-reddy-",
    href: "https://www.linkedin.com/in/k-vinay-reddy-",
    icon: "Linkedin",
    badge: "PROFESSIONAL NETWORK",
    subtext: "Career history & updates"
  },
  {
    id: "location",
    label: "GEOLOCATION / GRID",
    value: "Bangalore, Karnataka, India",
    href: "https://maps.google.com/?q=Bangalore,Karnataka,India",
    icon: "MapPin",
    badge: "HQ COORDINATES",
    subtext: "12.9716° N, 77.5946° E"
  }
];
