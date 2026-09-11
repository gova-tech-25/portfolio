export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  visual:
    | "resume"
    | "rag"
    | "clip"
    | "rental"
    | "netflix"
    | "ipl"
    | "turing";
  architecture?: string[];
  metrics?: string[];
  github?: string; // add repo URLs when available
  demo?: string; // add live URLs when available
}

export const projects: Project[] = [
  {
    id: "atsify",
    index: "01",
    title: "ATSify",
    subtitle: "AI Resume Analyzer",
    description:
      "An AI-powered resume analysis platform that evaluates resumes and provides intelligent feedback for improving ATS compatibility.",
    tech: ["Python", "NLP", "Machine Learning", "LLMs", "React"],
    visual: "resume",
  },
  {
    id: "docmind",
    index: "02",
    title: "DocMind",
    subtitle: "RAG AI Assistant",
    description:
      "A document intelligence platform that allows users to upload documents and ask questions using Retrieval-Augmented Generation.",
    tech: [
      "FastAPI",
      "React",
      "MongoDB",
      "ChromaDB",
      "Sentence Transformers",
      "LLMs",
    ],
    visual: "rag",
    architecture: [
      "Documents",
      "Chunking",
      "Embeddings",
      "ChromaDB",
      "Similarity Search",
      "Retrieved Context",
      "LLM",
      "Answer",
    ],
  },
  {
    id: "clip-retrieval",
    index: "03",
    title: "CLIP Image Retrieval",
    subtitle: "Multimodal Search",
    description:
      "A multimodal image retrieval system using CLIP embeddings to retrieve visually and semantically relevant images from natural language queries.",
    tech: ["Python", "PyTorch", "CLIP", "FAISS", "Computer Vision"],
    visual: "clip",
    metrics: ["Precision@K", "Recall@K", "MRR"],
  },
  {
    id: "rentalworks",
    index: "04",
    title: "Rentalworks",
    subtitle: "Property / Rental Management Platform",
    description:
      "A full-stack property and rental management platform — listings, tenants and operations in one system.",
    tech: ["React", "Node.js", "NestJS", "PostgreSQL", "TypeORM"],
    visual: "rental",
  },
  {
    id: "netflix-recsys",
    index: "05",
    title: "Netflix Recommendation System",
    subtitle: "Content-Based Recommender",
    description:
      "A recommendation system using TF-IDF and similarity-based techniques to suggest titles.",
    tech: ["Python", "Pandas", "Scikit-learn", "NLP"],
    visual: "netflix",
  },
  {
    id: "ipl-analytics",
    index: "06",
    title: "IPL Machine Learning Project",
    subtitle: "Cricket Analytics & Prediction",
    description:
      "A machine-learning based cricket analytics and prediction project on IPL data.",
    tech: ["Python", "Pandas", "Scikit-learn", "Machine Learning"],
    visual: "ipl",
  },
  {
    id: "turing-simulator",
    index: "07",
    title: "Turing Machine Simulator",
    subtitle: "Interactive Educational Tool",
    description:
      "An interactive educational simulator demonstrating Turing Machine concepts through a visual interface.",
    tech: ["JavaScript", "React", "Interactive UI"],
    visual: "turing",
  },
];
