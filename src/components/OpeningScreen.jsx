import FloralCorner from "./FloralCorner";

const sparkles = [
  { top: "8%",  left: "6%",  fontSize: "14px", animationDelay: "0s" },
  { top: "18%", right: "7%", fontSize: "18px", animationDelay: "0.5s" },
  { top: "50%", left: "4%",  fontSize: "11px", animationDelay: "1s" },
  { top: "65%", right: "5%", fontSize: "15px", animationDelay: "1.5s" },
  { top: "82%", left: "9%",  fontSize: "9px",  animationDelay: "0.3s" },
  { top: "32%", right: "3%", fontSize: "13px", animationDelay: "0.8s" },
];

export default function OpeningScreen({ onOpen }) {
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
          className="absolute text-blue-300 animate-sparkle select-none"
          style={s}
        >
          ✦
        </span>
      ))}

      <div className="text-center px-6 max-w-xs mx-auto relative z-10 animate-fade-in">
        <div className="text-6xl mb-5 animate-float inline-block">🎓</div>

        <p className="text-blue-400 text-xs tracking-widest uppercase font-medium mb-2">
          Anda Diundang ke
        </p>

        <h1
          className="text-5xl font-bold text-blue-800 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Graduation
        </h1>
        <h2
          className="text-4xl text-blue-500 -mt-1 mb-5"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Ceremony
        </h2>

        <div className="space-y-1 mb-6">
          <p className="text-blue-600 text-sm font-medium">
            Pelepasan Siswa-Siswi Kelas XII
          </p>
          <p className="text-blue-800 font-bold">SMK Negeri 1 Adiwerna</p>
          <p className="text-blue-400 text-xs">Tahun Ajaran 2025/2026</p>
        </div>

        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-200" />
          <span className="text-blue-300 text-lg">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-200" />
        </div>

        <button
          onClick={onOpen}
          className="group px-8 py-3 rounded-full text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-200"
          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
        >
          ✉ Buka Undangan
        </button>
      </div>
    </div>
  );
}
