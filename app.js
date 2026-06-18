/* =====================================================================
   Ujjwal Patel — Portfolio
   Single-file React app (Babel-transpiled in browser).
   Content is sourced ONLY from the résumé and the github.com/ujjwal0909
   profile + repository READMEs. No fabricated facts.
   ===================================================================== */

const { useState, useEffect, useRef, useCallback } = React;

/* ------------------------------------------------------------------ */
/*  Framer Motion resolver                                             */
/*  The UMD build can register under different global names depending  */
/*  on the CDN ("framer-motion", "Motion", "FramerMotion", ...).       */
/*  We locate it robustly, and if it's missing we fall back to plain   */
/*  DOM elements so the site ALWAYS renders (just without animation).  */
/* ------------------------------------------------------------------ */
const FM = (function resolveFramerMotion() {
  const candidates = [
    window.Motion,
    window["framer-motion"],
    window.FramerMotion,
    window.framerMotion,
  ];
  for (const c of candidates) {
    if (c && (c.motion || c.m)) return c;
  }
  return null;
})();

const motion = (function () {
  if (FM && FM.motion) return FM.motion;
  // Fallback: motion.<tag> -> a component that renders <tag> and ignores motion-only props.
  const MOTION_PROPS = new Set([
    "initial", "animate", "exit", "whileInView", "whileHover", "whileTap", "whileFocus",
    "variants", "custom", "transition", "viewport", "layout", "layoutId", "drag",
    "dragConstraints", "onViewportEnter", "onViewportLeave",
  ]);
  const cache = {};
  const make = (tag) =>
    React.forwardRef((props, ref) => {
      const clean = {};
      for (const k in props) {
        if (k === "children") continue;
        if (MOTION_PROPS.has(k)) continue;
        clean[k] = props[k];
      }
      return React.createElement(tag, Object.assign({ ref }, clean), props.children);
    });
  return new Proxy({}, {
    get(_t, prop) {
      const tag = typeof prop === "string" ? prop : "div";
      return (cache[tag] = cache[tag] || make(tag));
    },
  });
})();

const AnimatePresence = (FM && FM.AnimatePresence) || (({ children }) => React.createElement(React.Fragment, null, children));
const useScroll = (FM && FM.useScroll) || (() => ({ scrollYProgress: { get: () => 0, on: () => () => {}, current: 0 } }));
const useSpring = (FM && FM.useSpring) || ((v) => v);

if (!FM) {
  console.warn("Framer Motion not found on window — rendering without animations (site is fully functional).");
}

/* ------------------------------------------------------------------ */
/*  CONFIG — edit these if any contact detail changes                  */
/* ------------------------------------------------------------------ */
const CONFIG = {
  name: "Ujjwal Patel",
  initials: "UP",
  headline: "AI/ML Engineer",
  roles: ["AI Engineer", "Machine Learning Engineer", "Data Scientist", "Data Analyst", "Software Engineer"],
  email: "ujjwalpersonal09@gmail.com",
  phone: "+1 (469) 494-2266",
  github: "https://github.com/ujjwal0909",
  githubUser: "ujjwal0909",
  linkedin: "https://linkedin.com/in/ujjwal-patel09",
  resume: "Ujjwal_Patel_Resume.pdf",
  location: "Arlington, Texas, USA",
  // 🔧 Replace with your Formspree form ID (https://formspree.io) — e.g. "xpzgkqwl"
  formspreeId: "YOUR_FORMSPREE_ID",
};

/* ------------------------------------------------------------------ */
/*  DATA — résumé + GitHub                                             */
/* ------------------------------------------------------------------ */
const ABOUT = {
  intro:
    "I'm an AI/ML Engineer who builds machine-learning systems that survive contact with production. Over three years at Devai Technologies I shipped LLM-powered pipelines, computer-vision models, and the MLOps infrastructure that keeps them reliable — from real-time feature stores to drift-triggered retraining.",
  body:
    "I'm currently completing my Master of Science in Computer Science at the University of Texas at Arlington (graduating May 2026), with graduate coursework in Machine Learning, Artificial Intelligence, NLP, Distributed Systems, and Cloud Computing. My work sits at the intersection of applied research and engineering: fine-tuning vision models through systematic ablation, architecting RAG systems that return cited answers, and standing up Docker/Kubernetes/CI-CD pipelines so models actually reach users.",
  passion:
    "What drives me is the unglamorous part of AI — evaluation frameworks, structured-output schemas, and the routing logic that turns a flashy demo into something dependable. I care deeply about Generative AI, Large Language Models, computer vision, and the data engineering that underpins all of it.",
  goal:
    "I'm seeking AI Engineer, Machine Learning Engineer, Data Scientist, or Software Engineer roles where I can take models the whole way — from problem framing and experimentation to a deployed system with measurable impact.",
};

const SKILL_GROUPS = [
  { title: "Programming Languages", icon: "code", items: ["Python", "SQL", "R", "Bash / Shell", "C++", "Java"] },
  { title: "Machine Learning & AI", icon: "brain", items: ["Supervised Learning", "Unsupervised Learning", "Deep Learning", "Computer Vision", "NLP", "Generative AI", "Large Language Models", "Reinforcement Learning", "Multi-agent Systems"] },
  { title: "Frameworks & Libraries", icon: "stack", items: ["PyTorch", "TensorFlow", "scikit-learn", "LangChain", "LangGraph", "Hugging Face Transformers", "OpenCV", "XGBoost", "FastAPI", "spaCy", "Keras"] },
  { title: "MLOps & Deployment", icon: "rocket", items: ["MLflow", "Airflow", "Docker", "Kubernetes", "AWS SageMaker", "Azure ML", "Databricks", "CI/CD Pipelines", "GitHub Actions", "GitLab CI/CD"] },
  { title: "Data Engineering & Visualization", icon: "chart", items: ["pandas", "NumPy", "Apache Spark", "Snowflake", "Power BI", "Tableau", "Matplotlib", "Seaborn", "dbt"] },
  { title: "Cloud & Tools", icon: "cloud", items: ["AWS EC2", "AWS S3", "AWS Lambda", "GCP Vertex AI", "GCP BigQuery", "Azure", "Terraform", "Linux / Unix"] },
];

const EXPERIENCE = [
  {
    role: "AI/ML Engineer",
    company: "Devai Technologies",
    location: "Pune, India",
    period: "Jul 2021 – Jul 2024",
    summary: "Owned ML systems end to end — from data ingestion and model fine-tuning to deployment, evaluation, and the infrastructure that kept everything running in production.",
    points: [
      "Developed a real-time telematics feature store using Apache Spark and Snowflake, ingesting 150K+ behavioral records daily and trimming data-processing overhead by 40% while improving downstream model accuracy.",
      "Fine-tuned EfficientNet-based computer-vision models through 30+ systematic ablation studies, achieving 84.12% classification accuracy across 200 categories and surpassing the pre-training baseline by 12%.",
      "Engineered an automated ML retraining system with Airflow and MLflow — scheduling drift-triggered retraining, versioning experiment runs, and eliminating 35% of model-degradation incidents across 24 release cycles.",
      "Constructed an end-to-end model-evaluation framework with A/B testing, anomaly alerting, and precision / recall / F1 tracking across 8 KPIs, eliminating 35% of post-deployment failures before they reached production.",
      "Deployed a transformer-based NLP classification platform on AWS with Kubernetes, serving text-extraction and intent-classification models at sub-300ms latency with 99%+ uptime.",
      "Built production LLM-powered pipelines using LangChain and RAG architectures (2023–2024), driving task error rate from 18% to under 4% while processing 1,000+ requests daily in production.",
      "Shipped ML infrastructure tooling across Docker, Kubernetes, and CI/CD pipelines, establishing consistent deployment standards and improving sprint delivery velocity by 30%.",
    ],
    tech: ["Apache Spark", "Snowflake", "EfficientNet", "PyTorch", "Airflow", "MLflow", "LangChain", "RAG", "AWS", "Kubernetes", "Docker", "CI/CD"],
  },
];

/* Projects — ordered by relevance/quality. `featured: true` => top 3.
   Descriptions improved for clarity but kept faithful to the READMEs. */
const PROJECTS = [
  {
    name: "MeetingMemory",
    featured: true,
    tagline: "Hybrid graph + vector RAG that answers questions about your meetings — with citations.",
    description:
      "A hybrid graph-RAG system that ingests meeting transcripts and builds a queryable knowledge graph of decisions, commitments, people, and projects. A query router dispatches to a NetworkX relationship graph, a FAISS vector store, or both — answering structural questions pure vector RAG can't.",
    highlights: [
      "89% answer accuracy with a query router delivering a 2× quality gain over pure vector RAG",
      "91% decision recall and 94% citation precision at 2.4s p50 latency",
      "Pairwise cross-meeting contradiction detection at 82% precision",
    ],
    problem: "Knowledge workers forget ~80% of what's discussed in meetings, and nobody re-reads transcripts.",
    learnings: "Extraction quality — not retrieval cleverness — drove the wins; storing source spans at ingestion made citations nearly free.",
    tech: ["Python", "Claude Sonnet", "NetworkX", "FAISS", "sentence-transformers", "Pydantic", "Streamlit"],
    topics: ["RAG", "Knowledge Graph", "LLM", "Vector Search"],
    repo: "https://github.com/ujjwal0909/meetingmemory",
    demo: null,
    lang: "Python",
  },
  {
    name: "MealMind",
    featured: true,
    tagline: "Point your phone at your fridge. Get dinner in under 10 seconds.",
    description:
      "A three-stage vision-LLM pipeline that turns a single fridge photo into 3 ranked recipes. Claude Sonnet vision identifies ingredients and estimates quantities; a multi-objective function ranks recipes by perishable use, prep time, and learned taste preferences.",
    highlights: [
      "Raised recipe feasibility from 41% to 87% on 100 fridge photos across 5 households",
      "89% inventory-use accuracy via Pydantic schemas + a 5-bucket quantity calibration step (~60% fewer hallucinated ingredients)",
      "Lifted user 'would make this' rate from 38% to 74% with a skip/made-it preference loop",
    ],
    problem: "Households waste ~$1,500 of food a year because manually typing ingredients into recipe apps is exhausting.",
    learnings: "Vision LLMs need strict output schemas; bucketing quantities beat free-text estimation; explicit negative ('skip') signal captured 3× more learning.",
    tech: ["Python", "Claude Sonnet Vision", "Pydantic", "Streamlit", "Pillow"],
    topics: ["Computer Vision", "LLM", "Multi-objective Ranking"],
    repo: "https://github.com/ujjwal0909/mealmind",
    demo: null,
    lang: "Python",
  },
  {
    name: "InboxZero AI",
    featured: true,
    tagline: "An email triage assistant that learns your voice and drafts replies that sound like you.",
    description:
      "Connects to Gmail, learns your writing style from your sent folder via embedding-based voice cloning, and generates editable draft replies. A Haiku classifier scores urgency and required action; a Sonnet drafter uses the 5 most stylistically similar past replies as few-shot examples.",
    highlights: [
      "91% draft-acceptance rate (sent without major edits) on 200 held-out emails from 4 users",
      "Classifier-first routing through Haiku before Sonnet cut per-email cost by 70% with no quality drop",
      "Reduced average response time from ~4 min to ~30s",
    ],
    problem: "Knowledge workers spend ~2.5 hours/day on email, and generic AI replies obviously don't sound like the sender.",
    learnings: "Hybrid stylometric + semantic embeddings beat raw embeddings for voice; few-shot retrieval beat fine-tuning at 100-email scale.",
    tech: ["Python", "Claude Sonnet", "Claude Haiku", "FAISS", "sentence-transformers", "Gmail API", "Streamlit"],
    topics: ["NLP", "Embeddings", "Email AI"],
    repo: "https://github.com/ujjwal0909/inboxzero-ai",
    demo: null,
    lang: "Python",
  },
  {
    name: "EfficientNet Bird Species Classifier",
    featured: false,
    tagline: "Fine-grained 200-class bird recognition with transfer learning.",
    description:
      "A computer-vision classifier built on EfficientNetB0 with ImageNet transfer learning, fine-tuned across 200 bird species. Used data augmentation (rotation, flipping, scaling) for robustness, with a script for single-image inference. (Collaborative project — led the EfficientNetB0 model and training pipeline.)",
    highlights: [
      "84.12% test accuracy across 200 fine-grained species",
      "Transfer learning from ImageNet with targeted fine-tuning",
      "Augmentation pipeline (rotation / flip / scale) for model robustness",
    ],
    problem: "Fine-grained visual recognition across 200 visually similar bird species is a hard classification problem.",
    learnings: "Transfer learning plus disciplined augmentation closed most of the gap to a strong baseline.",
    tech: ["Python", "PyTorch", "torchvision", "EfficientNet", "NumPy", "Matplotlib"],
    topics: ["Computer Vision", "Transfer Learning", "Deep Learning"],
    repo: "https://github.com/ujjwal0909/efficientnet-bird-species-classifier",
    demo: null,
    lang: "Jupyter Notebook",
  },
  {
    name: "Telematics Insurance Prediction Dashboard",
    featured: false,
    tagline: "Interactive driver-risk scoring and premium analytics.",
    description:
      "A Streamlit analytics dashboard that predicts driver risk (Low / Medium / High), assesses premiums, and visualizes telematics data. Ships with pre-trained Random Forest, XGBoost, and neural-network models and supports external data sources such as Dallas Open Data.",
    highlights: [
      "Three trained model options (Random Forest, XGBoost, Neural Network) with a shared scaler/encoder",
      "Interactive KPIs, driving-behavior charts, and peer comparison",
      "External API integration for richer, real-world features",
    ],
    problem: "Insurers need interpretable, behavior-based risk scoring rather than static actuarial tables.",
    learnings: "Packaging multiple models behind one dashboard makes risk scoring explainable and comparable.",
    tech: ["Python", "Streamlit", "scikit-learn", "XGBoost", "Plotly", "pandas"],
    topics: ["Data Science", "Risk Modeling", "Dashboards"],
    repo: "https://github.com/ujjwal0909/Telematics-based-auto-insurance",
    demo: null,
    lang: "Python",
  },
  {
    name: "Multi-Agent AI Reasoning System",
    featured: false,
    tagline: "A fully local, multi-agent reasoning system with RAG and explainable traces.",
    description:
      "A production-style multi-agent system that runs entirely locally on open-source LLMs (via Ollama). Planner, Reasoner, and an optional Critic agent execute conditionally, with FAISS-backed RAG for document-grounded answers and a dashboard showing full reasoning traces and confidence scores.",
    highlights: [
      "Conditional multi-agent execution (only required agents run)",
      "FAISS RAG for document-grounded, citable answers",
      "Runs on ~8 GB RAM with a FastAPI backend and interactive dashboard",
    ],
    problem: "Most agent demos depend on cloud APIs and hide their reasoning; this one is private and explainable.",
    learnings: "A lightweight planner + conditional execution keeps local LLMs fast without sacrificing answer structure.",
    tech: ["Python", "FastAPI", "Ollama", "Llama 3.2", "FAISS", "RAG"],
    topics: ["Multi-agent Systems", "LLM", "RAG", "Explainable AI"],
    repo: "https://github.com/ujjwal0909/Multi-Agent-AI-System",
    demo: null,
    lang: "Python",
  },
  {
    name: "Distributed Online Auction Platform",
    featured: false,
    tagline: "Two contrasting distributed architectures for a real-time auction system.",
    description:
      "A distributed online auction platform implemented twice — once as Go microservices with a gRPC-inspired layer, once as a Python layered architecture over HTTP — to compare design trade-offs. Supports creating auctions, bidding, real-time broadcast via server-sent events, closing, and history across 5+ containerized nodes.",
    highlights: [
      "Two architectures (Go microservices vs. Python layered) for direct comparison",
      "Real-time updates via server-sent events — no polling",
      "Dockerized across 5+ nodes with a benchmark script for latency/throughput",
    ],
    problem: "Distributed systems force trade-offs between architectural styles; this project measures them head-to-head.",
    learnings: "SSE delivered instant UI updates cleanly; containerizing both stacks made benchmarking apples-to-apples.",
    tech: ["Go", "Python", "Docker", "Docker Compose", "gRPC", "Server-Sent Events"],
    topics: ["Distributed Systems", "Microservices", "Real-time"],
    repo: "https://github.com/ujjwal0909/Distributed-Online-Auction-Platform",
    demo: null,
    lang: "Go",
  },
  {
    name: "ANN Customer Churn Classification",
    featured: false,
    tagline: "An artificial neural network for customer-churn prediction.",
    description:
      "A deep-learning classifier that predicts customer churn from tabular features, built as an end-to-end notebook covering preprocessing, model training, and evaluation.",
    highlights: ["Artificial neural network for binary churn classification", "End-to-end preprocessing and evaluation workflow"],
    problem: "Predicting which customers will churn lets businesses intervene before they leave.",
    learnings: "Careful feature preparation matters as much as network architecture for tabular deep learning.",
    tech: ["Python", "TensorFlow", "Keras", "pandas", "scikit-learn"],
    topics: ["Deep Learning", "Classification"],
    repo: "https://github.com/ujjwal0909/ANN-CHURN-CLASSIFICATION",
    demo: null,
    lang: "Jupyter Notebook",
  },
  {
    name: "Resume ATS Tracking System",
    featured: false,
    tagline: "Gemini-powered resume / job-description matching.",
    description:
      "An applicant-tracking-style tool that uses Google Gemini Pro Vision to evaluate resumes against job descriptions, surfacing match percentage and missing keywords to help candidates tailor applications.",
    highlights: ["Resume-vs-JD matching with percentage scoring", "Keyword-gap analysis for ATS optimization"],
    problem: "Candidates rarely know how well their resume aligns with a specific job posting.",
    learnings: "Multimodal LLMs can parse and reason over document layout, not just plain text.",
    tech: ["Python", "Google Gemini", "Streamlit"],
    topics: ["Generative AI", "NLP", "Document AI"],
    repo: "https://github.com/ujjwal0909/Resume-Application-Tracking-System-using-Google-Gemini-Pro-Vision",
    demo: null,
    lang: "Python",
  },
  {
    name: "YouTube Transcript → Notes Converter",
    featured: false,
    tagline: "Turn any YouTube video into detailed, structured notes.",
    description:
      "A generative-AI app that pulls a YouTube transcript and uses an LLM to produce concise, structured study notes — collapsing long-form video into readable summaries.",
    highlights: ["Automatic transcript extraction", "LLM-generated structured notes from long videos"],
    problem: "Watching long videos to extract a few key points is slow.",
    learnings: "Good prompt structure turns raw transcripts into genuinely useful notes.",
    tech: ["Python", "Google Gemini", "Streamlit", "YouTube Transcript API"],
    topics: ["Generative AI", "NLP", "Summarization"],
    repo: "https://github.com/ujjwal0909/YouTube-Transcript-to-Detailed-Notes-Converter",
    demo: null,
    lang: "Python",
  },
];

const EDUCATION = [
  {
    school: "University of Texas at Arlington",
    degree: "Master of Science in Computer Science",
    status: "In Progress",
    location: "Texas, USA",
    period: "Graduating May 2026",
    gpa: "3.5 / 4.0",
    courses: ["Machine Learning", "Artificial Intelligence", "NLP", "Distributed Systems", "Cloud Computing"],
  },
  {
    school: "Mumbai University",
    degree: "Bachelor of Science in Computer Science",
    status: null,
    location: "India",
    period: "Graduated May 2023",
    gpa: "3.8 / 4.0",
    courses: ["Statistics", "Data Analysis", "Computer Vision", "Data Mining", "NLP"],
  },
];

const CERTIFICATIONS = [
  {
    title: "OCI 2025 Certified Generative AI Professional",
    issuer: "Oracle Cloud Infrastructure",
    note: "Generative AI specialization on Oracle Cloud Infrastructure.",
  },
  {
    title: "OCI 2025 Certified AI Foundations Associate",
    issuer: "Oracle Cloud Infrastructure",
    note: "Foundational AI certification on Oracle Cloud Infrastructure.",
  },
  {
    title: "Google Cloud Facilitator Program",
    issuer: "Google Cloud",
    note: "13+ skill badges earned across the Google Cloud Facilitator Program.",
  },
];

const ACHIEVEMENTS = [
  { metric: "84.12%", label: "Computer-vision accuracy across 200 categories — 12% above the pre-training baseline." },
  { metric: "<4%", label: "Production LLM task error rate, driven down from 18% on 1,000+ daily requests." },
  { metric: "150K+", label: "Behavioral records ingested daily by a real-time telematics feature store." },
  { metric: "13+", label: "Google Cloud skill badges earned through the Facilitator Program." },
  { metric: "99%+", label: "Uptime for a transformer NLP platform serving at sub-300ms latency." },
  { metric: "30%", label: "Improvement in sprint delivery velocity from standardized ML infrastructure." },
];

const NAV_LINKS = [
  ["about", "About"], ["skills", "Skills"], ["experience", "Experience"],
  ["projects", "Projects"], ["education", "Education"], ["github", "GitHub"], ["contact", "Contact"],
];

/* ================================================================== */
/*  ICONS — lightweight inline SVGs (no external icon lib needed)      */
/* ================================================================== */
const Icon = ({ name, className = "w-5 h-5" }) => {
  const p = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24" };
  const paths = {
    github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />,
    linkedin: <g><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></g>,
    mail: <g><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></g>,
    download: <g><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></g>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
    sun: <g><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></g>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    arrowDown: <path d="M12 5v14M19 12l-7 7-7-7" />,
    external: <g><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14 21 3" /></g>,
    code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
    brain: <path d="M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18.5V5zM12 5a3 3 0 1 1 5.997.142 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18.5V5z" />,
    stack: <g><path d="m12 2 9 5-9 5-9-5 9-5z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></g>,
    rocket: <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />,
    chart: <g><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></g>,
    cloud: <path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 4 15.7" />,
    check: <path d="M20 6 9 17l-5-5" />,
    spark: <path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2L12 3z" />,
    bulb: <g><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" /></g>,
    target: <g><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></g>,
    cap: <g><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></g>,
    award: <g><circle cx="12" cy="8" r="6" /><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" /></g>,
    briefcase: <g><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></g>,
    location: <g><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></g>,
    send: <path d="m22 2-7 20-4-9-9-4 20-7z" />,
    menu: <path d="M3 12h18M3 6h18M3 18h18" />,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    users: <g><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></g>,
    repo: <g><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></g>,
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  };
  return <svg {...p} aria-hidden="true">{paths[name] || null}</svg>;
};

/* ================================================================== */
/*  SHARED UI PRIMITIVES                                               */
/* ================================================================== */
const SectionTitle = ({ kicker, title, sub }) => (
  <div className="text-center max-w-2xl mx-auto mb-14">
    {kicker && (
      <motion.span
        initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="inline-block text-xs font-mono tracking-[0.25em] uppercase text-accent-soft mb-3">
        {kicker}
      </motion.span>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
      {title}
    </motion.h2>
    {sub && <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">{sub}</p>}
  </div>
);

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={"relative py-20 sm:py-28 px-5 sm:px-8 " + className}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] } }),
};

const Pill = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-xs font-medium glass text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10">
    {children}
  </span>
);

/* ================================================================== */
/*  NAVBAR + THEME TOGGLE                                              */
/* ================================================================== */
function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const stored = (() => { try { return localStorage.getItem("theme"); } catch (e) { return null; } })();
    const initial = stored || "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    document.documentElement.classList.toggle("light", initial === "light");
  }, []);
  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.classList.toggle("light", next === "light");
      try { localStorage.setItem("theme", next); } catch (e) {}
      return next;
    });
  }, []);
  return [theme, toggle];
}

function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...NAV_LINKS.map((l) => l[0])];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const go = (id) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      className={"fixed top-0 inset-x-0 z-50 transition-all duration-300 " + (scrolled ? "py-2" : "py-4")}>
      <nav className={"max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between rounded-2xl transition-all duration-300 " + (scrolled ? "glass py-2.5 shadow-lg" : "py-2")}>
        <button onClick={() => go("hero")} className="flex items-center gap-2 group" aria-label="Home">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-soft to-accent-deep grid place-items-center font-display font-bold text-white text-sm shadow-lg shadow-accent/30 group-hover:scale-105 transition-transform">
            {CONFIG.initials}
          </span>
          <span className="font-display font-bold text-slate-900 dark:text-white hidden sm:block">{CONFIG.name}</span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}
              className={"nav-link text-sm font-medium transition-colors text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent-soft " + (active === id ? "active text-accent dark:text-accent-soft" : "")}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} aria-label="Toggle dark mode"
            className="w-9 h-9 grid place-items-center rounded-xl glass text-slate-700 dark:text-slate-200 hover:text-accent dark:hover:text-accent-soft transition-colors">
            <Icon name={theme === "dark" ? "sun" : "moon"} className="w-[18px] h-[18px]" />
          </button>
          <a href={CONFIG.resume} download
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-accent hover:bg-accent-deep text-white transition-colors shadow-lg shadow-accent/25">
            <Icon name="download" className="w-4 h-4" /> Résumé
          </a>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}
            className="md:hidden w-9 h-9 grid place-items-center rounded-xl glass text-slate-700 dark:text-slate-200">
            <Icon name={open ? "close" : "menu"} className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden max-w-6xl mx-auto px-4 mt-2">
            <div className="glass rounded-2xl p-3 flex flex-col gap-1 shadow-xl">
              {NAV_LINKS.map(([id, label]) => (
                <button key={id} onClick={() => go(id)}
                  className="text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-accent/10 hover:text-accent dark:hover:text-accent-soft transition-colors">
                  {label}
                </button>
              ))}
              <a href={CONFIG.resume} download className="mt-1 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-accent text-white">
                <Icon name="download" className="w-4 h-4" /> Download Résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ================================================================== */
/*  HERO — typing animation, profile placeholder, action buttons       */
/* ================================================================== */
function useTypewriter(words, { type = 90, del = 45, hold = 1600 } = {}) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    let t;
    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === "") {
      setDeleting(false); setI((p) => p + 1);
    } else {
      t = setTimeout(() => {
        setText((prev) => current.substring(0, deleting ? prev.length - 1 : prev.length + 1));
      }, deleting ? del : type);
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, type, del, hold]);
  return text;
}

function Hero() {
  const typed = useTypewriter(CONFIG.roles);
  const actions = [
    { label: "GitHub", icon: "github", href: CONFIG.github, ext: true },
    { label: "LinkedIn", icon: "linkedin", href: CONFIG.linkedin, ext: true },
    { label: "Email", icon: "mail", href: "mailto:" + CONFIG.email },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-5 sm:px-8 pt-28 pb-16 overflow-hidden">
      {/* floating decorative blobs */}
      <div aria-hidden className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-float" />
      <div aria-hidden className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-accent-deep/15 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center relative z-10">
        {/* Left: copy */}
        <div>
          <motion.div initial="hidden" animate="show" variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-slate-600 dark:text-slate-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to AI / ML & Data Science roles
          </motion.div>

          <motion.p initial="hidden" animate="show" custom={1} variants={fadeUp}
            className="font-mono text-accent-soft text-sm sm:text-base mb-3">Hi, I'm</motion.p>

          <motion.h1 initial="hidden" animate="show" custom={2} variants={fadeUp}
            className="font-display font-extrabold tracking-tight text-5xl sm:text-6xl md:text-7xl text-slate-900 dark:text-white leading-[1.05]">
            {CONFIG.name}
          </motion.h1>

          <motion.div initial="hidden" animate="show" custom={3} variants={fadeUp}
            className="mt-4 text-2xl sm:text-3xl md:text-4xl font-display font-bold">
            <span className="text-slate-500 dark:text-slate-400">I build as a </span>
            <span className="text-gradient">{typed}</span>
            <span className="text-accent animate-blink font-light">|</span>
          </motion.div>

          <motion.p initial="hidden" animate="show" custom={4} variants={fadeUp}
            className="mt-6 max-w-xl text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            AI/ML Engineer shipping production LLM pipelines, computer-vision models, and the MLOps
            infrastructure that keeps them reliable. Currently completing an MS in Computer Science
            at UT Arlington.
          </motion.p>

          {/* Primary CTAs */}
          <motion.div initial="hidden" animate="show" custom={5} variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href={CONFIG.resume} download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-accent hover:bg-accent-deep text-white shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5 transition-all">
              <Icon name="download" className="w-5 h-5" /> Download Résumé
            </a>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold glass text-slate-800 dark:text-white hover:border-accent/50 hover:-translate-y-0.5 transition-all">
              <Icon name="send" className="w-5 h-5" /> Contact Me
            </button>
          </motion.div>

          {/* Secondary icon links */}
          <motion.div initial="hidden" animate="show" custom={6} variants={fadeUp} className="mt-6 flex flex-wrap gap-2.5">
            {actions.map((a) => (
              <a key={a.label} href={a.href} target={a.ext ? "_blank" : undefined} rel={a.ext ? "noopener noreferrer" : undefined}
                aria-label={a.label}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent-soft hover:border-accent/40 transition-all">
                <Icon name={a.icon} className="w-4 h-4" /> {a.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: profile placeholder */}
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:flex justify-center">
          <div className="relative">
            <div aria-hidden className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-accent to-accent-deep blur-2xl opacity-40 animate-float" />
            <div className="relative w-72 h-80 rounded-[2rem] glass border-2 border-white/10 overflow-hidden grid place-items-center card-hover">
              {/* Replace this block with an <img src="profile.jpg" .../> when you add a photo */}
              <div className="text-center px-6">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-accent-soft to-accent-deep grid place-items-center font-display font-extrabold text-white text-4xl shadow-xl shadow-accent/40">
                  {CONFIG.initials}
                </div>
                <p className="mt-5 font-display font-bold text-slate-800 dark:text-white text-lg">{CONFIG.name}</p>
                <p className="text-sm text-accent-soft font-mono mt-1">{CONFIG.headline}</p>
                <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-500 flex items-center justify-center gap-1">
                  <Icon name="location" className="w-3 h-3" /> {CONFIG.location}
                </p>
              </div>
            </div>
            {/* floating tech badges */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="absolute -left-8 top-10 glass rounded-xl px-3 py-2 text-xs font-mono font-semibold text-accent-soft shadow-lg">PyTorch</motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }}
              className="absolute -right-6 top-28 glass rounded-xl px-3 py-2 text-xs font-mono font-semibold text-accent-soft shadow-lg">LangChain</motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity }}
              className="absolute -right-4 bottom-12 glass rounded-xl px-3 py-2 text-xs font-mono font-semibold text-accent-soft shadow-lg">RAG</motion.div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to About"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-accent transition-colors">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <Icon name="arrowDown" className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}

/* ================================================================== */
/*  ABOUT                                                              */
/* ================================================================== */
function About() {
  const cards = [
    { icon: "cap", title: "Education", text: "MS in Computer Science at UT Arlington (May 2026); BS from Mumbai University." },
    { icon: "brain", title: "Technical Expertise", text: "LLMs & RAG, computer vision, deep learning, and end-to-end MLOps." },
    { icon: "target", title: "Career Goal", text: "AI / ML Engineer, Data Scientist, or Software Engineer roles with real ownership." },
    { icon: "spark", title: "What I Love", text: "Evaluation frameworks, structured outputs, and turning demos into dependable systems." },
  ];
  return (
    <Section id="about">
      <SectionTitle kicker="01 — About" title="About Me" />
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="space-y-5 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          <p>{ABOUT.intro}</p>
          <p>{ABOUT.body}</p>
          <p>{ABOUT.passion}</p>
          <p className="text-slate-800 dark:text-white font-medium border-l-2 border-accent pl-4">{ABOUT.goal}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <motion.div key={c.title} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="glass rounded-2xl p-5 card-hover">
              <div className="w-11 h-11 rounded-xl bg-accent/10 grid place-items-center text-accent dark:text-accent-soft mb-3">
                <Icon name={c.icon} className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white mb-1">{c.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  SKILLS                                                             */
/* ================================================================== */
function Skills() {
  const marquee = ["Python", "PyTorch", "TensorFlow", "LangChain", "RAG", "AWS", "Docker", "Kubernetes", "MLflow", "Airflow", "Snowflake", "Spark", "FAISS", "scikit-learn", "FastAPI", "Hugging Face"];
  return (
    <Section id="skills">
      <SectionTitle kicker="02 — Toolkit" title="Skills & Technologies"
        sub="The languages, frameworks, and platforms I use to take models from notebook to production." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div key={g.title} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
            className="glass rounded-2xl p-6 card-hover">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 grid place-items-center text-accent dark:text-accent-soft">
                <Icon name={g.icon} className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-[15px]">{g.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <span key={it}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:border-accent/50 hover:text-accent dark:hover:text-accent-soft transition-colors">
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* infinite marquee strip */}
      <div className="marquee-wrap mt-12 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0f] dark:from-[#0a0a0f] to-transparent z-10 hidden dark:block" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0f] dark:from-[#0a0a0f] to-transparent z-10 hidden dark:block" />
        <div className="marquee-track flex gap-3 w-max">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="px-4 py-2 rounded-xl glass text-sm font-mono font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">{m}</span>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  EXPERIENCE — timeline                                              */
/* ================================================================== */
function Experience() {
  return (
    <Section id="experience">
      <SectionTitle kicker="03 — Career" title="Work Experience"
        sub="Three years owning machine-learning systems end to end — research, engineering, and production." />
      <div className="relative max-w-4xl mx-auto">
        {/* vertical line */}
        <div aria-hidden className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent sm:-translate-x-1/2" />
        {EXPERIENCE.map((job, i) => (
          <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="relative pl-12 sm:pl-0">
            {/* node */}
            <span aria-hidden className="absolute left-4 sm:left-1/2 top-3 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-accent/20 sm:-translate-x-1/2" />
            <div className="glass rounded-2xl p-6 sm:p-7 card-hover sm:w-[calc(50%-2rem)] sm:ml-auto">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-accent/10 grid place-items-center text-accent dark:text-accent-soft shrink-0">
                  <Icon name="briefcase" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-tight">{job.role}</h3>
                  <p className="text-accent dark:text-accent-soft font-semibold text-sm">{job.company}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2 flex-wrap">
                    <span>{job.period}</span><span className="opacity-40">•</span>
                    <span className="inline-flex items-center gap-1"><Icon name="location" className="w-3 h-3" />{job.location}</span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{job.summary}</p>
              <ul className="space-y-2.5 mb-5">
                {job.points.map((pt, j) => (
                  <li key={j} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <Icon name="check" className="w-4 h-4 text-accent dark:text-accent-soft shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200/60 dark:border-white/5">
                {job.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-accent/10 text-accent dark:text-accent-soft">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  PROJECTS                                                           */
/* ================================================================== */
function FeaturedCard({ p, i }) {
  return (
    <motion.article initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
      className="glass rounded-3xl overflow-hidden card-hover flex flex-col group">
      {/* header band */}
      <div className="relative h-32 bg-gradient-to-br from-accent/20 via-accent-deep/10 to-transparent grid place-items-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, rgba(96,165,250,0.4), transparent 60%)" }} />
        <span className="relative font-display font-extrabold text-2xl text-slate-900 dark:text-white px-6 text-center">{p.name}</span>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-white text-[10px] font-bold tracking-wide">
          <Icon name="star" className="w-3 h-3" /> FEATURED
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-accent dark:text-accent-soft text-sm font-medium italic mb-3">{p.tagline}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{p.description}</p>

        <div className="mb-4">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-2">Key Results</p>
          <ul className="space-y-1.5">
            {p.highlights.map((h, j) => (
              <li key={j} className="flex gap-2 text-[13px] text-slate-600 dark:text-slate-300 leading-snug">
                <Icon name="check" className="w-3.5 h-3.5 text-green-500 dark:text-green-400 shrink-0 mt-0.5" /><span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {p.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5">{t}</span>
          ))}
        </div>

        <div className="flex gap-2 pt-4 border-t border-slate-200/60 dark:border-white/5">
          <a href={p.repo} target="_blank" rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-accent hover:bg-accent-deep text-white transition-colors">
            <Icon name="github" className="w-4 h-4" /> Code
          </a>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold glass hover:border-accent/50 text-slate-800 dark:text-white transition-colors">
              <Icon name="external" className="w-4 h-4" /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function CompactCard({ p, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
      className="glass rounded-2xl p-5 card-hover flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-display font-bold text-slate-900 dark:text-white leading-tight">{p.name}</h3>
        <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-accent/10 text-accent dark:text-accent-soft">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />{p.lang}
        </span>
      </div>
      <p className="text-[13px] text-accent dark:text-accent-soft italic mb-2">{p.tagline}</p>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {open ? p.description : (p.description.length > 130 ? p.description.slice(0, 130).trim() + "…" : p.description)}
      </p>
      {p.description.length > 130 && (
        <button onClick={() => setOpen((o) => !o)} className="self-start mt-1 text-xs font-semibold text-accent dark:text-accent-soft hover:underline">
          {open ? "Show less" : "Read more"}
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <ul className="space-y-1.5 mt-3">
              {p.highlights.map((h, j) => (
                <li key={j} className="flex gap-2 text-[13px] text-slate-600 dark:text-slate-300 leading-snug">
                  <Icon name="check" className="w-3.5 h-3.5 text-green-500 dark:text-green-400 shrink-0 mt-0.5" /><span>{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-1.5 my-4 mt-3">
        {p.tech.slice(0, 5).map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5">{t}</span>
        ))}
        {p.tech.length > 5 && <span className="px-2 py-0.5 text-[11px] text-slate-400">+{p.tech.length - 5}</span>}
      </div>

      <div className="flex gap-2 mt-auto pt-3 border-t border-slate-200/60 dark:border-white/5">
        <a href={p.repo} target="_blank" rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold glass hover:border-accent/50 text-slate-800 dark:text-white transition-colors">
          <Icon name="github" className="w-4 h-4" /> View Code
        </a>
        {p.demo && (
          <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label="Live demo"
            className="inline-flex items-center justify-center px-3 py-2 rounded-xl glass hover:border-accent/50 text-slate-800 dark:text-white transition-colors">
            <Icon name="external" className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  return (
    <Section id="projects">
      <SectionTitle kicker="04 — Work" title="Projects"
        sub="Selected work from my GitHub. Featured projects ship measurable results; the rest span CV, NLP, distributed systems, and data science." />

      {/* Featured */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {featured.map((p, i) => <FeaturedCard key={p.name} p={p} i={i} />)}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">More projects</span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((p, i) => <CompactCard key={p.name} p={p} i={i} />)}
      </div>

      <div className="text-center mt-12">
        <a href={CONFIG.github} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold glass hover:border-accent/50 text-slate-800 dark:text-white hover:-translate-y-0.5 transition-all">
          <Icon name="github" className="w-5 h-5" /> See all repositories on GitHub
        </a>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  EDUCATION                                                          */
/* ================================================================== */
function Education() {
  return (
    <Section id="education">
      <SectionTitle kicker="05 — Background" title="Education" />
      <div className="relative max-w-3xl mx-auto">
        <div aria-hidden className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />
        <div className="space-y-6">
          {EDUCATION.map((e, i) => (
            <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="relative pl-14">
              <span aria-hidden className="absolute left-5 top-5 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-accent/20 -translate-x-1/2" />
              <div className="glass rounded-2xl p-6 card-hover">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{e.school}</h3>
                    <p className="text-accent dark:text-accent-soft font-semibold text-sm">
                      {e.degree}{e.status && <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400">{e.status}</span>}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{e.period}</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">GPA {e.gpa}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
                  <Icon name="location" className="w-3 h-3" /> {e.location}
                </p>
                <div className="flex flex-wrap gap-2">
                  {e.courses.map((c) => (
                    <span key={c} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5">{c}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  CERTIFICATIONS + ACHIEVEMENTS                                      */
/* ================================================================== */
function CertsAndAchievements() {
  return (
    <Section id="certifications">
      <SectionTitle kicker="06 — Recognition" title="Certifications & Achievements" />

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Certifications */}
        <div>
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg mb-5 flex items-center gap-2">
            <Icon name="award" className="w-5 h-5 text-accent dark:text-accent-soft" /> Certifications
          </h3>
          <div className="space-y-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="glass rounded-2xl p-5 card-hover flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/10 grid place-items-center text-accent dark:text-accent-soft shrink-0">
                  <Icon name="award" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-[15px] leading-tight">{c.title}</h4>
                  <p className="text-accent dark:text-accent-soft text-xs font-medium mt-0.5">{c.issuer}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">{c.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg mb-5 flex items-center gap-2">
            <Icon name="spark" className="w-5 h-5 text-accent dark:text-accent-soft" /> Key Achievements
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="glass rounded-2xl p-5 card-hover">
                <p className="font-display font-extrabold text-3xl text-gradient">{a.metric}</p>
                <p className="text-[13px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{a.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  GITHUB — live stats + contribution graph + streak               */
/* ================================================================== */
function GitHubSection({ theme }) {
  const [stats, setStats] = useState(null);
  const [err, setErr] = useState(false);
  const user = CONFIG.githubUser;

  useEffect(() => {
    let alive = true;
    fetch("https://api.github.com/users/" + user)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { if (alive) setStats(d); })
      .catch(() => { if (alive) setErr(true); });
    return () => { alive = false; };
  }, [user]);

  // theme-aware images from public read-only widgets
  const t = theme === "light" ? "default" : "tokyonight";
  const streakTheme = theme === "light" ? "default" : "tokyonight";
  const statCards = [
    { label: "Public Repos", value: stats ? stats.public_repos : "—", icon: "repo" },
    { label: "Followers", value: stats ? stats.followers : "—", icon: "users" },
    { label: "Following", value: stats ? stats.following : "—", icon: "users" },
    { label: "Member Since", value: stats ? new Date(stats.created_at).getFullYear() : "—", icon: "github" },
  ];

  return (
    <Section id="github">
      <SectionTitle kicker="07 — Activity" title="GitHub"
        sub="Live stats pulled from the GitHub API, plus contribution and language insights." />

      {/* Live numeric stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => (
          <motion.div key={s.label} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
            className="glass rounded-2xl p-5 text-center card-hover">
            <div className="w-10 h-10 mx-auto rounded-xl bg-accent/10 grid place-items-center text-accent dark:text-accent-soft mb-3">
              <Icon name={s.icon} className="w-5 h-5" />
            </div>
            <p className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Stat + language cards (image widgets) */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="glass rounded-2xl p-3 card-hover overflow-hidden">
          <img loading="lazy" alt={"GitHub statistics for " + user} className="w-full rounded-xl"
            src={"https://github-readme-stats.vercel.app/api?username=" + user + "&show_icons=true&hide_border=true&theme=" + t + "&count_private=true"} />
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} variants={fadeUp} className="glass rounded-2xl p-3 card-hover overflow-hidden">
          <img loading="lazy" alt={"Most used languages for " + user} className="w-full rounded-xl"
            src={"https://github-readme-stats.vercel.app/api/top-langs/?username=" + user + "&layout=compact&hide_border=true&theme=" + t + "&langs_count=8"} />
        </motion.div>
      </div>

      {/* Streak */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="glass rounded-2xl p-3 card-hover overflow-hidden mb-5">
        <img loading="lazy" alt={"GitHub contribution streak for " + user} className="w-full rounded-xl"
          src={"https://github-readme-streak-stats.herokuapp.com/?user=" + user + "&hide_border=true&theme=" + streakTheme} />
      </motion.div>

      {/* Contribution graph */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="glass rounded-2xl p-3 card-hover overflow-hidden">
        <img loading="lazy" alt={"Contribution graph for " + user} className="w-full rounded-xl"
          src={"https://github-readme-activity-graph.vercel.app/graph?username=" + user + "&hide_border=true&area=true&theme=" + (theme === "light" ? "minimal" : "tokyo-night")} />
      </motion.div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-5">
        Contribution, language, and streak widgets are rendered from public GitHub read-only services and update automatically.
      </p>
    </Section>
  );
}

/* ================================================================== */
/*  CONTACT — Formspree form                                          */
/* ================================================================== */
function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const configured = CONFIG.formspreeId && CONFIG.formspreeId !== "YOUR_FORMSPREE_ID";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!configured) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/" + CONFIG.formspreeId, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (res.ok) { setStatus("ok"); e.target.reset(); }
      else setStatus("error");
    } catch (_) { setStatus("error"); }
  };

  const links = [
    { icon: "mail", label: "Email", value: CONFIG.email, href: "mailto:" + CONFIG.email },
    { icon: "linkedin", label: "LinkedIn", value: "in/ujjwal-patel09", href: CONFIG.linkedin, ext: true },
    { icon: "github", label: "GitHub", value: "@" + CONFIG.githubUser, href: CONFIG.github, ext: true },
    { icon: "phone", label: "Phone", value: CONFIG.phone, href: "tel:" + CONFIG.phone.replace(/[^\d+]/g, "") },
  ];

  return (
    <Section id="contact">
      <SectionTitle kicker="08 — Say Hello" title="Get In Touch"
        sub="Open to AI / ML Engineer, Data Scientist, and Software Engineer opportunities. Let's talk." />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
        {/* Left: links */}
        <div className="space-y-4">
          {links.map((l, i) => (
            <motion.a key={l.label} href={l.href} target={l.ext ? "_blank" : undefined} rel={l.ext ? "noopener noreferrer" : undefined}
              initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="glass rounded-2xl p-4 flex items-center gap-4 card-hover group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 grid place-items-center text-accent dark:text-accent-soft group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                <Icon name={l.icon} className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">{l.label}</p>
                <p className="font-semibold text-slate-900 dark:text-white truncate">{l.value}</p>
              </div>
            </motion.a>
          ))}
          <motion.a href={CONFIG.resume} download initial="hidden" whileInView="show" viewport={{ once: true }} custom={4} variants={fadeUp}
            className="block w-full text-center px-5 py-3.5 rounded-2xl font-semibold bg-accent hover:bg-accent-deep text-white shadow-lg shadow-accent/25 transition-colors">
            <span className="inline-flex items-center gap-2"><Icon name="download" className="w-5 h-5" /> Download Résumé</span>
          </motion.a>
        </div>

        {/* Right: form */}
        <motion.form onSubmit={onSubmit} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="glass rounded-3xl p-6 sm:p-8 space-y-5">
          {!configured && (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs p-3 leading-relaxed">
              <strong>Setup needed:</strong> add your Formspree form ID to <code className="font-mono">CONFIG.formspreeId</code> in <code className="font-mono">app.js</code> to enable submissions. Until then the form is display-only.
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
              <input id="name" name="name" type="text" required
                className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:border-accent outline-none transition-colors"
                placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
              <input id="email" name="email" type="email" required
                className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:border-accent outline-none transition-colors"
                placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Subject</label>
            <input id="subject" name="subject" type="text"
              className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:border-accent outline-none transition-colors"
              placeholder="What's this about?" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Message</label>
            <textarea id="message" name="message" rows="5" required
              className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:border-accent outline-none transition-colors resize-none"
              placeholder="Tell me about the role or project…" />
          </div>
          <button type="submit" disabled={status === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-accent hover:bg-accent-deep disabled:opacity-60 text-white shadow-lg shadow-accent/25 transition-colors">
            {status === "sending" ? "Sending…" : (<><Icon name="send" className="w-5 h-5" /> Send Message</>)}
          </button>
          <AnimatePresence>
            {status === "ok" && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-sm text-green-600 dark:text-green-400 text-center flex items-center justify-center gap-2">
                <Icon name="check" className="w-4 h-4" /> Thanks! Your message has been sent.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-sm text-red-500 dark:text-red-400 text-center">
                {configured ? "Something went wrong. Please email me directly." : "Form not configured yet — please email me directly at " + CONFIG.email + "."}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */
function Footer() {
  const socials = [
    { icon: "github", href: CONFIG.github, label: "GitHub" },
    { icon: "linkedin", href: CONFIG.linkedin, label: "LinkedIn" },
    { icon: "mail", href: "mailto:" + CONFIG.email, label: "Email" },
  ];
  return (
    <footer className="border-t border-slate-200/60 dark:border-white/10 py-10 px-5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-soft to-accent-deep grid place-items-center font-display font-bold text-white text-sm">{CONFIG.initials}</span>
          <div>
            <p className="font-display font-bold text-slate-900 dark:text-white text-sm">{CONFIG.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{CONFIG.headline}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              className="w-10 h-10 grid place-items-center rounded-xl glass text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent-soft hover:border-accent/40 transition-all">
              <Icon name={s.icon} className="w-5 h-5" />
            </a>
          ))}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center sm:text-right">
          © {new Date().getFullYear()} {CONFIG.name}. Built with React, Tailwind & Framer Motion.
        </p>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  SCROLL PROGRESS BAR + BACK TO TOP                                  */
/* ================================================================== */
function ScrollProgress() {
  // Only render the animated progress bar when real Framer Motion is available.
  if (!FM || !FM.useScroll) return null;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-soft to-accent-deep origin-left z-[60]" />;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 grid place-items-center rounded-2xl bg-accent hover:bg-accent-deep text-white shadow-lg shadow-accent/40 hover:-translate-y-1 transition-all">
          <Icon name="arrowDown" className="w-5 h-5 rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  APP ROOT                                                           */
/* ================================================================== */
function App() {
  const [theme, toggleTheme] = useTheme();
  return (
    <>
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <CertsAndAchievements />
        <GitHubSection theme={theme} />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
