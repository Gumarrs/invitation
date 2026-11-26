<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PreviewModal from '@/components/PreviewModal.vue'
import { ScrollTrigger } from '@/lib/gsap'

const route = useRoute()

// Setelah pindah halaman, posisi trigger harus dihitung ulang.
function onAfterEnter() {
  ScrollTrigger.refresh()
}

watch(
  () => route.fullPath,
  () => {
    // Fokus kembali ke konten utama agar pembaca layar mengumumkan halaman baru.
    document.getElementById('main')?.focus({ preventScroll: true })
  },
)
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:text-ivory"
  >
    Lompat ke konten
  </a>
  <Navbar v-if="!route.meta.bare" />
  <main id="main" tabindex="-1" class="outline-none">
    <RouterView v-slot="{ Component, route: r }">
      <Transition name="page" mode="out-in" @after-enter="onAfterEnter">
        <component :is="Component" :key="r.path" />
      </Transition>
    </RouterView>
  </main>
  <Footer v-if="!route.meta.bare" />
  <PreviewModal />
</template>
