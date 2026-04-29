import { useState } from "react";

export default function TabRSVP({ student }) {
  const defaultName = student?.name
    ? student.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    : "";
  const [form, setForm] = useState({ name: defaultName, attend: "hadir", msg: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-blue-100 shadow-sm animate-fade-in text-center space-y-4">
        <div className="text-5xl animate-float inline-block">🎉</div>
        <div>
          <p
            className="text-blue-700 font-bold text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Terima Kasih, {form.name}!
          </p>
          <p className="text-blue-500 text-sm mt-1">
            Anda telah konfirmasi{" "}
            <span className="font-semibold">{form.attend}</span> pada acara
            kami.
          </p>
        </div>

        {form.msg && (
          <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4">
            <p className="text-blue-500 text-xs mb-1">Pesan Anda:</p>
            <p className="text-blue-700 text-sm italic">"{form.msg}"</p>
          </div>
        )}

        <p className="text-blue-400 text-xs">
          Kami menantikan kehadiran Anda! 💙
        </p>

        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", attend: "hadir", msg: "" });
          }}
          className="text-blue-400 text-xs underline underline-offset-2"
        >
          Edit konfirmasi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-blue-100 shadow-sm animate-fade-in">
      <h3
        className="text-center font-bold text-blue-700 text-xl mb-1"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Konfirmasi Kehadiran
      </h3>
      <p className="text-center text-blue-400 text-xs mb-6">
        Mohon konfirmasi kehadiran Anda
      </p>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-blue-600 text-xs font-semibold block mb-1.5">
            Nama Anda <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Tulis nama Anda..."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-white/70 border border-blue-100 rounded-xl px-4 py-2.5 text-blue-700 text-sm outline-none focus:border-blue-400 transition-colors placeholder-blue-200"
          />
        </div>

        {/* Attendance */}
        <div>
          <label className="text-blue-600 text-xs font-semibold block mb-2">
            Kehadiran
          </label>
          <div className="flex gap-2">
            {["hadir", "tidak hadir"].map((opt) => (
              <button
                key={opt}
                onClick={() => setForm({ ...form, attend: opt })}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                  form.attend === opt
                    ? "text-white border-transparent shadow-md"
                    : "border-blue-100 text-blue-400 hover:border-blue-300 bg-white/50"
                }`}
                style={
                  form.attend === opt
                    ? { background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }
                    : {}
                }
              >
                {opt === "hadir" ? "✅ Hadir" : "❌ Tidak Hadir"}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-blue-600 text-xs font-semibold block mb-1.5">
            Pesan / Ucapan{" "}
            <span className="text-blue-300 font-normal">(opsional)</span>
          </label>
          <textarea
            placeholder="Tulis ucapan selamat atau pesan untuk wisudawan..."
            value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
            rows={3}
            className="w-full bg-white/70 border border-blue-100 rounded-xl px-4 py-2.5 text-blue-700 text-sm outline-none focus:border-blue-400 transition-colors placeholder-blue-200 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!form.name.trim()}
          className="w-full py-3 rounded-2xl text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
        >
          💌 Kirim Konfirmasi
        </button>
      </div>
    </div>
  );
}
