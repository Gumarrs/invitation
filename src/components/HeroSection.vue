<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { ArrowUpRight, Play } from 'lucide-vue-next'
import InvitationMockup from './InvitationMockup.vue'
import OrnamentArt from './OrnamentArt.vue'
import { categories } from '@/data/categories'
import { themes } from '@/data/themes'
import { templates, templateBySlug } from '@/data/templates'
import { usePreview } from '@/composables/usePreview'
import { useGsapContext } from '@/composables/useGsapContext'
import { gsap, ScrollTrigger, reducedMotion } from '@/lib/gsap'
import type { Template } from '@/types'

const root = ref<HTMLElement | null>(null)
const { open } = usePreview()

const words = [
  { t: 'Every' },
  { t: 'Moment' },
  { t: 'Deserves' },
  { t: 'a' },
  { t: 'Beautiful', em: true },
  { t: 'Invitation.' },
]

// Tiga kartu hero: terang-floral, gelap-luxury, dan budaya Bali — variasi yang jelas.
const main = templateBySlug('bloom-linen') as Template
const dark = templateBySlug('atelier-noir') as Template
const bali = templateBySlug('tirta-sukla') as Template
const demo = templateBySlug('sekar-kedhaton') as Template

const stats = [
  { n: templates.length, l: 'Desain siap pakai' },
  { n: themes.length, l: 'Tema & budaya' },
  { n: categories.length, l: 'Jenis acara' },
]

const cleanups: Array<() => void> = []
onBeforeUnmount(() => cleanups.forEach((fn) => fn()))

useGsapContext(
  root,
  () => {
    const el = root.value
    if (reducedMotion() || !el) return
    const q = gsap.utils.selector(el)

    // 1) Animasi masuk
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.25 })
    tl.fromTo(q('[data-hero="eyebrow"]'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 })
    const h1 = q('[data-hero="h1"]')[0] as HTMLElement
    h1.style.visibility = 'visible'
    tl.fromTo(q('[data-word]'), { yPercent: 115 }, { yPercent: 0, duration: 1.25, ease: 'expo.out', stagger: 0.08 }, '-=0.5')
    tl.fromTo(
      q('[data-hero="sub"], [data-hero="cta"], [data-hero="stats"]'),
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 },
      '-=0.8',
    )
    tl.fromTo(
      q('[data-hero="deco"]'),
      { autoAlpha: 0, scale: 0.85 },
      { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'expo.out', stagger: 0.07 },
      0.3,
    )
    tl.fromTo(
      q('[data-hero="card"]'),
      { autoAlpha: 0, y: 90 },
      { autoAlpha: 1, y: 0, duration: 1.4, ease: 'expo.out', stagger: 0.16 },
      0.6,
    )

    // 2) Gerak melayang (pada pembungkus terdalam; tidak bentrok dengan parallax)
    const floats = q('[data-float]').map((node) =>
      gsap.to(node, {
        y: gsap.utils.random(-16, -8),
        rotation: gsap.utils.random(-2.5, 2.5),
        duration: gsap.utils.random(3.4, 5.2),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: gsap.utils.random(0, 2),
      }),
    )
    const sparkles = q('[data-twinkle]').map((node) =>
      gsap.to(node, {
        opacity: 0.25,
        scale: 0.7,
        duration: gsap.utils.random(1.2, 2.2),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: gsap.utils.random(0, 1.5),
      }),
    )
    // Jeda semua tween idle saat hero tidak terlihat (hemat CPU/baterai).
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => [...floats, ...sparkles].forEach((t) => (self.isActive ? t.resume() : t.pause())),
    })

    // 3) Parallax scroll multi-layer (yPercent) + teks bergeser pelan
    const layers = q('[data-depth]') as HTMLElement[]
    gsap.to(layers, {
      yPercent: (_i, node: HTMLElement) => -Number(node.dataset.depth) * 16,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
    })
    gsap.to(q('[data-hero-text]'), {
      y: -50,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
    })

    // 4) Parallax mouse (hanya perangkat dengan kursor; x/y terpisah dari yPercent di atas)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const movers = layers.map((node) => ({
        x: gsap.quickTo(node, 'x', { duration: 1.1, ease: 'power3.out' }),
        y: gsap.quickTo(node, 'y', { duration: 1.1, ease: 'power3.out' }),
        d: Number(node.dataset.depth),
      }))
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        movers.forEach((m) => {
          m.x(-nx * m.d * 38)
          m.y(-ny * m.d * 28)
        })
      }
      el.addEventListener('pointermove', onMove, { passive: true })
      cleanups.push(() => el.removeEventListener('pointermove', onMove))
    }
  },
  false,
)
</script>

<template>
  <section ref="root" class="paper-grain relative isolate overflow-hidden bg-ivory" aria-labelledby="hero-title">
    <!-- cahaya champagne di latar -->
    <div
      class="pointer-events-none absolute inset-0 -z-10"
      style="background: radial-gradient(60% 60% at 78% 38%, #efe0c2 0%, rgba(248, 242, 230, 0) 70%), radial-gradient(40% 40% at 6% 90%, #f0e6d1 0%, rgba(248, 242, 230, 0) 70%)"
      aria-hidden="true"
    />

    <div class="container-x grid min-h-[100svh] items-center gap-6 pb-14 pt-28 lg:grid-cols-12 lg:gap-4 lg:pt-24">
      <!-- TEKS -->
      <div data-hero-text class="relative z-10 lg:col-span-6">
        <p data-hero="eyebrow" class="eyebrow mb-7 flex items-center gap-3">
          <span class="h-px w-10 bg-gold-500" aria-hidden="true" />
          Digital Invitation Studio
        </p>

        <h1
          id="hero-title"
          data-hero="h1"
          class="display text-[clamp(3.1rem,7.6vw,7.4rem)]"
        >
          <span
            v-for="w in words"
            :key="w.t"
            class="mr-[0.2em] inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]"
          >
            <span data-word class="inline-block will-move" :class="w.em ? 'italic text-gold-500' : ''">{{ w.t }}</span>
          </span>
        </h1>

        <p data-hero="sub" class="mt-8 max-w-[34rem] text-base leading-relaxed text-cocoa/75 sm:text-lg">
          Rayakan momen istimewa dengan undangan digital yang dirancang penuh cerita, keindahan, dan karakter.
        </p>

        <div data-hero="cta" class="mt-10 flex flex-wrap items-center gap-4">
          <RouterLink v-magnetic="0.3" :to="{ name: 'catalog' }" class="btn btn-solid">
            Jelajahi Koleksi
            <ArrowUpRight :size="17" aria-hidden="true" />
          </RouterLink>
          <button v-magnetic="0.3" type="button" class="btn btn-ghost" @click="open(demo)">
            <Play :size="15" aria-hidden="true" />
            Lihat Demo
          </button>
        </div>

        <dl data-hero="stats" class="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-cocoa/15 pt-6">
          <div v-for="s in stats" :key="s.l">
            <dt class="sr-only">{{ s.l }}</dt>
            <dd class="font-serif text-4xl font-medium leading-none">{{ s.n }}</dd>
            <p class="mt-2 text-[0.7rem] uppercase leading-snug tracking-[0.16em] text-clay" aria-hidden="true">{{ s.l }}</p>
          </div>
        </dl>
      </div>

      <!-- VISUAL BERLAPIS -->
      <div class="relative lg:col-span-6">
        <div class="relative mx-auto h-[470px] w-full max-w-[640px] sm:h-[580px] lg:h-[700px]">
          <!-- cincin emas -->
          <div data-depth="0.3" class="will-move absolute inset-[4%]" aria-hidden="true">
            <div data-hero="deco" class="h-full w-full">
              <div data-float class="h-full w-full">
                <svg viewBox="0 0 400 400" class="h-full w-full" fill="none">
                  <circle cx="200" cy="200" r="190" stroke="#B8893C" stroke-opacity=".55" stroke-width="1" />
                  <circle cx="200" cy="200" r="160" stroke="#B8893C" stroke-opacity=".35" stroke-width="1" stroke-dasharray="2 7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- kawung samar -->
          <div data-depth="0.25" class="will-move absolute -left-[6%] top-[2%] w-[46%] opacity-40" aria-hidden="true">
            <div data-hero="deco"><div data-float><OrnamentArt motif="batik" primary="#2A1B12" accent="#B8893C" /></div></div>
          </div>

          <!-- bunga besar -->
          <div data-depth="0.6" class="will-move absolute -right-[8%] -top-[4%] w-[54%]" aria-hidden="true">
            <div data-hero="deco"><div data-float><OrnamentArt motif="floral" primary="#8A6A55" accent="#D9B56E" paper="#F8F2E6" class="rotate-12" /></div></div>
          </div>

          <!-- kartu utama -->
          <div data-depth="1" class="will-move absolute left-[22%] top-[9%] w-[44%]">
            <div data-hero="card">
              <div data-float>
                <button
                  v-tilt="5"
                  type="button"
                  class="block w-full -rotate-3 text-left shadow-[0_34px_60px_-22px_rgba(42,27,18,0.5)]"
                  :aria-label="`Pratinjau ${main.name}`"
                  @click="open(main)"
                >
                  <InvitationMockup :template="main" />
                </button>
              </div>
            </div>
          </div>

          <!-- kartu gelap -->
          <div data-depth="1.5" class="will-move absolute right-[3%] top-[26%] w-[36%]">
            <div data-hero="card">
              <div data-float>
                <button
                  v-tilt="6"
                  type="button"
                  class="block w-full rotate-6 text-left shadow-[0_34px_60px_-22px_rgba(42,27,18,0.6)]"
                  :aria-label="`Pratinjau ${dark.name}`"
                  @click="open(dark)"
                >
                  <InvitationMockup :template="dark" />
                </button>
              </div>
            </div>
          </div>

          <!-- kartu Bali -->
          <div data-depth="1.9" class="will-move absolute bottom-[1%] left-[0%] w-[34%]">
            <div data-hero="card">
              <div data-float>
                <button
                  v-tilt="6"
                  type="button"
                  class="block w-full -rotate-[8deg] text-left shadow-[0_34px_60px_-22px_rgba(42,27,18,0.55)]"
                  :aria-label="`Pratinjau ${bali.name}`"
                  @click="open(bali)"
                >
                  <InvitationMockup :template="bali" />
                </button>
              </div>
            </div>
          </div>

          <!-- frame kecil -->
          <div data-depth="0.5" class="will-move absolute bottom-[-2%] left-[42%] w-[24%] opacity-60" aria-hidden="true">
            <div data-hero="deco"><div data-float><OrnamentArt motif="frame" primary="#2A1B12" accent="#B8893C" /></div></div>
          </div>

          <!-- daun depan -->
          <div data-depth="2.3" class="will-move absolute -bottom-[1%] right-[0%] w-[30%]" aria-hidden="true">
            <div data-hero="deco"><div data-float><OrnamentArt motif="leaf" primary="#4E5A3D" accent="#8A9A5B" class="-rotate-12" /></div></div>
          </div>

          <!-- sparkle -->
          <div data-depth="2.6" class="will-move absolute left-[14%] top-[0%] w-[8%]" aria-hidden="true">
            <div data-hero="deco"><div data-twinkle><OrnamentArt motif="sparkle" primary="#B8893C" accent="#D9B56E" /></div></div>
          </div>
          <div data-depth="1.6" class="will-move absolute right-[6%] top-[8%] w-[6%]" aria-hidden="true">
            <div data-hero="deco"><div data-twinkle><OrnamentArt motif="sparkle" primary="#B8893C" accent="#D9B56E" /></div></div>
          </div>
          <div data-depth="2" class="will-move absolute bottom-[34%] left-[-1%] w-[5%]" aria-hidden="true">
            <div data-hero="deco"><div data-twinkle><OrnamentArt motif="sparkle" primary="#2A1B12" accent="#B8893C" /></div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- isyarat gulir -->
    <div class="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.3em] text-clay lg:flex" aria-hidden="true">
      Gulir
      <span class="block h-10 w-px origin-top animate-[scrollcue_2.2s_ease-in-out_infinite] bg-gold-500" />
    </div>
  </section>
</template>

<style>
@keyframes scrollcue {
  0% { transform: scaleY(0); opacity: 0; }
  40% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1); opacity: 0; }
}
</style>
