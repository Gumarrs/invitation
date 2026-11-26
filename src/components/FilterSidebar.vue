<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'
import { categories } from '@/data/categories'
import { themes } from '@/data/themes'
import { priceRanges } from '@/composables/useCatalogFilters'

defineProps<{
  category: string
  theme: string
  price: string
  q: string
  active: number
}>()

const emit = defineEmits<{
  (e: 'update', patch: Partial<Record<'category' | 'theme' | 'price' | 'q', string>>): void
  (e: 'reset'): void
}>()

// Klik pada nilai yang sedang aktif = menghapus filter tersebut
const toggle = (key: 'category' | 'theme', cur: string, val: string) => emit('update', { [key]: cur === val ? '' : val })
</script>

<template>
  <form class="space-y-9" role="search" aria-label="Filter katalog" @submit.prevent>
    <div>
      <label for="catalog-search" class="eyebrow">Cari desain</label>
      <div class="relative mt-3">
        <Search :size="17" class="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-clay" aria-hidden="true" />
        <input
          id="catalog-search"
          type="search"
          :value="q"
          placeholder="Nama desain…"
          autocomplete="off"
          class="w-full border-0 border-b border-cocoa/30 bg-transparent py-2.5 pl-7 pr-7 text-sm placeholder:text-clay focus:border-gold-500 focus:outline-none"
          @input="emit('update', { q: ($event.target as HTMLInputElement).value })"
        />
        <button v-if="q" type="button" class="absolute right-0 top-1/2 -translate-y-1/2 p-1" aria-label="Hapus pencarian" @click="emit('update', { q: '' })">
          <X :size="15" aria-hidden="true" />
        </button>
      </div>
    </div>

    <fieldset>
      <legend class="eyebrow">Kategori</legend>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="c in categories"
          :key="c.id"
          type="button"
          :aria-pressed="category === c.id"
          class="rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors duration-300"
          :class="category === c.id ? 'border-cocoa bg-cocoa text-ivory' : 'border-cocoa/25 hover:border-cocoa'"
          @click="toggle('category', category, c.id)"
        >
          {{ c.name }}
        </button>
      </div>
    </fieldset>

    <fieldset>
      <legend class="eyebrow">Tema</legend>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="t in themes"
          :key="t.id"
          type="button"
          :aria-pressed="theme === t.id"
          class="flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors duration-300"
          :class="theme === t.id ? 'border-cocoa bg-cocoa text-ivory' : 'border-cocoa/25 hover:border-cocoa'"
          @click="toggle('theme', theme, t.id)"
        >
          <span class="h-2.5 w-2.5 rounded-full" :style="{ background: t.palette[2] }" aria-hidden="true" />
          {{ t.name }}
        </button>
      </div>
    </fieldset>

    <fieldset>
      <legend class="eyebrow">Harga</legend>
      <div class="mt-3 space-y-2.5">
        <label v-for="p in priceRanges" :key="p.id" class="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="radio"
            name="price"
            :value="p.id"
            :checked="price === p.id"
            class="h-4 w-4 accent-[#B8893C]"
            @change="emit('update', { price: p.id })"
          />
          {{ p.label }}
        </label>
      </div>
    </fieldset>

    <button type="button" class="btn btn-ghost w-full" :disabled="!active" :class="!active && 'opacity-40'" @click="emit('reset')">
      Reset filter{{ active ? ` (${active})` : '' }}
    </button>
  </form>
</template>
