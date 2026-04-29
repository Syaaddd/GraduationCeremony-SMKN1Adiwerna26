import { useState } from "react";
import STUDENTS from "../data/students.json";

function findStudent(nis) {
  if (!nis) return null;
  const clean = nis.trim().replace(/\s+/g, "");
  if (STUDENTS[clean]) return { nis: clean, name: STUDENTS[clean] };
  const digits = clean.replace(/\D/g, "");
  const key = "23." + digits.slice(-5);
  if (STUDENTS[key]) return { nis: key, name: STUDENTS[key] };
  return null;
}
import FloralCorner from "./FloralCorner";

const sparkles = [
  { top: "8%",  left: "6%",  fontSize: "14px", animationDelay: "0s" },
  { top: "18%", right: "7%", fontSize: "18px", animationDelay: "0.5s" },
  { top: "50%", left: "4%",  fontSize: "11px", animationDelay: "1s" },
  { top: "65%", right: "5%", fontSize: "15px", animationDelay: "1.5s" },
  { top: "82%", left: "9%",  fontSize: "9px",  animationDelay: "0.3s" },
  { top: "32%", right: "3%", fontSize: "13px", animationDelay: "0.8s" },
];

export default function NISScreen({ onVerified }) {
  const [nis, setNis] = useState("");
  const [error, setError] = useState("");
  const [found, setFound]   = useState(null);
  const [step, setStep]     = useState("input"); // input | confirm

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

  const handleConfirm = () => {
    onVerified(found);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #e0f0ff 0%, #f0f8ff 40%, #dbeafe 80%, #e8f4ff 100%)",
      }}
    >
      <FloralCorner className="top-0 left-0" />
      <FloralCorner className="top-0 right-0 scale-x-[-1]" />
      <FloralCorner className="bottom-0 left-0 scale-y-[-1]" />
      <FloralCorner className="bottom-0 right-0 rotate-180" />

      {sparkles.map((s, i) => (
        <span
          key={i}
          className="absolute text-blue-300 animate-sparkle select-none pointer-events-none"
          style={s}
        >
          ✦
        </span>
      ))}

      <div className="relative z-10 w-full max-w-xs mx-auto px-5 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3 animate-float inline-block">🎓</div>
          <h1
            className="text-4xl font-bold text-blue-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Graduation
          </h1>
          <h2
            className="text-3xl text-blue-500 -mt-1 mb-2"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Ceremony
          </h2>
          <p className="text-blue-600 text-xs font-medium">
            SMK Negeri 1 Adiwerna • 2025/2026
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-blue-100 shadow-sm">
          {step === "input" ? (
            <>
              <p
                className="text-blue-700 font-bold text-lg text-center mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Masukkan NIS Anda
              </p>
              <p className="text-blue-400 text-xs text-center mb-5">
                Untuk membuka undangan, masukkan Nomor Induk Siswa (NIS) Anda
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-blue-600 text-xs font-semibold block mb-1.5">
                    NIS <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 23.20477"
                    value={nis}
                    onChange={(e) => {
                      setNis(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                    className="w-full bg-white/80 border border-blue-100 rounded-xl px-4 py-3 text-blue-700 text-sm outline-none focus:border-blue-400 transition-colors placeholder-blue-200 text-center tracking-wider font-semibold"
                    maxLength={10}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
                    <p className="text-red-500 text-xs">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleCheck}
                  disabled={!nis.trim()}
                  className="w-full py-3 rounded-2xl text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                >
                  🔍 Cek NIS
                </button>
              </div>

              <p className="text-blue-300 text-[10px] text-center mt-4">
                Format NIS: 23.XXXXX (contoh: 23.20477)
              </p>
            </>
          ) : (
            /* Step: confirm */
            <>
              <div className="text-center space-y-3">
                <div className="text-4xl">👋</div>
                <div>
                  <p className="text-blue-400 text-xs mb-1">NIS ditemukan! Apakah ini Anda?</p>
                  <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 my-3">
                    <p className="text-blue-800 font-bold text-base leading-snug">
                      {found?.name}
                    </p>
                    <p className="text-blue-400 text-xs mt-1">NIS: {found?.nis}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { setStep("input"); setFound(null); setNis(""); }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold border border-blue-100 text-blue-400 hover:border-blue-300 bg-white/50 transition-all"
                  >
                    ← Bukan saya
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white shadow-md transition-all hover:scale-[1.02] active:scale-95"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                  >
                    ✅ Ya, lanjutkan
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <p className="text-blue-300 text-[10px] text-center mt-4">
          Hanya untuk Siswa-Siswi Kelas XII SMKN 1 Adiwerna
        </p>
      </div>
    </div>
  );
}
