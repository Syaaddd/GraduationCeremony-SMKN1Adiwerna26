import { useEffect, useState } from "react";

const CONFETTI_COLORS = [
  "#60a5fa", "#93c5fd", "#3b82f6", "#bfdbfe",
  "#fbbf24", "#f472b6", "#34d399", "#a78bfa",
];

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2.5 + Math.random() * 2,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.random() * 8,
      rotate: Math.random() * 360,
      shape: Math.random() > 0.5 ? "circle" : "rect",
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
            opacity: 0,
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.shape === "circle" ? p.size : p.size * 0.5,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

const EMOJI_LIST = ["🎓", "🎉", "⭐", "✨", "🏆", "🎊"];

export default function CelebrationScreen({ student, onContinue }) {
  const [phase, setPhase] = useState(0);
  // phase 0: emoji burst → phase 1: text appears → phase 2: button appears

  const displayName = student?.name
    ? student.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    : "Selamat";

  // first name only for headline
  const firstName = displayName.split(" ")[0];

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-10 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1d4ed8 0%, #2563eb 40%, #3b82f6 70%, #60a5fa 100%)",
      }}
    >
      <Confetti />

      {/* Floating emoji ring */}
      <div className="relative mb-6">
        {EMOJI_LIST.map((emoji, i) => (
          <span
            key={i}
            className="absolute text-2xl"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 60}deg) translate(60px) rotate(-${i * 60}deg)`,
              marginTop: "-1rem",
              marginLeft: "-1rem",
              animation: `orbitSpin 6s linear infinite`,
              animationDelay: `${i * -1}s`,
              opacity: phase >= 1 ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          >
            {emoji}
          </span>
        ))}
        {/* Center mortar board */}
        <div
          className="text-7xl"
          style={{
            animation: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
        >
          🎓
        </div>
      </div>

      {/* Text block */}
      <div
        className="text-center px-8 space-y-3"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p className="text-blue-100 text-sm tracking-widest uppercase font-medium">
          Selamat & Sukses
        </p>
        <h1
          className="text-white font-bold leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 7vw, 2.5rem)",
          }}
        >
          {firstName}! 🎉
        </h1>
        <p className="text-blue-100 text-sm leading-relaxed max-w-xs mx-auto">
          Selamat atas keberhasilan menyelesaikan pendidikan di{" "}
          <span className="text-white font-semibold">SMK Negeri 1 Adiwerna</span>.
          Semoga ilmu yang didapat menjadi bekal terbaik di masa depan.
        </p>

        {/* Stars row */}
        <div className="flex justify-center gap-1 text-yellow-300 text-lg pt-1">
          {["⭐","⭐","⭐","⭐","⭐"].map((s, i) => (
            <span
              key={i}
              style={{
                animation: "starPop 0.4s ease both",
                animationDelay: `${0.2 + i * 0.1}s`,
                opacity: 0,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div
        className="mt-10"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-full font-semibold text-blue-700 text-sm tracking-wide bg-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
          style={{ boxShadow: "0 8px 32px rgba(255,255,255,0.3)" }}
        >
          ✉ Lihat Undangan →
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg);   opacity: 1; }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg) translate(60px) rotate(0deg); }
          to   { transform: rotate(360deg) translate(60px) rotate(-360deg); }
        }
        @keyframes starPop {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
