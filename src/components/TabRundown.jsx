import { rundown } from "../data/rundown";

export default function TabRundown() {
  return (
    <div
      className="tab-enter rounded-3xl p-5 border border-blue-100"
      style={{
        background:"rgba(255,255,255,0.62)",
        backdropFilter:"blur(16px)",
        boxShadow:"0 4px 24px rgba(59,130,246,0.08)",
      }}
    >
      <h3
        className="text-center font-bold text-blue-700 mb-1"
        style={{ fontFamily:"'Dancing Script',cursive", fontSize:"2rem" }}
      >
        Rundown Acara
      </h3>
      <p className="text-center text-blue-400 text-[10px] uppercase tracking-widest mb-5">
        Rabu, 6 Mei 2026
      </p>

      <div className="space-y-1">
        {rundown.map((item, i) => (
          <div
            key={i}
            className="rundown-row flex items-start gap-3 px-3 py-2.5 rounded-2xl"
          >
            {/* Time badge */}
            <div
              className="shrink-0 text-white rounded-xl px-2.5 py-1.5 text-center shadow-sm"
              style={{
                background:"linear-gradient(135deg,#60a5fa,#2563eb)",
                fontSize:"0.6rem",
                fontWeight:700,
                lineHeight:1.4,
                minWidth:72,
                letterSpacing:"0.02em",
              }}
            >
              {item.time.split("–").map((t,j) => (
                <span key={j} className="block">{t.trim()}</span>
              ))}
            </div>

            {/* Event */}
            <div className="flex items-start gap-2 pt-1">
              <span className="text-blue-200 text-xs shrink-0 mt-0.5">▸</span>
              <p className="text-blue-700 text-sm leading-snug">{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
