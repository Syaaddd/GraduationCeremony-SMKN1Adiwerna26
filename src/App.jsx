import { useState } from "react";
import NISScreen         from "./components/NISScreen";
import CelebrationScreen from "./components/CelebrationScreen";
import OpeningScreen     from "./components/OpeningScreen";
import FloralCorner      from "./components/FloralCorner";
import CountdownTimer    from "./components/CountdownTimer";
import TabUndangan       from "./components/TabUndangan";
import TabRundown        from "./components/TabRundown";
import TabRSVP           from "./components/TabRSVP";

const TABS = [
  { key:"undangan", label:"✉ Undangan" },
  { key:"rundown",  label:"📋 Rundown"  },
  { key:"rsvp",     label:"💌 RSVP"     },
];

const SPARKLES = [
  { top:"12%", left:"5%",  fontSize:"13px", animationDelay:"0s"   },
  { top:"23%", right:"7%", fontSize:"17px", animationDelay:"0.6s" },
  { top:"46%", left:"3%",  fontSize:"10px", animationDelay:"1.2s" },
  { top:"70%", right:"4%", fontSize:"14px", animationDelay:"1.8s" },
];

const toCapital = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

// Flow: nis → celebration → opening → main
export default function App() {
  const [screen,    setScreen]    = useState("nis");
  const [student,   setStudent]   = useState(null);
  const [activeTab, setActiveTab] = useState("undangan");

  if (screen === "nis")         return <NISScreen         onVerified={(s) => { setStudent(s); setScreen("celebration"); }} />;
  if (screen === "celebration") return <CelebrationScreen student={student} onContinue={() => setScreen("opening")} />;
  if (screen === "opening")     return <OpeningScreen     student={student} onOpen={() => setScreen("main")} />;

  const displayName = student?.name ? toCapital(student.name) : "";

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background:"linear-gradient(160deg,#e8f4ff 0%,#f5faff 35%,#dbeafe 72%,#eff6ff 100%)",
        fontFamily:"'Lato',sans-serif",
      }}
    >
      {/* Decoration */}
      <FloralCorner className="top-0 left-0 opacity-55" />
      <FloralCorner className="top-0 right-0 scale-x-[-1] opacity-55" />
      {SPARKLES.map((s, i) => (
        <span key={i} className="absolute text-blue-200 animate-sparkle select-none pointer-events-none" style={s}>✦</span>
      ))}

      {/* ── Hero ── */}
      <header className="relative text-center pt-16 pb-8 px-4 page-enter">
        <div
          className="text-5xl mb-3 inline-block animate-float"
          style={{ filter:"drop-shadow(0 4px 14px rgba(59,130,246,0.2))" }}
        >🎓</div>

        {displayName && (
          <div
            className="card-enter inline-block bg-white/65 backdrop-blur-lg border border-blue-100 rounded-2xl px-5 py-2 mb-3"
            style={{ boxShadow:"0 3px 16px rgba(59,130,246,0.09)" }}
          >
            <p className="text-blue-400 text-[9px] uppercase tracking-widest">Untuk</p>
            <p className="text-blue-700 font-bold text-sm" style={{ fontFamily:"'Playfair Display',serif" }}>
              {displayName}
            </p>
          </div>
        )}

        <h1 className="text-5xl font-bold text-blue-800 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
          Graduation
        </h1>
        <h2 className="text-4xl text-blue-500 -mt-1" style={{ fontFamily:"'Dancing Script',cursive" }}>
          Ceremony
        </h2>
        <div className="mt-2.5 space-y-0.5">
          <p className="text-blue-600 text-sm font-medium">Pelepasan Siswa-Siswi Kelas XII</p>
          <p className="text-blue-800 font-bold">SMK Negeri 1 Adiwerna</p>
          <p className="text-blue-400 text-xs">Tahun Ajaran 2025/2026</p>
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto space-y-4 pb-28">

        {/* ── Info strip ── */}
        <div
          className="card-enter-d1 rounded-3xl p-5 border border-blue-100 grid grid-cols-3 gap-4 text-center"
          style={{ background:"rgba(255,255,255,0.62)", backdropFilter:"blur(16px)", boxShadow:"0 4px 24px rgba(59,130,246,0.08)" }}
        >
          {[
            { icon:"📅", main:"6 Mei 2026",          sub:"Rabu" },
            { icon:"🕖", main:"06.45 WIB",            sub:"s/d Selesai" },
            { icon:"📍", main:"Aula Graha Adiwiyata", sub:"SMKN 1 Adiwerna" },
          ].map((c, i) => (
            <div key={i}>
              <div className="text-2xl mb-1">{c.icon}</div>
              <p className="text-blue-800 font-bold text-xs leading-tight">{c.main}</p>
              <p className="text-blue-400 text-[10px]">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Countdown ── */}
        <div className="card-enter-d2">
          <p className="text-center text-blue-400 text-[9px] tracking-widest uppercase mb-3 font-semibold">
            Hitung Mundur Menuju Hari H
          </p>
          <CountdownTimer />
        </div>

        {/* ── Tab nav ── */}
        <div
          className="card-enter-d3 flex p-1 rounded-2xl border border-blue-100"
          style={{ background:"rgba(255,255,255,0.5)", backdropFilter:"blur(12px)" }}
        >
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold"
              style={{
                background: activeTab === key ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "transparent",
                color: activeTab === key ? "#fff" : "#94a3b8",
                boxShadow: activeTab === key ? "0 2px 12px rgba(59,130,246,0.3)" : "none",
                transition: "all 0.28s var(--smooth)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        {activeTab === "undangan" && <TabUndangan student={student} />}
        {activeTab === "rundown"  && <TabRundown />}
        {activeTab === "rsvp"     && <TabRSVP     student={student} />}
      </main>

      {/* Bottom decoration */}
      <FloralCorner className="bottom-0 left-0 scale-y-[-1] opacity-35" />
      <FloralCorner className="bottom-0 right-0 rotate-180 opacity-35" />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 text-center py-2 pointer-events-none"
        style={{ background:"linear-gradient(to top, rgba(235,245,255,0.85), transparent)" }}
      >
        <p className="text-blue-300 text-[9px] tracking-widest uppercase">SMK Negeri 1 Adiwerna · 2026</p>
      </footer>
    </div>
  );
}
