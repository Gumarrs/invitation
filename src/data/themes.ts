import type { Theme } from '@/types'

export const themes: Theme[] = [
  {
    id: 'anime',
    name: 'Anime',
    description:
      'Langit senja bergradasi, kelopak sakura, dan komposisi sinematik ala ilustrasi anime — manis tanpa meniru karakter mana pun.',
    palette: ['#FCE4EC', '#7A5C9E', '#F6A5B7'],
    motif: 'sakura',
    culture: false,
    keywords: ['sakura', 'langit senja', 'sinematik'],
  },
  {
    id: 'nusantara',
    name: 'Nusantara',
    description:
      'Perpaduan lintas pulau yang lembut: tenun, siluet gunung, dan garis laut. Netral untuk keluarga lintas budaya.',
    palette: ['#EADFC8', '#4E6B5B', '#C07A3A'],
    motif: 'mountain',
    culture: true,
    keywords: ['tenun', 'gunung', 'laut'],
  },
  {
    id: 'jawa',
    name: 'Jawa',
    description:
      'Siluet wayang, pola kawung, dan gunungan dalam warna sogan yang teduh. Cocok untuk adat Jawa Tengah dan Jawa Timur.',
    palette: ['#E9D6B0', '#5A3A22', '#B8893C'],
    motif: 'wayang',
    culture: true,
    keywords: ['wayang', 'kawung', 'gunungan', 'sogan'],
  },
  {
    id: 'bali',
    name: 'Bali',
    description:
      'Penjor melengkung, ukiran pura, dan persembahan canang dalam palet emas dan hijau tropis.',
    palette: ['#F2E4C0', '#2F5D3A', '#D49A2A'],
    motif: 'penjor',
    culture: true,
    keywords: ['penjor', 'canang', 'candi bentar', 'ukiran'],
  },
  {
    id: 'jogja',
    name: 'Jogja',
    description:
      'Nuansa keraton: batik parang, Tugu, dan warna biru-putih-emas yang anggun khas Yogyakarta.',
    palette: ['#EFE5CF', '#2C3E63', '#C9A55C'],
    motif: 'gunungan',
    culture: true,
    keywords: ['keraton', 'parang', 'tugu', 'sultan'],
  },
  {
    id: 'batak',
    name: 'Batak',
    description:
      'Ornamen gorga pada rumah bolon dan tenunan ulos dalam komposisi merah, hitam, dan putih yang tegas.',
    palette: ['#F1E7DA', '#8E1F1F', '#1E1A18'],
    motif: 'gorga',
    culture: true,
    keywords: ['gorga', 'ulos', 'rumah bolon'],
  },
  {
    id: 'betawi',
    name: 'Betawi',
    description:
      'Ondel-ondel, ornamen gigi balang, dan warna cerah yang ceria khas pesta rakyat Jakarta.',
    palette: ['#FBEBC8', '#B3261E', '#2E7D6B'],
    motif: 'ondel',
    culture: true,
    keywords: ['ondel-ondel', 'gigi balang', 'tanjidor'],
  },
  {
    id: 'minimalist',
    name: 'Modern Minimalist',
    description:
      'Tipografi besar, ruang kosong, dan satu aksen warna. Bersih, tenang, dan timeless.',
    palette: ['#F5F3EE', '#1F1F1F', '#A68A64'],
    motif: 'arch',
    culture: false,
    keywords: ['whitespace', 'tipografi', 'tenang'],
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description:
      'Latar gelap pekat, foil emas, dan frame klasik untuk acara yang menuntut kesan megah.',
    palette: ['#1B110B', '#E6D3AE', '#C79B4C'],
    motif: 'frame',
    culture: false,
    keywords: ['foil emas', 'klasik', 'megah'],
  },
  {
    id: 'floral',
    name: 'Floral',
    description:
      'Bunga ilustratif berlapis dengan palet dusty rose dan sage yang romantis dan lembut.',
    palette: ['#F8E9E4', '#A25C5C', '#7E8B6C'],
    motif: 'floral',
    culture: false,
    keywords: ['bunga', 'botanical', 'romantis'],
  },
  {
    id: 'rustic',
    name: 'Rustic',
    description:
      'Tekstur kertas kraft, daun kering, dan tipografi tulisan tangan untuk acara outdoor yang hangat.',
    palette: ['#EBDDC3', '#6B4A33', '#8A9A5B'],
    motif: 'leaf',
    culture: false,
    keywords: ['kraft', 'daun', 'outdoor'],
  },
]

export const themeMap = Object.fromEntries(themes.map((t) => [t.id, t])) as Record<
  Theme['id'],
  Theme
>
