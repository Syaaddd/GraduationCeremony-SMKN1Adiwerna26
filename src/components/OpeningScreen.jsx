import FloralCorner from "./FloralCorner";

const SPARKLES = [
  { top:"9%",  left:"7%",  fontSize:"14px", animationDelay:"0s"   },
  { top:"20%", right:"8%", fontSize:"18px", animationDelay:"0.7s" },
  { top:"52%", left:"4%",  fontSize:"11px", animationDelay:"1.3s" },
  { top:"68%", right:"5%", fontSize:"15px", animationDelay:"1.9s" },
  { top:"84%", left:"9%",  fontSize:"9px",  animationDelay:"0.5s" },
  { top:"36%", right:"4%", fontSize:"13px", animationDelay:"1.1s" },
];

const toCapital = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export default function OpeningScreen({ onOpen, student }) {
  const displayName = student?.name ? toCapital(student.name) : "";

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background:"linear-gradient(145deg,#e8f4ff 0%,#f0f8ff 45%,#dbeafe 100%)" }}
    >
      <FloralCorner className="top-0 left-0 opacity-70" />
      <FloralCorner className="top-0 right-0 scale-x-[-1] opacity-70" />
      <FloralCorner className="bottom-0 left-0 scale-y-[-1] opacity-50" />
      <FloralCorner className="bottom-0 right-0 rotate-180 opacity-50" />

      {SPARKLES.map((s, i) => (
        <span key={i} className="absolute text-blue-300 animate-sparkle select-none pointer-events-none" style={s}>✦</span>
      ))}

      <div className="text-center px-6 max-w-xs mx-auto relative z-10 page-enter">

        <div
          className="text-6xl mb-5 animate-float inline-block"
          style={{ filter:"drop-shadow(0 4px 16px rgba(59,130,246,0.28))" }}
        >🎓</div>

        {/* Greeting card */}
        {displayName && (
          <div
            className="card-enter-d1 mb-5 bg-white/65 backdrop-blur-lg border border-blue-100 rounded-2xl px-5 py-3"
            style={{ boxShadow:"0 4px 20px rgba(59,130,246,0.1)" }}
          >
            <p className="text-blue-400 text-[10px] uppercase tracking-widest mb-0.5">Selamat Datang</p>
            <p className="text-blue-700 font-bold text-sm" style={{ fontFamily:"'Playfair Display',serif" }}>
              {displayName}
            </p>
          </div>
        )}

        <p className="text-blue-400 text-xs tracking-widest uppercase font-medium mb-2 card-enter-d2">Anda Diundang ke</p>

        <div className="card-enter-d2">
          <h1 className="text-5xl font-bold text-blue-800 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
            Graduation
          </h1>
          <h2 className="text-4xl text-blue-500 -mt-1 mb-4" style={{ fontFamily:"'Dancing Script',cursive" }}>
            Ceremony
          </h2>
        </div>

        <div className="card-enter-d3 space-y-1 mb-7">
          <p className="text-blue-600 text-sm font-medium">Pelepasan Siswa-Siswi Kelas XII</p>
          <p className="text-blue-800 font-bold">SMK Negeri 1 Adiwerna</p>
          <p className="text-blue-400 text-xs">Tahun Ajaran 2025/2026</p>
        </div>

        <div className="card-enter-d3 flex items-center gap-3 justify-center mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-200" />
          <span className="text-blue-300">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-200" />
        </div>

        <div className="card-enter-d4">
          <button
            onClick={onOpen}
            className="btn-primary px-9 py-3.5 rounded-full text-white font-semibold text-sm tracking-wide shadow-lg"
            style={{ background:"linear-gradient(135deg,#3b82f6,#1d4ed8)" }}
          >
            ✉ Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}
