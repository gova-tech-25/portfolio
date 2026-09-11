export interface SkillCategory {
  id: string;
  name: string;
  short: string;
  color: string;
  skills: { name: string; note?: string }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    name: "PROGRAMMING",
    short: "{ }",
    color: "#c8ff2e",
    skills: [
      { name: "Python", note: "Primary language for AI/ML" },
      { name: "C++", note: "Systems & performance" },
      { name: "JavaScript", note: "The web" },
      { name: "TypeScript", note: "Typed frontends" },
    ],
  },
  {
    id: "aiml",
    name: "AI / ML",
    short: "◈",
    color: "#7dffb2",
    skills: [
      { name: "Machine Learning" },
      { name: "Deep Learning" },
      { name: "NLP" },
      { name: "Computer Vision" },
      { name: "Generative AI" },
      { name: "Multimodal AI" },
    ],
  },
  {
    id: "frameworks",
    name: "FRAMEWORKS",
    short: "⬡",
    color: "#8fd0ff",
    skills: [
      { name: "PyTorch", note: "Model building" },
      { name: "TensorFlow" },
      { name: "Scikit-learn" },
      { name: "OpenCV" },
      { name: "Hugging Face", note: "Transformers & datasets" },
    ],
  },
  {
    id: "web",
    name: "WEB",
    short: "</>",
    color: "#ffd166",
    skills: [
      { name: "React" },
      { name: "Node.js" },
      { name: "FastAPI", note: "ML serving APIs" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    id: "databases",
    name: "DATABASES",
    short: "▤",
    color: "#ff9d7a",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "ChromaDB", note: "Vector store" },
      { name: "FAISS", note: "Similarity search" },
    ],
  },
  {
    id: "tools",
    name: "TOOLS",
    short: "✦",
    color: "#d9a9ff",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "VS Code" },
      { name: "Figma" },
    ],
  },
];
