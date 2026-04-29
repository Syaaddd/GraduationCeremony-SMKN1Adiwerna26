import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-05-06T07:00:00");

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calculate = () => {
      const diff = TARGET_DATE - new Date();
      if (diff <= 0) return setTimeLeft({ done: true });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;

  if (timeLeft.done) {
    return (
      <p className="text-center text-blue-600 font-semibold text-sm">
        🎓 Acara sedang berlangsung!
      </p>
    );
  }

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3">
      {units.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl px-4 py-3 min-w-[64px] shadow-sm"
        >
          <span
            className="text-2xl font-bold text-blue-600 tabular-nums"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-blue-400 font-medium tracking-widest uppercase mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
