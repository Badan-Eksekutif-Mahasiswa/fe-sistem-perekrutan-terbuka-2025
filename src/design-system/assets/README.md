# Asset Export dari Figma

Asset berikut perlu diexport manual dari Figma karena URL Figma MCP expire dalam 7 hari.
Export dan simpan ke `/public/assets/`:

| Nama File               | Figma Node ID  | Format | Keterangan                          |
|------------------------|----------------|--------|-------------------------------------|
| spt-logo.png           | 2388:22824     | PNG    | Logo SPT putih 120×120px            |
| gedung-rektorat.svg    | 2388:25221     | SVG    | Ilustrasi gedung rektorat UI        |
| bem-ui-logo.png        | 2388:22711     | PNG    | Logo BEM UI 114×114px               |
| logo-bg-satuan.svg     | 2388:22830     | SVG    | Satu bunga kincir (ornamen)         |
| union-ornament.svg     | 2388:23518     | SVG    | Ornamen pink outline logo UI        |
| mulmed-badge.svg       | 2388:22813     | SVG    | MULMED DEV TEAM badge               |
| social-icons.svg       | 2388:22799     | SVG    | Sprite social media icons           |

## Cara Export dari Figma

1. Buka Figma file `mpCzfDjIZjS0LjtfhHazGL`, page "Final"
2. Klik layer sesuai Node ID di tabel atas
3. Di panel kanan → scroll ke bagian **Export**
4. Pilih format (PNG/SVG), klik Export
5. Simpan ke `/public/assets/`

## Asset yang Sudah Ada di Repo

| File                   | Path              | Digunakan di              |
|------------------------|-------------------|---------------------------|
| logo.webp              | /public/          | LogoSPT, Navbar           |
| logo-warnai.webp       | /public/          | Footer                    |
| logo-clean.webp        | /public/          | LogoBackground (single)   |
| logo-UI.png            | /public/          | Union ornament             |
| mulmed-logo.webp       | /public/          | Footer badge              |
| puzzle.webp            | /public/assets/   | LogoBackground (pattern), Navbar, FilterCard |
| hero.webp              | /public/          | GedungRektoratUI          |
