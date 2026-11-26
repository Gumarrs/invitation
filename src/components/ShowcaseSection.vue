<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import InvitationMockup from './InvitationMockup.vue'
import OrnamentArt from './OrnamentArt.vue'
import { templateBySlug } from '@/data/templates'
import { testimonials } from '@/data/testimonials'
import { usePreview } from '@/composables/usePreview'
import { useGsapContext } from '@/composables/useGsapContext'
import { gsap, reducedMotion } from '@/lib/gsap'
import type { Template } from '@/types'

const root = ref<HTMLElement | null>(null)
const { open } = usePreview()

const get = (s: string) => templateBySlug(s) as Template
const hero = get('atelier-noir')
const second = get('sekar-kedhaton')
const third = get('sakura-hour')

const strip = ['tirta-sukla', 'kusuma-keraton', 'gorga-mutiara', 'ondel-rame', 'bloom-linen', 'janji-senja', 'grand-gala'].map(get)

useGsapContext(root, () => {
  const el = root.value
  if (reducedMotion() || !el) return

  // Showcase horizontal: di-pin hanya pada layar lebar. Mobile memakai swipe native.
  const mm = gsap.matchMedia()
  mm.add('(min-width: 1024px)', () => {
    const track = el.querySelector<HTMLElement>('[data-track]')
    const wrap = el.querySelector<HTMLElement>('[data-hscroll]')
    if (!track || !wrap) return
    const dist = () => Math.max(0, track.scrollWidth - wrap.clientWidth)
    gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        pin: true,
        scrub: 0.6,
        start: 'top top+=72',
        end: () => `+=${dist()}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })
  })
})
</script>

<template>
  <section ref="root" class="relative overflow-x-clip bg-ivory pt-24 lg:pt-36" aria-labelledby="inspirasi-title">
    <div class="container-x">
      <p data-reveal class="eyebrow mb-6">Inspirasi</p>
      <h2 id="inspirasi-title" data-split class="display max-w-5xl text-[clamp(2.8rem,7vw,7rem)]">
        Undangan yang <em class="text-gold-500">bercerita</em> sebelum dibuka.
      </h2>

      <!-- Komposisi editorial asimetris -->
      <div class="relative mt-20 grid gap-y-16 lg:mt-28 lg:grid-cols-12 lg:gap-y-0">
        <OrnamentArt motif="floral" primary="#8A6A55" accent="#D9B56E" class="pointer-events-none absolute -left-24 top-1/3 hidden w-[320px] opacity-20 lg:block" data-parallax="0.12" />

        <figure class="relative lg:col-span-5">
          <button type="button" class="group block w-full overflow-hidden text-left" :aria-label="`Pratinjau ${hero.name}`" @click="open(hero)">
            <div data-mask>
              <div class="transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.05]">
                <InvitationMockup :template="hero" />
              </div>
            </div>
          </button>
          <figcaption class="mt-4 flex items-baseline justify-between text-xs uppercase tracking-[0.2em] text-clay">
            <span>{{ hero.name }}</span><span>Luxury · Wedding</span>
          </figcaption>
        </figure>

        <div class="flex flex-col justify-center lg:col-span-4 lg:col-start-7 lg:px-6">
          <p data-reveal class="font-serif text-[clamp(1.7rem,2.8vw,2.6rem)] italic leading-[1.2]">
            “Setiap detail dibuat untuk memberi tamu rasa disambut, bukan sekadar diberi tahu.”
          </p>
          <RouterLink data-reveal="0.1" :to="{ name: 'catalog' }" class="link-underline mt-8 inline-flex w-fit items-center gap-2 pb-1 text-sm font-semibold">
            Lihat seluruh koleksi <ArrowUpRight :size="16" aria-hidden="true" />
          </RouterLink>
        </div>

        <figure class="relative lg:col-span-3 lg:col-start-10 lg:-mt-24">
          <div data-parallax="0.1">
            <button type="button" class="group block w-full overflow-hidden text-left" :aria-label="`Pratinjau ${third.name}`" @click="open(third)">
              <div data-mask>
                <div class="transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.05]"><InvitationMockup :template="third" /></div>
              </div>
            </button>
          </div>
          <figcaption class="mt-4 text-xs uppercase tracking-[0.2em] text-clay">{{ third.name }}</figcaption>
        </figure>

        <figure class="relative lg:col-span-4 lg:col-start-3 lg:mt-10">
          <button type="button" class="group block w-full overflow-hidden text-left" :aria-label="`Pratinjau ${second.name}`" @click="open(second)">
            <div data-mask>
              <div class="transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.05]"><InvitationMockup :template="second" /></div>
            </div>
          </button>
          <figcaption class="mt-4 text-xs uppercase tracking-[0.2em] text-clay">{{ second.name }}</figcaption>
        </figure>

        <blockquote data-reveal class="lg:col-span-4 lg:col-start-8 lg:mt-24">
          <p class="font-serif text-2xl leading-snug">{{ testimonials[0].quote }}</p>
          <footer class="mt-5 text-xs uppercase tracking-[0.2em] text-clay">
            {{ testimonials[0].name }} · {{ testimonials[0].role }}
          </footer>
        </blockquote>
      </div>
    </div>

    <!-- Showcase horizontal -->
    <div class="mt-28 bg-cocoa-900 py-16 text-ivory lg:mt-40">
      <div data-hscroll class="lg:flex lg:h-[calc(100svh-72px)] lg:items-center lg:overflow-hidden">
        <div data-track class="will-move flex w-max items-center gap-10 px-5 sm:px-8 lg:gap-16 lg:px-[max(3rem,calc((100vw-1360px)/2+3rem))] max-lg:max-w-full max-lg:snap-x max-lg:overflow-x-auto max-lg:pb-6">
          <div class="w-[78vw] shrink-0 sm:w-[46vw] lg:w-[30vw] lg:pr-6">
            <p class="eyebrow !text-gold-300">Galeri Pilihan</p>
            <h3 class="display mt-5 text-[clamp(2.4rem,4.6vw,4.4rem)]">Tujuh cerita dari berbagai penjuru.</h3>
            <p class="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">Geser untuk menjelajah. Setiap desain bisa dibuka dalam pratinjau penuh.</p>
          </div>

          <figure v-for="(t, i) in strip" :key="t.id" class="w-[62vw] shrink-0 snap-start sm:w-[34vw] lg:w-[24vw]" :class="i % 2 ? 'lg:mt-24' : 'lg:-mt-12'">
            <button type="button" class="group block w-full overflow-hidden text-left" :aria-label="`Pratinjau ${t.name}`" @click="open(t)">
              <div class="transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.05]"><InvitationMockup :template="t" /></div>
            </button>
            <figcaption class="mt-4 flex items-baseline justify-between gap-3">
              <span class="font-serif text-2xl">{{ t.name }}</span>
              <span class="text-[0.65rem] uppercase tracking-[0.2em] text-gold-300">{{ String(i + 1).padStart(2, '0') }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
