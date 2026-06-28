import BalonUdara from "@/design-system/components/atoms/BalonUdara";

const step = [
  {
    desc: "Buka halaman SPT dan login menggunakan akun SSO Universitas Indonesia milikmu. Pastikan akun SSO kamu aktif dan terdaftar sebagai mahasiswa aktif UI.",
  },
  {
    desc: "Jelajahi daftar event rekrutmen yang sedang aktif. Baca informasi lengkap setiap event termasuk divisi yang tersedia, timeline, dan persyaratan yang dibutuhkan.",
  },
  {
    desc: "Klik tombol Daftar dan isi formulir pendaftaran dengan data diri yang lengkap dan benar. Pastikan semua field wajib sudah terisi sebelum melanjutkan ke langkah berikutnya.",
  },
  {
    desc: "Tentukan pilihan divisi pertama dan keduamu, lalu upload tugas umum dan tugas divisi sesuai instruksi yang tertera di halaman pendaftaran event.",
  },
  {
    desc: "Pilih dan booking slot jadwal interview yang tersedia untuk masing-masing divisi pilihanmu. Pastikan kamu memilih waktu yang benar-benar bisa kamu hadiri.",
  },
  {
    desc: "Pantau status pendaftaranmu secara berkala melalui halaman profil. Cek email untuk notifikasi hasil seleksi dari panitia event.",
  },
];

const HowTo = () => {
  return (
    <section className="relative overflow-hidden flex flex-col text-white font-jakarta gap-4 px-12 max-lg:px-10 max-md:px-8">
      <BalonUdara width={130} height={192} className="absolute -z-10 -left-6 top-1/3 opacity-70 max-lg:hidden animate-float [animation-delay:2s]" />
      <h1 className="text-center text-h1">Cara menggunakan SPT</h1>
      <div className="flex gap-4">
        {step.map((item, index) => (
          <div
            key={index}
            className="flex flex-col flex-1 min-w-0 rounded-2xl bg-gradient-card-blue backdrop-blur-sm overflow-hidden"
            style={{ boxShadow: 'var(--shadow-glass)' }}
          >
            <div className="relative w-full aspect-video bg-primary-500 overflow-hidden rounded-t-2xl">
              <img
                src={`/assets/howto-${index + 1}.png`}
                alt={`Langkah ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="rounded-full bg-red-500 w-7 h-7 text-h4 flex justify-center items-center">
                <span>{index + 1}</span>
              </div>
              <p className="text-justify text-p6">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default HowTo;
