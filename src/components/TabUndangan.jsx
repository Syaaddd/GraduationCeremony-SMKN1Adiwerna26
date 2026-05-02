export default function TabUndangan({ student }) {
  const displayName = student?.name
    ? student.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    : "Bapak/Ibu/Saudara/i";

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-blue-100 shadow-sm space-y-5 animate-fade-in">

      {/* Bismillah */}
      <div className="text-center">
        <p className="text-blue-400 text-xs tracking-widest uppercase mb-3 font-medium">
          Bismillahirrahmanirrahim
        </p>

        {/* Personalized greeting */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/60 rounded-2xl px-4 py-3 mb-3 border border-blue-100">
          <p className="text-blue-400 text-[10px] uppercase tracking-widest mb-0.5">Kepada Yth.</p>
          <p className="text-blue-800 font-bold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
            {displayName}
          </p>
          {student?.nis && (
            <p className="text-blue-400 text-[10px] mt-0.5">NIS: {student.nis}</p>
          )}
        </div>

        <p className="text-blue-700 text-sm leading-relaxed italic">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang untuk
          menghadiri acara pelepasan siswa-siswi kelas XII SMK Negeri 1
          Adiwerna Tahun Ajaran 2025/2026.
        </p>
      </div>

      <Divider />

      {/* Event detail */}
      <div className="text-center space-y-1">
        <p className="text-blue-500 text-xs font-medium uppercase tracking-widest">
          Untuk dapat hadir pada acara:
        </p>
        <p className="text-blue-700 text-2xl font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Graduation Ceremony
        </p>
        <p className="text-blue-600 text-sm font-semibold">Pelepasan Siswa-Siswi Kelas XII</p>
        <p className="text-blue-700 font-bold text-sm">SMK Negeri 1 Adiwerna</p>
        <p className="text-red-400 text-xs font-medium">Tahun Ajaran 2025/2026</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-3">
        <InfoCard icon="📅" title="Hari/Tanggal" value="Rabu, 6 Mei 2026" />
        <InfoCard icon="🕖" title="Waktu" value="06.45 WIB – Selesai" />
        <div className="col-span-2">
          <InfoCard icon="📍" title="Tempat" value="Aula Graha Adiwiyata, SMKN 1 Adiwerna" />
        </div>
      </div>

      <Divider />

      {/* Dress Code Siswa */}
      <div>
        <p className="text-center text-blue-500 text-xs font-semibold uppercase tracking-widest mb-3">
          👔 Dress Code Siswa
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 text-center space-y-2">
            <div className="text-3xl">👔</div>
            <p className="text-blue-700 font-bold text-sm">Laki-laki</p>
            <ul className="text-blue-600 text-xs space-y-1 text-left">
              <li className="flex items-start gap-1.5"><span className="text-blue-300 shrink-0 mt-0.5">▸</span>Jas eksekutif Hitam</li>
              <li className="flex items-start gap-1.5"><span className="text-blue-300 shrink-0 mt-0.5">▸</span>Dasi warna bebas</li>
            </ul>
          </div>
          <div className="bg-pink-50/80 border border-pink-100 rounded-2xl p-4 text-center space-y-2">
            <div className="text-3xl">👔</div>
            <p className="text-pink-700 font-bold text-sm">Perempuan</p>
            <ul className="text-pink-600 text-xs space-y-1 text-left">
              <li className="flex items-start gap-1.5"><span className="text-pink-300 shrink-0 mt-0.5">▸</span>Baju kebaya</li>
              <li className="flex items-start gap-1.5"><span className="text-pink-300 shrink-0 mt-0.5">▸</span>Wajib berhijab</li>
            </ul>
          </div>
        </div>
      </div>

      <Divider />

      {/* Quote */}
      <p className="text-center text-blue-600 text-sm font-semibold italic leading-relaxed">
        "Merupakan suatu kehormatan apabila dapat hadir pada acara ini"
      </p>

      <Divider />

      {/* Footer */}
      <div className="text-center space-y-0.5">
        <p className="text-blue-500 text-xs italic">Hormat Kami Keluarga Besar</p>
        <p className="text-blue-700 font-bold text-sm">SMKN 1 Adiwerna</p>
        <p className="text-blue-400 text-xs">Adiwerna, 26 April 2026</p>
      </div>

      <div className="border-t border-blue-100 pt-4 text-center space-y-0.5">
        <p className="text-blue-400 text-xs">Ketua Angkatan</p>
        <p className="text-blue-800 font-bold">Rizziq Fadhilah Akbar</p>
        <p className="text-blue-400 text-xs">NIS: 23.21085</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-200" />
      <span className="text-blue-200 text-xs">✦</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-200" />
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-white/70 border border-blue-100 rounded-2xl p-3 text-center">
      <span className="text-xl">{icon}</span>
      <p className="text-blue-400 text-[10px] font-medium uppercase tracking-wide mt-1">{title}</p>
      <p className="text-blue-700 text-xs font-semibold mt-0.5 leading-snug">{value}</p>
    </div>
  );
}
