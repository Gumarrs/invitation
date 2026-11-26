import type { Badge, CategoryId, Motif, Template, ThemeId } from '@/types'
import { themeMap } from './themes'

const baseFeatures = [
  'Countdown hari-H',
  'RSVP & ucapan tamu',
  'Galeri foto',
  'Peta lokasi & tombol navigasi',
  'Musik latar (opsional)',
]

interface Entry {
  name: string
  category: CategoryId
  theme: ThemeId
  price: number
  oldPrice?: number
  badge?: Badge
  popularity: number
  createdAt: string
  tagline: string
  description: string
  extra?: string[]
  motif?: Motif
  mock: Template['mock']
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function make(e: Entry, i: number): Template {
  const th = themeMap[e.theme]
  return {
    id: `tpl-${String(i + 1).padStart(2, '0')}`,
    slug: slugify(e.name),
    name: e.name,
    category: e.category,
    theme: e.theme,
    price: e.price,
    oldPrice: e.oldPrice,
    badge: e.badge,
    popularity: e.popularity,
    createdAt: e.createdAt,
    tagline: e.tagline,
    description: e.description,
    features: [...baseFeatures, ...(e.extra ?? [])],
    palette: th.palette,
    motif: e.motif ?? th.motif,
    mock: e.mock,
  }
}

const entries: Entry[] = [
  {
    name: 'Sekar Kedhaton',
    category: 'wedding',
    theme: 'jawa',
    price: 189000,
    oldPrice: 249000,
    badge: 'Best Seller',
    popularity: 98,
    createdAt: '2026-06-02',
    tagline: 'Wayang, kawung, dan hangatnya sogan',
    description:
      'Undangan pernikahan adat Jawa dengan siluet wayang, pola kawung, dan gunungan sebagai pembuka cerita. Tersedia ruang untuk silsilah keluarga dan susunan acara adat.',
    extra: ['Susunan acara adat', 'Silsilah keluarga'],
    mock: { title: 'Pawiwahan', names: 'Raras & Bimo', date: '14 · 02 · 2027', place: 'Surakarta' },
  },
  {
    name: 'Tirta Sukla',
    category: 'wedding',
    theme: 'bali',
    price: 199000,
    badge: 'Popular',
    popularity: 94,
    createdAt: '2026-07-11',
    tagline: 'Penjor, canang, dan senja di pura',
    description:
      'Komposisi penjor melengkung dengan latar candi bentar dan nuansa hijau emas. Cocok untuk upacara pawiwahan maupun resepsi.',
    extra: ['Salam Om Swastyastu', 'Tautan live streaming'],
    mock: { title: 'Pawiwahan', names: 'Ayu & Wayan', date: '20 · 03 · 2027', place: 'Ubud, Bali' },
  },
  {
    name: 'Kusuma Keraton',
    category: 'wedding',
    theme: 'jogja',
    price: 215000,
    badge: 'New',
    popularity: 86,
    createdAt: '2026-11-03',
    tagline: 'Anggun biru-emas khas Yogyakarta',
    description:
      'Inspirasi keraton dengan batik parang, siluet Tugu, dan palet biru tua keemasan. Tata letak formal untuk dua keluarga besar.',
    extra: ['Susunan acara adat', 'Dress code tamu'],
    mock: { title: 'Ngundhuh Mantu', names: 'Laras & Dimas', date: '08 · 05 · 2027', place: 'Yogyakarta' },
  },
  {
    name: 'Gorga Mutiara',
    category: 'wedding',
    theme: 'batak',
    price: 205000,
    popularity: 79,
    createdAt: '2026-08-19',
    tagline: 'Gorga, ulos, dan semangat marga',
    description:
      'Ornamen gorga pada bingkai undangan dengan warna merah, hitam, dan putih yang tegas. Ruang untuk daftar tutur dan acara adat.',
    extra: ['Daftar kerabat & tutur', 'Susunan acara adat'],
    mock: { title: 'Pesta Unjuk', names: 'Mutiara & Sihombing', date: '12 · 09 · 2027', place: 'Medan' },
  },
  {
    name: 'Ondel Rame',
    category: 'wedding',
    theme: 'betawi',
    price: 179000,
    badge: 'New',
    popularity: 72,
    createdAt: '2026-10-21',
    tagline: 'Meriah, hangat, dan penuh tawa',
    description:
      'Ondel-ondel, ornamen gigi balang, dan warna cerah untuk resepsi Betawi yang ramai dan akrab.',
    mock: { title: 'Akad & Resepsi', names: 'Nisa & Rizal', date: '30 · 01 · 2027', place: 'Jakarta' },
  },
  {
    name: 'Atelier Noir',
    category: 'wedding',
    theme: 'luxury',
    price: 285000,
    oldPrice: 349000,
    badge: 'Best Seller',
    popularity: 96,
    createdAt: '2026-05-14',
    tagline: 'Gelap, megah, berfoil emas',
    description:
      'Latar cokelat pekat dengan frame klasik berfoil emas. Animasi pembuka amplop untuk kesan yang dramatis.',
    extra: ['Animasi buka amplop', 'Mode gelap penuh'],
    mock: { title: 'The Wedding of', names: 'Alexa & Reza', date: '06 · 06 · 2027', place: 'Jakarta' },
  },
  {
    name: 'Bloom & Linen',
    category: 'wedding',
    theme: 'floral',
    price: 169000,
    badge: 'Popular',
    popularity: 91,
    createdAt: '2026-04-28',
    tagline: 'Bunga ilustratif yang berlapis lembut',
    description:
      'Karangan bunga gambar tangan dengan palet dusty rose dan sage. Transisi halaman terasa seperti membuka lembar demi lembar.',
    mock: { title: 'We Are Getting Married', names: 'Dinda & Arka', date: '17 · 04 · 2027', place: 'Bandung' },
  },
  {
    name: 'Sakura Hour',
    category: 'birthday',
    theme: 'anime',
    price: 129000,
    badge: 'New',
    popularity: 83,
    createdAt: '2026-11-10',
    tagline: 'Senja ungu dan kelopak yang berjatuhan',
    description:
      'Ilustrasi langit senja dengan kelopak sakura jatuh perlahan. Pas untuk sweet seventeen dan ulang tahun anak muda.',
    mock: { title: 'Sweet Seventeen', names: 'Kinan', date: '22 · 12 · 2026', place: 'Tangerang' },
  },
  {
    name: 'Confetti Paper',
    category: 'birthday',
    theme: 'minimalist',
    price: 99000,
    popularity: 70,
    createdAt: '2026-03-30',
    tagline: 'Sederhana, rapi, penuh konfeti',
    description:
      'Tipografi besar dengan satu aksen warna dan konfeti halus. Mudah dipadukan dengan tema pesta apa pun.',
    mock: { title: 'Turning 30', names: 'Bagas', date: '09 · 01 · 2027', place: 'Jakarta' },
  },
  {
    name: 'Kebun Kenangan',
    category: 'birthday',
    theme: 'rustic',
    price: 119000,
    popularity: 64,
    createdAt: '2026-02-15',
    tagline: 'Pesta kebun di bawah lampu gantung',
    description:
      'Nuansa kraft, daun kering, dan tulisan tangan untuk perayaan outdoor yang hangat.',
    mock: { title: 'Garden Party', names: 'Oma Rukmini · 70', date: '15 · 03 · 2027', place: 'Lembang' },
  },
  {
    name: 'Toga Emas',
    category: 'graduation',
    theme: 'luxury',
    price: 109000,
    badge: 'Popular',
    popularity: 80,
    createdAt: '2026-06-25',
    tagline: 'Syukuran wisuda yang berkelas',
    description:
      'Frame emas di atas latar gelap, lengkap dengan kolom ucapan dan galeri momen wisuda.',
    mock: { title: 'Syukuran Wisuda', names: 'Farhan, S.T.', date: '27 · 02 · 2027', place: 'Depok' },
  },
  {
    name: 'Lembar Pertama',
    category: 'graduation',
    theme: 'minimalist',
    price: 89000,
    popularity: 66,
    createdAt: '2026-05-02',
    tagline: 'Bersih seperti halaman skripsi baru',
    description:
      'Tata letak editorial yang tenang untuk undangan syukuran wisuda dan acara akademik.',
    mock: { title: 'Graduation', names: 'Salsabila, S.Ked.', date: '03 · 04 · 2027', place: 'Yogyakarta' },
  },
  {
    name: 'Janji Senja',
    category: 'engagement',
    theme: 'floral',
    price: 139000,
    badge: 'Popular',
    popularity: 85,
    createdAt: '2026-07-30',
    tagline: 'Lamaran yang lembut dan intim',
    description:
      'Rangkaian bunga dengan frame oval dan tipografi miring yang romantis untuk acara lamaran.',
    mock: { title: 'Lamaran', names: 'Mira & Gilang', date: '11 · 12 · 2026', place: 'Bogor' },
  },
  {
    name: 'Cincin Nusantara',
    category: 'engagement',
    theme: 'nusantara',
    price: 149000,
    popularity: 68,
    createdAt: '2026-09-09',
    tagline: 'Tenun, gunung, dan laut dalam satu halaman',
    description:
      'Tema lintas pulau yang netral untuk pasangan beda daerah. Motif tenun lembut dengan siluet gunung.',
    mock: { title: 'Tunangan', names: 'Kartika & Yoga', date: '19 · 12 · 2026', place: 'Makassar' },
  },
  {
    name: 'Meja Panjang',
    category: 'gathering',
    theme: 'rustic',
    price: 89000,
    popularity: 75,
    createdAt: '2026-08-01',
    tagline: 'Makan-makan tanpa basa-basi',
    description:
      'Undangan santai untuk arisan, buka bersama, dan reuni dengan daftar menu dan patungan.',
    extra: ['Daftar menu', 'Pilihan hadir / tidak'],
    mock: { title: 'Makan Bareng', names: 'Alumni 2016', date: '05 · 12 · 2026', place: 'Bandung' },
  },
  {
    name: 'Rame-Rame Betawi',
    category: 'gathering',
    theme: 'betawi',
    price: 79000,
    badge: 'Best Seller',
    popularity: 90,
    createdAt: '2026-04-05',
    tagline: 'Kumpul keluarga ala kampung',
    description:
      'Warna cerah dan ornamen gigi balang untuk syukuran dan kumpul keluarga besar.',
    mock: { title: 'Syukuran', names: 'Keluarga Haji Mansur', date: '20 · 12 · 2026', place: 'Jakarta' },
  },
  {
    name: 'Sore di Teras',
    category: 'gathering',
    theme: 'nusantara',
    price: 85000,
    popularity: 58,
    createdAt: '2026-01-22',
    tagline: 'Teh hangat dan cerita lama',
    description:
      'Layout hangat dengan siluet gunung dan palet tanah untuk acara kumpul-kumpul.',
    mock: { title: 'Ngopi Sore', names: 'Komunitas Pagi', date: '13 · 12 · 2026', place: 'Malang' },
  },
  {
    name: 'Grand Gala',
    category: 'corporate',
    theme: 'luxury',
    price: 319000,
    badge: 'Popular',
    popularity: 88,
    createdAt: '2026-03-12',
    tagline: 'Gala dinner dengan presensi elegan',
    description:
      'Undangan korporat bernuansa gelap dengan agenda, dress code, dan QR check-in.',
    extra: ['QR check-in', 'Agenda & pembicara'],
    mock: { title: 'Annual Gala Dinner', names: 'PT Kirana Mandala', date: '28 · 01 · 2027', place: 'Jakarta' },
  },
  {
    name: 'Studio Grid',
    category: 'corporate',
    theme: 'minimalist',
    price: 249000,
    badge: 'New',
    popularity: 74,
    createdAt: '2026-10-08',
    tagline: 'Peluncuran produk, bersih dan tegas',
    description:
      'Grid editorial dengan tipografi tegas untuk launching, seminar, dan konferensi.',
    extra: ['QR check-in', 'Agenda & pembicara'],
    mock: { title: 'Product Launch', names: 'Halo Labs', date: '16 · 02 · 2027', place: 'BSD City' },
  },
  {
    name: 'Cerita Kita',
    category: 'custom',
    theme: 'floral',
    price: 399000,
    popularity: 62,
    createdAt: '2026-09-27',
    tagline: 'Dirancang dari nol bersama Anda',
    description:
      'Paket desain khusus: konsultasi konsep, moodboard, dan satu putaran revisi. Palet dan motif mengikuti cerita Anda.',
    extra: ['Konsultasi konsep', 'Moodboard & 2 revisi'],
    mock: { title: 'Custom Story', names: 'Nama Anda', date: '00 · 00 · 2027', place: 'Kota Anda' },
  },
  {
    name: 'Jagat Sarira',
    category: 'wedding',
    theme: 'nusantara',
    price: 229000,
    popularity: 77,
    createdAt: '2026-10-30',
    tagline: 'Peta pulau dan benang tenun emas',
    description:
      'Undangan pernikahan lintas budaya dengan garis laut, siluet gunung, dan tenun emas yang tidak condong ke satu daerah.',
    extra: ['Dua bahasa (ID / EN)'],
    mock: { title: 'Pernikahan', names: 'Sekar & Daniel', date: '24 · 07 · 2027', place: 'Labuan Bajo' },
  },
  {
    name: 'Wayang Kulit Malam',
    category: 'gathering',
    theme: 'jawa',
    price: 95000,
    popularity: 61,
    createdAt: '2026-06-18',
    tagline: 'Malam selamatan dan pagelaran',
    description:
      'Siluet wayang dengan latar kelir untuk syukuran, selamatan, dan pagelaran malam.',
    mock: { title: 'Selamatan', names: 'Keluarga Hadi', date: '18 · 12 · 2026', place: 'Klaten' },
  },
  {
    name: 'Pesta Rakyat Ulos',
    category: 'gathering',
    theme: 'batak',
    price: 99000,
    popularity: 55,
    createdAt: '2026-07-04',
    tagline: 'Kumpul marga dalam balutan ulos',
    description:
      'Ornamen gorga dan pola ulos untuk acara kumpul marga dan syukuran keluarga.',
    mock: { title: 'Horja Marga', names: 'Keluarga Simanjuntak', date: '26 · 12 · 2026', place: 'Balige' },
  },
]

export const templates: Template[] = entries.map(make)

export const templateBySlug = (slug: string) => templates.find((t) => t.slug === slug)

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)
