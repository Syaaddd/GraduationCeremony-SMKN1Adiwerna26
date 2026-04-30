import { useEffect, useState, useRef } from "react";

/* ─────────────────────────────────────────
   PHYSICS CONFETTI
   Each piece has real velocity, gravity,
   air-drag, and angular momentum.
───────────────────────────────────────── */
const CONFETTI_COLORS = [
  "#60a5fa","#93c5fd","#bfdbfe","#3b82f6",
  "#fbbf24","#f59e0b","#f472b6","#ec4899",
  "#34d399","#a78bfa","#fb923c","#ffffff",
];

function usePhysicsConfetti(count = 80) {
  const canvasRef = useRef(null);
  const pieces    = useRef([]);
  const rafRef    = useRef(null);

  const reset = (canvas) => {
    const W = canvas.width;
    pieces.current = Array.from({ length: count }, () => ({
      x:   Math.random() * W,
      y:   -Math.random() * 120 - 10,
      vx:  (Math.random() - 0.5) * 3.5,
      vy:  Math.random() * 2 + 1.5,
      w:   6 + Math.random() * 9,
      h:   4 + Math.random() * 5,
      rot: Math.random() * Math.PI * 2,
      vr:  (Math.random() - 0.5) * 0.18,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: Math.random() > 0.35 ? "rect" : "circle",
      opacity: 0.85 + Math.random() * 0.15,
      drag: 0.988 + Math.random() * 0.008,
      wave: Math.random() * Math.PI * 2,
      waveAmp: 0.4 + Math.random() * 0.8,
      waveFreq: 0.02 + Math.random() * 0.03,
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    reset(canvas);
    window.addEventListener("resize", resize);

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.current.forEach((p) => {
        // Physics
        p.vy  += 0.045;                          // gravity
        p.vx  *= p.drag;                         // air drag horizontal
        p.vy  *= 0.999;                          // air drag vertical
        p.vr  *= 0.998;                          // angular drag
        p.wave += p.waveFreq;
        p.x   += p.vx + Math.sin(p.wave) * p.waveAmp;
        p.y   += p.vy;
        p.rot += p.vr;

        // Fade out near bottom
        const fadeStart = canvas.height * 0.75;
        if (p.y > fadeStart) {
          p.opacity = Math.max(0, p.opacity - 0.012);
        }

        // Respawn at top
        if (p.y > canvas.height + 20 || p.opacity <= 0) {
          p.x  = Math.random() * canvas.width;
          p.y  = -12;
          p.vy = Math.random() * 2 + 1.5;
          p.vx = (Math.random() - 0.5) * 3.5;
          p.opacity = 0.85 + Math.random() * 0.15;
          p.wave = Math.random() * Math.PI * 2;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // squish rect to simulate tumbling
          const scaleY = Math.abs(Math.cos(p.rot));
          ctx.scale(1, 0.35 + scaleY * 0.65);
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    // Delay start so React renders first
    const startId = setTimeout(() => { rafRef.current = requestAnimationFrame(draw); }, 60);

    return () => {
      clearTimeout(startId);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return canvasRef;
}

/* ─────────────────────────────────────────
   AMBIENT PARTICLES (floating light dots)
───────────────────────────────────────── */
function AmbientParticles() {
  const [dots] = useState(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x:   3 + Math.random() * 94,
      y:   3 + Math.random() * 94,
      s:   2.5 + Math.random() * 5.5,
      dur: 2.2 + Math.random() * 3,
      del: Math.random() * 5,
    }))
  );
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:3 }}>
      {dots.map((d) => (
        <div key={d.id} style={{
          position:"absolute",
          left:`${d.x}%`, top:`${d.y}%`,
          width: d.s, height: d.s,
          borderRadius:"50%",
          background:"rgba(255,255,255,0.55)",
          boxShadow:`0 0 ${d.s * 2}px rgba(255,255,255,0.4)`,
          animation:`twinkle ${d.dur}s ${d.del}s ease-in-out infinite`,
        }}/>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   SHOOTING STARS
───────────────────────────────────────── */
function ShootingStars() {
  const [stars] = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top:  10 + Math.random() * 50,
      left: 10 + Math.random() * 40,
      dur:  0.8 + Math.random() * 0.6,
      del:  i * 1.8 + Math.random() * 2,
    }))
  );
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:4, overflow:"hidden" }}>
      {stars.map((s) => (
        <div key={s.id} style={{
          position:"absolute",
          top:`${s.top}%`, left:`${s.left}%`,
          width: 80, height: 2,
          background:"linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0))",
          borderRadius:2,
          transform:"rotate(-30deg)",
          animation:`shootStar ${s.dur}s ${s.del}s ease-out infinite`,
          opacity:0,
        }}/>
      ))}
      <style>{`
        @keyframes shootStar {
          0%   { opacity:0; transform:rotate(-30deg) translateX(0); }
          10%  { opacity:1; }
          100% { opacity:0; transform:rotate(-30deg) translateX(200px); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED BG GRADIENT ORBS
───────────────────────────────────────── */
function BackgroundOrbs() {
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, overflow:"hidden" }}>
      {/* Main deep blue bg */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(160deg,#0f2c6e 0%,#1a3a8f 25%,#1d4ed8 55%,#2563eb 78%,#3b82f6 100%)",
      }}/>
      {/* Pulsing orb top-center */}
      <div style={{
        position:"absolute", top:"-15%", left:"30%",
        width:"60vw", height:"60vw",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(96,165,250,0.22) 0%, transparent 70%)",
        animation:"orbFloat1 7s ease-in-out infinite",
      }}/>
      {/* Orb bottom-right */}
      <div style={{
        position:"absolute", bottom:"-10%", right:"-10%",
        width:"50vw", height:"50vw",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)",
        animation:"orbFloat2 9s ease-in-out infinite",
      }}/>
      {/* Orb bottom-left */}
      <div style={{
        position:"absolute", bottom:"5%", left:"-8%",
        width:"40vw", height:"40vw",
        borderRadius:"50%",
        background:"radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 70%)",
        animation:"orbFloat3 11s ease-in-out infinite",
      }}/>
      <style>{`
        @keyframes orbFloat1 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(4%,6%) scale(1.08); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(-6%,-4%) scale(1.12); }
        }
        @keyframes orbFloat3 {
          0%,100% { transform:translate(0,0); }
          50%      { transform:translate(5%,-7%); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────
   EMOJI ORBIT RING (physics-smooth)
───────────────────────────────────────── */
const RING_EMOJIS = ["🎓","🎉","⭐","✨","🏆","🎊","💙","🌟"];

function EmojiRing({ show }) {
  return (
    <div style={{ position:"relative", width:220, height:220, margin:"0 auto" }}>
      {/* Outer ring rotates */}
      <div style={{
        position:"absolute", inset:0,
        animation: show ? "orbitRing 14s linear infinite" : "none",
      }}>
        {RING_EMOJIS.map((emoji, i) => {
          const angle = (i / RING_EMOJIS.length) * 360;
          const rad   = (angle * Math.PI) / 180;
          const r     = 95;
          const x     = 110 + r * Math.cos(rad) - 16;
          const y     = 110 + r * Math.sin(rad) - 16;
          return (
            <span key={i} style={{
              position:"absolute", left:x, top:y,
              fontSize:"1.6rem", lineHeight:1,
              display:"block",
              transform:`rotate(${-angle}deg)`,
              animation: show
                ? `emojiPop 0.65s ${0.07 * i}s cubic-bezier(0.34,1.56,0.64,1) both`
                : "none",
              opacity: show ? undefined : 0,
              filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
            }}>{emoji}</span>
          );
        })}
      </div>

      {/* Inner glow ring */}
      <div style={{
        position:"absolute", top:"50%", left:"50%",
        width:130, height:130,
        marginTop:-65, marginLeft:-65,
        borderRadius:"50%",
        border:"1.5px solid rgba(255,255,255,0.15)",
        boxShadow:"0 0 30px rgba(96,165,250,0.25), inset 0 0 30px rgba(96,165,250,0.1)",
        animation: show ? "ringPulse 2.5s ease-in-out infinite" : "none",
      }}/>

      {/* Center 🎓 with glow */}
      <div style={{
        position:"absolute", top:"50%", left:"50%",
        fontSize:"5.5rem", lineHeight:1,
        transform:"translate(-50%,-50%)",
        animation: show ? "capBounce 0.95s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
        opacity: show ? 1 : 0,
        filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.35)) drop-shadow(0 0 20px rgba(96,165,250,0.5))",
      }}>🎓</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   STAR BURST ROW
───────────────────────────────────────── */
function StarBurst({ show }) {
  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:6, marginTop:12 }}>
      {[0,1,2,3,4].map((i) => (
        <span key={i} style={{
          fontSize: i === 2 ? "1.6rem" : "1.25rem",
          display:"inline-block",
          animation: show
            ? `starPop 0.55s ${0.3 + i * 0.08}s cubic-bezier(0.34,1.56,0.64,1) both`
            : "none",
          opacity: show ? undefined : 0,
          filter:"drop-shadow(0 2px 8px rgba(251,191,36,0.6))",
          transform: i === 2 ? "translateY(-2px)" : "none",
        }}>⭐</span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function CelebrationScreen({ student, onContinue }) {
  const canvasRef = usePhysicsConfetti(80);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1),  80),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 2100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const name = student?.name
    ? student.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    : "Selamat";
  const firstName = name.split(" ")[0];

  const fadeSlide = (show, delay = 0) => ({
    opacity:   show ? 1 : 0,
    transform: show ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
    transition: `opacity 0.85s ${delay}s cubic-bezier(0.22,1,0.36,1),
                 transform 0.85s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
  });

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:10, overflow:"hidden",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
    }}>
      <BackgroundOrbs />
      <AmbientParticles />
      <ShootingStars />

      {/* Physics confetti canvas */}
      <canvas ref={canvasRef} style={{
        position:"fixed", inset:0, zIndex:6, pointerEvents:"none",
      }}/>

      {/* Content */}
      <div style={{
        position:"relative", zIndex:7,
        textAlign:"center", padding:"0 2rem",
        width:"100%", maxWidth:370,
      }}>

        {/* Emoji ring */}
        <div style={{ ...fadeSlide(phase >= 1), marginBottom:"1.8rem" }}>
          <EmojiRing show={phase >= 1} />
        </div>

        {/* Text */}
        <div style={fadeSlide(phase >= 2)}>
          <p style={{
            color:"rgba(191,219,254,0.8)", fontSize:"0.62rem",
            letterSpacing:"0.25em", textTransform:"uppercase",
            fontWeight:600, marginBottom:"0.35rem",
          }}>
            Selamat &amp; Sukses
          </p>

          <h1 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"clamp(2.2rem,9vw,3rem)",
            fontWeight:700, color:"#fff", lineHeight:1.1,
            marginBottom:"0.9rem",
            textShadow:"0 4px 32px rgba(0,0,0,0.3), 0 0 60px rgba(96,165,250,0.4)",
            letterSpacing:"-0.01em",
          }}>
            {firstName}! 🎉
          </h1>

          <p style={{
            color:"rgba(219,234,254,0.88)", fontSize:"0.83rem",
            lineHeight:1.8, maxWidth:268, margin:"0 auto",
          }}>
            Selamat atas keberhasilan menyelesaikan pendidikan di{" "}
            <strong style={{ color:"#fff", fontWeight:700 }}>SMK Negeri 1 Adiwerna</strong>.
            Semoga ilmu yang didapat menjadi bekal terbaik di masa depan.
          </p>

          <StarBurst show={phase >= 2} />
        </div>

        {/* Button */}
        <div style={{ marginTop:"3rem", ...fadeSlide(phase >= 3) }}>
          <button
            onClick={onContinue}
            style={{
              padding:"1rem 2.8rem",
              borderRadius:9999,
              border:"none",
              background:"rgba(255,255,255,0.96)",
              color:"#1d4ed8",
              fontWeight:700,
              fontSize:"0.92rem",
              letterSpacing:"0.02em",
              cursor:"pointer",
              backdropFilter:"blur(8px)",
              boxShadow:"0 8px 32px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.5) inset",
              animation: phase >= 3 ? "btnGlow 2.5s 0.6s ease-in-out infinite" : "none",
              transition:"transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform="scale(1.08)";
              e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,0.28)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform="scale(1)";
              e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,0.22)";
            }}
            onMouseDown={e  => { e.currentTarget.style.transform="scale(0.95)"; }}
            onMouseUp={e    => { e.currentTarget.style.transform="scale(1.08)"; }}
          >
            ✉ Buka Undangan →
          </button>
        </div>
      </div>

      {/* All keyframes */}
      <style>{`
        @keyframes emojiPop {
          from { opacity:0; transform:rotate(calc(var(--cr,0deg))) scale(0) ; }
          to   { opacity:1; transform:rotate(calc(var(--cr,0deg))) scale(1) ; }
        }
        @keyframes capBounce {
          0%   { opacity:0; transform:translate(-50%,-50%) scale(0) rotate(-15deg); }
          55%  { opacity:1; transform:translate(-50%,-50%) scale(1.18) rotate(5deg); }
          75%  { transform:translate(-50%,-50%) scale(0.92) rotate(-2deg); }
          100% { transform:translate(-50%,-50%) scale(1) rotate(0deg); }
        }
        @keyframes ringPulse {
          0%,100% { opacity:0.5; transform:translate(-50%,-50%) scale(1);    }
          50%      { opacity:1;   transform:translate(-50%,-50%) scale(1.06); }
        }
        @keyframes starPop {
          0%   { opacity:0; transform:scale(0) rotate(-25deg); }
          55%  { opacity:1; transform:scale(1.45) rotate(8deg); }
          100% { opacity:1; transform:scale(1) rotate(0deg); }
        }
        @keyframes btnGlow {
          0%,100% { box-shadow:0 8px 32px rgba(0,0,0,0.22), 0 0 0 0   rgba(255,255,255,0.6); }
          50%      { box-shadow:0 8px 32px rgba(0,0,0,0.22), 0 0 0 12px rgba(255,255,255,0); }
        }
      `}</style>
    </div>
  );
}
