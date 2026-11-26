import type { CategoryId, Motif, ThemeId } from '@/types'
import { categoryMap } from './categories'
import { themeMap } from './themes'

export interface DemoSpec {
  category: CategoryId
  theme: ThemeId | null
  palette: [string, string, string]
  motif: Motif
  kicker: string
  names: string
  dateISO: string
  dateLabel: string
  greeting: string
  greetingNote: string
  intro: string
  hostsLabel: string
  hosts: { role: string; name: string; detail?: string }[]
  quote: string
  scheduleTitle: string
  schedule: { time: string; label: string }[]
  place: string
  address: string
  dressCode: string
  extraTitle: string
  extra: { t: string; d: string }[]
  gallery: string[]
  qr: boolean
  rsvpNote: string
  closing: string
}

interface CategoryContent {
  kicker: string
  names: string
  dateISO: string
  dateLabel: string
  intro: string
  hostsLabel: string
  hosts: DemoSpec['hosts']
  scheduleTitle: string
  schedule: DemoSpec['schedule']
  place: string
  address: string
  extraTitle: string
  extra: DemoSpec['extra']
  qr?: boolean
  rsvpNote: string
  defaultTheme: ThemeId
}

const categoryContent: Record<CategoryId, CategoryContent> = {
  wedding: {
    kicker: 'The Wedding of',
    names: 'Nadia & Arga',
    dateISO: '2027-03-13T08:00:00+07:00',
    dateLabel: 'Sabtu, 13 Maret 2027',
    intro:
      'Dengan penuh syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari pernikahan kami.',
    hostsLabel: 'Kedua Mempelai',
    hosts: [
      { role: 'Mempelai Wanita', name: 'Nadia Paramitha', detail: 'Putri dari Bapak Hendra & Ibu Sari' },
      { role: 'Mempelai Pria', name: 'Arga Wicaksono', detail: 'Putra dari Bapak Dimas & Ibu Laksmi' },
    ],
    scheduleTitle: 'Rangkaian Acara',
    schedule: [
      { time: '08.00', label: 'Akad / Pemberkatan' },
      { time: '11.00', label: 'Resepsi' },
      { time: '13.30', label: 'Penutup' },
    ],
    place: 'Gedung Serbaguna Cahaya',
    address: 'Jl. Contoh Raya No. 21, Jakarta Selatan',
    extraTitle: 'Kisah Kami',
    extra: [
      { t: '2019 · Bertemu', d: 'Dua orang asing di satu antrean kopi yang terlalu panjang.' },
      { t: '2023 · Yakin', d: 'Sepuluh jam perjalanan membuat kami tahu: ini rumahnya.' },
      { t: '2026 · Melamar', d: 'Satu pertanyaan sederhana, satu jawaban yang tidak perlu dipikir.' },
    ],
    rsvpNote: 'Mohon konfirmasi kehadiran agar kami dapat menyiapkan tempat terbaik untuk Anda.',
    defaultTheme: 'floral',
  },
  birthday: {
    kicker: 'You Are Invited',
    names: 'Dinda turns 25',
    dateISO: '2027-01-23T18:00:00+07:00',
    dateLabel: 'Sabtu, 23 Januari 2027',
    intro: 'Satu tahun baru, satu cerita baru. Ayo rayakan bersama dengan kue, musik, dan tawa yang terlalu keras.',
    hostsLabel: 'Yang Berulang Tahun',
    hosts: [{ role: 'Tuan Rumah', name: 'Dinda Ayu Lestari', detail: 'Dan seluruh keluarga' }],
    scheduleTitle: 'Susunan Pesta',
    schedule: [
      { time: '18.00', label: 'Tamu tiba & welcome drink' },
      { time: '19.00', label: 'Tiup lilin & potong kue' },
      { time: '20.00', label: 'Makan malam & musik' },
    ],
    place: 'Rooftop Kafe Senja',
    address: 'Jl. Contoh Indah No. 8, Bandung',
    extraTitle: 'Wishlist & Catatan',
    extra: [
      { t: 'Kado', d: 'Kehadiran Anda sudah lebih dari cukup. Buku dan tanaman selalu diterima.' },
      { t: 'Foto', d: 'Ada pojok foto. Silakan berpose sebebas-bebasnya.' },
      { t: 'Parkir', d: 'Tersedia di basement. Tunjukkan undangan ini kepada petugas.' },
    ],
    rsvpNote: 'Konfirmasi sebelum 16 Januari 2027 ya, supaya kuenya cukup.',
    defaultTheme: 'anime',
  },
  graduation: {
    kicker: 'Syukuran Wisuda',
    names: 'Fadhil Ramadhan, S.T.',
    dateISO: '2027-02-27T11:00:00+07:00',
    dateLabel: 'Sabtu, 27 Februari 2027',
    intro: 'Dengan rasa syukur, kami mengundang Anda untuk berbagi kebahagiaan atas selesainya perjalanan studi ini.',
    hostsLabel: 'Sang Lulusan',
    hosts: [{ role: 'Wisudawan', name: 'Fadhil Ramadhan, S.T.', detail: 'Teknik Informatika · Angkatan 2022' }],
    scheduleTitle: 'Susunan Acara',
    schedule: [
      { time: '11.00', label: 'Doa & sambutan keluarga' },
      { time: '12.00', label: 'Makan siang bersama' },
      { time: '14.00', label: 'Foto bersama' },
    ],
    place: 'Kediaman Keluarga Ramadhan',
    address: 'Jl. Contoh Asri No. 5, Depok',
    extraTitle: 'Perjalanan Studi',
    extra: [
      { t: '2022 · Mulai', d: 'Hari pertama dengan jas almamater yang masih kebesaran.' },
      { t: '2024 · Bertahan', d: 'Begadang, revisi, dan kopi yang tak terhitung.' },
      { t: '2026 · Lulus', d: 'Toga, tawa, dan terima kasih untuk semua yang menemani.' },
    ],
    rsvpNote: 'Kehadiran dan doa Anda adalah hadiah terbaik.',
    defaultTheme: 'luxury',
  },
  engagement: {
    kicker: 'Lamaran',
    names: 'Mira & Gilang',
    dateISO: '2026-12-19T10:00:00+07:00',
    dateLabel: 'Sabtu, 19 Desember 2026',
    intro: 'Kami mengundang Anda untuk menyaksikan awal dari sebuah perjalanan panjang, dalam suasana yang hangat dan sederhana.',
    hostsLabel: 'Kedua Keluarga',
    hosts: [
      { role: 'Calon Mempelai Wanita', name: 'Mira Anindita', detail: 'Putri dari Bapak Surya & Ibu Wati' },
      { role: 'Calon Mempelai Pria', name: 'Gilang Pratama', detail: 'Putra dari Bapak Teguh & Ibu Rini' },
    ],
    scheduleTitle: 'Rangkaian Acara',
    schedule: [
      { time: '10.00', label: 'Kedatangan keluarga' },
      { time: '10.30', label: 'Prosesi lamaran' },
      { time: '12.00', label: 'Makan siang bersama' },
    ],
    place: 'Kediaman Keluarga Anindita',
    address: 'Jl. Contoh Melati No. 17, Bogor',
    extraTitle: 'Tentang Hari Itu',
    extra: [
      { t: 'Suasana', d: 'Intim dan hangat. Hanya keluarga dan sahabat terdekat.' },
      { t: 'Busana', d: 'Warna lembut seperti krem, rose, atau sage.' },
      { t: 'Hadiah', d: 'Doa Anda sudah lebih dari cukup bagi kami.' },
    ],
    rsvpNote: 'Karena tempat terbatas, mohon konfirmasi kehadiran Anda.',
    defaultTheme: 'floral',
  },
  gathering: {
    kicker: 'Makan-Makan Bersama',
    names: 'Alumni SMA 2016',
    dateISO: '2026-12-12T12:00:00+07:00',
    dateLabel: 'Sabtu, 12 Desember 2026',
    intro: 'Sudah terlalu lama tidak ngumpul. Yuk makan bareng, bertukar kabar, dan mengulang cerita lama sampai sore.',
    hostsLabel: 'Panitia',
    hosts: [
      { role: 'Ketua Panitia', name: 'Rizky Maulana' },
      { role: 'Bendahara', name: 'Salsa Nuraini' },
    ],
    scheduleTitle: 'Susunan Acara',
    schedule: [
      { time: '12.00', label: 'Kumpul & registrasi' },
      { time: '12.30', label: 'Makan siang prasmanan' },
      { time: '14.30', label: 'Ngobrol, foto, dan kejutan' },
    ],
    place: 'Rumah Makan Sederhana Rasa',
    address: 'Jl. Contoh Bahagia No. 3, Bandung',
    extraTitle: 'Menu & Patungan',
    extra: [
      { t: 'Menu', d: 'Nasi liwet, ayam bakar, sayur asem, sambal, dan es teh manis.' },
      { t: 'Patungan', d: 'Rp75.000 per orang, dibayar di tempat atau transfer ke bendahara.' },
      { t: 'Bawa', d: 'Foto lama dan cerita yang belum pernah diceritakan.' },
    ],
    rsvpNote: 'Isi jumlah orang yang ikut supaya reservasi tempatnya pas.',
    defaultTheme: 'rustic',
  },
  corporate: {
    kicker: 'Annual Gala Dinner',
    names: 'PT Kirana Mandala',
    dateISO: '2027-01-28T19:00:00+07:00',
    dateLabel: 'Kamis, 28 Januari 2027',
    intro: 'Kami mengundang Anda untuk merayakan pencapaian tahun ini dan menyongsong langkah berikutnya bersama mitra terbaik kami.',
    hostsLabel: 'Penyelenggara',
    hosts: [
      { role: 'Direktur Utama', name: 'Ir. Bambang Hartono' },
      { role: 'Event Manager', name: 'Dewi Larasati' },
    ],
    scheduleTitle: 'Agenda',
    schedule: [
      { time: '18.00', label: 'Registrasi & welcome cocktail' },
      { time: '19.00', label: 'Sambutan & penghargaan mitra' },
      { time: '20.00', label: 'Gala dinner' },
    ],
    place: 'Grand Ballroom Menara Contoh',
    address: 'Jl. Jenderal Contoh Kav. 10, Jakarta Pusat',
    extraTitle: 'Pembicara',
    extra: [
      { t: 'Bambang Hartono', d: 'Direktur Utama · Pembukaan' },
      { t: 'Ratna Kusuma', d: 'Chief Strategy Officer · Arah 2027' },
      { t: 'Dr. Andika Putra', d: 'Tamu kehormatan · Keynote' },
    ],
    qr: true,
    rsvpNote: 'Konfirmasi kehadiran untuk menerima QR check-in pribadi Anda.',
    defaultTheme: 'minimalist',
  },
  custom: {
    kicker: 'Custom Invitation',
    names: 'Cerita Anda',
    dateISO: '2027-04-17T16:00:00+07:00',
    dateLabel: 'Tanggal pilihan Anda',
    intro: 'Undangan ini dirancang dari nol bersama Anda: konsep, palet, ilustrasi, hingga alur ceritanya.',
    hostsLabel: 'Tuan Rumah',
    hosts: [{ role: 'Nama Anda', name: 'Nama Tuan Rumah', detail: 'Tulis sapaan atau keterangan sesuai kebutuhan' }],
    scheduleTitle: 'Susunan Acara',
    schedule: [
      { time: '16.00', label: 'Acara dimulai' },
      { time: '17.30', label: 'Momen utama' },
      { time: '19.00', label: 'Penutup' },
    ],
    place: 'Lokasi Acara Anda',
    address: 'Alamat lengkap akan tampil di sini',
    extraTitle: 'Cara Kerja Paket Custom',
    extra: [
      { t: '1 · Konsultasi', d: 'Ceritakan konsep, suasana, dan hal yang ingin ditonjolkan.' },
      { t: '2 · Moodboard', d: 'Kami menyusun palet, motif, dan gaya tipografi untuk disetujui.' },
      { t: '3 · Revisi', d: 'Dua putaran revisi sampai undangan terasa benar-benar milik Anda.' },
    ],
    rsvpNote: 'Formulir RSVP dapat disesuaikan dengan kebutuhan acara Anda.',
    defaultTheme: 'nusantara',
  },
}

interface Flavor {
  kickerNote?: string
  greeting: string
  greetingNote: string
  quote: string
  dressCode: string
  gallery: [string, string, string]
  closing: string
}

const neutralFlavor: Flavor = {
  greeting: 'Dengan hormat',
  greetingNote: 'Kami berbahagia menyambut Anda',
  quote: 'Momen terbaik adalah yang dibagikan bersama orang-orang tercinta.',
  dressCode: 'Busana rapi dan nyaman',
  gallery: ['Detail', 'Suasana', 'Kenangan'],
  closing: 'Terima kasih',
}

const flavors: Record<ThemeId, Flavor> = {
  anime: {
    greeting: 'Selamat datang!',
    greetingNote: 'Sebuah bab baru akan segera dimulai',
    quote: 'Setiap kelopak yang jatuh adalah awal dari cerita baru.',
    dressCode: 'Pastel, atau warna ceria apa pun yang Anda suka',
    gallery: ['Langit senja', 'Taman sakura', 'Jalan pulang'],
    closing: 'Sampai jumpa di acaranya!',
  },
  nusantara: {
    greeting: 'Salam hangat dari Nusantara',
    greetingNote: 'Dari ujung ke ujung, cerita kita bertemu',
    quote: 'Beragam pulau, satu rumah yang sama.',
    dressCode: 'Kain atau tenun dari daerah masing-masing',
    gallery: ['Tenun', 'Gunung', 'Laut'],
    closing: 'Terima kasih',
  },
  jawa: {
    greeting: 'Sugeng Rawuh',
    greetingNote: 'Kanthi kebingahan, kawula nyuwun pangestu',
    quote: 'Alon-alon asal kelakon. Pelan-pelan, asal tercapai.',
    dressCode: 'Batik atau kebaya dengan warna sogan',
    gallery: ['Gunungan', 'Pola kawung', 'Wayang'],
    closing: 'Matur nuwun',
  },
  bali: {
    greeting: 'Om Swastyastu',
    greetingNote: 'Semoga semua berada dalam anugerah dan kedamaian',
    quote: 'Keseimbangan antara manusia, alam, dan Sang Pencipta.',
    dressCode: 'Busana adat madya atau pakaian sopan',
    gallery: ['Penjor', 'Canang', 'Candi bentar'],
    closing: 'Suksma',
  },
  jogja: {
    greeting: 'Sugeng Rawuh',
    greetingNote: 'Ing dinten ingkang mulya punika',
    quote: 'Hamemayu hayuning bawana. Mempercantik dunia dengan kebaikan.',
    dressCode: 'Batik dengan nuansa biru dan emas',
    gallery: ['Tugu', 'Batik parang', 'Alun-alun'],
    closing: 'Matur nuwun',
  },
  batak: {
    greeting: 'Horas!',
    greetingNote: 'Kami mengundang Anda dengan penuh sukacita',
    quote: 'Maju bersama dalam kekerabatan dan saling menghormati.',
    dressCode: 'Ulos atau busana sopan',
    gallery: ['Gorga', 'Ulos', 'Rumah bolon'],
    closing: 'Mauliate godang',
  },
  betawi: {
    greeting: 'Assalamualaikum Wr. Wb.',
    greetingNote: 'Ayo, jangan sampai nggak datang!',
    quote: 'Rumah boleh kecil, hati orang Betawi selalu lapang.',
    dressCode: 'Baju koko, kebaya encim, atau pakaian sopan yang cerah',
    gallery: ['Ondel-ondel', 'Gigi balang', 'Kembang kelapa'],
    closing: 'Makasih banyak, Bang, Mpok!',
  },
  minimalist: {
    greeting: 'Halo.',
    greetingNote: 'Sederhana, tapi sungguh-sungguh',
    quote: 'Yang sederhana sering kali paling lama diingat.',
    dressCode: 'Warna netral',
    gallery: ['Garis', 'Ruang', 'Cahaya'],
    closing: 'Terima kasih',
  },
  luxury: {
    greeting: 'You Are Cordially Invited',
    greetingNote: 'Sebuah malam yang layak dikenang',
    quote: 'Elegansi adalah satu-satunya keindahan yang tidak pernah pudar.',
    dressCode: 'Formal gelap / black tie',
    gallery: ['Foil emas', 'Frame klasik', 'Malam hari'],
    closing: 'Kami menantikan kehadiran Anda',
  },
  floral: {
    greeting: 'Dengan penuh cinta',
    greetingNote: 'Seperti bunga yang mekar pada waktunya',
    quote: 'Cinta tumbuh pelan, lalu mekar tanpa meminta izin.',
    dressCode: 'Dusty rose dan sage',
    gallery: ['Kelopak', 'Karangan', 'Taman'],
    closing: 'Terima kasih sudah hadir',
  },
  rustic: {
    greeting: 'Selamat datang di kebun kami',
    greetingNote: 'Bawa hati yang santai dan perut yang lapar',
    quote: 'Hal-hal terbaik tumbuh perlahan, di bawah matahari sore.',
    dressCode: 'Linen dan warna bumi',
    gallery: ['Daun kering', 'Meja panjang', 'Lampu gantung'],
    closing: 'Sampai ketemu di kebun',
  },
}

/** Susun konten demo dari pasangan (kategori, tema). Tanpa tema = memakai palet kategori. */
export function buildDemo(category: CategoryId, theme: ThemeId | null): DemoSpec {
  const c = categoryContent[category]
  const cat = categoryMap[category]
  const th = theme ? themeMap[theme] : null
  const f = theme ? flavors[theme] : neutralFlavor
  return {
    category,
    theme,
    palette: th ? th.palette : cat.palette,
    motif: th ? th.motif : cat.motif,
    kicker: c.kicker,
    names: c.names,
    dateISO: c.dateISO,
    dateLabel: c.dateLabel,
    greeting: f.greeting,
    greetingNote: f.greetingNote,
    intro: c.intro,
    hostsLabel: c.hostsLabel,
    hosts: c.hosts,
    quote: f.quote,
    scheduleTitle: c.scheduleTitle,
    schedule: c.schedule,
    place: c.place,
    address: c.address,
    dressCode: f.dressCode,
    extraTitle: c.extraTitle,
    extra: c.extra,
    gallery: f.gallery,
    qr: !!c.qr,
    rsvpNote: c.rsvpNote,
    closing: f.closing,
  }
}

/** Kategori bawaan untuk demo tema (bisa diganti lewat ?category=). */
export const defaultCategoryForTheme: Record<ThemeId, CategoryId> = {
  anime: 'birthday',
  nusantara: 'wedding',
  jawa: 'wedding',
  bali: 'wedding',
  jogja: 'wedding',
  batak: 'wedding',
  betawi: 'wedding',
  minimalist: 'corporate',
  luxury: 'wedding',
  floral: 'wedding',
  rustic: 'gathering',
}

/** Tema bawaan untuk demo kategori (bisa diganti lewat ?theme=). */
export const defaultThemeForCategory: Record<CategoryId, ThemeId> = Object.fromEntries(
  (Object.keys(categoryContent) as CategoryId[]).map((k) => [k, categoryContent[k].defaultTheme]),
) as Record<CategoryId, ThemeId>
