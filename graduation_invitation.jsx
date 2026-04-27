import { useState, useEffect } from "react";

const flowerSvg = (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg">
    <g fill="#93c5fd">
      {[0,60,120,180,240,300].map((deg, i) => (
        <ellipse key={i} cx="100" cy="100" rx="18" ry="40"
          transform={`rotate(${deg} 100 100) translate(0 -30)`}
          opacity="0.7" />
      ))}
    </g>
    <circle cx="100" cy="100" r="18" fill="#3b82f6" />
  </svg>
);

const petals = [0,60,120,180,240,300];

function FloralCorner({ className }) {
  return (
    <div className={`absolute w-40 h-40 ${className}`}>
      <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {petals.map((deg, i) => (
          <ellipse key={i} cx="40" cy="40" rx="12" ry="28"
            transform={`rotate(${deg} 40 40) translate(0 -18)`}
            fill="#93c5fd" opacity="0.5" />
        ))}
        <circle cx="40" cy="40" r="12" fill="#60a5fa" opacity="0.7"/>
        {petals.slice(0,4).map((deg, i) => (
          <ellipse key={i} cx="110" cy="110" rx="9" ry="22"
            transform={`rotate(${deg + 30} 110 110) translate(0 -14)`}
            fill="#bfdbfe" opacity="0.5" />
        ))}
        <circle cx="110" cy="110" r="9" fill="#93c5fd" opacity="0.6"/>
        <path d="M40 55 Q70 80 110 95" stroke="#93c5fd" strokeWidth="2" fill="none" opacity="0.5"/>
        <path d="M55 40 Q80 70 95 110" stroke="#bfdbfe" strokeWidth="1.5" fill="none" opacity="0.4"/>
      </svg>
    </div>
  );
}

function Sparkle({ style }) {
  return (
    <div className="absolute text-blue-300 animate-pulse" style={style}>✦</div>
  );
}

const sparkles = [
  { top: "10%", left: "5%", fontSize: "12px", animationDelay: "0s" },
  { top: "20%", right: "8%", fontSize: "16px", animationDelay: "0.5s" },
  { top: "50%", left: "3%", fontSize: "10px", animationDelay: "1s" },
  { top: "70%", right: "5%", fontSize: "14px", animationDelay: "1.5s" },
  { top: "85%", left: "8%", fontSize: "8px", animationDelay: "0.3s" },
  { top: "35%", right: "3%", fontSize: "12px", animationDelay: "0.8s" },
];

const rundown = [
  { time: "07.00 - 07.40", event: "Kirab" },
  { time: "07.40 - 07.55", event: "Tari Pembuka Acara" },
  { time: "07.55 - 08.05", event: "Pembukaan oleh MC" },
  { time: "08.05 - 08.15", event: "Menyanyikan Lagu Indonesia Raya dan Mars SMK bersama-sama" },
  { time: "08.15 - 08.25", event: "Pembacaan Ayat Suci oleh Bagus" },
  { time: "08.25 - 08.35", event: "Doa Pembuka oleh Bapak Wiyarso, M.Pd.I" },
  { time: "08.35 - 08.45", event: "Sambutan Kepala Sekolah oleh Bapak Joko Pramono, S.Pd., M.Ds." },
  { time: "08.45 - 09.00", event: "Penampilan Paduan Suara" },
  { time: "09.00 - 09.15", event: "Sambutan Ketua Pelaksana dan Pembacaan Ikrar Alumni oleh Rizziq Fadhilah Akbar" },
  { time: "09.15 - 09.25", event: "Penampilan menyanyi oleh Farhan" },
  { time: "09.25 - 09.35", event: "Penyerahan Simbolis dari Sekolah kepada Komite dan dari Komite kepada Orang Tua" },
  { time: "09.25 - 09.45", event: "Pemutaran Video Angkatan" },
  { time: "09.45 - 09.55", event: "Persembahan dari Guru Kesiswaan" },
  { time: "09.55 - 10.05", event: "Pengumuman Siswa Terbaik Paralel" },
  { time: "10.05 - 10.15", event: "Penampilan Organisasi Pramuka" },
  { time: "10.15 - 10.25", event: "Pemutaran Video Random" },
  { time: "10.25 - 10.40", event: "Band Siswa" },
  { time: "10.40 - 10.55", event: "Band Guru" },
  { time: "10.55 - 11.00", event: "Penutup" },
  { time: "11.00 - 12.00", event: "Penyamiran Kelas XII" },
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const target = new Date("2026-05-06T07:00:00");
    const update = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) return setTimeLeft({ done: true });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (timeLeft.done) return <p className="text-blue-600 font-semibold text-center">Acara sedang berlangsung! 🎓</p>;

  return (
    <div className="flex justify-center gap-3">
      {[["Hari", timeLeft.days], ["Jam", timeLeft.hours], ["Menit", timeLeft.minutes], ["Detik", timeLeft.seconds]].map(([label, val]) => (
        <div key={label} className="flex flex-col items-center bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl px-4 py-3 min-w-[64px] shadow-sm">
          <span className="text-2xl font-bold text-blue-600" style={{ fontFamily: "'Playfair Display', serif" }}>
            {String(val ?? "00").padStart(2, "0")}
          </span>
          <span className="text-[10px] text-blue-400 font-medium tracking-widest uppercase mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function GraduationInvitation() {
  const [activeTab, setActiveTab] = useState("undangan");
  const [opened, setOpened] = useState(false);
  const [rsvp, setRsvp] = useState({ name: "", attend: "hadir", msg: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleRsvp = () => {
    if (!rsvp.name.trim()) return;
    setSubmitted(true);
  };

  if (!opened) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #e0f0ff 0%, #f0f8ff 40%, #dbeafe 80%, #e8f4ff 100%)",
          fontFamily: "'Lato', sans-serif",
        }}
      >
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&family=Dancing+Script:wght@600;700&display=swap" rel="stylesheet" />

        <FloralCorner className="top-0 left-0" />
        <FloralCorner className="bottom-0 right-0 rotate-180" />
        <FloralCorner className="top-0 right-0 scale-x-[-1]" />
        <FloralCorner className="bottom-0 left-0 scale-y-[-1]" />

        {sparkles.map((s, i) => <Sparkle key={i} style={s} />)}

        <div className="text-center px-6 max-w-sm mx-auto relative z-10">
          <div className="text-6xl mb-4">🎓</div>
          <p className="text-blue-400 text-sm tracking-widest uppercase font-medium mb-2">Anda Diundang ke</p>
          <h1 className="text-5xl font-bold text-blue-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Graduation
          </h1>
          <h2 className="text-3xl text-blue-500 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Ceremony
          </h2>
          <p className="text-blue-600 text-sm mb-1 font-medium">Pelepasan Siswa-Siswi Kelas XII</p>
          <p className="text-blue-700 font-bold mb-1">SMK Negeri 1 Adiwerna</p>
          <p className="text-blue-400 text-xs mb-8">Tahun Ajaran 2025/2026</p>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent mx-auto mb-8" />

          <button
            onClick={() => setOpened(true)}
            className="group relative px-8 py-3 rounded-full text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-300"
            style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
          >
            <span className="relative z-10">✉ Buka Undangan</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "linear-gradient(160deg, #e0f0ff 0%, #f5faff 30%, #dbeafe 70%, #eff6ff 100%)",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&family=Dancing+Script:wght@600;700&display=swap" rel="stylesheet" />

      {/* Decorative top */}
      <FloralCorner className="top-0 left-0 opacity-60" />
      <FloralCorner className="top-0 right-0 scale-x-[-1] opacity-60" />
      {sparkles.map((s, i) => <Sparkle key={i} style={{ ...s, opacity: 0.5 }} />)}

      {/* Hero */}
      <div className="relative text-center pt-16 pb-10 px-4">
        <div className="text-5xl mb-3">🎓</div>
        <p className="text-blue-400 text-xs tracking-widest uppercase mb-1 font-medium">Dengan Hormat Mengundang</p>
        <h1 className="text-5xl font-bold text-blue-800" style={{ fontFamily: "'Playfair Display', serif" }}>Graduation</h1>
        <h2 className="text-4xl text-blue-500" style={{ fontFamily: "'Dancing Script', cursive" }}>Ceremony</h2>
        <div className="mt-3 space-y-1">
          <p className="text-blue-700 font-semibold text-sm">Pelepasan Siswa-Siswi Kelas XII</p>
          <p className="text-blue-800 font-bold">SMK Negeri 1 Adiwerna</p>
          <p className="text-blue-400 text-xs">Tahun Ajaran 2025/2026</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="px-4 max-w-lg mx-auto mb-6">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-blue-100 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-1">📅</div>
            <p className="text-blue-800 font-bold text-sm">6 Mei 2026</p>
            <p className="text-blue-400 text-xs">Rabu</p>
          </div>
          <div>
            <div className="text-2xl mb-1">🕖</div>
            <p className="text-blue-800 font-bold text-sm">07.00 WIB</p>
            <p className="text-blue-400 text-xs">s/d Selesai</p>
          </div>
          <div>
            <div className="text-2xl mb-1">📍</div>
            <p className="text-blue-800 font-bold text-xs leading-tight">Aula Graha Adiwiyata</p>
            <p className="text-blue-400 text-xs">SMKN 1 Adiwerna</p>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="px-4 max-w-lg mx-auto mb-8">
        <p className="text-center text-blue-400 text-xs tracking-widest uppercase mb-3 font-medium">Hitung Mundur</p>
        <CountdownTimer />
      </div>

      {/* Tabs */}
      <div className="px-4 max-w-lg mx-auto mb-4">
        <div className="flex bg-white/50 backdrop-blur-sm rounded-2xl p-1 border border-blue-100">
          {[["undangan", "✉ Undangan"], ["rundown", "📋 Rundown"], ["rsvp", "💌 RSVP"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === key
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  : "text-blue-400 hover:text-blue-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 max-w-lg mx-auto pb-24">
        {activeTab === "undangan" && (
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-blue-100 shadow-sm space-y-5 animate-fade-in">
            <div className="text-center">
              <p className="text-blue-400 text-xs tracking-widest uppercase mb-3">Bismillahirrahmanirrahim</p>
              <p className="text-blue-700 text-sm leading-relaxed italic">
                Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pelepasan siswa-siswi kelas XII SMK Negeri 1 Adiwerna Tahun Ajaran 2025/2026:
              </p>
            </div>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent mx-auto" />

            <div className="text-center">
              <p className="text-blue-400 text-xs mb-2">Dengan hormat mengundang:</p>
              <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-100">
                <p className="text-blue-800 font-bold">Bapak Joko Pramono, S.Pd., M.Ds.</p>
                <p className="text-blue-500 text-xs italic">Sebagai</p>
                <p className="text-blue-700 font-semibold text-sm">Kepala SMK Negeri 1 Adiwerna</p>
              </div>
            </div>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent mx-auto" />

            <p className="text-center text-blue-600 text-sm font-semibold italic">
              "Merupakan suatu kehormatan apabila Bapak/Ibu/Saudara/i dapat hadir pada acara ini"
            </p>

            <div className="text-center pt-2">
              <p className="text-blue-500 text-xs italic">Hormat Kami Keluarga Besar</p>
              <p className="text-blue-700 font-bold text-sm">SMKN 1 Adiwerna</p>
              <p className="text-blue-400 text-xs mt-1">Adiwerna, 26 April 2026</p>
            </div>

            <div className="border-t border-blue-100 pt-4 text-center">
              <p className="text-blue-400 text-xs mb-1">Ketua Pelaksana</p>
              <p className="text-blue-800 font-bold">Rizziq Fadhilah Akbar</p>
              <p className="text-blue-400 text-xs">NIS: 23.21085</p>
            </div>
          </div>
        )}

        {activeTab === "rundown" && (
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-blue-100 shadow-sm animate-fade-in">
            <h3 className="text-center font-bold text-blue-700 mb-4 text-lg" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.8rem" }}>
              Rundown Acara
            </h3>
            <div className="space-y-2">
              {rundown.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/60 transition-colors duration-150"
                >
                  <div className="shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg px-2 py-1 text-[10px] font-semibold whitespace-nowrap shadow-sm">
                    {item.time}
                  </div>
                  <p className="text-blue-700 text-sm leading-snug pt-0.5">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "rsvp" && (
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-blue-100 shadow-sm animate-fade-in">
            <h3 className="text-center font-bold text-blue-700 text-xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Konfirmasi Kehadiran
            </h3>
            <p className="text-center text-blue-400 text-xs mb-5">Mohon konfirmasi kehadiran Anda</p>

            {!submitted ? (
              <div className="space-y-4">
                <div>
                  <label className="text-blue-600 text-xs font-semibold block mb-1">Nama Anda</label>
                  <input
                    type="text"
                    placeholder="Tulis nama Anda..."
                    value={rsvp.name}
                    onChange={e => setRsvp({ ...rsvp, name: e.target.value })}
                    className="w-full bg-white/70 border border-blue-100 rounded-xl px-4 py-2.5 text-blue-700 text-sm outline-none focus:border-blue-400 transition-colors placeholder-blue-200"
                  />
                </div>

                <div>
                  <label className="text-blue-600 text-xs font-semibold block mb-2">Kehadiran</label>
                  <div className="flex gap-2">
                    {["hadir", "tidak hadir"].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setRsvp({ ...rsvp, attend: opt })}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                          rsvp.attend === opt
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow"
                            : "border-blue-100 text-blue-400 hover:border-blue-300"
                        }`}
                      >
                        {opt === "hadir" ? "✅ Hadir" : "❌ Tidak Hadir"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-blue-600 text-xs font-semibold block mb-1">Pesan (opsional)</label>
                  <textarea
                    placeholder="Tuliskan ucapan atau pesan..."
                    value={rsvp.msg}
                    onChange={e => setRsvp({ ...rsvp, msg: e.target.value })}
                    rows={3}
                    className="w-full bg-white/70 border border-blue-100 rounded-xl px-4 py-2.5 text-blue-700 text-sm outline-none focus:border-blue-400 transition-colors placeholder-blue-200 resize-none"
                  />
                </div>

                <button
                  onClick={handleRsvp}
                  className="w-full py-3 rounded-2xl text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                >
                  💌 Kirim Konfirmasi
                </button>
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="text-5xl">🎉</div>
                <p className="text-blue-700 font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Terima Kasih, {rsvp.name}!
                </p>
                <p className="text-blue-500 text-sm">
                  Anda telah konfirmasi <span className="font-semibold">{rsvp.attend}</span> dalam acara kami.
                </p>
                {rsvp.msg && (
                  <div className="bg-blue-50 rounded-xl p-3 mt-2">
                    <p className="text-blue-600 text-sm italic">"{rsvp.msg}"</p>
                  </div>
                )}
                <button
                  onClick={() => { setSubmitted(false); setRsvp({ name: "", attend: "hadir", msg: "" }); }}
                  className="mt-3 text-blue-400 text-xs underline"
                >
                  Edit konfirmasi
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom decorative */}
      <FloralCorner className="bottom-0 left-0 scale-y-[-1] opacity-50" />
      <FloralCorner className="bottom-0 right-0 rotate-180 opacity-50" />

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 text-center pb-3 pt-2 bg-gradient-to-t from-blue-50/80 to-transparent">
        <p className="text-blue-300 text-[10px] tracking-widest uppercase">SMK Negeri 1 Adiwerna • 2026</p>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.35s ease-out; }
      `}</style>
    </div>
  );
}
