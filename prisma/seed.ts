import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const projects = [
  {
    slug: "satellite-telemetry-analytics",
    title: "Satellite Telemetry Analytics",
    category: "Data Intelligence",
    overview:
      "A real-time analytics platform that ingests multi-channel satellite telemetry and surfaces anomalies before they become mission-critical failures.",
    problem:
      "Ground station operators are flooded with thousands of telemetry parameters per second, making manual monitoring impossible and reactive rather than predictive.",
    solution:
      "SiliconBrainsAI built a streaming pipeline that normalizes telemetry from multiple bus protocols, applies statistical + ML-based anomaly scoring, and visualizes subsystem health on a live mission-control dashboard.",
    architecture:
      "Kafka-based ingestion → feature store → ensemble anomaly detectors (isolation forest + LSTM autoencoder) → PostgreSQL/TimescaleDB → real-time WebSocket dashboard.",
    aiModels: ["Isolation Forest", "LSTM Autoencoder", "Gradient Boosted Trees"],
    results:
      "Reduced false-positive alerts by 63% and cut anomaly detection latency from minutes to under 4 seconds in simulated LEO telemetry streams.",
    techStack: ["Python", "PyTorch", "Kafka", "TimescaleDB", "FastAPI", "React"],
    githubUrl: "https://github.com/siliconbrainsai/satellite-telemetry-analytics",
    featured: true,
  },
  {
    slug: "ai-fault-detection",
    title: "AI-Based Fault Detection",
    category: "Spacecraft Health",
    overview:
      "Onboard and ground-based fault classification system for spacecraft subsystems using supervised and self-supervised learning.",
    problem:
      "Legacy rule-based fault detection systems cannot generalize to novel fault signatures and require constant manual threshold tuning.",
    solution:
      "A hybrid fault classifier combining physics-informed features with deep representation learning, deployable both on ground infrastructure and resource-constrained flight computers.",
    architecture:
      "Sensor fusion layer → physics-informed feature extraction → CNN-based classifier → confidence-calibrated output → explainability layer (SHAP).",
    aiModels: ["1D-CNN", "Physics-Informed Neural Network", "SHAP Explainability"],
    results: "94.2% fault classification accuracy across 12 subsystem fault classes in simulation testbeds.",
    techStack: ["TensorFlow", "C++", "Edge TPU", "Python", "MATLAB/Simulink"],
    githubUrl: "https://github.com/siliconbrainsai/ai-fault-detection",
    featured: true,
  },
  {
    slug: "predictive-maintenance",
    title: "Predictive Maintenance",
    category: "Reliability Engineering",
    overview:
      "Predictive maintenance engine forecasting component degradation trends across satellite fleets.",
    problem:
      "Fleet operators lack fleet-wide visibility into gradual component degradation, leading to unplanned downtime and costly reactive repairs.",
    solution:
      "A fleet-scale time-series forecasting system that models degradation curves per component class and issues maintenance-window recommendations.",
    architecture:
      "Historical telemetry warehouse → temporal feature engineering → Temporal Fusion Transformer → maintenance scheduling optimizer.",
    aiModels: ["Temporal Fusion Transformer", "Survival Analysis Models"],
    results: "Forecasts degradation trends 30-45 days ahead with mean absolute error under 6%.",
    techStack: ["Python", "PyTorch Forecasting", "PostgreSQL", "Airflow"],
    githubUrl: "https://github.com/siliconbrainsai/predictive-maintenance",
    featured: false,
  },
  {
    slug: "remaining-useful-life-prediction",
    title: "Remaining Useful Life Prediction",
    category: "Reliability Engineering",
    overview: "RUL estimation models for critical spacecraft components such as reaction wheels and batteries.",
    problem:
      "Without accurate remaining-useful-life estimates, mission planners cannot make informed decisions about mission extensions or decommissioning.",
    solution:
      "Ensemble regression models trained on degradation trajectories, validated against accelerated life-testing datasets.",
    architecture: "Degradation dataset → feature extraction → ensemble RUL regressors → uncertainty quantification.",
    aiModels: ["XGBoost", "Bayesian Neural Networks"],
    results: "RUL prediction within ±8% of ground-truth on reaction wheel degradation benchmarks.",
    techStack: ["Python", "Scikit-learn", "XGBoost", "NumPyro"],
    githubUrl: "https://github.com/siliconbrainsai/rul-prediction",
    featured: false,
  },
  {
    slug: "explainable-ai",
    title: "Explainable AI for Mission Systems",
    category: "Trustworthy AI",
    overview: "An explainability toolkit that makes every AI decision in mission-critical systems auditable.",
    problem:
      "Mission operators cannot trust black-box AI recommendations without transparent reasoning, especially for safety-critical decisions.",
    solution:
      "A model-agnostic explainability layer providing feature attribution, counterfactuals, and natural-language rationale generation for every prediction.",
    architecture: "Model wrapper → SHAP/LIME attribution → counterfactual generator → rationale summarizer (LLM).",
    aiModels: ["SHAP", "LIME", "LLM-based Rationale Generator"],
    results: "Adopted across all SiliconBrainsAI production models as a mandatory audit layer.",
    techStack: ["Python", "SHAP", "LIME", "Transformers"],
    githubUrl: "https://github.com/siliconbrainsai/explainable-ai",
    featured: false,
  },
  {
    slug: "onboard-ai",
    title: "Onboard AI Compute Framework",
    category: "Edge AI",
    overview: "A lightweight inference framework optimized for radiation-tolerant flight computers.",
    problem:
      "Standard ML frameworks are too resource-intensive and non-deterministic for flight-qualified onboard computers.",
    solution:
      "A quantized, deterministic inference runtime with bounded memory and execution-time guarantees, built for TinyML deployment on spacecraft.",
    architecture: "Model quantization pipeline → deterministic runtime → watchdog-supervised inference scheduler.",
    aiModels: ["Quantized CNNs", "TinyML Decision Trees"],
    results: "Achieved sub-50ms inference latency within a 2MB memory budget on representative flight hardware.",
    techStack: ["C", "TensorFlow Lite Micro", "RTOS", "Rust"],
    githubUrl: "https://github.com/siliconbrainsai/onboard-ai",
    featured: true,
  },
  {
    slug: "digital-twin-satellite",
    title: "Digital Twin of Satellite",
    category: "Digital Twin",
    overview: "A high-fidelity digital twin platform mirroring real-time satellite state for simulation and what-if analysis.",
    problem:
      "Operators need a safe environment to test contingency procedures without risking the physical spacecraft.",
    solution:
      "A physics + ML hybrid digital twin synchronized with live telemetry, enabling simulation of contingency scenarios and control-policy validation.",
    architecture: "Live telemetry sync → physics simulation core → ML residual correction models → 3D visualization layer (Three.js).",
    aiModels: ["Residual Learning Models", "Kalman Filters + Neural Correction"],
    results: "Digital twin state tracking error kept under 2% relative to ground-truth telemetry.",
    techStack: ["Python", "Three.js", "WebSocket", "Simulink", "Next.js"],
    githubUrl: "https://github.com/siliconbrainsai/digital-twin-satellite",
    featured: true,
  },
  {
    slug: "autonomous-decision-engine",
    title: "Autonomous Decision Engine",
    category: "Autonomous Systems",
    overview: "A decision-making engine enabling spacecraft to autonomously respond to anomalies without ground intervention.",
    problem:
      "Communication latency and blackout windows prevent timely ground intervention during critical anomalies.",
    solution:
      "A hierarchical reinforcement-learning based decision engine with hard safety constraints and human-verifiable action justification.",
    architecture: "State estimator → constrained RL policy → safety verifier → action executor with ground override.",
    aiModels: ["Constrained Reinforcement Learning", "Safety-Verified Policy Networks"],
    results: "Reduced anomaly response time from ground-loop minutes to onboard milliseconds in simulation.",
    techStack: ["Python", "Ray RLlib", "C++", "Formal Verification Tools"],
    githubUrl: "https://github.com/siliconbrainsai/autonomous-decision-engine",
    featured: false,
  },
  {
    slug: "autonomous-satellite-health-management",
    title: "AI-Powered Autonomous Satellite Health Management System",
    category: "Flagship System",
    overview:
      "SiliconBrainsAI's flagship integrated system combining fault detection, predictive maintenance, digital twin, and autonomous decision-making into a single satellite health management platform.",
    problem:
      "Existing satellite health management is fragmented across disconnected tools, slowing response and reducing situational awareness.",
    solution:
      "A unified AI platform that fuses telemetry analytics, fault detection, RUL prediction, digital twin simulation, and autonomous decisioning into one mission-control-grade system.",
    architecture:
      "Unified data fabric → multi-model AI orchestration layer → digital twin simulation → autonomous decision engine → mission control UI.",
    aiModels: ["Ensemble of all SiliconBrainsAI models", "Multi-agent Orchestration"],
    results: "Deployed in simulation across 3 representative LEO mission profiles with end-to-end autonomous anomaly handling.",
    techStack: ["Next.js", "Python", "PyTorch", "Kubernetes", "PostgreSQL", "Three.js"],
    githubUrl: "https://github.com/siliconbrainsai/autonomous-satellite-health-management",
    featured: true,
  },
];

const blogPosts = [
  {
    slug: "why-space-needs-onboard-ai",
    title: "Why Space Missions Need Onboard AI, Not Just Ground-Based Analytics",
    excerpt: "Communication blackouts and light-speed delay mean the next generation of spacecraft must think for themselves.",
    content:
      "As missions push further from Earth, ground-loop decision-making becomes a liability rather than a safeguard. This post explores the architectural principles behind deterministic onboard inference and why TinyML is becoming mission-critical infrastructure.",
    category: "Space",
    tags: ["Edge AI", "TinyML", "Autonomy"],
    readTimeMin: 6,
  },
  {
    slug: "anomaly-detection-satellite-telemetry",
    title: "A Practical Guide to Anomaly Detection in Satellite Telemetry",
    excerpt: "Comparing isolation forests, autoencoders, and physics-informed models for real-world telemetry streams.",
    content:
      "Telemetry anomaly detection is deceptively hard: seasonality, multi-modal sensor drift, and rare fault classes all complicate naive approaches. We break down the tradeoffs between classical and deep-learning methods.",
    category: "Machine Learning",
    tags: ["Anomaly Detection", "Time Series"],
    readTimeMin: 8,
  },
  {
    slug: "digital-twins-for-spacecraft",
    title: "Building Digital Twins for Spacecraft: Lessons from the Field",
    excerpt: "What we learned fusing physics simulation with residual neural correction for real-time state tracking.",
    content:
      "A digital twin is only as good as its synchronization with reality. This post covers our hybrid physics+ML approach and the pitfalls of pure data-driven twins.",
    category: "Research",
    tags: ["Digital Twin", "Simulation"],
    readTimeMin: 7,
  },
  {
    slug: "explainability-in-mission-critical-ai",
    title: "Explainability Isn't Optional in Mission-Critical AI",
    excerpt: "Why every AI decision on a spacecraft needs a human-auditable rationale.",
    content:
      "Black-box predictions are unacceptable when a satellite's health is on the line. We walk through how we layer SHAP, counterfactuals, and rationale generation into every production model.",
    category: "AI",
    tags: ["Explainable AI", "Trust"],
    readTimeMin: 5,
  },
  {
    slug: "computer-vision-in-orbit",
    title: "Computer Vision in Orbit: Challenges Beyond Earth's Atmosphere",
    excerpt: "Radiation noise, extreme lighting, and bandwidth constraints reshape how CV models must be built.",
    content:
      "Space-based computer vision faces constraints rarely seen terrestrially. We discuss radiation-induced noise, dynamic range extremes, and onboard compute limits.",
    category: "Computer Vision",
    tags: ["Computer Vision", "Space"],
    readTimeMin: 6,
  },
  {
    slug: "python-for-space-data-pipelines",
    title: "Python Patterns for Reliable Space Data Pipelines",
    excerpt: "Battle-tested patterns for building telemetry pipelines that don't fail silently.",
    content:
      "From schema validation to backpressure handling, we share the Python patterns that keep our telemetry pipelines robust at scale.",
    category: "Python",
    tags: ["Python", "Data Engineering"],
    readTimeMin: 9,
  },
];

const publications = [
  {
    title: "Physics-Informed Deep Learning for Spacecraft Fault Classification",
    type: "Research Paper",
    authors: ["SiliconBrainsAI Research Team"],
    venue: "IAC (International Astronautical Congress)",
    year: 2025,
    abstract:
      "We present a physics-informed neural architecture for spacecraft subsystem fault classification, demonstrating improved generalization to unseen fault signatures compared to purely data-driven baselines.",
    link: "#",
  },
  {
    title: "Digital Twins for LEO Satellite Health Management: A Hybrid Approach",
    type: "Conference Paper",
    authors: ["SiliconBrainsAI Research Team"],
    venue: "IEEE Aerospace Conference",
    year: 2025,
    abstract:
      "This paper introduces a hybrid physics + residual-learning digital twin framework for real-time LEO satellite state estimation.",
    link: "#",
  },
  {
    title: "TinyML for Deterministic Onboard Inference in Radiation-Tolerant Systems",
    type: "Technical Whitepaper",
    authors: ["SiliconBrainsAI Engineering Team"],
    venue: null,
    year: 2024,
    abstract:
      "A technical deep-dive into building deterministic, memory-bounded ML inference runtimes suitable for flight-qualified hardware.",
    link: "#",
  },
  {
    title: "Case Study: Reducing False Positive Alerts in Telemetry Monitoring by 63%",
    type: "Case Study",
    authors: ["SiliconBrainsAI"],
    venue: null,
    year: 2024,
    abstract:
      "How an ensemble anomaly detection pipeline reduced operator alert fatigue while maintaining detection sensitivity.",
    link: "#",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  for (const pub of publications) {
    await prisma.publication.create({ data: pub as any });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
