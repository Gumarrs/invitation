<script setup lang="ts">
import { ref } from 'vue'
import { CreditCard, Eye, FileText, LayoutGrid, Send } from 'lucide-vue-next'
import { useGsapContext } from '@/composables/useGsapContext'
import { gsap, reducedMotion } from '@/lib/gsap'

const root = ref<HTMLElement | null>(null)

const steps = [
  { icon: LayoutGrid, t: 'Pilih kategori dan desain', d: 'Telusuri tujuh kategori acara dan sebelas tema, lalu simpan desain yang paling terasa cocok.' },
  { icon: Eye, t: 'Lihat preview', d: 'Buka pratinjau berukuran besar untuk melihat tata letak, warna, dan fitur yang tersedia.' },
  { icon: FileText, t: 'Kirim data acara', d: 'Isi nama, tanggal, lokasi, susunan acara, dan foto. Kami yang merapikannya ke dalam desain.' },
  { icon: CreditCard, t: 'Lakukan pembayaran', d: 'Bayar lewat transfer bank, QRIS, atau dompet digital. Prosesnya tercatat dan transparan.' },
  { icon: Send, t: 'Undangan siap dibagikan', d: 'Terima satu tautan unik untuk dikirim lewat WhatsApp, Instagram, atau email.' },
]

useGsapContext(root, () => {
  const el = root.value
  if (reducedMotion() || !el) return
  // Garis progres tergambar mengikuti scroll (transform saja).
  gsap.fromTo(
    el.querySelector('[data-line]'),
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      transformOrigin: 'top center',
      scrollTrigger: { trigger: el.querySelector('[data-steps]'), start: 'top 70%', end: 'bottom 70%', scrub: 0.5 },
    },
  )
})
</script>

<template>
  <section id="cara-pemesanan" ref="root" class="relative bg-ivory-200 py-24 lg:py-36" aria-labelledby="cara-title">
    <div class="container-x">
      <div class="max-w-3xl">
        <p data-reveal class="eyebrow mb-6">Cara Pemesanan</p>
        <h2 id="cara-title" data-split class="display text-[clamp(2.6rem,5.6vw,5.2rem)]">Lima langkah, tanpa repot.</h2>
      </div>

      <ol data-steps class="relative mt-20 lg:mt-28">
        <!-- garis tengah (desktop) / kiri (mobile) -->
        <span class="absolute bottom-0 left-[1.35rem] top-0 w-px bg-cocoa/15 lg:left-1/2" aria-hidden="true" />
        <span data-line class="absolute bottom-0 left-[1.35rem] top-0 w-px origin-top bg-gold-500 lg:left-1/2" aria-hidden="true" />

        <li
          v-for="(s, i) in steps"
          :key="s.t"
          data-reveal
          class="relative grid gap-x-16 pb-16 pl-16 last:pb-0 lg:grid-cols-2 lg:pl-0"
        >
          <span class="absolute left-0 top-1 grid h-11 w-11 place-items-center rounded-full bg-cocoa text-ivory lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true">
            <component :is="s.icon" :size="18" />
          </span>

          <div :class="i % 2 ? 'lg:col-start-2' : 'lg:pr-20 lg:text-right'">
            <p class="font-serif text-[5.5rem] italic leading-none text-gold-500/35 sm:text-[7rem]" aria-hidden="true">
              {{ String(i + 1).padStart(2, '0') }}
            </p>
            <h3 class="-mt-4 font-serif text-3xl leading-tight sm:text-4xl" :class="i % 2 ? 'lg:pl-20' : ''">
              <span class="sr-only">Langkah {{ i + 1 }}: </span>{{ s.t }}
            </h3>
            <p class="mt-3 max-w-md text-[0.95rem] leading-relaxed text-cocoa/70" :class="i % 2 ? 'lg:pl-20' : 'lg:ml-auto lg:pr-0'">
              {{ s.d }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
