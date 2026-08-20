import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, ArrowLeft, Layers, Target, Lightbulb, BarChart3, Cpu, Network, Database } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge, GlassCard } from "@/components/ui/Section";

// Stunning highly detailed fallback data for the demo
const FALLBACK_PROJECTS: Record<string, any> = {
  "satellite-telemetry-analytics": {
    slug: "satellite-telemetry-analytics",
    title: "Satellite Telemetry Analytics AI",
    category: "Data Intelligence",
    overview: "A groundbreaking AI platform designed to monitor, analyze, and predict anomalies in multi-channel satellite telemetry data in real-time, preventing catastrophic mission failures before they occur.",
    problem: "Modern satellites generate terabytes of telemetry data daily. Ground control teams struggle to manually identify subtle, multi-variable anomalies hidden within this massive stream of data, leading to delayed responses to hardware degradation and potential mission loss.",
    solution: "We engineered a highly optimized edge-and-cloud AI pipeline utilizing Transformer-based time-series forecasting and Autoencoders. The system continuously ingests telemetry, establishes dynamic baseline behaviors for thousands of components, and instantly flags anomalous deviations with 99.9% accuracy.",
    architecture: "The architecture consists of a lightweight C++ edge inference engine running directly on the satellite hardware for critical immediate alerts, paired with a massive cloud-based Next.js and Python backend processing historical data lakes using PyTorch.",
    results: "Deployed across 12 active LEO satellites, the system successfully predicted 4 major subsystem failures up to 72 hours in advance, saving an estimated $140M in potential hardware loss and increasing overall fleet uptime by 14%.",
    aiModels: ["Time-Series Transformers", "Variational Autoencoders", "Isolation Forests", "LSTM Networks"],
    techStack: ["Python", "PyTorch", "C++", "Next.js", "PostgreSQL", "Apache Kafka"],
    githubUrl: "https://github.com/siliconbrainsai/telemetry-ai",
    imageUrl: "/images/project-hero.png" // Generated AI image
  },
  "digital-twin-satellite": {
    slug: "digital-twin-satellite",
    title: "Digital Twin of Satellite",
    category: "Digital Twin",
    overview: "A high-fidelity physics and machine learning digital twin perfectly synchronized with live satellite telemetry, enabling simulation of thermal, power, and communication systems in real-time.",
    problem: "Testing software updates or simulating harsh space weather on live orbital assets is incredibly dangerous and expensive. Ground operators lacked a safe, accurate sandbox to test maneuvers and predict systemic degradation over time.",
    solution: "We developed a real-time digital twin utilizing Neural Ordinary Differential Equations (Neural ODEs) to model physical systems and reinforcement learning to simulate state changes. The twin perfectly mirrors its physical counterpart, synchronized via low-latency telemetry ingestion.",
    architecture: "Built on Unreal Engine 5 for high-fidelity visual rendering, paired with a massive Python simulation backend running on AWS. The data sync is handled via Apache Kafka, ensuring the twin's state is never more than 50ms behind the physical satellite.",
    results: "Enabled operators to test 4 critical software patches in a simulated environment before successful deployment. Identified a fatal thermal flaw during a simulated solar flare scenario, allowing engineers to upload a preventive cooling protocol, saving a $200M asset.",
    aiModels: ["Neural ODEs", "Deep Reinforcement Learning", "Physics-Informed Neural Networks (PINNs)"],
    techStack: ["Unreal Engine 5", "Python", "AWS", "Apache Kafka", "React"],
    githubUrl: "https://github.com/siliconbrainsai/digital-twin",
    imageUrl: "/images/project-hero.png"
  },
  "autonomous-satellite-health-management": {
    slug: "autonomous-satellite-health-management",
    title: "Autonomous Satellite Health Management",
    category: "Flagship System",
    overview: "A unified AI platform fusing predictive analytics, twin simulation, and onboard autonomy to allow satellites to self-diagnose and heal without ground intervention.",
    problem: "During deep space missions or comms blackouts, satellites are highly vulnerable. If a critical failure occurs while out of contact with ground stations, the satellite cannot be saved. Current systems rely entirely on human-in-the-loop decision making.",
    solution: "We deployed an onboard autonomous agent powered by an embedded Large Language Model (LLM) and expert rule-based systems. It continuously analyzes system health, cross-references with local digital twin simulations, and executes emergency protocols instantly without waiting for ground approval.",
    architecture: "A highly compressed, quantized AI model running on Rad-Hard (Radiation-Hardened) edge processors. The system interfaces directly with the satellite's core flight software using a robust, fail-safe C API.",
    results: "Successfully demonstrated in low-earth orbit, the autonomous system detected a power-surge anomaly during a planned comms blackout and executed an emergency safe-mode shunt in 0.4 seconds, preventing permanent battery damage.",
    aiModels: ["Quantized Embedded LLMs", "Expert Systems", "Reinforcement Learning"],
    techStack: ["C", "C++", "Rust", "Edge AI", "Rad-Hard FPGAs"],
    githubUrl: "https://github.com/siliconbrainsai/autonomous-health",
    imageUrl: "/images/project-hero.png"
  },
  "ai-fault-detection": {
    slug: "ai-fault-detection",
    title: "AI-Based Fault Detection",
    category: "Spacecraft Health",
    overview: "Onboard and ground-based fault classification using supervised and self-supervised learning to detect anomalies across critical spacecraft components before they lead to failure.",
    problem: "Spacecraft operate in extreme environments where sensor data is noisy and traditional threshold-based alarms trigger massive amounts of false positives. Ground teams waste hundreds of hours investigating non-issues while missing subtle, complex faults.",
    solution: "We developed a hybrid AI architecture utilizing Self-Supervised Learning (SSL) to pre-train on vast amounts of unlabelled historical telemetry, fine-tuned with supervised classification for known fault signatures. The model can accurately classify 40+ distinct spacecraft faults with extreme precision.",
    architecture: "The system processes multi-modal sensor data (thermal, power, vibration) through a series of Convolutional Neural Networks (1D CNNs) and Vision Transformers (ViTs) applied to spectrograms, deployed on a high-throughput edge inference cluster.",
    results: "Reduced false alarm rates by 87% compared to legacy threshold systems. Successfully detected a reaction wheel degradation signature 4 weeks before the manufacturer's predicted failure time.",
    aiModels: ["1D CNNs", "Vision Transformers", "Self-Supervised Learning", "Autoencoders"],
    techStack: ["PyTorch", "TensorFlow", "Python", "Docker", "Kubernetes"],
    githubUrl: "https://github.com/siliconbrainsai/fault-detection",
    imageUrl: "/images/project-hero.png"
  },
  "predictive-maintenance": {
    slug: "predictive-maintenance",
    title: "Predictive Maintenance",
    category: "Reliability Engineering",
    overview: "Forecasting component degradation trends across satellite fleets to optimize maintenance schedules, de-orbiting plans, and operational loads.",
    problem: "Operators lacked the tools to dynamically predict when a component would fail based on its actual usage and environmental stress. This led to either premature decommissioning of healthy satellites or unexpected catastrophic failures in orbit.",
    solution: "We implemented a Bayesian deep learning framework that not only predicts future states of degrading components (like batteries and solar arrays) but also provides a mathematically rigorous uncertainty bound for every prediction.",
    architecture: "The pipeline utilizes recurrent neural networks (LSTMs) coupled with Bayesian inference layers. Data is streamed continuously from orbit into a cloud-native Snowflake data warehouse, where scheduled Airflow dags run the predictive models.",
    results: "Increased the average operational lifespan of monitored satellites by 18 months. Saved $45M in deferred launch costs by safely extending the life of three aging communications satellites.",
    aiModels: ["Bayesian LSTMs", "Markov Chain Monte Carlo (MCMC)", "Gaussian Processes"],
    techStack: ["Snowflake", "Apache Airflow", "PyMC3", "Python", "AWS SageMaker"],
    githubUrl: "https://github.com/siliconbrainsai/predictive-maintenance",
    imageUrl: "/images/project-hero.png"
  },
  "remaining-useful-life-prediction": {
    slug: "remaining-useful-life-prediction",
    title: "Remaining Useful Life Prediction",
    category: "Reliability Engineering",
    overview: "RUL estimation for critical spacecraft components using advanced survival analysis and deep learning, providing operators with a precise countdown to failure.",
    problem: "Traditional Reliability block diagrams and MTBF (Mean Time Between Failures) metrics are static and do not account for the unique operational history or current degradation state of an individual satellite component.",
    solution: "A deep survival analysis engine that ingests high-frequency telemetry and outputs a probability density function representing the Remaining Useful Life (RUL) of specific components, such as gyroscopes and batteries.",
    architecture: "Built on a microservices architecture using Go and Python. The models use Deep Survival Machines and Weibull Time-To-Event RNNs, exposed via a low-latency gRPC API to the mission control dashboard.",
    results: "Achieved a 94% confidence interval in predicting the end-of-life for lithium-ion power cells operating in highly elliptical orbits, completely eliminating unexpected power-loss anomalies for the client.",
    aiModels: ["Deep Survival Machines", "Weibull RNNs", "Random Survival Forests"],
    techStack: ["Go", "Python", "gRPC", "React", "TimescaleDB"],
    githubUrl: "https://github.com/siliconbrainsai/rul-prediction",
    imageUrl: "/images/project-hero.png"
  },
  "explainable-ai": {
    slug: "explainable-ai",
    title: "Explainable AI for Mission Systems",
    category: "Trustworthy AI",
    overview: "A model-agnostic explainability layer for mission-critical AI decisions, bridging the trust gap between complex neural networks and human spacecraft operators.",
    problem: "As deep learning models became more prevalent in mission control, spacecraft operators refused to trust the 'black box' decisions. When an AI suggested a critical maneuver, operators needed to know exactly *why* before executing it.",
    solution: "We built a comprehensive Explainable AI (XAI) suite that runs alongside any predictive model. It generates human-readable justifications, highlighting the exact telemetry sensors and historical patterns that led to the AI's conclusion.",
    architecture: "Utilizing SHAP (SHapley Additive exPlanations) and LIME, the system processes the gradients and activations of the host models in real-time. The explanations are rendered as interactive heatmaps and natural language summaries in the operator dashboard.",
    results: "Increased operator adoption of AI recommendations from 22% to 91%. Reduced the time taken for human operators to verify and approve an AI-suggested collision avoidance maneuver by 60%.",
    aiModels: ["SHAP", "LIME", "Integrated Gradients", "Attention Visualizers"],
    techStack: ["Python", "Ray", "React", "D3.js", "FastAPI"],
    githubUrl: "https://github.com/siliconbrainsai/xai-mission-systems",
    imageUrl: "/images/project-hero.png"
  },
  "onboard-ai": {
    slug: "onboard-ai",
    title: "Onboard AI Compute Framework",
    category: "Edge AI",
    overview: "A lightweight, deterministic inference runtime designed specifically for space-rated flight computers, enabling complex AI models to run in the harsh radiation of space.",
    problem: "Modern AI frameworks like PyTorch and TensorFlow are too bloated and non-deterministic to run on the highly constrained, radiation-hardened (rad-hard) processors used in modern satellites.",
    solution: "We developed a custom, bare-metal C++ inference engine that compiles trained neural networks into highly optimized, deterministic static binaries. It supports quantization, pruning, and memory-safe execution with zero dynamic allocation.",
    architecture: "The framework takes ONNX models from standard training pipelines and compiles them ahead-of-time (AOT) for specific Rad-Hard architectures like the LEON4 or ARM Cortex-R.",
    results: "Achieved 40x faster inference and 90x lower memory footprint compared to standard edge runtimes. Successfully deployed on a flagship lunar mission for real-time crater detection during descent.",
    aiModels: ["Model Quantization (INT8/INT4)", "Neural Network Pruning", "ONNX"],
    techStack: ["C++", "C", "LLVM", "WebAssembly", "RTOS"],
    githubUrl: "https://github.com/siliconbrainsai/onboard-ai-compute",
    imageUrl: "/images/project-hero.png"
  },
  "autonomous-decision-engine": {
    slug: "autonomous-decision-engine",
    title: "Autonomous Decision Engine",
    category: "Autonomous Systems",
    overview: "Enables spacecraft to autonomously respond to environmental threats and hardware anomalies without waiting for ground intervention, drastically reducing reaction times.",
    problem: "The speed of light limits communication with deep space probes. A distress signal from Mars takes up to 22 minutes to reach Earth, and the command to fix it takes another 22 minutes. In critical scenarios, 44 minutes is too long.",
    solution: "An onboard decision engine using reinforcement learning and decision trees. It ingests the output from the anomaly detection models and instantly calculates the optimal sequence of commands to stabilize the spacecraft.",
    architecture: "A deterministic state-machine core wrapped in a highly constrained Reinforcement Learning policy network. The engine runs on an isolated, redundant compute node to ensure it remains operational even during primary computer failure.",
    results: "Successfully simulated the recovery of a tumbling spacecraft in a frictionless environment in under 3 seconds. Slated for integration into a next-generation asteroid mining probe.",
    aiModels: ["Proximal Policy Optimization (PPO)", "Decision Trees", "Finite State Machines"],
    techStack: ["Rust", "C++", "Python", "Core Flight System (cFS)"],
    githubUrl: "https://github.com/siliconbrainsai/autonomous-decision-engine",
    imageUrl: "/images/project-hero.png"
  }
};

async function getProject(slug: string) {
  try {
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project && FALLBACK_PROJECTS[slug]) return FALLBACK_PROJECTS[slug];
    return project || FALLBACK_PROJECTS["satellite-telemetry-analytics"]; // Generic fallback
  } catch {
    return FALLBACK_PROJECTS[slug] || FALLBACK_PROJECTS["satellite-telemetry-analytics"];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.overview,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const sections = [
    { icon: Layers, title: "Project Overview", content: project.overview, color: "text-blue-400" },
    { icon: Target, title: "The Problem", content: project.problem, color: "text-red-400" },
    { icon: Lightbulb, title: "Our Solution", content: project.solution, color: "text-yellow-400" },
    { icon: Cpu, title: "System Architecture", content: project.architecture, color: "text-purple-400" },
    { icon: BarChart3, title: "Impact & Results", content: project.results, color: "text-green-400" },
  ];

  return (
    <div className="pb-24">
      {/* Dynamic Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16 pt-32">
        {/* Background Image & Overlays */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${(project as any).imageUrl || '/images/project-hero.png'}')` }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent" />
        <div className="absolute inset-0 z-10 bg-black/30 dark:bg-black/50" /> {/* Extra darkening for text contrast */}

        <div className="container-max relative z-20 w-full">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          <div className="max-w-4xl">
            <Badge className="bg-[var(--color-primary)] text-white border-transparent mb-4">
              {project.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-2 mb-6 text-white tracking-tight leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              {project.title}
            </h1>
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors shadow-xl"
              >
                <Github className="w-5 h-5" /> View Source Code
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container-max mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Sections */}
          <div className="lg:col-span-2 space-y-8">
            {sections.map(({ icon: Icon, title, content, color }) => (
              content && (
                <GlassCard key={title} className="p-8 md:p-10 relative overflow-hidden group hover:border-[var(--color-primary)] transition-all duration-300">
                  <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500`}>
                    <Icon className={`w-32 h-32 ${color}`} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm">
                        <Icon className={`w-6 h-6 ${color}`} />
                      </div>
                      <h3 className="font-bold text-2xl tracking-tight">{title}</h3>
                    </div>
                    <p className="text-[var(--color-text-muted)] leading-relaxed text-base md:text-lg">
                      {content}
                    </p>
                  </div>
                </GlassCard>
              )
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <GlassCard className="p-8 sticky top-32">
              
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <Network className="w-5 h-5 text-[var(--color-cyan)]" />
                  <h3 className="font-bold text-lg tracking-tight">AI Models</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(project.aiModels) ? project.aiModels : (typeof project.aiModels === 'string' ? (project.aiModels as string).split(',') : [])).map((m: string) => (
                    <span key={m} className="text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 rounded-full px-4 py-2">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Database className="w-5 h-5 text-[var(--color-purple)]" />
                  <h3 className="font-bold text-lg tracking-tight">Technology Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(project.techStack) ? project.techStack : (typeof project.techStack === 'string' ? (project.techStack as string).split(',') : [])).map((t: string) => (
                    <span key={t} className="text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-4 py-2 hover:border-[var(--color-text-muted)] transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
            </GlassCard>
          </div>
          
        </div>
      </div>
    </div>
  );
}