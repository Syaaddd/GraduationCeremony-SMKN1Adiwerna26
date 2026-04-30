import { useState, useEffect } from "react";

const TARGET = new Date("2026-05-06T06:45:00");

export default function CountdownTimer() {
  const [t, setT] = useState(null);

  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) return setT({ done: true });
      setT({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) return null;
  if (t.done) return (
    <p className="text-center text-blue-600 font-semibold text-sm">🎓 Acara sedang berlangsung!</p>
  );

  return (
    <div className="flex justify-center gap-3">
      {[["Hari",t.days],["Jam",t.hours],["Menit",t.minutes],["Detik",t.seconds]].map(([label,val]) => (
        <div
          key={label}
          className="flex flex-col items-center rounded-2xl border border-blue-100 px-4 py-3 min-w-[62px]"
          style={{
            background:"rgba(255,255,255,0.65)",
            backdropFilter:"blur(12px)",
            boxShadow:"0 2px 12px rgba(59,130,246,0.08)",
          }}
        >
          <span
            className="text-2xl font-bold text-blue-600 tabular-nums leading-none"
            style={{ fontFamily:"'Playfair Display',serif", fontVariantNumeric:"tabular-nums" }}
          >
            {String(val).padStart(2,"0")}
          </span>
          <span className="text-[9px] text-blue-400 font-semibold tracking-widest uppercase mt-1.5">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
