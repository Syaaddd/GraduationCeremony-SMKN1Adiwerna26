import { useState } from "react";
import STUDENTS from "../data/students.json";
import FloralCorner from "./FloralCorner";

function findStudent(nis) {
  if (!nis) return null;
  const clean = nis.trim().replace(/\s+/g, "");
  if (STUDENTS[clean]) return { nis: clean, name: STUDENTS[clean] };
  const digits = clean.replace(/\D/g, "");
  const key = "23." + digits.slice(-5);
  if (STUDENTS[key]) return { nis: key, name: STUDENTS[key] };
  return null;
}

const SPARKLES = [
  { top:"8%",  left:"6%",  fontSize:"14px", animationDelay:"0s"   },
  { top:"18%", right:"7%", fontSize:"18px", animationDelay:"0.6s" },
  { top:"50%", left:"4%",  fontSize:"11px", animationDelay:"1.2s" },
  { top:"65%", right:"5%", fontSize:"15px", animationDelay:"1.8s" },
  { top:"82%", left:"9%",  fontSize:"9px",  animationDelay:"0.4s" },
  { top:"32%", right:"3%", fontSize:"13px", animationDelay:"1s"   },
];

export default function NISScreen({ onVerified }) {
  const [nis,   setNis]   = useState("");
  const [error, setError] = useState("");
  const [found, setFound] = useState(null);
  const [step,  setStep]  = useState("input"); // "input" | "confirm"

  const handleCheck = () => {
    setError("");
    const result = findStudent(nis);
    if (!result) {
      setError("NIS tidak ditemukan. Pastikan NIS yang Anda masukkan benar.");
      return;
    }
    setFound(result);
    setStep("confirm");
  };

  const toCapital = (str) =>
    str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(145deg,#e8f4ff 0%,#f0f8ff 45%,#dbeafe 100%)" }}
    >
      <FloralCorner className="top-0 left-0 opacity-70" />
      <FloralCorner className="top-0 right-0 scale-x-[-1] opacity-70" />
      <FloralCorner className="bottom-0 left-0 scale-y-[-1] opacity-50" />
      <FloralCorner className="bottom-0 right-0 rotate-180 opacity-50" />

      {SPARKLES.map((s, i) => (
        <span key={i} className="absolute text-blue-300 animate-sparkle select-none pointer-events-none" style={s}>✦</span>
      ))}

      <div className="relative z-10 w-full max-w-xs mx-auto px-5 page-enter">

        {/* ── Header ── */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3 animate-float inline-block" style={{ filter:"drop-shadow(0 4px 12px rgba(59,130,246,0.25))" }}>🎓</div>
          <h1 className="text-4xl font-bold text-blue-800 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
            Graduation
          </h1>
          <h2 className="text-3xl text-blue-500 -mt-1 mb-1" style={{ fontFamily:"'Dancing Script',cursive" }}>
            Ceremony
          </h2>
          <p className="text-blue-500 text-xs font-medium tracking-wide">SMK Negeri 1 Adiwerna · 2025/2026</p>
        </div>

        {/* ── Card ── */}
        <div
          className="bg-white/75 backdrop-blur-xl rounded-3xl p-6 border border-blue-100/80"
          style={{ boxShadow:"0 8px 40px rgba(59,130,246,0.12), 0 1px 0 rgba(255,255,255,0.8) inset" }}
        >
          {step === "input" ? (
            <div className="tab-enter space-y-4">
              <div className="text-center">
                <p className="text-blue-700 font-bold text-lg" style={{ fontFamily:"'Playfair Display',serif" }}>
                  Masukkan NIS Anda
                </p>
                <p className="text-blue-400 text-xs mt-1">
                  Nomor Induk Siswa diperlukan untuk membuka undangan
                </p>
              </div>

              <div>
                <label className="text-blue-600 text-xs font-semibold block mb-1.5">
                  NIS <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 23.20477"
                  value={nis}
                  onChange={(e) => { setNis(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                  className="w-full bg-white border border-blue-100 rounded-2xl px-4 py-3 text-blue-700 text-sm outline-none text-center tracking-widest font-bold placeholder-blue-200"
                  style={{ letterSpacing:"0.12em" }}
                  maxLength={10}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 card-enter">
                  <p className="text-red-500 text-xs text-center">⚠ {error}</p>
                </div>
              )}

              <button
                onClick={handleCheck}
                disabled={!nis.trim()}
                className="btn-primary w-full py-3 rounded-2xl text-white font-semibold text-sm tracking-wide shadow-md"
                style={{ background:"linear-gradient(135deg,#3b82f6,#1d4ed8)" }}
              >
                Cek NIS →
              </button>

              <p className="text-blue-300 text-[10px] text-center">Format: 23.XXXXX · contoh: 23.20477</p>
            </div>
          ) : (
            <div className="tab-enter space-y-4 text-center">
              <div className="text-4xl" style={{ animation:"popBounce 0.7s var(--spring) both" }}>👋</div>
              <div>
                <p className="text-blue-400 text-xs">NIS ditemukan! Apakah ini Anda?</p>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/40 border border-blue-100 rounded-2xl p-4 mt-2">
                  <p className="text-blue-800 font-bold text-base leading-snug" style={{ fontFamily:"'Playfair Display',serif" }}>
                    {toCapital(found?.name ?? "")}
                  </p>
                  <p className="text-blue-400 text-[10px] mt-1 tracking-wide">NIS: {found?.nis}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => { setStep("input"); setFound(null); setNis(""); }}
                  className="btn-primary flex-1 py-2.5 rounded-2xl text-xs font-semibold border border-blue-100 text-blue-400 bg-white/60"
                >
                  ← Bukan saya
                </button>
                <button
                  onClick={() => onVerified(found)}
                  className="btn-primary flex-1 py-2.5 rounded-2xl text-xs font-semibold text-white shadow-md"
                  style={{ background:"linear-gradient(135deg,#3b82f6,#1d4ed8)" }}
                >
                  ✓ Ya, lanjut
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-blue-300 text-[10px] text-center mt-4">
          Hanya untuk Siswa-Siswi Kelas XII SMKN 1 Adiwerna
        </p>
      </div>
    </div>
  );
}
