<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ArrowUpRight, CalendarPlus, Check, Copy, MapPin, RotateCcw } from 'lucide-vue-next'
import OrnamentArt from '@/components/OrnamentArt.vue'
import { categories, categoryMap } from '@/data/categories'
import { themes, themeMap } from '@/data/themes'
import { buildDemo, defaultCategoryForTheme, defaultThemeForCategory } from '@/data/demos'
import type { CategoryId, ThemeId } from '@/types'

const props = defineProps<{ kind: 'tema' | 'kategori'; id: string }>()
const route = useRoute()
const router = useRouter()

const one = (v: unknown) => (Array.isArray(v) ? String(v[0] ?? '') : typeof v === 'string' ? v : '')

// Resolusi pasangan (kategori, tema). Nilai tak valid jatuh ke bawaan.
const resolved = computed(() => {
  if (props.kind === 'tema') {
    const theme = themes.find((t) => t.id === props.id)?.id as ThemeId | undefined
    if (!theme) return null
    const q = one(route.query.category)
    const category = (categories.find((c) => c.id === q)?.id ?? defaultCategoryForTheme[theme]) as CategoryId
    return { theme, category }
  }
  const category = categories.find((c) => c.id === props.id)?.id as CategoryId | undefined
  if (!category) return null
  const q = one(route.query.theme)
  const theme = (themes.find((t) => t.id === q)?.id ?? defaultThemeForCategory[category]) as ThemeId
  return { theme, category }
})

const spec = computed(() => (resolved.value ? buildDemo(resolved.value.category, resolved.value.theme) : null))
const ink = computed(() => spec.value?.palette[1] ?? '#2A1B12')
const bg = computed(() => spec.value?.palette[0] ?? '#F8F2E6')
const accent = computed(() => spec.value?.palette[2] ?? '#B8893C')

const title = computed(() => {
  if (!resolved.value) return ''
  return props.kind === 'tema'
    ? `Demo Tema ${themeMap[resolved.value.theme].name}`
    : `Demo Kategori ${categoryMap[resolved.value.category].name}`
})
const blurb = computed(() => {
  if (!resolved.value) return ''
  return props.kind === 'tema' ? themeMap[resolved.value.theme].description : categoryMap[resolved.value.category].description
})
const backTo = computed(() => ({ name: 'home', hash: props.kind === 'tema' ? '#tema' : '#kategori' }))
const catalogTo = computed(() =>
  props.kind === 'tema'
    ? { name: 'catalog', query: { theme: resolved.value?.theme } }
    : { name: 'catalog', query: { category: resolved.value?.category } },
)

function switchTo(patch: { category?: string; theme?: string }) {
  router.replace({ query: { ...route.query, ...patch } })
}

watchEffect(() => {
  document.title = title.value ? `${title.value} — Kirana Invitation` : 'Demo tidak ditemukan — Kirana Invitation'
})

// ---------- Cover ----------
const opened = ref(false)
const scroller = ref<HTMLElement | null>(null)
// ---------- Reveal (IntersectionObserver; terpotong oleh scroller sehingga bekerja di dalam frame) ----------
// Elemen baru diamati setelah undangan dibuka, supaya animasi masuk tidak habis di balik cover.
let io: IntersectionObserver | null = null
const pending = new Set<HTMLElement>()
function observer() {
  if (!io) {
    io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io?.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
  }
  return io
}
function flushPending() {
  pending.forEach((el) => observer().observe(el))
  pending.clear()
}
/** Kembalikan semua elemen ke keadaan awal (dipakai saat cover diulang / tema diganti). */
function rearm() {
  scroller.value?.querySelectorAll<HTMLElement>('.d-rev.is-in').forEach((el) => {
    el.classList.remove('is-in')
    pending.add(el)
  })
}
const vIn = {
  mounted(el: HTMLElement) {
    if (opened.value) observer().observe(el)
    else pending.add(el)
  },
  unmounted(el: HTMLElement) {
    pending.delete(el)
    io?.unobserve(el)
  },
}

async function openInvitation() {
  opened.value = true
  await nextTick()
  scroller.value?.scrollTo({ top: 0 })
  flushPending()
}
function resetDemo() {
  opened.value = false
  scroller.value?.scrollTo({ top: 0 })
  rsvpDone.value = false
  rearm()
}

// ---------- Countdown ----------
const now = ref(Date.now())
let timer: number | undefined
onMounted(() => {
  timer = window.setInterval(() => (now.value = Date.now()), 1000)
})
onBeforeUnmount(() => {
  window.clearInterval(timer)
  io?.disconnect()
  io = null
  pending.clear()
})
const remaining = computed(() => {
  if (!spec.value) return null
  const diff = new Date(spec.value.dateISO).getTime() - now.value
  if (diff <= 0) return null
  const s = Math.floor(diff / 1000)
  return [
    { v: Math.floor(s / 86400), l: 'Hari' },
    { v: Math.floor((s % 86400) / 3600), l: 'Jam' },
    { v: Math.floor((s % 3600) / 60), l: 'Menit' },
    { v: s % 60, l: 'Detik' },
  ]
})

// ---------- Salin alamat & kalender ----------
const copied = ref(false)
let copiedTimer: number | undefined
async function copyAddress() {
  if (!spec.value) return
  const text = `${spec.value.place}, ${spec.value.address}`
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Fallback untuk konteks tanpa Clipboard API
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
    } catch {
      /* diabaikan */
    }
    ta.remove()
  }
  copied.value = true
  window.clearTimeout(copiedTimer)
  copiedTimer = window.setTimeout(() => (copied.value = false), 2000)
}
onBeforeUnmount(() => window.clearTimeout(copiedTimer))

function downloadIcs() {
  if (!spec.value) return
  const start = new Date(spec.value.dateISO)
  const end = new Date(start.getTime() + 3 * 3600 * 1000)
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const esc = (s: string) => s.replace(/([,;])/g, '\\$1')
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kirana Invitation//Demo//ID',
    'BEGIN:VEVENT',
    `UID:${fmt(start)}@kirana.example`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(`${spec.value.kicker} · ${spec.value.names}`)}`,
    `LOCATION:${esc(`${spec.value.place}, ${spec.value.address}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'undangan-demo.ics'
  a.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// ---------- RSVP ----------
const form = ref({ name: '', attend: 'hadir', guests: '1', message: '' })
const touched = ref(false)
const rsvpDone = ref(false)
const wishes = ref([
  { name: 'Keluarga Hartono', text: 'Selamat! Semoga acaranya lancar dan penuh berkah.' },
  { name: 'Sahabat Lama', text: 'Sudah tidak sabar. Sampai ketemu di sana!' },
])
const nameError = computed(() => touched.value && !form.value.name.trim())
function submitRsvp() {
  touched.value = true
  if (!form.value.name.trim()) return
  if (form.value.message.trim()) {
    wishes.value.unshift({ name: form.value.name.trim(), text: form.value.message.trim() })
  }
  rsvpDone.value = true
}
function resetRsvp() {
  form.value = { name: '', attend: 'hadir', guests: '1', message: '' }
  touched.value = false
  rsvpDone.value = false
}

// Ganti tema/kategori: kembali ke cover agar demo terasa baru
watch(
  () => [props.kind, props.id, resolved.value?.theme, resolved.value?.category],
  () => {
    opened.value = false
    scroller.value?.scrollTo({ top: 0 })
    resetRsvp()
    rearm()
  },
)

// Pseudo-QR deterministik (ilustrasi, bukan kode sungguhan)
const qrCells = computed(() => {
  const n = 21
  const cells: { x: number; y: number }[] = []
  let seed = 7
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
  const finder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7)
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      if (finder(x, y)) continue
      if (rnd() > 0.52) cells.push({ x, y })
    }
  return cells
})
const finderPos = [
  [0, 0],
  [14, 0],
  [0, 14],
]
</script>

<template>
  <div class="min-h-[100svh] bg-cocoa-900 text-ivory">
    <!-- bilah atas -->
    <div class="flex h-14 items-center justify-between gap-3 border-b border-ivory/10 px-4 sm:px-8">
      <RouterLink :to="backTo" class="link-underline inline-flex items-center gap-2 pb-0.5 text-sm">
        <ArrowLeft :size="16" aria-hidden="true" /> Kembali
      </RouterLink>
      <RouterLink :to="{ name: 'home' }" class="font-serif text-xl">Kirana <span class="text-gold-300">Invitation</span></RouterLink>
      <RouterLink :to="catalogTo" class="link-underline hidden items-center gap-1.5 pb-0.5 text-sm sm:inline-flex">
        Lihat desainnya <ArrowUpRight :size="15" aria-hidden="true" />
      </RouterLink>
      <span class="w-16 sm:hidden" aria-hidden="true" />
    </div>

    <div v-if="!spec || !resolved" class="container-x py-32 text-center">
      <h1 class="font-serif text-5xl">Demo tidak ditemukan.</h1>
      <RouterLink :to="{ name: 'home' }" class="btn btn-gold mt-8">Kembali ke beranda</RouterLink>
    </div>

    <div v-else class="mx-auto grid max-w-[1200px] gap-10 px-4 py-6 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-8">
      <!-- panel info -->
      <aside class="order-2 lg:order-1 lg:col-span-5">
        <p class="eyebrow !text-gold-300">{{ kind === 'tema' ? 'Demo Tema' : 'Demo Kategori' }}</p>
        <h1 class="display mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">
          {{ kind === 'tema' ? themeMap[resolved.theme].name : categoryMap[resolved.category].name }}
        </h1>
        <p class="mt-5 max-w-md text-sm leading-relaxed text-ivory/70">{{ blurb }}</p>

        <div class="mt-8">
          <p class="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ivory/50">
            {{ kind === 'tema' ? 'Coba dengan jenis acara' : 'Coba dengan tema' }}
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <template v-if="kind === 'tema'">
              <button
                v-for="c in categories"
                :key="c.id"
                type="button"
                :aria-pressed="resolved.category === c.id"
                class="rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors duration-300"
                :class="resolved.category === c.id ? 'border-gold-300 bg-gold-300 text-cocoa' : 'border-ivory/25 hover:border-ivory'"
                @click="switchTo({ category: c.id })"
              >
                {{ c.name }}
              </button>
            </template>
            <template v-else>
              <button
                v-for="t in themes"
                :key="t.id"
                type="button"
                :aria-pressed="resolved.theme === t.id"
                class="flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors duration-300"
                :class="resolved.theme === t.id ? 'border-gold-300 bg-gold-300 text-cocoa' : 'border-ivory/25 hover:border-ivory'"
                @click="switchTo({ theme: t.id })"
              >
                <span class="h-2.5 w-2.5 rounded-full" :style="{ background: t.palette[2] }" aria-hidden="true" />{{ t.name }}
              </button>
            </template>
          </div>
        </div>

        <div class="mt-9 flex flex-wrap gap-3">
          <RouterLink :to="catalogTo" class="btn btn-gold">Lihat desain terkait <ArrowUpRight :size="16" aria-hidden="true" /></RouterLink>
          <button type="button" class="btn btn-ghost-light" @click="resetDemo"><RotateCcw :size="15" aria-hidden="true" />Ulangi dari cover</button>
        </div>
        <p class="mt-6 max-w-sm text-xs leading-relaxed text-ivory/45">
          Ini contoh tampilan. Nama, tanggal, dan alamat di dalamnya hanya data demo. Formulir RSVP tidak mengirim data ke mana pun.
        </p>
      </aside>

      <!-- bingkai ponsel -->
      <div class="order-1 lg:order-2 lg:col-span-7">
        <div
          class="relative mx-auto h-[78svh] w-full max-w-[390px] overflow-hidden rounded-[2rem] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.8)] ring-1 ring-ivory/15 lg:h-[min(800px,calc(100svh-120px))] lg:border-[10px] lg:border-cocoa lg:ring-ivory/20"
          :style="{ background: bg, color: ink }"
        >
          <!-- COVER -->
          <div
            class="paper-grain absolute inset-0 z-20 flex flex-col items-center justify-between px-8 py-12 text-center transition-[transform,visibility] duration-[1100ms] ease-silk"
            :class="opened ? '-translate-y-full invisible' : ''"
            :style="{ background: bg }"
            v-bind="opened ? { inert: '' } : {}"
          >
            <OrnamentArt :motif="spec.motif" :primary="ink" :accent="accent" :paper="bg" class="pointer-events-none absolute -bottom-10 -right-14 w-[88%] opacity-[0.12]" />
            <p class="relative text-[0.66rem] font-semibold uppercase tracking-[0.34em]" :style="{ color: accent }">{{ spec.kicker }}</p>
            <div class="relative">
              <OrnamentArt :motif="spec.motif" :primary="ink" :accent="accent" :paper="bg" class="mx-auto w-40" :title="`Ornamen tema ${spec.theme ? themeMap[spec.theme].name : ''}`" />
              <h2 class="mt-6 font-serif text-[2.9rem] font-medium leading-[1.02]">{{ spec.names }}</h2>
              <p class="mt-4 text-xs font-medium uppercase tracking-[0.22em]">{{ spec.dateLabel }}</p>
            </div>
            <div class="relative">
              <p class="mb-3 text-xs opacity-70">Kepada Yth. Tamu Undangan</p>
              <button type="button" class="rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em]" :style="{ background: ink, color: bg }" @click="openInvitation">
                Buka Undangan
              </button>
            </div>
          </div>

          <!-- ISI UNDANGAN -->
          <div ref="scroller" class="h-full overscroll-contain" :class="opened ? 'overflow-y-auto' : 'overflow-hidden'" tabindex="0" :aria-label="`Isi undangan demo: ${spec.names}`">
            <!-- 1 hero -->
            <section class="paper-grain relative flex min-h-full flex-col items-center justify-center overflow-hidden px-8 py-20 text-center">
              <OrnamentArt :motif="spec.motif" :primary="ink" :accent="accent" :paper="bg" class="pointer-events-none absolute -left-16 -top-12 w-[70%] opacity-[0.14]" />
              <p v-in class="d-rev relative text-[0.66rem] font-semibold uppercase tracking-[0.34em]" :style="{ color: accent }">{{ spec.kicker }}</p>
              <h2 v-in class="d-rev relative mt-5 font-serif text-[3.4rem] font-medium leading-[1]">{{ spec.names }}</h2>
              <div v-in class="d-rev relative my-6 flex items-center gap-3" aria-hidden="true">
                <span class="h-px w-12" :style="{ background: accent }" /><span class="h-2 w-2 rotate-45" :style="{ background: accent }" /><span class="h-px w-12" :style="{ background: accent }" />
              </div>
              <p v-in class="d-rev relative text-sm font-medium uppercase tracking-[0.2em]">{{ spec.dateLabel }}</p>
              <p v-in class="d-rev relative mt-1 font-serif text-lg italic opacity-80">{{ spec.place }}</p>
            </section>

            <!-- 2 sapaan -->
            <section class="px-8 py-20 text-center">
              <h3 v-in class="d-rev font-serif text-[2.2rem] italic leading-tight" :style="{ color: accent }">{{ spec.greeting }}</h3>
              <p v-in class="d-rev mt-2 text-xs font-semibold uppercase tracking-[0.2em] opacity-70">{{ spec.greetingNote }}</p>
              <p v-in class="d-rev mt-6 text-[0.95rem] leading-relaxed opacity-85">{{ spec.intro }}</p>
            </section>

            <!-- 3 tuan rumah -->
            <section class="px-8 pb-20 text-center">
              <p v-in class="d-rev text-[0.66rem] font-semibold uppercase tracking-[0.3em]" :style="{ color: accent }">{{ spec.hostsLabel }}</p>
              <div class="mt-8 space-y-9">
                <div v-for="h in spec.hosts" :key="h.name" v-in class="d-rev">
                  <p class="text-[0.7rem] uppercase tracking-[0.2em] opacity-60">{{ h.role }}</p>
                  <p class="mt-1.5 font-serif text-[2rem] leading-tight">{{ h.name }}</p>
                  <p v-if="h.detail" class="mt-1 text-sm opacity-70">{{ h.detail }}</p>
                </div>
              </div>
            </section>

            <!-- 4 kutipan -->
            <section class="relative overflow-hidden px-8 py-16 text-center" :style="{ background: `${accent}22` }">
              <OrnamentArt :motif="spec.motif" :primary="ink" :accent="accent" :paper="bg" class="pointer-events-none absolute -right-10 top-1/2 w-40 -translate-y-1/2 opacity-[0.16]" />
              <p v-in class="d-rev relative font-serif text-[1.55rem] italic leading-snug">“{{ spec.quote }}”</p>
            </section>

            <!-- 5 countdown -->
            <section class="px-6 py-16 text-center" :style="{ background: ink, color: bg }">
              <p v-in class="d-rev text-[0.66rem] font-semibold uppercase tracking-[0.3em]" :style="{ color: accent }">Menuju Hari Bahagia</p>
              <div v-if="remaining" v-in class="d-rev mt-7 grid grid-cols-4 gap-2" role="timer" aria-label="Hitung mundur menuju acara">
                <div v-for="r in remaining" :key="r.l" class="py-3" :style="{ boxShadow: `inset 0 0 0 1px ${bg}33` }">
                  <p class="font-serif text-3xl leading-none tabular-nums">{{ String(r.v).padStart(2, '0') }}</p>
                  <p class="mt-1.5 text-[0.58rem] uppercase tracking-[0.18em] opacity-70">{{ r.l }}</p>
                </div>
              </div>
              <p v-else class="mt-6 font-serif text-2xl italic">Hari bahagia telah tiba.</p>
            </section>

            <!-- 6 acara -->
            <section class="px-8 py-20">
              <p v-in class="d-rev text-center text-[0.66rem] font-semibold uppercase tracking-[0.3em]" :style="{ color: accent }">{{ spec.scheduleTitle }}</p>
              <ol class="mt-8">
                <li v-for="s in spec.schedule" :key="s.time" v-in class="d-rev flex items-baseline gap-5 py-4" :style="{ borderTop: `1px solid ${ink}22` }">
                  <span class="w-14 shrink-0 font-serif text-2xl tabular-nums" :style="{ color: accent }">{{ s.time }}</span>
                  <span class="text-[0.95rem]">{{ s.label }}</span>
                </li>
                <li class="h-px" :style="{ background: `${ink}22` }" aria-hidden="true" />
              </ol>

              <div v-in class="d-rev mt-10 text-center">
                <MapPin :size="22" class="mx-auto" :style="{ color: accent }" aria-hidden="true" />
                <p class="mt-3 font-serif text-2xl">{{ spec.place }}</p>
                <p class="mt-1 text-sm opacity-75">{{ spec.address }}</p>
                <div class="mt-6 flex flex-col items-stretch gap-2.5">
                  <button type="button" class="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em]" :style="{ background: ink, color: bg }" @click="copyAddress">
                    <Check v-if="copied" :size="15" aria-hidden="true" /><Copy v-else :size="15" aria-hidden="true" />
                    {{ copied ? 'Alamat tersalin' : 'Salin alamat' }}
                  </button>
                  <button type="button" class="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em]" :style="{ boxShadow: `inset 0 0 0 1px ${ink}66` }" @click="downloadIcs">
                    <CalendarPlus :size="15" aria-hidden="true" /> Simpan ke kalender
                  </button>
                </div>
                <p class="mt-6 text-xs uppercase tracking-[0.18em] opacity-60">Busana</p>
                <p class="mt-1 text-sm">{{ spec.dressCode }}</p>
              </div>
            </section>

            <!-- 7 bagian khusus kategori -->
            <section class="px-8 pb-20">
              <h3 v-in class="d-rev text-center font-serif text-[2.2rem] leading-tight">{{ spec.extraTitle }}</h3>
              <ul class="mt-8 space-y-7">
                <li v-for="e in spec.extra" :key="e.t" v-in class="d-rev pl-5" :style="{ borderLeft: `2px solid ${accent}` }">
                  <p class="font-serif text-xl">{{ e.t }}</p>
                  <p class="mt-1 text-sm leading-relaxed opacity-75">{{ e.d }}</p>
                </li>
              </ul>
            </section>

            <!-- 8 galeri -->
            <section class="px-6 pb-20">
              <p v-in class="d-rev text-center text-[0.66rem] font-semibold uppercase tracking-[0.3em]" :style="{ color: accent }">Galeri</p>
              <div class="mt-7 grid grid-cols-2 gap-3">
                <figure v-for="(g, i) in spec.gallery" :key="g" v-in class="d-rev" :class="i === 0 ? 'col-span-2' : ''">
                  <div class="relative grid place-items-center overflow-hidden" :class="i === 0 ? 'aspect-[16/10]' : 'aspect-square'" :style="{ background: i === 1 ? ink : `${accent}${i === 0 ? '30' : '22'}` }">
                    <OrnamentArt
                      :motif="i === 2 ? 'sparkle' : spec.motif"
                      :primary="i === 1 ? bg : ink"
                      :accent="accent"
                      :paper="bg"
                      :class="i === 0 ? 'w-[46%]' : 'w-[70%]'"
                      :style="{ transform: `rotate(${[0, 10, -8][i]}deg)` }"
                    />
                  </div>
                  <figcaption class="mt-1.5 text-[0.68rem] uppercase tracking-[0.16em] opacity-65">{{ g }}</figcaption>
                </figure>
              </div>
            </section>

            <!-- 9 QR (korporat) -->
            <section v-if="spec.qr" class="px-8 pb-20 text-center">
              <p v-in class="d-rev text-[0.66rem] font-semibold uppercase tracking-[0.3em]" :style="{ color: accent }">QR Check-in</p>
              <div v-in class="d-rev mx-auto mt-6 w-40 p-3" :style="{ background: '#fff' }">
                <svg viewBox="0 0 21 21" class="w-full" shape-rendering="crispEdges" role="img" aria-label="Contoh QR check-in (ilustrasi)">
                  <rect v-for="(c, i) in qrCells" :key="i" :x="c.x" :y="c.y" width="1" height="1" fill="#111" />
                  <g v-for="p in finderPos" :key="p.join()" :transform="`translate(${p[0]} ${p[1]})`">
                    <rect width="7" height="7" fill="#111" /><rect x="1" y="1" width="5" height="5" fill="#fff" /><rect x="2" y="2" width="3" height="3" fill="#111" />
                  </g>
                </svg>
              </div>
              <p class="mt-3 text-xs opacity-65">Contoh ilustrasi. Setiap tamu menerima kode unik.</p>
            </section>

            <!-- 10 RSVP -->
            <section class="px-6 py-16" :style="{ background: `${accent}1c` }">
              <h3 v-in class="d-rev text-center font-serif text-[2.2rem] leading-tight">RSVP</h3>
              <p v-in class="d-rev mx-auto mt-3 max-w-xs text-center text-sm opacity-75">{{ spec.rsvpNote }}</p>

              <form v-if="!rsvpDone" class="mt-8 space-y-5" novalidate @submit.prevent="submitRsvp">
                <div>
                  <label for="rsvp-name" class="text-[0.68rem] font-semibold uppercase tracking-[0.2em]">Nama</label>
                  <input id="rsvp-name" v-model="form.name" type="text" autocomplete="off" :aria-invalid="nameError" aria-describedby="rsvp-name-err" class="mt-1.5 w-full border-0 bg-transparent px-0 py-2 text-base focus:outline-none" :style="{ borderBottom: `1px solid ${nameError ? '#B3261E' : ink + '66'}` }" />
                  <p v-if="nameError" id="rsvp-name-err" class="mt-1 text-xs text-[#B3261E]" role="alert">Nama wajib diisi.</p>
                </div>
                <fieldset>
                  <legend class="text-[0.68rem] font-semibold uppercase tracking-[0.2em]">Kehadiran</legend>
                  <div class="mt-2 flex gap-5 text-sm">
                    <label class="flex items-center gap-2"><input v-model="form.attend" type="radio" value="hadir" :style="{ accentColor: ink }" /> Hadir</label>
                    <label class="flex items-center gap-2"><input v-model="form.attend" type="radio" value="tidak" :style="{ accentColor: ink }" /> Tidak hadir</label>
                  </div>
                </fieldset>
                <div v-if="form.attend === 'hadir'">
                  <label for="rsvp-guests" class="text-[0.68rem] font-semibold uppercase tracking-[0.2em]">Jumlah tamu</label>
                  <select id="rsvp-guests" v-model="form.guests" class="mt-1.5 w-full border-0 bg-transparent px-0 py-2 text-base focus:outline-none" :style="{ borderBottom: `1px solid ${ink}66` }">
                    <option v-for="n in 5" :key="n" :value="String(n)">{{ n }} orang</option>
                  </select>
                </div>
                <div>
                  <label for="rsvp-msg" class="text-[0.68rem] font-semibold uppercase tracking-[0.2em]">Ucapan & doa</label>
                  <textarea id="rsvp-msg" v-model="form.message" rows="3" class="mt-1.5 w-full resize-none border-0 bg-transparent px-0 py-2 text-base focus:outline-none" :style="{ borderBottom: `1px solid ${ink}66` }" />
                </div>
                <button type="submit" class="w-full rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em]" :style="{ background: ink, color: bg }">Kirim Konfirmasi</button>
              </form>

              <div v-else class="mt-8 text-center" role="status">
                <Check :size="28" class="mx-auto" :style="{ color: accent }" aria-hidden="true" />
                <p class="mt-3 font-serif text-2xl">Terima kasih, {{ form.name }}!</p>
                <p class="mt-1 text-sm opacity-75">
                  {{ form.attend === 'hadir' ? `Kami mencatat ${form.guests} tamu akan hadir.` : 'Terima kasih atas doanya.' }} (Demo: data tidak dikirim.)
                </p>
                <button type="button" class="mt-5 text-xs font-semibold uppercase tracking-[0.18em] underline underline-offset-4" @click="resetRsvp">Isi lagi</button>
              </div>

              <ul class="mt-10 space-y-4" aria-label="Ucapan tamu">
                <li v-for="(w, i) in wishes" :key="w.name + i" class="p-4" :style="{ background: bg }">
                  <p class="text-sm font-semibold">{{ w.name }}</p>
                  <p class="mt-1 text-sm opacity-75">{{ w.text }}</p>
                </li>
              </ul>
            </section>

            <!-- 11 penutup -->
            <section class="relative overflow-hidden px-8 py-20 text-center">
              <OrnamentArt :motif="spec.motif" :primary="ink" :accent="accent" :paper="bg" class="mx-auto w-28 opacity-90" />
              <p v-in class="d-rev mt-6 font-serif text-[2rem] italic leading-tight">{{ spec.closing }}</p>
              <p class="mt-10 text-[0.62rem] uppercase tracking-[0.24em] opacity-50">Dibuat dengan Kirana Invitation · Demo</p>
            </section>
          </div>
        </div>
        <p class="mt-4 text-center text-xs text-ivory/45 lg:hidden">Ketuk “Buka Undangan”, lalu gulir di dalam bingkai.</p>
      </div>
    </div>
  </div>
</template>
