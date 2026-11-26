<script setup lang="ts">
import { computed } from 'vue'
import type { Motif } from '@/types'

const props = withDefaults(
  defineProps<{
    motif: Motif
    primary?: string
    accent?: string
    paper?: string
    title?: string
  }>(),
  { primary: '#5A3A22', accent: '#C79B4C', paper: '#F8F2E6', title: '' },
)

const range = (n: number) => Array.from({ length: n }, (_, i) => i)
const petals8 = range(8).map((i) => i * 45)
const petals5 = range(5).map((i) => i * 72)

const leaves = [
  [58, 152, -38], [84, 130, 42], [104, 109, -38], [126, 87, 42], [146, 63, -38], [162, 41, 42],
]
const kawung = computed(() => {
  const cells: { x: number; y: number }[] = []
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) cells.push({ x: 33 + c * 67, y: 33 + r * 67 })
  return cells
})
const blossoms = [
  { x: 62, y: 72, s: 1 }, { x: 128, y: 52, s: 0.8 }, { x: 142, y: 112, s: 1.1 }, { x: 88, y: 134, s: 0.72 },
]
const zigzag = computed(() => {
  const pts: string[] = []
  for (let i = 0; i <= 8; i++) pts.push(`${10 + i * 22.5},${i % 2 ? 150 : 176}`)
  return pts.join(' ')
})
const teeth = computed(() => range(10).map((i) => `M${10 + i * 18},186 l9,-16 l9,16 z`).join(' '))
const star = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r} Q${cx} ${cy} ${cx + r} ${cy} Q${cx} ${cy} ${cx} ${cy + r} Q${cx} ${cy} ${cx - r} ${cy} Q${cx} ${cy} ${cx} ${cy - r}Z`
const sparkles = [star(100, 90, 56), star(48, 150, 26), star(152, 148, 20), star(160, 42, 14)]
</script>

<template>
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    :role="title ? 'img' : undefined"
    :aria-label="title || undefined"
    :aria-hidden="title ? undefined : 'true'"
  >
    <!-- FLORAL -->
    <g v-if="motif === 'floral'">
      <ellipse v-for="a in [22, 112, 202, 292]" :key="a" cx="100" cy="100" rx="9" ry="52" :transform="`rotate(${a} 100 100)`" :fill="primary" opacity=".18" />
      <ellipse v-for="a in petals8" :key="a" cx="100" cy="66" rx="13" ry="30" :transform="`rotate(${a} 100 100)`" :fill="accent" fill-opacity=".8" :stroke="primary" stroke-width="1.2" />
      <circle cx="100" cy="100" r="13" :fill="primary" />
      <circle cx="100" cy="100" r="5" :fill="paper" />
    </g>

    <!-- LEAF -->
    <g v-else-if="motif === 'leaf'">
      <path d="M28 182 Q100 122 172 28" :stroke="primary" stroke-width="2.5" />
      <ellipse v-for="(l, i) in leaves" :key="i" :cx="l[0]" :cy="l[1]" rx="7" ry="17" :transform="`rotate(${l[2]} ${l[0]} ${l[1]})`" :fill="accent" fill-opacity=".85" :stroke="primary" stroke-width="1" />
    </g>

    <!-- BATIK KAWUNG -->
    <g v-else-if="motif === 'batik'">
      <g v-for="(c, i) in kawung" :key="i" :transform="`translate(${c.x} ${c.y})`">
        <ellipse v-for="a in [0, 90, 180, 270]" :key="a" cx="0" cy="-13" rx="8" ry="13" :transform="`rotate(${a})`" :stroke="primary" stroke-width="1.6" :fill="accent" fill-opacity=".18" />
        <circle r="3" :fill="primary" />
      </g>
    </g>

    <!-- GEOMETRIC -->
    <g v-else-if="motif === 'geometric'">
      <rect v-for="(s, i) in [150, 118, 86, 54]" :key="s" :x="100 - s / 2" :y="100 - s / 2" :width="s" :height="s" :transform="`rotate(${i % 2 ? 0 : 45} 100 100)`" :stroke="i % 2 ? accent : primary" stroke-width="1.8" />
      <circle cx="100" cy="100" r="40" :stroke="primary" stroke-width="1.2" />
      <circle cx="100" cy="100" r="7" :fill="accent" />
    </g>

    <!-- FRAME -->
    <g v-else-if="motif === 'frame'">
      <rect x="16" y="16" width="168" height="168" :stroke="primary" stroke-width="2.4" />
      <rect x="26" y="26" width="148" height="148" :stroke="accent" stroke-width="1.2" />
      <g v-for="p in [[26, 26, 1, 1], [174, 26, -1, 1], [26, 174, 1, -1], [174, 174, -1, -1]]" :key="p.join()">
        <path :d="`M${p[0]} ${p[1] + p[3] * 30} Q${p[0] + p[2] * 30} ${p[1] + p[3] * 30} ${p[0] + p[2] * 30} ${p[1]}`" :stroke="primary" stroke-width="1.6" />
        <circle :cx="p[0] + p[2] * 12" :cy="p[1] + p[3] * 12" r="3.4" :fill="accent" />
      </g>
      <path d="M100 70 L108 100 L100 130 L92 100Z" :fill="accent" fill-opacity=".7" :stroke="primary" stroke-width="1.2" />
    </g>

    <!-- SPARKLE -->
    <g v-else-if="motif === 'sparkle'">
      <path v-for="(d, i) in sparkles" :key="i" :d="d" :fill="i === 0 ? accent : primary" :fill-opacity="i === 0 ? 0.9 : 0.6" />
    </g>

    <!-- WAYANG: kayon (gunungan wayang) -->
    <g v-else-if="motif === 'wayang'">
      <path d="M100 18 C140 58 160 100 152 150 C147 176 122 188 100 188 C78 188 53 176 48 150 C40 100 60 58 100 18Z" :fill="accent" fill-opacity=".25" :stroke="primary" stroke-width="2.2" />
      <path d="M100 52 V176" :stroke="primary" stroke-width="2" />
      <path v-for="y in [78, 104, 130, 154]" :key="y" :d="`M100 ${y} Q${100 - 22} ${y - 6} ${100 - 30} ${y - 22} M100 ${y} Q${100 + 22} ${y - 6} ${100 + 30} ${y - 22}`" :stroke="primary" stroke-width="1.6" />
      <circle cx="100" cy="42" r="4" :fill="primary" />
    </g>

    <!-- GUNUNGAN (Grebeg, Yogyakarta) + garis parang -->
    <g v-else-if="motif === 'gunungan'">
      <path v-for="i in 6" :key="i" :d="`M${-10 + i * 36} 200 L${50 + i * 36} 120`" :stroke="primary" stroke-opacity=".16" stroke-width="6" />
      <path d="M100 22 C118 70 148 120 156 180 H44 C52 120 82 70 100 22Z" :fill="accent" fill-opacity=".3" :stroke="primary" stroke-width="2.2" />
      <path d="M62 150 Q100 132 138 150 M72 120 Q100 104 128 120 M86 88 Q100 78 114 88" :stroke="primary" stroke-width="1.8" />
      <circle v-for="p in [[78, 168], [100, 168], [122, 168], [100, 138]]" :key="p.join()" :cx="p[0]" :cy="p[1]" r="4" :fill="primary" />
    </g>

    <!-- PENJOR (Bali) + canang -->
    <g v-else-if="motif === 'penjor'">
      <path d="M56 192 C58 120 78 52 142 22" :stroke="primary" stroke-width="4" />
      <path v-for="(d, i) in ['M142 22 C156 50 154 84 144 116', 'M142 22 C150 46 144 78 130 104', 'M142 22 C158 40 164 70 160 98', 'M142 22 C146 52 132 76 116 92']" :key="i" :d="d" :stroke="accent" stroke-width="2.2" />
      <rect x="112" y="166" width="44" height="14" rx="3" :fill="accent" fill-opacity=".35" :stroke="primary" stroke-width="1.5" />
      <circle cx="124" cy="164" r="6" :fill="primary" fill-opacity=".8" />
      <circle cx="140" cy="164" r="6" :fill="accent" />
    </g>

    <!-- GORGA (Batak): spiral + ulos -->
    <g v-else-if="motif === 'gorga'">
      <path d="M100 100 m0 -8 a8 8 0 1 1 -8 8 a16 16 0 1 1 16 16 a24 24 0 1 1 -24 -24 a32 32 0 1 1 32 32 a40 40 0 1 1 -40 -40" :stroke="primary" stroke-width="3" />
      <polyline :points="zigzag" :stroke="accent" stroke-width="3" />
      <circle cx="100" cy="100" r="4" :fill="accent" />
    </g>

    <!-- ONDEL-ONDEL (Betawi) + gigi balang -->
    <g v-else-if="motif === 'ondel'">
      <circle v-for="i in 7" :key="i" :cx="52 + i * 12" :cy="48 - Math.abs(4 - i) * 3" r="7" :fill="accent" />
      <circle cx="100" cy="100" r="48" :fill="primary" />
      <circle cx="82" cy="92" r="11" :fill="paper" /><circle cx="118" cy="92" r="11" :fill="paper" />
      <circle cx="83" cy="93" r="5" fill="#1B110B" /><circle cx="117" cy="93" r="5" fill="#1B110B" />
      <path d="M78 116 Q100 138 122 116" :stroke="paper" stroke-width="3.4" />
      <path :d="teeth" :fill="accent" />
    </g>

    <!-- MOUNTAIN -->
    <g v-else-if="motif === 'mountain'">
      <circle cx="140" cy="58" r="20" :fill="accent" fill-opacity=".85" />
      <path d="M10 160 L70 70 L110 124 L136 92 L190 160Z" :fill="primary" fill-opacity=".85" />
      <path d="M40 160 L92 98 L130 160Z" :fill="primary" fill-opacity=".55" />
      <path v-for="y in [172, 182, 192]" :key="y" :d="`M10 ${y} Q40 ${y - 7} 70 ${y} T130 ${y} T190 ${y}`" :stroke="accent" stroke-width="1.6" />
    </g>

    <!-- SAKURA -->
    <g v-else-if="motif === 'sakura'">
      <path d="M20 170 Q70 120 82 98 T148 52 T184 30" :stroke="primary" stroke-width="3" />
      <g v-for="(b, i) in blossoms" :key="i" :transform="`translate(${b.x} ${b.y}) scale(${b.s})`">
        <ellipse v-for="a in petals5" :key="a" cx="0" cy="-11" rx="7.5" ry="11" :transform="`rotate(${a})`" :fill="accent" fill-opacity=".9" />
        <circle r="3.4" :fill="primary" />
      </g>
      <ellipse v-for="p in [[40, 40, 20], [164, 150, -30], [100, 170, 50]]" :key="p.join()" :cx="p[0]" :cy="p[1]" rx="4" ry="6" :transform="`rotate(${p[2]} ${p[0]} ${p[1]})`" :fill="accent" fill-opacity=".7" />
    </g>

    <!-- ARCH -->
    <g v-else>
      <path d="M36 184 V92 a64 64 0 0 1 128 0 V184" :stroke="primary" stroke-width="2.4" />
      <path d="M56 184 V96 a44 44 0 0 1 88 0 V184" :stroke="accent" stroke-width="1.6" />
      <circle cx="100" cy="100" r="16" :fill="accent" fill-opacity=".8" />
      <path d="M20 184 H180" :stroke="primary" stroke-width="2.4" />
    </g>
  </svg>
</template>
