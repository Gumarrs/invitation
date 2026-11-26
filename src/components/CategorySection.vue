<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight, Play } from 'lucide-vue-next'
import OrnamentArt from './OrnamentArt.vue'
import { categories } from '@/data/categories'
import { templates } from '@/data/templates'
import { useGsapContext } from '@/composables/useGsapContext'

const root = ref<HTMLElement | null>(null)
useGsapContext(root)

const count = (id: string) => templates.filter((t) => t.category === id).length
</script>

<template>
  <section id="kategori" ref="root" class="relative bg-ivory py-24 lg:py-36" aria-labelledby="kategori-title">
    <div class="container-x">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <p data-reveal class="eyebrow mb-6">Kategori</p>
          <h2 id="kategori-title" data-split class="display text-[clamp(2.6rem,5.6vw,5.2rem)]">
            Untuk setiap momen, satu cerita.
          </h2>
        </div>
        <p data-reveal="0.15" class="self-end text-base leading-relaxed text-cocoa/70 lg:col-span-4 lg:col-start-9">
          Tujuh jenis acara, masing-masing dengan alur, tata letak, dan nuansa yang disusun khusus. Pilih satu untuk
          melihat seluruh desainnya.
        </p>
      </div>

      <ul data-reveal="stagger" class="mt-16 border-b border-cocoa/15 lg:mt-24">
        <li v-for="(c, i) in categories" :key="c.id" class="group relative border-t border-cocoa/15">
          <!-- Tautan demo bersaudara (bukan di dalam tautan katalog) supaya tidak ada anchor bersarang -->
          <RouterLink
            :to="{ name: 'demo-category', params: { id: c.id } }"
            class="absolute right-2 top-2 z-10 inline-flex items-center gap-1.5 rounded-full bg-cocoa px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:bg-gold-600"
            :aria-label="`Lihat demo undangan ${c.name}`"
          >
            <Play :size="11" aria-hidden="true" /> Demo
          </RouterLink>
          <RouterLink
            :to="{ name: 'catalog', query: { category: c.id } }"
            class="relative grid items-center gap-x-6 gap-y-3 overflow-hidden py-7 sm:py-9 lg:grid-cols-12"
            :aria-label="`Lihat ${count(c.id)} desain ${c.name}`"
          >
            <!-- latar warna kategori meluncur dari kiri saat hover -->
            <span
              class="absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-700 ease-silk group-hover:scale-x-100 group-focus-visible:scale-x-100"
              :style="{ background: c.palette[0] }"
              aria-hidden="true"
            />
            <span class="font-sans text-xs font-semibold tracking-[0.25em] text-gold-600 lg:col-span-1 lg:pl-3">
              {{ String(i + 1).padStart(2, '0') }}
            </span>

            <div class="lg:col-span-5">
              <h3 class="font-serif text-[clamp(2.2rem,4.6vw,4.4rem)] leading-none transition-transform duration-700 ease-silk group-hover:translate-x-3">
                {{ c.name }}
              </h3>
              <p class="mt-2 font-serif text-lg italic text-clay">{{ c.tagline }}</p>
            </div>

            <p class="max-w-md text-sm leading-relaxed text-cocoa/70 lg:col-span-4">{{ c.description }}</p>

            <div class="flex items-center justify-between gap-5 lg:col-span-2 lg:justify-end">
              <div class="text-right">
                <p class="font-serif text-3xl leading-none">{{ count(c.id) }}</p>
                <p class="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-clay">Desain</p>
              </div>
              <span
                class="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full transition-transform duration-700 ease-silk group-hover:rotate-[14deg] group-hover:scale-110"
                :style="{ background: c.palette[0], boxShadow: `inset 0 0 0 1px ${c.palette[1]}33` }"
              >
                <OrnamentArt :motif="c.motif" :primary="c.palette[1]" :accent="c.palette[2]" :paper="c.palette[0]" class="w-[78%]" />
              </span>
              <ArrowUpRight :size="22" class="hidden shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block" aria-hidden="true" />
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>
