import type { Project } from "../../data/projects";

/**
 * Honest generative visuals per project — no fake screenshots.
 * Each renders an abstract diagram of what the project actually does.
 */
export default function ProjectVisual({ project }: { project: Project }) {
  const accent = "#c8ff2e";
  return (
    <div className="relative h-full w-full overflow-hidden bg-panel">
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        {project.visual === "resume" && (
          <div className="relative h-[78%] w-[46%] min-w-40 rounded-lg border border-line bg-surface p-4">
            {[92, 70, 84, 55, 76].map((w, i) => (
              <div key={i} className="mb-3 h-1.5 rounded bg-line" style={{ width: `${w}%` }} />
            ))}
            <div className="mt-5 flex items-center gap-3">
              <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#26261f" strokeWidth="4" />
                <circle
                  cx="20" cy="20" r="16" fill="none" stroke={accent} strokeWidth="4"
                  strokeDasharray="100.5" strokeDashoffset="28" strokeLinecap="round"
                />
              </svg>
              <span className="font-display text-xs tracking-widest text-muted">ATS SCORE</span>
            </div>
            <div
              className="absolute inset-x-0 h-8 animate-[scan_2.4s_ease-in-out_infinite] bg-accent/10"
              style={{ boxShadow: `0 0 24px ${accent}33` }}
              aria-hidden="true"
            />
            <style>{`@keyframes scan{0%,100%{top:8%}50%{top:80%}}`}</style>
          </div>
        )}

        {project.visual === "rag" && (
          <div className="flex w-full max-w-md items-center">
            {["DOC", "CHUNK", "EMB", "VEC", "CTX", "LLM"].map((n, i) => (
              <div key={n} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-md border font-display text-[9px] tracking-wider ${
                      i >= 4 ? "border-accent/60 text-accent" : "border-line text-muted"
                    } ${i === 5 ? "bg-accent text-bg border-accent font-bold" : "bg-surface"}`}
                  >
                    {n}
                  </div>
                </div>
                {i < 5 && (
                  <div className="mx-1 h-px flex-1 bg-gradient-to-r from-line to-accent/50" />
                )}
              </div>
            ))}
          </div>
        )}

        {project.visual === "clip" && (
          <div className="w-full max-w-sm">
            <div className="font-display mb-3 rounded-md border border-accent/50 px-3 py-2 text-[11px] tracking-wider text-accent">
              “a dog running on the beach” →
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }).map((_, i) => {
                const match = i === 5 || i === 2 || i === 9;
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded ${match ? "bg-accent/80" : "bg-surface border border-line"}`}
                    style={
                      !match
                        ? { opacity: 0.35 + ((i * 7) % 5) / 10 }
                        : undefined
                    }
                  />
                );
              })}
            </div>
            <div className="font-display mt-3 flex justify-between text-[9px] tracking-[0.25em] text-muted">
              <span>QUERY ↔ IMAGE EMBEDDINGS</span><span>TOP-K</span>
            </div>
          </div>
        )}

        {project.visual === "rental" && (
          <svg viewBox="0 0 200 140" className="h-[75%] max-h-56">
            <g fill="none" stroke="#3a3a34" strokeWidth="1.2">
              <rect x="30" y="30" width="60" height="90" rx="3" />
              <rect x="110" y="10" width="60" height="110" rx="3" />
            </g>
            {Array.from({ length: 15 }).map((_, i) => {
              const col = i % 3, row = Math.floor(i / 3);
              return (
                <rect key={`a${i}`} x={38 + col * 18} y={40 + row * 18} width="10" height="10"
                  rx="1.5" fill={i % 4 === 0 ? accent : "#26261f"} />
              );
            })}
            {Array.from({ length: 15 }).map((_, i) => {
              const col = i % 3, row = Math.floor(i / 3);
              return (
                <rect key={`b${i}`} x={118 + col * 18} y={20 + row * 18} width="10" height="10"
                  rx="1.5" fill={i % 3 === 0 ? accent : "#26261f"} />
              );
            })}
            <text x="30" y="136" fill="#878b81" fontSize="7" fontFamily="Space Grotesk" letterSpacing="3">UNITS / TENANTS / OPS</text>
          </svg>
        )}

        {project.visual === "netflix" && (
          <div className="w-full max-w-sm space-y-2.5">
            {["STRANGER THINGS", "DARK", "MONEY HEIST", "BLACK MIRROR", "THE OA"].map((t, i) => (
              <div key={t} className="flex items-center gap-3">
                <span className="font-display w-28 truncate text-right text-[8px] tracking-widest text-muted">{t}</span>
                <div className="h-2 flex-1 rounded-r bg-surface">
                  <div
                    className="h-full rounded-r"
                    style={{
                      width: `${96 - i * 17}%`,
                      background: i === 0 ? accent : `rgba(200,255,46,${0.55 - i * 0.11})`,
                    }}
                  />
                </div>
                <span className="font-display text-[9px] text-accent tabular-nums">{(0.97 - i * 0.13).toFixed(2)}</span>
              </div>
            ))}
            <p className="font-display pt-2 text-[9px] tracking-[0.25em] text-muted">TF-IDF COSINE SIMILARITY</p>
          </div>
        )}

        {project.visual === "ipl" && (
          <svg viewBox="0 0 200 150" className="h-[80%] max-h-52">
            <ellipse cx="100" cy="75" rx="88" ry="66" fill="none" stroke="#26261f" strokeWidth="1.5" />
            <ellipse cx="100" cy="75" rx="52" ry="39" fill="none" stroke="#26261f" strokeWidth="1" />
            <rect x="94" y="58" width="12" height="34" rx="2" fill="#1c1c19" stroke="#3a3a34" />
            <path d="M100 75 Q 60 20 30 40" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M100 75 Q 150 130 175 95" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M100 75 Q 130 15 160 30" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
            {[[30, 40], [175, 95], [160, 30], [100, 75]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === 3 ? 4 : 3} fill={accent} />
            ))}
            <text x="14" y="146" fill="#878b81" fontSize="7" fontFamily="Space Grotesk" letterSpacing="3">WIN PREDICTION MODEL</text>
          </svg>
        )}

        {project.visual === "turing" && (
          <div className="w-full max-w-md">
            <div className="relative flex justify-center gap-1">
              {["1", "0", "1", "1", "_", "_", "1"].map((c, i) => (
                <div
                  key={i}
                  className={`font-display flex h-12 w-12 items-center justify-center rounded border text-sm ${
                    i === 3
                      ? "-translate-y-3 border-accent bg-accent/15 text-accent"
                      : "border-line bg-surface text-muted"
                  }`}
                >
                  {c}
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-4 font-display text-[9px] tracking-[0.25em] text-muted">
              <span className="rounded border border-line px-2 py-1">STATE q3</span>
              <span className="text-accent">→</span>
              <span className="rounded border border-line px-2 py-1">WRITE 0</span>
              <span className="text-accent">→</span>
              <span className="rounded border border-line px-2 py-1">MOVE R</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
