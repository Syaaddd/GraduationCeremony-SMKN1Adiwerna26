import { useEffect, useState, useRef } from "react";

/* ── Confetti particle ── */
function useConfetti(count = 60) {
  const [pieces] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2.5,
      duration: 3.5 + Math.random() * 3,
      color: [
        "#60a5fa","#93c5fd","#3b82f6","#bfdbfe",
        "#fbbf24","#f472b6","#34d399","#a78bfa","#fb923c",
      ][Math.floor(Math.random() * 9)],
      size: 7 + Math.random() * 8,
      rotate: Math.random() * 360,
      sway: (Math.random() - 0.5) * 120,
      shape: Math.random() > 0.4 ? "rect" : "circle",
    }))
  );
  return pieces;
}

function Confetti() {
  const pieces = useConfetti(60);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-12px",
            animation: `cfFall ${p.duration}s ${p.delay}s cubic-bezier(0.25,0.46,0.45,0.94) forwards`,
            opacity: 0,
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.shape === "circle" ? p.size : p.size * 0.45,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── Floating sparkle dots ── */
function SparkleField() {
  const [dots] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }))
  );
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 4 }}>
      {dots.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.7)",
            animation: `twinkle ${d.duration}s ${d.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Ring of orbiting emojis ── */
const RING_EMOJIS = ["🎓","🎉","⭐","✨","🏆","🎊","💙","🌟"];
function EmojiRing({ visible }) {
  return (
    <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto" }}>
      {RING_EMOJIS.map((emoji, i) => {
        const angle = (i / RING_EMOJIS.length) * 360;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              fontSize: "1.4rem",
              marginTop: "-0.7rem",
              marginLeft: "-0.7rem",
              transform: `rotate(${angle}deg) translate(78px) rotate(-${angle}deg)`,
              animation: visible ? `orbitRing 10s linear infinite, fadeInScale 0.6s ${0.05 * i}s ease both` : "none",
              opacity: visible ? undefined : 0,
            }}
          >
            {emoji}
          </span>
        );
      })}
      {/* Center cap */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          fontSize: "4.5rem",
          transform: "translate(-50%, -50%)",
          animation: visible ? "popBounce 0.8s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
          opacity: visible ? 1 : 0,
          filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.25))",
        }}
      >
        🎓
      </div>
    </div>
  );
}

/* ── Stars row ── */
function StarRow({ visible }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 8 }}>
      {[0,1,2,3,4].map((i) => (
        <span
          key={i}
          style={{
            fontSize: "1.3rem",
            animation: visible ? `starBounce 0.5s ${0.3 + i * 0.1}s cubic-bezier(0.34,1.56,0.64,1) both` : "none",
            opacity: visible ? undefined : 0,
            display: "inline-block",
          }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}

/* ── Main component ── */
export default function CelebrationScreen({ student, onContinue }) {
  const [phase, setPhase] = useState(0);
  // 0 = mount  1 = emoji ring  2 = text  3 = button

  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 100);
    const t1 = setTimeout(() => setPhase(2), 900);
    const t2 = setTimeout(() => setPhase(3), 2000);
    return () => [t0, t1, t2].forEach(clearTimeout);
  }, []);

  const displayName = student?.name
    ? student.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    : "Selamat";
  const firstName = displayName.split(" ")[0];

  const fadeUp = (show, delay = 0) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        overflow: "hidden",
        background: "linear-gradient(160deg, #1e3a8a 0%, #1d4ed8 35%, #2563eb 65%, #3b82f6 100%)",
      }}
    >
      {/* Animated radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(96,165,250,0.25) 0%, transparent 70%)",
          animation: "pulseGlow 3s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <SparkleField />
      <Confetti />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 6, textAlign: "center", padding: "0 2rem", width: "100%", maxWidth: 360 }}>

        {/* Emoji ring */}
        <div style={{ ...fadeUp(phase >= 1), marginBottom: "1.5rem" }}>
          <EmojiRing visible={phase >= 1} />
        </div>

        {/* Heading */}
        <div style={fadeUp(phase >= 2)}>
          <p style={{
            color: "rgba(191,219,254,0.9)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: "0.3rem",
          }}>
            Selamat & Sukses
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 8vw, 2.8rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            marginBottom: "0.75rem",
            textShadow: "0 2px 20px rgba(0,0,0,0.2)",
          }}>
            {firstName}! 🎉
          </h1>
          <p style={{
            color: "rgba(219,234,254,0.9)",
            fontSize: "0.85rem",
            lineHeight: 1.7,
            maxWidth: 280,
            margin: "0 auto",
          }}>
            Selamat atas keberhasilan menyelesaikan pendidikan di{" "}
            <strong style={{ color: "#ffffff" }}>SMK Negeri 1 Adiwerna</strong>.
            Semoga ilmu yang didapat menjadi bekal terbaik di masa depan.
          </p>

          <StarRow visible={phase >= 2} />
        </div>

        {/* Button */}
        <div style={{ marginTop: "2.5rem", ...fadeUp(phase >= 3) }}>
          <button
            onClick={onContinue}
            style={{
              padding: "0.85rem 2.5rem",
              borderRadius: 9999,
              border: "none",
              background: "#ffffff",
              color: "#1d4ed8",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.03em",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)",
              transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
              animation: phase >= 3 ? "buttonPulse 2.5s 1s ease-in-out infinite" : "none",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)"; }}
            onMouseDown={e  => { e.currentTarget.style.transform = "scale(0.96)"; }}
            onMouseUp={e    => { e.currentTarget.style.transform = "scale(1.06)"; }}
          >
            ✉ Buka Undangan →
          </button>
        </div>
      </div>

      {/* All keyframes */}
      <style>{`
        @keyframes cfFall {
          0%   { opacity: 1;   transform: translateY(0) rotate(0deg)   translateX(0); }
          20%  { opacity: 1; }
          100% { opacity: 0.1; transform: translateY(108vh) rotate(540deg) translateX(var(--sway, 40px)); }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0.15; transform: scale(0.7); }
          50%      { opacity: 0.9;  transform: scale(1.3); }
        }
        @keyframes pulseGlow {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes orbitRing {
          from { --orbit-angle: 0deg; }
          to   { --orbit-angle: 360deg; }
        }
        @keyframes popBounce {
          0%   { transform: translate(-50%,-50%) scale(0)    rotate(-15deg); opacity: 0; }
          60%  { transform: translate(-50%,-50%) scale(1.18) rotate(5deg);   opacity: 1; }
          80%  { transform: translate(-50%,-50%) scale(0.94) rotate(-2deg);  opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(1)    rotate(0deg);   opacity: 1; }
        }
        @keyframes fadeInScale {
          0%   { opacity: 0; transform: rotate(var(--r,0deg)) translate(78px) rotate(calc(-1 * var(--r,0deg))) scale(0); }
          100% { opacity: 1; transform: rotate(var(--r,0deg)) translate(78px) rotate(calc(-1 * var(--r,0deg))) scale(1); }
        }
        @keyframes starBounce {
          0%   { opacity: 0; transform: scale(0) rotate(-20deg); }
          60%  { opacity: 1; transform: scale(1.4) rotate(10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes buttonPulse {
          0%,100% { box-shadow: 0 8px 32px rgba(0,0,0,0.2), 0 0 0 0 rgba(255,255,255,0.5); }
          50%      { box-shadow: 0 8px 32px rgba(0,0,0,0.2), 0 0 0 10px rgba(255,255,255,0); }
        }
      `}</style>
    </div>
  );
}
