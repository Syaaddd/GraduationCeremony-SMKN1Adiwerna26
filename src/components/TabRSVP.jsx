import { useState } from "react";

const toCapital = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export default function TabRSVP({ student }) {
  const defaultName = student?.name ? toCapital(student.name) : "";
  const [form, setForm]         = useState({ name: defaultName, attend: "hadir", msg: "" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className="tab-enter rounded-3xl p-8 border border-blue-100 text-center space-y-4"
        style={{ background:"rgba(255,255,255,0.62)", backdropFilter:"blur(16px)", boxShadow:"0 4px 24px rgba(59,130,246,0.08)" }}
      >
        <div className="text-5xl animate-float inline-block">🎉</div>
        <div>
          <p className="text-blue-700 font-bold text-xl" style={{ fontFamily:"'Playfair Display',serif" }}>
            Terima Kasih, {form.name.split(" ")[0]}!
          </p>
          <p className="text-blue-500 text-sm mt-1">
            Konfirmasi <span className="font-semibold">{form.attend}</span> telah diterima.
          </p>
        </div>
        {form.msg && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <p className="text-blue-600 text-sm italic leading-relaxed">"{form.msg}"</p>
          </div>
        )}
        <p className="text-blue-400 text-xs">Kami menantikan kehadiran Anda! 💙</p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: defaultName, attend: "hadir", msg: "" }); }}
          className="text-blue-400 text-xs underline underline-offset-2 hover:text-blue-600 transition-colors"
        >
          Edit konfirmasi
        </button>
      </div>
    );
  }

  return (
    <div
      className="tab-enter rounded-3xl p-6 border border-blue-100"
      style={{ background:"rgba(255,255,255,0.62)", backdropFilter:"blur(16px)", boxShadow:"0 4px 24px rgba(59,130,246,0.08)" }}
    >
      <h3 className="text-center font-bold text-blue-700 text-xl mb-1" style={{ fontFamily:"'Playfair Display',serif" }}>
        Konfirmasi Kehadiran
      </h3>
      <p className="text-center text-blue-400 text-xs mb-6">Mohon konfirmasi kehadiran Anda</p>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-blue-600 text-xs font-semibold block mb-1.5">
            Nama <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Tulis nama Anda..."
            className="w-full bg-white border border-blue-100 rounded-2xl px-4 py-2.5 text-blue-700 text-sm outline-none placeholder-blue-200"
          />
        </div>

        {/* Attendance toggle */}
        <div>
          <label className="text-blue-600 text-xs font-semibold block mb-2">Kehadiran</label>
          <div className="flex gap-2 p-1 bg-blue-50/60 rounded-2xl">
            {["hadir","tidak hadir"].map((opt) => (
              <button
                key={opt}
                onClick={() => setForm({ ...form, attend: opt })}
                className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background: form.attend === opt ? "linear-gradient(135deg,#3b82f6,#1d4ed8)" : "transparent",
                  color: form.attend === opt ? "#fff" : "#94a3b8",
                  boxShadow: form.attend === opt ? "0 2px 12px rgba(59,130,246,0.3)" : "none",
                  transition: "all 0.25s var(--smooth)",
                }}
              >
                {opt === "hadir" ? "✅ Hadir" : "❌ Tidak Hadir"}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-blue-600 text-xs font-semibold block mb-1.5">
            Pesan <span className="text-blue-300 font-normal">(opsional)</span>
          </label>
          <textarea
            value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
            placeholder="Tuliskan ucapan atau pesan..."
            rows={3}
            className="w-full bg-white border border-blue-100 rounded-2xl px-4 py-2.5 text-blue-700 text-sm outline-none placeholder-blue-200 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={() => form.name.trim() && setSubmitted(true)}
          disabled={!form.name.trim()}
          className="btn-primary w-full py-3 rounded-2xl text-white font-semibold text-sm tracking-wide shadow-md"
          style={{ background:"linear-gradient(135deg,#3b82f6,#1d4ed8)" }}
        >
          💌 Kirim Konfirmasi
        </button>
      </div>
    </div>
  );
}
