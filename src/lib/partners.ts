import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".gif",
  ".avif",
]);

/**
 * Membaca seluruh logo di folder `public/partners` secara otomatis.
 *
 * Tidak ada nama file yang di-hardcode. Cukup taruh gambar baru di
 * `public/partners/` dan logo akan langsung tampil di homepage.
 *
 * Dijalankan di server saat build (halaman utama bersifat statis), jadi
 * hasilnya sudah dibakukan ke HTML dan tidak butuh akses `fs` saat runtime.
 * Urutan file diurutkan natural (mis. logo-2 sebelum logo-10) supaya
 * urutannya deterministik dan stabil di setiap build.
 */
export function getPartnerLogos(): string[] {
  const dir = path.join(process.cwd(), "public", "partners");

  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    // Folder belum ada atau kosong -> section akan otomatis disembunyikan.
    return [];
  }

  return entries
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    )
    .map((file) => `/partners/${file}`);
}
