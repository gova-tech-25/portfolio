import { useState, type ReactNode } from "react";
import SectionHeading from "../ui/SectionHeading";
import { useIsTouch } from "../../hooks/useReducedMotion";

interface Experiment {
  id: string;
  name: string;
  blurb: string;
  viz: ReactNode;
}

const A = "#c8ff2e";
const M = "#878b81";

const experiments: Experiment[] = [
  {
    id: "nlp",
    name: "NLP",
    blurb: "Tokenizing, embedding and understanding language.",
    viz: (
      <div className="flex flex-wrap gap-1">
        {["THE", "MODEL", "READS", "MEANING"].map((t, i) => (
          <span key={t} className="rounded border border-line px-1.5 py-0.5 text-[9px]" style={{ color: i === 2 ? A : M }}>{t}</span>
        ))}
        <span className="mt-1 block text-[9px]" style={{ color: A }}>[0.12, -0.87, 0.33, …]</span>
      </div>
    ),
  },
  {
    id: "cv",
    name: "COMPUTER VISION",
    blurb: "Teaching models to see — detection, classification, tracking.",
    viz: (
      <svg viewBox="0 0 100 62" className="w-full max-w-[130px]">
        <rect x="0.5" y="0.5" width="99" height="61" fill="none" stroke="#26261f" />
        <rect x="14" y="14" width="30" height="34" fill="none" stroke={A} strokeWidth="1.2" strokeDasharray="3 2" />
        <rect x="58" y="24" width="24" height="20" fill="none" stroke={M} strokeWidth="1" strokeDasharray="3 2" />
        <text x="14" y="11" fontSize="6" fill={A} fontFamily="Space Grotesk">cat 0.97</text>
        <text x="58" y="21" fontSize="5.5" fill={M} fontFamily="Space Grotesk">dog 0.88</text>
      </svg>
    ),
  },
  {
    id: "rag",
    name: "RAG",
    blurb: "Grounding LLM answers in retrieved knowledge.",
    viz: (
      <ol className="space-y-1 font-display text-[9px] tracking-wider">
        {["DOCUMENTS", "CHUNKS", "EMBEDDINGS", "VECTOR SEARCH", "LLM", "ANSWER"].map((s, i) => (
          <li key={s} className="flex items-center gap-1.5" style={{ color: i === 5 ? A : M }}>
            {i > 0 && <span style={{ color: `${A}88` }}>↓ </span>}
            <span className={i === 5 ? "font-bold" : ""}>{s}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "embeddings",
    name: "EMBEDDINGS",
    blurb: "Meaning as geometry — vectors, similarity, FAISS indexes.",
    viz: (
      <svg viewBox="0 0 100 62" className="w-full max-w-[130px]">
        {[[20, 40], [28, 32], [22, 50], [35, 44], [70, 18], [78, 25], [66, 28]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 4 : 2.5} fill={i < 4 ? `${A}` : `${M}`} opacity={i < 4 ? 0.9 : 0.45} />
        ))}
        <line x1="24" y1="42" x2="74" y2="23" stroke={`${A}55`} strokeWidth="0.8" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    id: "genai",
    name: "GENERATIVE AI",
    blurb: "From noise to novelty — sampling, prompting, generation.",
    viz: (
      <div className="grid w-fit grid-cols-6 gap-0.5">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="h-3 w-3 rounded-[2px]" style={{ background: i > 8 ? `${A}${(30 + i * 12).toString(16).padStart(2, "0")}` : "#1c1c19", border: "1px solid #26261f" }} />
        ))}
      </div>
    ),
  },
  {
    id: "recsys",
    name: "RECOMMENDERS",
    blurb: "TF-IDF, similarity matrices, ranking what matters.",
    viz: (
      <div className="grid w-fit grid-cols-5 gap-0.5">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="h-3.5 w-3.5 rounded-[2px]" style={{ background: (i * 7) % 5 < 2 ? `${A}${(i * 17 + 60).toString(16).padStart(2, "0")}` : "#141412" }} />
        ))}
      </div>
    ),
  },
  {
    id: "dl",
    name: "DEEP LEARNING",
    blurb: "Backprop through everything — CNNs, transformers, losses.",
    viz: (
      <svg viewBox="0 0 100 62" className="w-full max-w-[120px]">
        {[16, 46, 80].map((x, li) =>
          [14, 31, 48].map((y, ni) => (
            <circle key={`${li}-${ni}`} cx={x} cy={y} r="3" fill={li === 2 ? A : "#26261f"} stroke={li === 2 ? A : M} strokeWidth="0.7" />
          )),
        )}
        {[16, 46].map((x1, li) =>
          [80].map((x2) =>
            [14, 31, 48].map((y1) =>
              [14, 31, 48].map((y2) => (
                <line key={`${x1}-${y1}-${y2}-${li}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#26261f" strokeWidth="0.4" />
              )),
            ),
          ),
        )}
      </svg>
    ),
  },
  {
    id: "multimodal",
    name: "MULTIMODAL AI",
    blurb: "Text × vision × audio in one shared space — like CLIP.",
    viz: (
      <svg viewBox="0 0 100 56" className="w-full max-w-[110px]">
        <circle cx="38" cy="24" r="17" fill="none" stroke={A} strokeWidth="1" opacity="0.85" />
        <circle cx="62" cy="24" r="17" fill="none" stroke={M} strokeWidth="1" opacity="0.7" />
        <text x="27" y="27" fontSize="7" fill={A} fontFamily="Space Grotesk">TXT</text>
        <text x="52" y="27" fontSize="7" fill={M} fontFamily="Space Grotesk">IMG</text>
        <circle cx="50" cy="24" r="3" fill={A} />
      </svg>
    ),
  },
];

function Panel({ exp, expanded, onToggle }: { exp: Experiment; expanded: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => !window.matchMedia("(hover: none)").matches && onToggle()}
      data-cursor="explore"
      aria-expanded={expanded}
      className={`group relative flex-1 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 ease-out ${
        expanded ? "border-accent/50 bg-surface" : "border-line bg-panel"
      }`}
    >
      {/* Background wash */}
      <span
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(120% 90% at 50% 110%, ${A}14, transparent 65%)`,
          opacity: expanded ? 1 : 0,
        }}
      />
      <div className="relative flex h-full flex-col justify-between gap-4">
        <p
          className={`font-display text-xs font-bold tracking-[0.2em] transition-colors ${expanded ? "text-text" : "text-muted group-hover:text-text"}`}
        >
          {expanded ? exp.name : exp.name}
        </p>
        <div
          className={`flex flex-col gap-4 transition-all duration-500 ${expanded ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
        >
          <p className="text-xs leading-relaxed text-muted">{exp.blurb}</p>
          {exp.viz}
        </div>
        {!expanded && (
          <span className="font-display text-[9px] tracking-[0.3em]" style={{ color: `${A}99` }}>
            EXPLORE +
          </span>
        )}
      </div>
    </button>
  );
}

export default function Experiments() {
  const [active, setActive] = useState<string | null>("rag");
  const isTouch = useIsTouch();

  const toggle = (id: string) => {
    if (!isTouch && active === id) return;
    setActive((cur) => (cur === id ? null : id));
  };

  return (
    <section
      id="experiments"
      aria-label="Experiment lab"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-32 sm:px-8 sm:py-44"
    >
      <SectionHeading index="04" title="EXPERIMENT LAB" hint="ALWAYS TESTING" />

      {/* Two rows of expanding panels (desktop), stacked (mobile) */}
      <div className="flex flex-col gap-3 lg:h-auto lg:flex-row">
        <div className="flex h-auto flex-col gap-3 lg:h-[22rem] lg:flex-row">
          {experiments.slice(0, 4).map((exp) => (
            <Panel key={exp.id} exp={exp} expanded={active === exp.id} onToggle={() => toggle(exp.id)} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-3 lg:mt-0 lg:h-[22rem] lg:flex-row">
        {experiments.slice(4).map((exp) => (
          <Panel key={exp.id} exp={exp} expanded={active === exp.id} onToggle={() => toggle(exp.id)} />
        ))}
      </div>

      <p className="font-display mt-8 text-[10px] tracking-[0.3em] text-muted">
        SMALL TESTS → BIG INTUITIONS. THIS LAB NEVER CLOSES.
      </p>
    </section>
  );
}
