import { rundown } from "../data/rundown";

export default function TabRundown() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-blue-100 shadow-sm animate-fade-in">
      <h3
        className="text-center font-bold text-blue-700 mb-5"
        style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2rem" }}
      >
        Rundown Acara
      </h3>

      <div className="space-y-2">
        {rundown.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/60 transition-colors duration-150"
          >
            {/* Time badge */}
            <div
              className="shrink-0 text-white rounded-xl px-2.5 py-1.5 text-[10px] font-semibold whitespace-nowrap shadow-sm leading-tight text-center"
              style={{ background: "linear-gradient(135deg, #60a5fa, #2563eb)" }}
            >
              {item.time.split(" - ").join("\n–\n").split("\n").map((t, j) => (
                <span key={j} className="block">{t}</span>
              ))}
            </div>

            {/* Event name */}
            <div className="flex items-start gap-2 pt-0.5">
              <span className="text-blue-300 text-xs mt-0.5">▸</span>
              <p className="text-blue-700 text-sm leading-snug">{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
