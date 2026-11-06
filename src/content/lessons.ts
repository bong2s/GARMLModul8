// Learning content for Modul 8 (Set Instruksi). Source: Modul678910.docx, section "Modul 8".
//
// Topics, in learning order:
//   1. Karakteristik Instruksi
//   2. Jenis Operand
//   3. Jenis Operasi
//   4. Bahasa Rakitan (Assembly)
//   5. Pengalamatan (Addressing)
//   6. Format Instruksi

import {
  FIG_ADDRESSING,
  FIG_ASSEMBLY_FLOW,
  FIG_BOARD_LINKS,
  FIG_INSTRUCTION_FIELDS,
  FIG_INSTRUCTION_FORMAT,
  FIG_OPERAND_LOCATIONS,
} from "./figures";

export type LessonBlock =
  | { kind: "heading"; text: string }
  | { kind: "text"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "formula"; text: string }
  | { kind: "example"; lines: string[] }
  | { kind: "note"; text: string }
  | { kind: "figure"; svg: string; caption: string };

export interface LessonTopic {
  id: string;
  title: string;
  short: string;
  /** Supporting panel for a model (not one of the six numbered topics). */
  context?: boolean;
  blocks: LessonBlock[];
}

export const MODULE_TOPICS: LessonTopic[] = [
  {
    id: "instruction-characteristics",
    title: "Karakteristik Instruksi",
    short: "Elemen dan struktur instruksi mesin",
    blocks: [
      { kind: "heading", text: "Set instruksi" },
      {
        kind: "text",
        text: "Set instruksi (instruction set) adalah kumpulan seluruh instruksi mesin yang dapat dipahami dan dieksekusi oleh CPU. Set instruksi menjadi batas antara perangkat keras dan perangkat lunak: programmer melihat komputer melalui instruksinya, sedangkan perancang CPU mengimplementasikannya dalam perangkat keras.",
      },
      { kind: "heading", text: "Elemen instruksi mesin" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Opcode: kode operasi yang dilakukan.",
          "Referensi operand sumber.",
          "Referensi operand tujuan (hasil).",
          "Referensi instruksi berikutnya, umumnya implisit lewat Program Counter.",
        ],
      },
      { kind: "figure", svg: FIG_INSTRUCTION_FIELDS, caption: "Struktur umum instruksi mesin (Gambar 8.1)" },
      { kind: "heading", text: "Letak operand" },
      {
        kind: "text",
        text: "Operand dapat berada di memori utama, register CPU, nilai langsung dalam instruksi (immediate), atau perangkat I/O.",
      },
      { kind: "heading", text: "Representasi instruksi" },
      {
        kind: "text",
        text: "Instruksi direpresentasikan sebagai deretan bit yang dibagi menjadi field-field. Karena sulit dibaca manusia, instruksi ditulis dalam bentuk simbolik (mnemonik), misalnya ADD, SUB, dan LOAD.",
      },
      { kind: "heading", text: "Jumlah alamat per instruksi" },
      {
        kind: "text",
        text: "Instruksi dapat memiliki 3, 2, 1, atau 0 alamat (stack). Pilihan ini adalah kompromi antara panjang program dan kerumitan instruksi.",
      },
      {
        kind: "note",
        text: "Pada model 3D: CPU adalah komponen yang menjalankan instruksi. Opcode dan operand sendiri bukan bagian fisik yang bisa ditunjuk pada CPU. Keduanya adalah field (kelompok bit) di dalam instruksi.",
      },
    ],
  },
  {
    id: "operand-types",
    title: "Jenis Operand",
    short: "Data yang diolah instruksi",
    blocks: [
      { kind: "heading", text: "Operand" },
      { kind: "text", text: "Operand adalah data yang diolah instruksi. Jenis operand yang umum didukung:" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Alamat: diperlakukan sebagai bilangan tak bertanda untuk menghitung alamat efektif.",
          "Bilangan: integer, floating point, dan desimal terkemas (BCD).",
          "Karakter: umumnya kode ASCII (7/8 bit) atau Unicode.",
          "Data logika: kumpulan bit yang diperlakukan sebagai bit individual, misalnya flag atau mask.",
        ],
      },
      { kind: "heading", text: "Ukuran data" },
      {
        kind: "text",
        text: "Komputer biasanya menyediakan beberapa ukuran data, sehingga instruksi sering memiliki varian menurut ukuran operandnya:",
      },
      {
        kind: "list",
        ordered: false,
        items: ["Byte: 8 bit.", "Word: 16, 32, atau 64 bit.", "Double word."],
      },
      { kind: "heading", text: "Di mana operand berada" },
      { kind: "figure", svg: FIG_OPERAND_LOCATIONS, caption: "Instruksi merujuk operand yang berada di salah satu lokasi ini" },
      {
        kind: "note",
        text: "Pada model 3D: modul RAM menyimpan data program di memori utama. Register berada di dalam CPU, dan nilai immediate berada di dalam instruksi itu sendiri, jadi keduanya bukan bagian dari modul RAM.",
      },
    ],
  },
  {
    id: "operation-types",
    title: "Jenis Operasi",
    short: "Ragam opcode",
    blocks: [
      { kind: "heading", text: "Kelompok operasi" },
      {
        kind: "text",
        text: "Jumlah dan ragam opcode berbeda antar mesin, tetapi umumnya dikelompokkan sebagai berikut:",
      },
      {
        kind: "list",
        ordered: false,
        items: [
          "Transfer data: memindahkan data antar register/memori (MOV, LOAD, STORE, PUSH, POP).",
          "Aritmetika: ADD, SUB, MUL, DIV, INC, DEC.",
          "Logika: AND, OR, NOT, XOR, geser (shift), dan rotasi.",
          "Konversi: mengubah format data, misalnya biner ke desimal.",
          "Input/Output: perintah baca/tulis ke perangkat I/O.",
          "Kontrol sistem: instruksi khusus (privileged) yang hanya dapat dijalankan oleh OS.",
          "Transfer kontrol: JMP, BRANCH bersyarat, CALL, RETURN yang mengubah alur eksekusi.",
        ],
      },
      { kind: "heading", text: "Contoh pengelompokan" },
      {
        kind: "example",
        lines: [
          "LOAD R1, A    → transfer data",
          "ADD  R1, R2   → aritmetika",
          "AND  R1, R2   → logika",
          "JMP  label    → transfer kontrol",
        ],
      },
      {
        kind: "note",
        text: "Pada model 3D: CPU menjalankan semua jenis operasi ini. Operasi adalah tindakan yang ditentukan oleh opcode, bukan komponen fisik.",
      },
    ],
  },
  {
    id: "assembly",
    title: "Bahasa Rakitan (Assembly)",
    short: "Mnemonik dan assembler",
    blocks: [
      { kind: "heading", text: "Apa itu bahasa rakitan" },
      {
        kind: "text",
        text: "Instruksi mesin berbentuk biner sehingga sulit dibaca manusia. Bahasa rakitan menggantikan kode biner dengan mnemonik yang mudah diingat serta nama simbolik untuk register dan alamat.",
      },
      {
        kind: "text",
        text: "Program assembler menerjemahkan bahasa rakitan menjadi kode mesin. Bahasa rakitan bersifat spesifik terhadap arsitektur prosesor dan memberi kendali penuh atas perangkat keras.",
      },
      { kind: "heading", text: "Contoh: C = A + B (gaya generik)" },
      {
        kind: "example",
        lines: ["LOAD  R1, A", "LOAD  R2, B", "ADD   R1, R2", "STORE C, R1"],
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "LOAD R1, A: R1 ← isi memori A.",
          "LOAD R2, B: R2 ← isi memori B.",
          "ADD R1, R2: R1 ← R1 + R2.",
          "STORE C, R1: memori C ← R1.",
        ],
      },
      { kind: "figure", svg: FIG_ASSEMBLY_FLOW, caption: "Aliran data program (contoh nilai: A = 5, B = 3, sehingga C = 8)" },
      { kind: "heading", text: "Isi lain bahasa rakitan" },
      {
        kind: "text",
        text: "Selain instruksi, bahasa rakitan memuat label, direktif assembler (misalnya untuk mendefinisikan data), dan komentar.",
      },
      { kind: "heading", text: "Penggunaan" },
      {
        kind: "text",
        text: "Bahasa rakitan banyak dipakai untuk perangkat tertanam (embedded), driver perangkat, dan optimasi bagian kode yang kritis terhadap kinerja.",
      },
      {
        kind: "note",
        text: "Pada model 3D: CPU mengeksekusi hasil terjemahan program ini. R1 dan R2 adalah register di dalam CPU, sedangkan A, B, dan C adalah lokasi di memori (RAM).",
      },
    ],
  },
  {
    id: "addressing",
    title: "Pengalamatan (Addressing)",
    short: "Mode pengalamatan",
    blocks: [
      { kind: "heading", text: "Mode pengalamatan" },
      {
        kind: "text",
        text: "Mode pengalamatan menentukan cara CPU memperoleh alamat efektif operand. Pilihan mode adalah kompromi antara fleksibilitas (jangkauan ruang alamat), kecepatan, dan kompleksitas.",
      },
      {
        kind: "list",
        ordered: false,
        items: [
          "Immediate: operand ada di dalam instruksi. Cepat, tetapi nilainya terbatas ukuran field.",
          "Direct: field alamat berisi alamat efektif operand. Satu akses memori.",
          "Indirect: field alamat menunjuk lokasi yang berisi alamat operand. Butuh dua akses memori atau lebih.",
          "Register / Register indirect: operand berada di register, atau alamatnya di register. Sangat cepat.",
          "Displacement: alamat efektif = isi register + offset (termasuk base-register, indexed, dan relative).",
          "Stack: operand diakses dari puncak stack secara implisit.",
        ],
      },
      { kind: "figure", svg: FIG_ADDRESSING, caption: "Direct dan indirect (ringkasan mode pada Gambar 8.2)" },
      { kind: "heading", text: "Ringkasan alamat efektif (EA)" },
      {
        kind: "example",
        lines: [
          "Immediate          operand = nilai di instruksi",
          "Direct             EA = A",
          "Indirect           EA = Memori[A]",
          "Register           operand = isi R",
          "Register indirect  EA = isi R",
          "Displacement       EA = isi R + offset",
          "Stack              operand = puncak stack",
        ],
      },
      {
        kind: "note",
        text: "Pada model 3D: alamat menunjuk lokasi di RAM. Mode pengalamatan sendiri adalah aturan penghitungan alamat, bukan komponen fisik. Immediate bahkan tidak mengakses RAM, karena nilainya ada di dalam instruksi.",
      },
    ],
  },
  {
    id: "instruction-format",
    title: "Format Instruksi",
    short: "Tata letak bit instruksi",
    blocks: [
      { kind: "heading", text: "Apa itu format instruksi" },
      {
        kind: "text",
        text: "Format instruksi mendefinisikan tata letak bit instruksi: panjang instruksi, jumlah bit opcode, jumlah dan jenis operand, serta bit mode pengalamatan.",
      },
      {
        kind: "text",
        text: "Perancang harus menyeimbangkan banyak hal, yaitu jumlah opcode, jumlah dan ukuran operand, jumlah register, serta ukuran memori yang dialamati.",
      },
      { kind: "heading", text: "Contoh tata letak 16 bit" },
      {
        kind: "figure",
        svg: FIG_INSTRUCTION_FORMAT,
        caption: "Ilustrasi sederhana, bukan format prosesor tertentu",
      },
      { kind: "heading", text: "Panjang instruksi" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Format tetap: semua instruksi sama panjang. Mudah didekode dan cocok untuk pipeline, lazim pada RISC.",
          "Format bervariasi: instruksi pendek untuk operasi sederhana dan panjang untuk operasi kompleks. Lebih hemat memori, lazim pada CISC.",
        ],
      },
      { kind: "heading", text: "Ukuran field" },
      { kind: "formula", text: "n bit opcode → 2^n opcode" },
      {
        kind: "text",
        text: "Jumlah bit untuk opcode menentukan jumlah operasi yang dapat didefinisikan. Bit untuk alamat menentukan ruang memori yang dapat dijangkau langsung. Pada contoh di atas, 4 bit opcode memberi 2⁴ = 16 operasi, dan 10 bit alamat menjangkau 2¹⁰ = 1024 lokasi.",
      },
      {
        kind: "note",
        text: "Pada model 3D: CPU mendekode instruksi menurut formatnya. Format adalah pola bit, bukan bagian fisik CPU.",
      },
    ],
  },
];

/** Supporting panel for the circuit board: physical connections, not one of the six topics. */
export const BOARD_CONTEXT: LessonTopic = {
  id: "board-connections",
  title: "Papan Sirkuit",
  short: "Koneksi fisik antar komponen",
  context: true,
  blocks: [
    { kind: "heading", text: "Peran papan sirkuit" },
    {
      kind: "text",
      text: "Papan sirkuit adalah dasar fisik tempat komponen dipasang. Jalur tembaga dan soket pada papan menghubungkan CPU, memori, dan perangkat lain, sehingga instruksi dan data berpindah sebagai sinyal listrik.",
    },
    { kind: "figure", svg: FIG_BOARD_LINKS, caption: "Penyederhanaan: CPU dan RAM saling terhubung melalui jalur pada papan" },
    { kind: "heading", text: "Contoh: LOAD R1, A" },
    {
      kind: "list",
      ordered: true,
      items: [
        "CPU mengirim alamat A ke RAM melalui jalur pada papan.",
        "RAM mengirim isi A kembali melalui jalur data.",
        "CPU menyimpan nilai itu di register R1, yang berada di dalam CPU.",
      ],
    },
    {
      kind: "note",
      text: "Yang fisik: papan sirkuit, CPU, dan RAM. Yang abstrak: opcode, operand, mode pengalamatan, dan format instruksi. Semuanya adalah pola bit atau aturan, bukan komponen yang bisa ditunjuk pada papan. Pelajari keterkaitannya di tab Jenis Operand dan Pengalamatan.",
    },
  ],
};
