<script setup lang="ts">
import { computed, ref } from 'vue'
import { SearchX, SlidersHorizontal, X } from 'lucide-vue-next'
import FilterSidebar from '@/components/FilterSidebar.vue'
import TemplateGrid from '@/components/TemplateGrid.vue'
import OrnamentArt from '@/components/OrnamentArt.vue'
import { useCatalogFilters, sortOptions } from '@/composables/useCatalogFilters'
import { categoryMap } from '@/data/categories'
import { themeMap } from '@/data/themes'
import { templates } from '@/data/templates'
import { useGsapContext } from '@/composables/useGsapContext'
import type { CategoryId, ThemeId } from '@/types'

const f = useCatalogFilters()
const drawer = ref(false)
const root = ref<HTMLElement | null>(null)
useGsapContext(root)

const heading = computed(() => {
  if (f.category.value) return categoryMap[f.category.value as CategoryId].name
  if (f.theme.value) return themeMap[f.theme.value as ThemeId].name
  return 'Semua Desain'
})

document.title = 'Katalog — Kirana Invitation'
</script>

<template>
  <div ref="root" class="bg-ivory pb-24 pt-32 lg:pt-40">
    <div class="container-x">
      <header class="relative max-w-3xl">
        <p data-reveal class="eyebrow mb-5">Katalog</p>
        <h1 data-split class="display text-[clamp(3rem,7vw,6.4rem)]">{{ heading }}</h1>
        <p data-reveal="0.1" class="mt-5 max-w-lg text-cocoa/70">
          Telusuri {{ templates.length }} desain undangan. Gabungkan filter untuk menemukan yang paling pas.
        </p>
      </header>

      <div class="mt-14 grid gap-12 lg:grid-cols-12">
        <!-- sidebar desktop -->
        <aside class="hidden lg:col-span-3 lg:block">
          <div class="sticky top-28">
            <FilterSidebar
              :category="f.category.value"
              :theme="f.theme.value"
              :price="f.price.value"
              :q="f.q.value"
              :active="f.active.value"
              @update="f.set"
              @reset="f.reset"
            />
          </div>
        </aside>

        <section class="lg:col-span-9" aria-label="Hasil katalog">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-cocoa/15 pb-5">
            <p class="text-sm text-cocoa/70" role="status" aria-live="polite">
              <strong class="font-semibold text-cocoa">{{ f.results.value.length }}</strong> desain ditemukan
            </p>
            <div class="flex items-center gap-3">
              <button type="button" class="btn btn-ghost !px-4 !py-2.5 !text-[0.8rem] lg:hidden" @click="drawer = true">
                <SlidersHorizontal :size="15" aria-hidden="true" />
                Filter{{ f.active.value ? ` (${f.active.value})` : '' }}
              </button>
              <label class="flex items-center gap-2 text-sm">
                <span class="text-clay">Urutkan</span>
                <select
                  :value="f.sort.value"
                  class="border-0 border-b border-cocoa/30 bg-transparent py-1.5 pr-6 text-sm font-medium focus:border-gold-500 focus:outline-none"
                  @change="f.set({ sort: ($event.target as HTMLSelectElement).value })"
                >
                  <option v-for="s in sortOptions" :key="s.id" :value="s.id">{{ s.label }}</option>
                </select>
              </label>
            </div>
          </div>

          <div v-if="f.results.value.length" class="mt-10">
            <TemplateGrid :templates="f.results.value" columns="sm:grid-cols-2 xl:grid-cols-3" />
          </div>

          <!-- empty state -->
          <div v-else class="relative mt-16 grid place-items-center overflow-hidden py-20 text-center">
            <OrnamentArt motif="frame" primary="#2A1B12" accent="#B8893C" class="absolute w-72 opacity-[0.08]" />
            <div class="relative">
              <SearchX :size="34" class="mx-auto text-gold-600" aria-hidden="true" />
              <h2 class="mt-5 font-serif text-4xl">Belum ada desain yang cocok.</h2>
              <p class="mx-auto mt-3 max-w-sm text-sm text-cocoa/65">Coba longgarkan filter atau gunakan kata kunci lain.</p>
              <button type="button" class="btn btn-solid mt-7" @click="f.reset">Reset filter</button>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- drawer filter (mobile / tablet) -->
    <Transition name="page">
      <div v-if="drawer" class="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filter">
        <div class="absolute inset-0 bg-cocoa-900/60" @click="drawer = false" />
        <div class="absolute inset-x-0 bottom-0 max-h-[88svh] overflow-y-auto bg-ivory p-6 pb-8">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="font-serif text-3xl">Filter</h2>
            <button type="button" class="grid h-10 w-10 place-items-center rounded-full border border-cocoa/20" aria-label="Tutup filter" @click="drawer = false">
              <X :size="18" aria-hidden="true" />
            </button>
          </div>
          <FilterSidebar
            :category="f.category.value"
            :theme="f.theme.value"
            :price="f.price.value"
            :q="f.q.value"
            :active="f.active.value"
            @update="f.set"
            @reset="f.reset"
          />
          <button type="button" class="btn btn-solid mt-6 w-full" @click="drawer = false">
            Tampilkan {{ f.results.value.length }} desain
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
