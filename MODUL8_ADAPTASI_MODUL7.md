# GARML AR Modul 8 — Set Instruksi (adaptasi dari Modul 7)

Mesin AR Modul 7 dipertahankan apa adanya (`src/ar/engine.ts`, `scene.ts`, `session.ts`, `hotspots.ts`,
`src/main.ts` selain wiring konten). Yang berubah hanya konten dan model.

## Perubahan
| File | Perubahan |
|---|---|
| `public/models/` | `CPU_Processor.glb`, `Circuit_Board.glb`, `DDR5_RAM.glb` (byte-identik dengan file yang dikirim) |
| `src/models/registry.ts` | 3 model baru (urutan CPU → Papan Sirkuit → RAM) dan pemetaan model → topik |
| `src/ar/config.ts` | Label, warna, ukuran, posisi per model (diukur dari bounding box GLB; semua Y-up, tanpa koreksi rotasi) |
| `src/content/lessons.ts` | 6 topik Modul 8 + panel pendukung Papan Sirkuit |
| `src/content/figures.ts` | Ilustrasi SVG (field instruksi, letak operand, aliran assembly, direct/indirect, bit-layout 16 bit, jalur papan) |
| `src/content/renderLesson.ts`, `style.css` | Blok baru `note` dan `figure` |
| `src/main.ts` | Pill model menampilkan jumlah topik miliknya; tab konteks Papan Sirkuit |

## Pemetaan model → materi
* CPU: Karakteristik Instruksi, Jenis Operasi, Bahasa Rakitan, Format Instruksi
* RAM DDR5: Jenis Operand, Pengalamatan
* Papan Sirkuit: panel "Papan Sirkuit" (koneksi fisik) + tab tautan ke Jenis Operand dan Pengalamatan

Setiap topik memuat catatan "Pada model 3D" yang menegaskan bahwa opcode, operand, mode pengalamatan, dan
format adalah pola bit/aturan, bukan komponen fisik.

## Ukuran GLB asli (x × y × z)
CPU 0.0873 × 0.0044 × 0.0495 · Papan 0.0925 × 0.0181 × 0.0600 · RAM 0.1334 × 0.0061 × 0.0430.
`cpu.glb` memang berisi dua keping (sisi atas dan sisi bawah) berdampingan; aset tidak diubah.

## Menjalankan
`npm install` → `npm run dev` (pratinjau) atau `npm run build` (hasil di `dist/`). Kamera dan WebXR butuh HTTPS atau localhost.
