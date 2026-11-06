// Small inline SVG illustrations for the Modul 8 lessons.
// Static, author-written markup (no user input). Colours come from CSS classes in style.css
// (.f-box, .f-hot, .f-txt, .f-dim, .f-line) so the figures follow the panel accent colour.

const wrap = (w: number, h: number, body: string, label: string): string =>
  `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">` +
  `<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="f-arrow"/></marker></defs>${body}</svg>`;

const box = (x: number, y: number, w: number, h: number, text: string, hot = false, sub = ""): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" class="${hot ? "f-hot" : "f-box"}"/>` +
  `<text x="${x + w / 2}" y="${y + h / 2 + (sub ? -2 : 5)}" text-anchor="middle" class="f-txt">${text}</text>` +
  (sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 13}" text-anchor="middle" class="f-dim">${sub}</text>` : "");

const arrow = (x1: number, y1: number, x2: number, y2: number): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="f-line" marker-end="url(#arr)"/>`;

const label = (x: number, y: number, text: string, anchor = "middle"): string =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" class="f-dim">${text}</text>`;

/** 8.1 — fields of a machine instruction. */
export const FIG_INSTRUCTION_FIELDS = wrap(
  360,
  118,
  box(10, 10, 100, 44, "Opcode", true, "operasi") +
    box(130, 10, 100, 44, "Operand", false, "sumber") +
    box(250, 10, 100, 44, "Operand", false, "tujuan") +
    `<rect x="10" y="72" width="340" height="34" rx="6" class="f-box" stroke-dasharray="5 4"/>` +
    `<text x="180" y="93" text-anchor="middle" class="f-txt">Instruksi berikutnya: implisit (Program Counter)</text>`,
  "Field instruksi: opcode, operand sumber, operand tujuan, dan instruksi berikutnya implisit"
);

/** 8.2 — where an operand can be located. */
export const FIG_OPERAND_LOCATIONS = wrap(
  360,
  176,
  box(10, 56, 90, 54, "Instruksi", true) +
    box(170, 8, 180, 32, "Memori utama") +
    box(170, 50, 180, 32, "Register CPU") +
    box(170, 92, 180, 32, "Immediate (di instruksi)") +
    box(170, 134, 180, 32, "Perangkat I/O") +
    arrow(100, 76, 168, 24) +
    arrow(100, 82, 168, 66) +
    arrow(100, 88, 168, 108) +
    arrow(100, 94, 168, 150),
  "Operand dapat berada di memori utama, register CPU, di dalam instruksi, atau perangkat I/O"
);

/** 8.4 — data flow of LOAD R1,A / LOAD R2,B / ADD R1,R2 / STORE C,R1. */
export const FIG_ASSEMBLY_FLOW = wrap(
  360,
  150,
  box(10, 10, 90, 38, "Memori A", false, "= 5") +
    box(10, 100, 90, 38, "Memori B", false, "= 3") +
    box(140, 10, 80, 38, "R1", true) +
    box(140, 100, 80, 38, "R2", true) +
    box(260, 10, 90, 38, "Memori C", false, "← R1") +
    arrow(100, 29, 138, 29) +
    label(119, 22, "①") +
    arrow(100, 119, 138, 119) +
    label(119, 112, "②") +
    arrow(180, 98, 180, 50) +
    label(200, 78, "③ ADD", "start") +
    arrow(220, 29, 258, 29) +
    label(239, 22, "④"),
  "Aliran data program C = A + B: dua LOAD, satu ADD, satu STORE"
);

/** 8.5 — direct versus indirect addressing. */
export const FIG_ADDRESSING = wrap(
  360,
  172,
  label(10, 14, "Direct — 1 akses memori", "start") +
    box(10, 22, 90, 36, "Instruksi", true, "alamat A") +
    arrow(100, 40, 138, 40) +
    box(140, 22, 90, 36, "Memori[A]", false, "operand") +
    label(10, 94, "Indirect — 2 akses memori atau lebih", "start") +
    box(10, 102, 90, 36, "Instruksi", true, "alamat A") +
    arrow(100, 120, 118, 120) +
    box(120, 102, 100, 36, "Memori[A]", false, "berisi alamat B") +
    arrow(220, 120, 238, 120) +
    box(240, 102, 110, 36, "Memori[B]", false, "operand") +
    label(180, 162, "Alamat efektif = B pada indirect, A pada direct"),
  "Perbandingan pengalamatan direct dan indirect"
);

/** 8.6 — illustrative 16-bit layout (opcode 4 | mode 2 | address 10). */
export const FIG_INSTRUCTION_FORMAT = (() => {
  const unit = 340 / 16;
  const x0 = 10;
  const seg = (start: number, bits: number, text: string, sub: string, hot: boolean): string => {
    const x = x0 + start * unit;
    return box(x, 30, bits * unit, 46, text, hot, sub);
  };
  const ticks =
    label(x0, 22, "bit 15", "start") +
    label(x0 + 340, 22, "bit 0", "end") +
    label(x0 + 4 * unit, 22, "11") +
    label(x0 + 6 * unit, 22, "9");
  const example =
    label(x0 + 2 * unit, 98, "0001") +
    label(x0 + 5 * unit, 98, "01") +
    label(x0 + 11 * unit, 98, "0000001010") +
    label(180, 122, "contoh isi bit (ilustrasi): opcode 0001, mode 01, alamat 10");
  return wrap(
    360,
    134,
    ticks +
      seg(0, 4, "Opcode", "4 bit", true) +
      seg(4, 2, "Mode", "2 bit", false) +
      seg(6, 10, "Alamat / operand", "10 bit", false) +
      example,
    "Contoh tata letak 16 bit: opcode 4 bit, mode pengalamatan 2 bit, alamat atau operand 10 bit"
  );
})();

/** Circuit board — physical paths between CPU and RAM (supporting context). */
export const FIG_BOARD_LINKS = wrap(
  360,
  142,
  `<rect x="2" y="2" width="356" height="138" rx="10" class="f-box" stroke-dasharray="6 4"/>` +
    label(180, 18, "Papan sirkuit (jalur tembaga + soket)") +
    box(16, 34, 80, 90, "CPU", true) +
    box(264, 34, 80, 90, "RAM") +
    label(180, 52, "alamat") +
    arrow(98, 58, 262, 58) +
    label(180, 78, "data") +
    `<line x1="98" y1="84" x2="262" y2="84" class="f-line" marker-start="url(#arr)" marker-end="url(#arr)"/>` +
    label(180, 104, "kontrol") +
    arrow(98, 110, 262, 110),
  "CPU dan RAM terhubung melalui jalur alamat, data, dan kontrol pada papan sirkuit"
);
