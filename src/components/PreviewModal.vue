<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { ArrowUpRight, X } from 'lucide-vue-next'
import InvitationMockup from './InvitationMockup.vue'
import { categoryMap } from '@/data/categories'
import { themeMap } from '@/data/themes'
import { formatRupiah } from '@/data/templates'
import { usePreview } from '@/composables/usePreview'

const { current, close } = usePreview()
const dialog = ref<HTMLElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
let lastFocus: HTMLElement | null = null

const category = computed(() => (current.value ? categoryMap[current.value.category] : null))
const theme = computed(() => (current.value ? themeMap[current.value.theme] : null))

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function onKey(e: KeyboardEvent) {
  if (!current.value) return
  if (e.key === 'Escape') return close()
  if (e.key !== 'Tab' || !dialog.value) return
  // Jebakan fokus sederhana di dalam dialog
  const items = Array.from(dialog.value.querySelectorAll<HTMLElement>(FOCUSABLE))
  if (!items.length) return
  const first = items[0]
  const last = items[items.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

watch(current, async (v) => {
  if (v) {
    lastFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    await nextTick()
    closeBtn.value?.focus()
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKey)
    lastFocus?.focus?.()
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="page">
      <div v-if="current" class="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" @click.self="close">
        <div class="absolute inset-0 bg-cocoa-900/70 backdrop-blur-sm" aria-hidden="true" @click="close" />

        <div
          ref="dialog"
          role="dialog"
          aria-modal="true"
          :aria-label="`Pratinjau ${current.name}`"
          class="relative grid max-h-[94svh] w-full max-w-5xl overflow-y-auto bg-ivory md:grid-cols-2"
        >
          <button
            ref="closeBtn"
            type="button"
            class="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-ivory/90 shadow"
            aria-label="Tutup pratinjau"
            @click="close"
          >
            <X :size="20" aria-hidden="true" />
          </button>

          <div class="grid place-items-center p-8 sm:p-12" :style="{ background: `${current.palette[2]}33` }">
            <div class="w-[68%] max-w-[340px] shadow-[0_40px_60px_-24px_rgba(42,27,18,0.55)] md:w-[78%]">
              <InvitationMockup :template="current" />
            </div>
          </div>

          <div class="flex flex-col p-7 sm:p-10">
            <p class="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-600">
              {{ category?.name }} · {{ theme?.name }}
            </p>
            <h2 class="mt-3 font-serif text-5xl font-medium leading-none">{{ current.name }}</h2>
            <p class="mt-2 font-serif text-xl italic text-clay">{{ current.tagline }}</p>
            <p class="mt-5 text-[0.95rem] leading-relaxed text-cocoa/75">{{ current.description }}</p>

            <ul class="mt-6 grid gap-2 text-sm">
              <li v-for="f in current.features.slice(0, 5)" :key="f" class="flex items-center gap-2.5">
                <span class="h-1.5 w-1.5 rotate-45 bg-gold-500" aria-hidden="true" />{{ f }}
              </li>
            </ul>

            <div class="mt-8 flex items-baseline gap-3">
              <span class="text-2xl font-bold">{{ formatRupiah(current.price) }}</span>
              <span v-if="current.oldPrice" class="text-clay line-through">{{ formatRupiah(current.oldPrice) }}</span>
            </div>

            <div class="mt-auto flex flex-wrap gap-3 pt-8">
              <RouterLink :to="{ name: 'template', params: { slug: current.slug } }" class="btn btn-solid" @click="close">
                Lihat Detail <ArrowUpRight :size="16" aria-hidden="true" />
              </RouterLink>
              <button type="button" class="btn btn-ghost" @click="close">Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
