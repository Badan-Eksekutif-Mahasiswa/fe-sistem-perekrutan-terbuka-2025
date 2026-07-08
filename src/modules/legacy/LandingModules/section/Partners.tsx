import Image from "next/image";

interface PartnersProps {
  /** Path logo proker (mis. `/partners/semarak.png`), sudah terurut dari server. */
  logos: string[];
}

// Minimal jumlah item per baris agar marquee tetap penuh & mulus walau
// logo yang diunggah masih sedikit. Baris diulang (tile) sampai memenuhi ini.
const MIN_ITEMS_PER_ROW = 6;

function tileToMinimum(items: string[], min: number): string[] {
  if (items.length === 0) return [];
  const result: string[] = [];
  while (result.length < min) {
    result.push(...items);
  }
  return result;
}

const Partners = ({ logos }: PartnersProps) => {
  // Folder kosong -> section tidak dirender sama sekali (tidak ada frame kosong).
  if (!logos || logos.length === 0) return null;

  // Distribusi selang-seling (round-robin) supaya urut tapi seimbang antar
  // baris, bukan dipotong separuh atas separuh bawah.
  // Contoh 3 logo: baris atas [0, 2], baris bawah [1].
  const rowOneSource = logos.filter((_, index) => index % 2 === 0);
  const rowTwoSource = logos.filter((_, index) => index % 2 === 1);

  // Jika salah satu baris kosong (hanya ada 1 logo), pakai semua logo sebagai
  // fallback agar kedua baris tetap terisi.
  const rowOne = tileToMinimum(
    rowOneSource.length ? rowOneSource : logos,
    MIN_ITEMS_PER_ROW
  );
  const rowTwo = tileToMinimum(
    rowTwoSource.length ? rowTwoSource : logos,
    MIN_ITEMS_PER_ROW
  );

  const renderLogo = (src: string, key: string) => (
    <Image
      key={key}
      src={src}
      alt="Logo Program BEM UI"
      width={0}
      height={0}
      sizes="(max-width: 1024px) 96px, 160px"
      // Tinggi tetap, lebar mengikuti rasio asli foto (frame = ukuran foto,
      // tidak dipaksa kotak 160x160 seperti sebelumnya).
      className="mr-8 h-16 w-auto max-w-none object-contain lg:mr-16 lg:h-24"
      style={{ width: "auto" }}
    />
  );

  return (
    <section className="flex w-full flex-col items-center gap-10 overflow-hidden py-16 md:gap-16">
      <h1 className="px-6 text-center text-h1 font-bold leading-[110%] text-neutral-50 font-jakarta md:px-20 md:leading-[140%]">
        Program BEM UI
      </h1>

      {/* Baris 1 — full-bleed kiri-kanan, geser ke kiri */}
      <div className="flex w-full overflow-hidden">
        <div className="flex animate-infinite-scroll-1 flex-nowrap items-center">
          {rowOne.map((src, idx) => renderLogo(src, `row1-${idx}`))}
        </div>
        <div
          className="flex animate-infinite-scroll-1 flex-nowrap items-center"
          aria-hidden="true"
        >
          {rowOne.map((src, idx) => renderLogo(src, `row1-dup-${idx}`))}
        </div>
      </div>

      {/* Baris 2 — full-bleed kiri-kanan, geser arah berlawanan */}
      <div className="flex w-full flex-row-reverse overflow-hidden">
        <div className="flex animate-infinite-scroll-2 flex-nowrap items-center">
          {rowTwo.map((src, idx) => renderLogo(src, `row2-${idx}`))}
        </div>
        <div
          className="flex animate-infinite-scroll-2 flex-nowrap items-center"
          aria-hidden="true"
        >
          {rowTwo.map((src, idx) => renderLogo(src, `row2-dup-${idx}`))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
