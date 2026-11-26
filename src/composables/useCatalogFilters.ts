import { computed } from 'vue'
import { useRoute, useRouter, type LocationQueryRaw } from 'vue-router'
import { templates } from '@/data/templates'
import { categories } from '@/data/categories'
import { themes } from '@/data/themes'

export const priceRanges = [
  { id: 'all', label: 'Semua harga', min: 0, max: Infinity },
  { id: 'lt100', label: 'Di bawah Rp100.000', min: 0, max: 99999 },
  { id: '100-200', label: 'Rp100.000 – Rp200.000', min: 100000, max: 200000 },
  { id: '200-300', label: 'Rp200.000 – Rp300.000', min: 200001, max: 300000 },
  { id: 'gt300', label: 'Di atas Rp300.000', min: 300001, max: Infinity },
] as const

export const sortOptions = [
  { id: 'popular', label: 'Terpopuler' },
  { id: 'newest', label: 'Terbaru' },
  { id: 'price-asc', label: 'Harga terendah' },
  { id: 'price-desc', label: 'Harga tertinggi' },
] as const

type SortId = (typeof sortOptions)[number]['id']

const one = (v: unknown) => (Array.isArray(v) ? String(v[0] ?? '') : typeof v === 'string' ? v : '')

/** Filter katalog yang disimpan di query URL: bisa di-bookmark, dan tombol back bekerja. */
export function useCatalogFilters() {
  const route = useRoute()
  const router = useRouter()

  const category = computed(() => {
    const v = one(route.query.category)
    return categories.some((c) => c.id === v) ? v : ''
  })
  const theme = computed(() => {
    const v = one(route.query.theme)
    return themes.some((t) => t.id === v) ? v : ''
  })
  const price = computed(() => {
    const v = one(route.query.price)
    return priceRanges.some((p) => p.id === v) ? v : 'all'
  })
  const sort = computed<SortId>(() => {
    const v = one(route.query.sort)
    return (sortOptions.find((s) => s.id === v)?.id ?? 'popular') as SortId
  })
  const q = computed(() => one(route.query.q))

  function set(patch: Partial<Record<'category' | 'theme' | 'price' | 'sort' | 'q', string>>) {
    const next: LocationQueryRaw = { ...route.query, ...patch }
    for (const k of Object.keys(next)) {
      const val = next[k]
      if (!val || val === 'all' || (k === 'sort' && val === 'popular')) delete next[k]
    }
    router.replace({ query: next })
  }

  const reset = () => router.replace({ query: {} })

  const active = computed(
    () => [category.value, theme.value, price.value !== 'all' ? price.value : '', q.value.trim()].filter(Boolean).length,
  )

  const results = computed(() => {
    const range = priceRanges.find((p) => p.id === price.value)!
    const term = q.value.trim().toLowerCase()
    const list = templates.filter((t) => {
      if (category.value && t.category !== category.value) return false
      if (theme.value && t.theme !== theme.value) return false
      if (t.price < range.min || t.price > range.max) return false
      if (term && !`${t.name} ${t.tagline}`.toLowerCase().includes(term)) return false
      return true
    })
    const sorted = [...list]
    switch (sort.value) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        break
      default:
        sorted.sort((a, b) => b.popularity - a.popularity)
    }
    return sorted
  })

  return { category, theme, price, sort, q, set, reset, active, results }
}
