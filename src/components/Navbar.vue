<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, type RouteLocationRaw } from 'vue-router'
import { ArrowUpRight, Menu, X } from 'lucide-vue-next'
import { useScrolled } from '@/composables/useScrolled'
import { useGsapContext } from '@/composables/useGsapContext'
import { gsap, reducedMotion } from '@/lib/gsap'

interface NavLink {
  label: string
  to: RouteLocationRaw
  active: () => boolean
}

const route = useRoute()
const scrolled = useScrolled(40)
const open = ref(false)
const root = ref<HTMLElement | null>(null)

const links: NavLink[] = [
  { label: 'Beranda', to: { name: 'home' }, active: () => route.name === 'home' && !route.hash },
  { label: 'Katalog', to: { name: 'catalog' }, active: () => route.name === 'catalog' || route.name === 'template' },
  { label: 'Kategori', to: { name: 'home', hash: '#kategori' }, active: () => route.hash === '#kategori' },
  { label: 'Tema', to: { name: 'home', hash: '#tema' }, active: () => route.hash === '#tema' },
  { label: 'Cara Pemesanan', to: { name: 'home', hash: '#cara-pemesanan' }, active: () => route.hash === '#cara-pemesanan' },
  { label: 'FAQ', to: { name: 'home', hash: '#faq' }, active: () => route.hash === '#faq' },
]

// Transparan hanya saat di hero beranda dan belum di-scroll.
const transparent = computed(() => route.name === 'home' && !scrolled.value && !open.value)

function close() {
  open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) close()
}

watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})
watch(() => route.fullPath, close)

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

// Navbar turun halus saat pertama kali dimuat.
useGsapContext(
  root,
  () => {
    if (reducedMotion() || !root.value) return
    // clearProps: sisa transform akan menjadikan header containing block bagi menu mobile yang fixed.
    gsap.from(root.value, { y: -40, autoAlpha: 0, duration: 1, ease: 'power3.out', delay: 0.1, clearProps: 'transform,opacity,visibility' })
  },
  false,
)
</script>

<template>
  <header
    ref="root"
    class="fixed inset-x-0 top-0 z-50"
  >
    <!-- Latar dipisah dari header: backdrop-filter pada header akan mengurung menu mobile yang fixed. -->
    <div
      class="absolute inset-0 -z-10 transition-[background-color,box-shadow] duration-500"
      :class="transparent ? 'bg-transparent' : 'bg-ivory/90 shadow-[0_1px_0_rgba(42,27,18,0.08)] backdrop-blur-md'"
      aria-hidden="true"
    />
    <nav class="container-x flex h-[72px] items-center justify-between" aria-label="Navigasi utama">
      <RouterLink :to="{ name: 'home' }" class="group flex items-center gap-3" aria-label="Kirana Invitation, ke beranda">
        <svg viewBox="0 0 64 64" class="h-9 w-9 transition-transform duration-700 ease-silk group-hover:rotate-[24deg]" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="none" stroke="#B8893C" stroke-width="1.5" />
          <path d="M32 10c4 8 12 12 12 22s-6 14-12 22c-6-8-12-12-12-22s8-14 12-22z" fill="none" stroke="#2A1B12" stroke-width="2" />
          <circle cx="32" cy="32" r="3.5" fill="#B8893C" />
        </svg>
        <span class="leading-none">
          <span class="block font-serif text-[1.55rem] font-semibold tracking-tight">Kirana</span>
          <span class="block text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-gold-600">Invitation</span>
        </span>
      </RouterLink>

      <ul class="hidden items-center gap-8 xl:flex">
        <li v-for="l in links" :key="l.label">
          <RouterLink
            :to="l.to"
            class="link-underline pb-1 text-[0.82rem] font-medium tracking-wide"
            :class="{ 'is-active': l.active() }"
            :aria-current="l.active() ? 'page' : undefined"
          >
            {{ l.label }}
          </RouterLink>
        </li>
      </ul>

      <div class="flex items-center gap-3">
        <RouterLink v-magnetic="0.25" :to="{ name: 'catalog' }" class="btn btn-solid hidden !py-3 sm:inline-flex">
          Buat Undangan
          <ArrowUpRight :size="16" aria-hidden="true" />
        </RouterLink>
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-full border border-cocoa/20 xl:hidden"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Tutup menu' : 'Buka menu'"
          @click="open = !open"
        >
          <X v-if="open" :size="20" aria-hidden="true" />
          <Menu v-else :size="20" aria-hidden="true" />
        </button>
      </div>
    </nav>

    <Transition name="page">
      <div
        v-if="open"
        id="mobile-menu"
        class="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-ivory px-6 pb-10 pt-6 xl:hidden"
      >
        <ul class="divide-y divide-cocoa/10">
          <li v-for="(l, i) in links" :key="l.label">
            <RouterLink
              :to="l.to"
              class="flex items-baseline justify-between py-5 font-serif text-4xl"
              :class="l.active() ? 'text-gold-600' : ''"
              @click="close"
            >
              {{ l.label }}
              <span class="font-sans text-xs tracking-[0.2em] text-clay">0{{ i + 1 }}</span>
            </RouterLink>
          </li>
        </ul>
        <RouterLink :to="{ name: 'catalog' }" class="btn btn-solid mt-8 w-full" @click="close">
          Buat Undangan
          <ArrowUpRight :size="16" aria-hidden="true" />
        </RouterLink>
      </div>
    </Transition>
  </header>
</template>
