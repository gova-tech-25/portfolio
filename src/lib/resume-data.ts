export const personalInfo = {
  name: "Dande Govardhan",
  initials: "DG",
  title: "B.Tech CSE Student & Full-Stack Developer",
  tagline: "Building elegant solutions through code",
  email: "govardhandande2@gmail.com",
  phone: "+91 8074851360",
  location: "Tirupati, Andhra Pradesh, India",
  linkedin: "https://linkedin.com/in/dande-govardhan",
  github: "https://github.com/govardhan05",
  medium: "https://medium.com/@govardhandande2",
};

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const skills = {
  languages: ["Python", "Java", "C/C++", "TypeScript", "JavaScript"],
  frontend: ["React.js", "Next.js", "HTML/CSS", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express.js", "FastAPI", "Flask"],
  databases: ["MongoDB", "PostgreSQL", "MySQL"],
  mlai: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision", "Deep Learning"],
  cloud: ["Google Cloud Platform", "Docker", "Cloud Computing"],
  tools: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Google Colab", "Linux"],
  soft: ["Problem Solving", "Team Collaboration", "Leadership", "Adaptability", "Time Management"],
};

export const skillCategories = [
  { title: "Languages", skills: skills.languages, color: "from-blue-500 to-cyan-500" },
  { title: "Frontend", skills: skills.frontend, color: "from-purple-500 to-pink-500" },
  { title: "Backend", skills: skills.backend, color: "from-green-500 to-emerald-500" },
  { title: "Databases", skills: skills.databases, color: "from-yellow-500 to-orange-500" },
  { title: "ML/AI", skills: skills.mlai, color: "from-red-500 to-rose-500" },
  { title: "Cloud & DevOps", skills: skills.cloud, color: "from-cyan-500 to-blue-500" },
  { title: "Tools", skills: skills.tools, color: "from-gray-500 to-slate-500" },
  { title: "Soft Skills", skills: skills.soft, color: "from-indigo-500 to-violet-500" },
];

export const experience = [
  {
    title: "AI/ML Intern",
    company: "TechnoHacks EduTech",
    location: "Remote",
    period: "Aug 2024 - Oct 2024",
    points: [
      "Developed machine learning models for predictive analytics using Python and Scikit-learn",
      "Performed data preprocessing, feature engineering, and model evaluation",
      "Collaborated with cross-functional teams to deploy ML solutions",
    ],
  },
  {
    title: "Open Source Contributor",
    company: "Various Projects",
    location: "Remote",
    period: "2024 - Present",
    points: [
      "Contributed to open-source repositories on GitHub",
      "Improved documentation and fixed bugs in community projects",
    ],
  },
  {
    title: "Web Development Intern",
    company: "InternPE",
    location: "Remote",
    period: "Jun 2024 - Jul 2024",
    points: [
      "Built responsive web applications using React.js",
      "Implemented RESTful APIs and integrated with frontend interfaces",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "IIIT Sri City",
    location: "Chittoor, Andhra Pradesh",
    period: "2024 - 2028",
    details: "CGPA: 7.6/10",
  },
  {
    degree: "Higher Secondary (HSC)",
    institution: "Sri Chaitanya Junior College",
    location: "Tirupati, Andhra Pradesh",
    period: "2022 - 2024",
    details: "Percentage: 97.6%",
  },
  {
    degree: "Secondary (SSC)",
    institution: "Dr. KKR Gowtham Concept School",
    location: "Gudur, Andhra Pradesh",
    period: "2022",
    details: "Percentage: 96.16%",
  },
];

export const projects = [
  {
    title: "ATSify",
    description:
      "AI-powered ATS resume analyzer that evaluates resumes against job descriptions using NLP and deep learning. Features real-time parsing, keyword extraction, and ATS compatibility scoring.",
    technologies: ["Next.js", "FastAPI", "Python", "PyTorch", "NLP", "PostgreSQL"],
    github: "https://github.com/govardhan05/atsify",
    live: "",
    featured: true,
  },
  {
    title: "Smart Traffic Management System",
    description:
      "Real-time traffic flow optimization using computer vision with YOLOv8 for vehicle detection, counting, and traffic light optimization.",
    technologies: ["Python", "YOLOv8", "TensorFlow", "SUMO"],
    github: "https://github.com/govardhan05/smart-traffic",
    live: "",
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description:
      "Real-time weather data visualization with interactive charts, powered by OpenWeatherMap API.",
    technologies: ["HTML/CSS", "JavaScript", "OpenWeatherMap API", "Chart.js"],
    github: "https://github.com/govardhan05/weather-dashboard",
    live: "",
    featured: false,
  },
  {
    title: "Personal Portfolio",
    description:
      "Premium portfolio website with 3D interactive elements, glassmorphism design, and smooth animations.",
    technologies: ["React", "Next.js", "Three.js", "Framer Motion", "GSAP"],
    github: "https://github.com/govardhan05/portfolio",
    live: "",
    featured: true,
  },
];

export const certifications = [
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI (Andrew Ng)",
    description: "3-course specialization covering neural networks, CNNs, RNNs, and practical deep learning",
    url: "",
    icon: "brain",
  },
  {
    title: "Google Cloud Digital Leader",
    issuer: "Google Cloud",
    description: "Digital transformation and cloud fundamentals certification",
    url: "",
    icon: "cloud",
  },
  {
    title: "Programming in Java (Elite)",
    issuer: "NPTEL",
    description: "Elite certification in Java programming",
    url: "",
    icon: "code",
  },
  {
    title: "Data Structures & Algorithms (Elite)",
    issuer: "NPTEL",
    description: "Elite certification in DSA",
    url: "",
    icon: "git-branch",
  },
];

export const achievements = [
  {
    title: "Smart India Hackathon Finalist",
    year: "2024",
    description: "National-level finalist in India's premier hackathon",
    icon: "trophy",
  },
  {
    title: "CodeChef 3-Star",
    year: "2024",
    description: "Rating 1650+ on CodeChef competitive programming platform",
    icon: "star",
  },
  {
    title: "LeetCode 250+",
    year: "2024",
    description: "Solved over 250 problems on LeetCode",
    icon: "code-2",
  },
  {
    title: "Technical Writer",
    year: "2024",
    description: "Published technical articles on Medium",
    icon: "book-open",
  },
];
