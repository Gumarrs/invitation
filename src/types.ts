export type CategoryId =
  | 'wedding'
  | 'birthday'
  | 'graduation'
  | 'engagement'
  | 'gathering'
  | 'corporate'
  | 'custom'

export type ThemeId =
  | 'anime'
  | 'nusantara'
  | 'jawa'
  | 'bali'
  | 'jogja'
  | 'batak'
  | 'betawi'
  | 'minimalist'
  | 'luxury'
  | 'floral'
  | 'rustic'

export type Badge = 'Popular' | 'New' | 'Best Seller'

/** Motif dekoratif yang tersedia di InvitationMockup / OrnamentArt */
export type Motif =
  | 'floral'
  | 'leaf'
  | 'batik'
  | 'geometric'
  | 'frame'
  | 'sparkle'
  | 'wayang'
  | 'gunungan'
  | 'penjor'
  | 'gorga'
  | 'ondel'
  | 'mountain'
  | 'sakura'
  | 'arch'

export interface Category {
  id: CategoryId
  name: string
  tagline: string
  description: string
  palette: [string, string, string]
  motif: Motif
}

export interface Theme {
  id: ThemeId
  name: string
  description: string
  /** warna identitas: [latar, utama, aksen] */
  palette: [string, string, string]
  motif: Motif
  culture: boolean
  keywords: string[]
}

export interface Template {
  id: string
  slug: string
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
  features: string[]
  palette: [string, string, string]
  motif: Motif
  /** teks di mockup */
  mock: { title: string; names: string; date: string; place: string }
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  templateSlug: string
}

export interface Faq {
  id: string
  q: string
  a: string
}
