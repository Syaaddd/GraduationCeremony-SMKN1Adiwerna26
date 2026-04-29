import { useState } from "react";
import NISScreen from "./components/NISScreen";
import CelebrationScreen from "./components/CelebrationScreen";
import OpeningScreen from "./components/OpeningScreen";
import FloralCorner from "./components/FloralCorner";
import CountdownTimer from "./components/CountdownTimer";
import TabUndangan from "./components/TabUndangan";
import TabRundown from "./components/TabRundown";
import TabRSVP from "./components/TabRSVP";

const TABS = [
  { key: "undangan", label: "✉ Undangan" },
  { key: "rundown",  label: "📋 Rundown" },
  { key: "rsvp",    label: "💌 RSVP" },
];

const sparkles = [
  { top: "12%", left: "5%",  fontSize: "12px", animationDelay: "0s" },
  { top: "22%", right: "7%", fontSize: "16px", animationDelay: "0.5s" },
  { top: "45%", left: "3%",  fontSize: "10px", animationDelay: "1s" },
  { top: "68%", right: "4%", fontSize: "14px", animationDelay: "1.5s" },
];

// Flow: "nis" → "celebration" → "opening" → "main"
export default function App() {
  const [screen, setScreen]       = useState("nis");
  const [student, setStudent]     = useState(null);
  const [activeTab, setActiveTab] = useState("undangan");

  const handleVerified = (studentData) => {
    setStudent(studentData);
    setScreen("celebration");
  };

  if (screen === "nis")          return <NISScreen onVerified={handleVerified} />;
  if (screen === "celebration")  return <CelebrationScreen student={student} onContinue={() => setScreen("opening")} />;
  if (screen === "opening")      return <OpeningScreen onOpen={() => setScreen("main")} student={student} />;

  const displayName = student?.name
    ? student.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #e0f0ff 0%, #f5faff 30%, #dbeafe 70%, #eff6ff 100%)",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <FloralCorner className="top-0 left-0 opacity-60" />
      <FloralCorner className="top-0 right-0 scale-x-[-1] opacity-60" />
      {sparkles.map((s, i) => (
        <span key={i} className="absolute text-blue-200 animate-sparkle select-none pointer-events-none" style={s}>✦</span>
      ))}

      <header className="relative text-center pt-16 pb-8 px-4">
        <div className="text-5xl mb-3 inline-block animate-float">🎓</div>

        {displayName && (
          <div className="inline-block bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl px-5 py-2 mb-3 shadow-sm">
            <p className="text-blue-400 text-[10px] uppercase tracking-widest">Untuk</p>
            <p className="text-blue-700 font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
              {displayName}
            </p>
          </div>
        )}

        <h1 className="text-5xl font-bold text-blue-800 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Graduation</h1>
        <h2 className="text-4xl text-blue-500 -mt-1" style={{ fontFamily: "'Dancing Script', cursive" }}>Ceremony</h2>
        <div className="mt-3 space-y-0.5">
          <p className="text-blue-600 text-sm font-medium">Pelepasan Siswa-Siswi Kelas XII</p>
          <p className="text-blue-800 font-bold">SMK Negeri 1 Adiwerna</p>
          <p className="text-blue-400 text-xs">Tahun Ajaran 2025/2026</p>
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto space-y-5 pb-28">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-blue-100 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "📅", main: "6 Mei 2026",          sub: "Rabu" },
            { icon: "🕖", main: "07.00 WIB",            sub: "s/d Selesai" },
            { icon: "📍", main: "Aula Graha Adiwiyata", sub: "SMKN 1 Adiwerna" },
          ].map((c, i) => (
            <div key={i}>
              <div className="text-2xl mb-1">{c.icon}</div>
              <p className="text-blue-800 font-bold text-xs leading-tight">{c.main}</p>
              <p className="text-blue-400 text-[10px]">{c.sub}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-center text-blue-400 text-[10px] tracking-widest uppercase mb-3 font-medium">Hitung Mundur</p>
          <CountdownTimer />
        </div>

        <div className="flex bg-white/50 backdrop-blur-sm rounded-2xl p-1 border border-blue-100">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${activeTab === key ? "text-white shadow-md" : "text-blue-400 hover:text-blue-600"}`}
              style={activeTab === key ? { background: "linear-gradient(135deg, #3b82f6, #2563eb)" } : {}}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "undangan" && <TabUndangan student={student} />}
        {activeTab === "rundown"  && <TabRundown />}
        {activeTab === "rsvp"     && <TabRSVP student={student} />}
      </main>

      <FloralCorner className="bottom-0 left-0 scale-y-[-1] opacity-40" />
      <FloralCorner className="bottom-0 right-0 rotate-180 opacity-40" />

      <footer className="fixed bottom-0 left-0 right-0 text-center py-2 bg-gradient-to-t from-blue-50/80 to-transparent pointer-events-none">
        <p className="text-blue-300 text-[10px] tracking-widest uppercase">SMK Negeri 1 Adiwerna • 2026</p>
      </footer>
    </div>
  );
}
