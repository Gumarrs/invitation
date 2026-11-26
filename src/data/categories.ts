import type { Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'wedding',
    name: 'Wedding',
    tagline: 'Janji yang layak dikenang',
    description:
      'Undangan pernikahan dengan alur cerita, galeri, countdown, dan RSVP yang terasa personal untuk dua keluarga.',
    palette: ['#F3E6D0', '#8B5E3C', '#C79B4C'],
    motif: 'floral',
  },
  {
    id: 'birthday',
    name: 'Birthday',
    tagline: 'Satu tahun baru, satu cerita baru',
    description:
      'Dari sweet seventeen sampai perayaan 60 tahun — playful, hangat, dan penuh karakter.',
    palette: ['#FBE3D6', '#C2603F', '#F2B66D'],
    motif: 'sparkle',
  },
  {
    id: 'graduation',
    name: 'Graduation',
    tagline: 'Toga, tawa, dan terima kasih',
    description:
      'Undangan syukuran wisuda dengan nuansa akademik yang rapi dan tetap berkelas.',
    palette: ['#E4E8DC', '#3F5A45', '#C9A55C'],
    motif: 'geometric',
  },
  {
    id: 'engagement',
    name: 'Engagement',
    tagline: 'Awal dari sebuah selamanya',
    description:
      'Lamaran dan tunangan dalam suasana intim, lembut, dan penuh harapan.',
    palette: ['#F1DDD6', '#9C5B55', '#D9B56E'],
    motif: 'frame',
  },
  {
    id: 'gathering',
    name: 'Gathering / Makan-Makan',
    tagline: 'Kumpul santai, cerita panjang',
    description:
      'Arisan, buka bersama, syukuran, dan reuni dengan tampilan hangat yang tidak kaku.',
    palette: ['#F4E2BE', '#A0522D', '#6E7B4F'],
    motif: 'leaf',
  },
  {
    id: 'corporate',
    name: 'Corporate Event',
    tagline: 'Profesional, tetap berkesan',
    description:
      'Gala dinner, peluncuran produk, dan seminar dengan tata letak bersih serta identitas yang tegas.',
    palette: ['#E9E6DF', '#23272E', '#B8893C'],
    motif: 'arch',
  },
  {
    id: 'custom',
    name: 'Custom Invitation',
    tagline: 'Dirancang khusus untuk Anda',
    description:
      'Punya konsep sendiri? Tim desain kami menerjemahkannya menjadi undangan yang benar-benar unik.',
    palette: ['#E8DCCB', '#4A3426', '#D9B56E'],
    motif: 'sparkle',
  },
]

export const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  Category['id'],
  Category
>
