const petals = [0, 60, 120, 180, 240, 300];

export default function FloralCorner({ className = "" }) {
  return (
    <div className={`absolute w-40 h-40 pointer-events-none ${className}`}>
      <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Large flower */}
        {petals.map((deg, i) => (
          <ellipse
            key={`a-${i}`}
            cx="40" cy="40" rx="12" ry="28"
            transform={`rotate(${deg} 40 40) translate(0 -18)`}
            fill="#93c5fd" opacity="0.5"
          />
        ))}
        <circle cx="40" cy="40" r="12" fill="#60a5fa" opacity="0.7" />

        {/* Small flower */}
        {petals.slice(0, 5).map((deg, i) => (
          <ellipse
            key={`b-${i}`}
            cx="105" cy="105" rx="8" ry="20"
            transform={`rotate(${deg + 30} 105 105) translate(0 -12)`}
            fill="#bfdbfe" opacity="0.5"
          />
        ))}
        <circle cx="105" cy="105" r="8" fill="#93c5fd" opacity="0.6" />

        {/* Tiny flower */}
        {petals.slice(0, 4).map((deg, i) => (
          <ellipse
            key={`c-${i}`}
            cx="75" cy="65" rx="5" ry="13"
            transform={`rotate(${deg} 75 65) translate(0 -8)`}
            fill="#dbeafe" opacity="0.6"
          />
        ))}
        <circle cx="75" cy="65" r="5" fill="#bfdbfe" opacity="0.7" />

        {/* Stems */}
        <path d="M40 55 Q70 80 105 90" stroke="#93c5fd" strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M55 40 Q75 60 70 80" stroke="#bfdbfe" strokeWidth="1" fill="none" opacity="0.4" />

        {/* Leaves */}
        <ellipse cx="62" cy="70" rx="6" ry="12" transform="rotate(-40 62 70)" fill="#bfdbfe" opacity="0.35" />
        <ellipse cx="85" cy="78" rx="5" ry="10" transform="rotate(20 85 78)" fill="#93c5fd" opacity="0.3" />
      </svg>
    </div>
  );
}
