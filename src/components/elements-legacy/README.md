# elements-legacy — Komponen BEM UI 2025 (Legacy)

JANGAN gunakan untuk development baru.

Komponen-komponen ini adalah bagian dari design system BEM UI 2025 (#WarnaiAngan).
Dipertahankan karena masih dipakai oleh beberapa halaman yang belum migrasi.

## Yang masih pakai komponen ini

- `src/app/layout.tsx` → Navbar, Footer
- `src/app/not-found.tsx`
- `src/app/under-dev.tsx`

## Migrasi ke SPT 2026

Ganti dengan komponen dari:
- `src/design-system/components/molecules/Navbar` → DSNavbar
- `src/design-system/components/molecules/Footer` → DSFooter
