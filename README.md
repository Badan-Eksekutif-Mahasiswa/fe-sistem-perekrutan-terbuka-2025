# SPT BEM UI 2026 - Frontend

Frontend Sistem Perekrutan Terbuka BEM UI 2026. Aplikasi ini dipakai oleh tiga peran utama:

- Applicant: melihat event, login SSO, submit pendaftaran, dan melihat status akhir.
- Admin/Panitia: membuat event, mengelola divisi, meninjau pendaftar, mengubah status, dan mengirim pengumuman.
- Superadmin: membuat akun panitia dan memiliki akses lintas event untuk kebutuhan kontrol.

Backend utama ada di repo `be-spt-compro` dan secara lokal berjalan di `http://localhost:8000`.

## Quick Start Lokal

1. Install dependency:

```bash
npm install
```

2. Salin env lokal:

```bash
copy .env.example .env.local
```

3. Isi minimal env berikut:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

4. Jika ingin upload gambar event ke Supabase Storage, isi juga:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Jika dua env Supabase kosong, upload file akan dinonaktifkan dan form tetap bisa memakai input URL gambar manual.

5. Jalankan frontend:

```bash
npm run dev
```

Buka `http://localhost:3000`.

## Backend yang Dibutuhkan

Pastikan backend sudah berjalan dari repo `be-spt-compro`:

```bash
bun install
bun run db:generate
bun run db:migrate
bun run db:seed
bun run dev
```

Akun seed internal:

| Peran | Kredensial |
|---|---|
| Superadmin | `superadmin@spt.local` / `superadmin123` |
| Admin | `admin@spt.local` / `admin12345` |

Applicant lokal bisa dicek lewat SSO asli jika tersedia. Untuk QA backend non-browser, gunakan endpoint dev-login yang terdokumentasi di backend.

## Route Penting

| Route | Peran | Fungsi |
|---|---|---|
| `/` | Publik | Landing page |
| `/event` | Publik | Daftar event aktif |
| `/login` | Applicant | Login SSO applicant |
| `/dashboard` | Applicant | Status pendaftaran applicant |
| `/admin/login` | Admin/Superadmin | Login internal |
| `/admin` | Admin/Superadmin | Dashboard review berkas dan pengumuman |
| `/admin/events` | Admin/Superadmin | Kelola event |
| `/admin/events/create` | Admin/Superadmin | Buat event |
| `/superadmin` | Superadmin | Buat akun panitia |

## Checklist QA Manual MVP

Jalankan backend dan frontend lebih dulu, lalu cek alur berikut:

1. Login superadmin di `/admin/login`.
2. Buka `/superadmin`, buat akun panitia baru.
3. Logout, login sebagai panitia baru.
4. Buka `/admin/events`, buat event draft.
5. Tambahkan minimal satu divisi aktif.
6. Publish event.
7. Buka `/event`, pastikan event muncul untuk applicant.
8. Login applicant dan submit pendaftaran ke event tersebut.
9. Login admin, buka `/admin`, pilih event, cari pendaftar.
10. Buka detail pendaftar dan ubah status menjadi `UNDER_REVIEW`.
11. Ubah status menjadi `PASSED_ADMINISTRATION` atau `REJECTED_ADMINISTRATION`.
12. Di panel pengumuman, klik `Cek Penerima`.
13. Klik `Kirim Email` dan pastikan riwayat email muncul.
14. Login applicant lagi dan cek `/dashboard`; status akhir harus tampil jelas.

## Quality Gate

Sebelum membuat PR ke `dev`, jalankan:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Catatan saat ini: lint masih menampilkan warning lama terkait unused import dan penggunaan `<img>`, tetapi tidak ada error.