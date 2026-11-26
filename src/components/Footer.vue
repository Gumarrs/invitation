<script setup lang="ts">
import { Instagram, Mail, MapPin, Music2, Phone, Youtube } from 'lucide-vue-next'
import { categories } from '@/data/categories'

const nav = [
  { label: 'Beranda', to: { name: 'home' } },
  { label: 'Katalog', to: { name: 'catalog' } },
  { label: 'Tema', to: { name: 'home', hash: '#tema' } },
  { label: 'Cara Pemesanan', to: { name: 'home', hash: '#cara-pemesanan' } },
  { label: 'FAQ', to: { name: 'home', hash: '#faq' } },
]

// Demo antarmuka: tautan sosial tidak mengarah ke akun sungguhan.
const socials = [
  { label: 'Instagram', icon: Instagram },
  { label: 'TikTok', icon: Music2 },
  { label: 'YouTube', icon: Youtube },
]
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-cocoa-900 text-ivory">
    <div class="container-x py-20 lg:py-28">
      <div class="grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <p class="font-serif text-[clamp(2.4rem,4.4vw,4rem)] italic leading-[1.05]">
            Every moment deserves<br />a beautiful invitation.
          </p>
          <p class="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
            Kirana Invitation adalah marketplace undangan digital premium untuk berbagai acara di Indonesia.
          </p>
        </div>

        <nav class="lg:col-span-2 lg:col-start-7" aria-label="Navigasi footer">
          <h2 class="eyebrow !text-gold-300">Jelajahi</h2>
          <ul class="mt-5 space-y-3 text-sm">
            <li v-for="l in nav" :key="l.label">
              <RouterLink :to="l.to" class="link-underline pb-0.5 text-ivory/75 hover:text-ivory">{{ l.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <nav class="lg:col-span-2" aria-label="Kategori">
          <h2 class="eyebrow !text-gold-300">Kategori</h2>
          <ul class="mt-5 space-y-3 text-sm">
            <li v-for="c in categories" :key="c.id">
              <RouterLink :to="{ name: 'catalog', query: { category: c.id } }" class="link-underline pb-0.5 text-ivory/75 hover:text-ivory">
                {{ c.name }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="lg:col-span-2">
          <h2 class="eyebrow !text-gold-300">Kontak</h2>
          <ul class="mt-5 space-y-3 text-sm text-ivory/75">
            <li class="flex items-start gap-2.5"><MapPin :size="16" class="mt-0.5 shrink-0 text-gold-300" aria-hidden="true" />Jl. Contoh No. 12, Jakarta Selatan</li>
            <li class="flex items-center gap-2.5"><Phone :size="16" class="shrink-0 text-gold-300" aria-hidden="true" />+62 812-0000-0000</li>
            <li class="flex items-center gap-2.5"><Mail :size="16" class="shrink-0 text-gold-300" aria-hidden="true" />halo@kirana.example</li>
          </ul>
          <ul class="mt-6 flex gap-3" aria-label="Media sosial">
            <li v-for="s in socials" :key="s.label">
              <span class="grid h-10 w-10 place-items-center rounded-full border border-ivory/25 text-ivory/80" :title="`${s.label} (demo)`" role="img" :aria-label="`${s.label} (demo, tidak aktif)`">
                <component :is="s.icon" :size="17" aria-hidden="true" />
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-20 flex flex-col gap-3 border-t border-ivory/15 pt-7 text-xs text-ivory/50 sm:flex-row sm:justify-between">
        <p>© {{ year }} Kirana Invitation. Seluruh data pada situs ini adalah contoh.</p>
        <p>Dibuat dengan penuh cerita di Indonesia.</p>
      </div>
    </div>
  </footer>
</template>
