<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, Play } from 'lucide-vue-next'
import InvitationMockup from './InvitationMockup.vue'
import OrnamentArt from './OrnamentArt.vue'
import { themes } from '@/data/themes'
import { templates } from '@/data/templates'
import { useGsapContext } from '@/composables/useGsapContext'
import type { ThemeId } from '@/types'

const root = ref<HTMLElement | null>(null)
useGsapContext(root)

const activeId = ref<ThemeId>('jawa')
const active = computed(() => themes.find((t) => t.id === activeId.value)!)
const designs = computed(() => templates.filter((t) => t.theme === activeId.value))
const example = computed(() => designs.value[0])

function onKey(e: KeyboardEvent, i: number) {
  const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
  if (!dir) return
  e.preventDefault()
  const next = (i + dir + themes.length) % themes.length
  activeId.value = themes[next].id
  ;(root.value?.querySelectorAll<HTMLElement>('[role="tab"]')[next])?.focus()
}
</script>

<template>
  <section id="tema" ref="root" class="relative overflow-hidden bg-cocoa-900 py-24 text-ivory lg:py-36" aria-labelledby="tema-title">
    <OrnamentArt motif="batik" primary="#E6D3AE" accent="#C79B4C" class="pointer-events-none absolute -left-24 top-10 w-[520px] opacity-[0.05]" />

    <div class="container-x relative">
      <p data-reveal class="eyebrow !text-gold-300">Eksplorasi Tema</p>
      <h2 id="tema-title" data-split class="display mt-6 max-w-4xl text-[clamp(2.6rem,5.8vw,5.6rem)]">
        Pilih nuansa yang paling terasa seperti Anda.
      </h2>

      <div class="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
        <!-- daftar tema -->
        <div class="lg:col-span-4">
          <div
            role="tablist"
            aria-label="Pilih tema"
            aria-orientation="vertical"
            class="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            <button
              v-for="(t, i) in themes"
              :id="`tab-${t.id}`"
              :key="t.id"
              role="tab"
              type="button"
              :aria-selected="t.id === activeId"
              :aria-controls="'theme-panel'"
              :tabindex="t.id === activeId ? 0 : -1"
              class="group flex shrink-0 items-baseline gap-4 whitespace-nowrap rounded-full border border-ivory/20 px-5 py-2.5 text-left transition-colors duration-500 lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:py-3.5"
              :class="t.id === activeId ? 'bg-ivory text-cocoa lg:bg-transparent lg:text-gold-300' : 'text-ivory/60 hover:text-ivory'"
              @click="activeId = t.id"
              @keydown="onKey($event, i)"
            >
              <span class="hidden w-7 text-[0.65rem] tracking-[0.2em] text-gold-400 lg:block">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="font-serif text-xl leading-none transition-transform duration-500 ease-silk lg:text-[2rem] lg:group-hover:translate-x-2" :class="t.id === activeId ? 'lg:translate-x-2' : ''">
                {{ t.name }}
              </span>
            </button>
          </div>
        </div>

        <!-- panel tema -->
        <div class="lg:col-span-8">
          <div
            id="theme-panel"
            role="tabpanel"
            :aria-labelledby="`tab-${activeId}`"
            class="paper-grain relative overflow-hidden transition-colors duration-700"
            :style="{ background: active.palette[0], color: active.palette[1] }"
          >
            <Transition name="page" mode="out-in">
              <div :key="active.id" class="grid items-center gap-8 p-6 sm:p-10 md:grid-cols-5 lg:p-14">
                <div class="md:col-span-3">
                  <p class="text-[0.7rem] font-semibold uppercase tracking-[0.28em]" :style="{ color: active.palette[2] }">
                    {{ active.culture ? 'Tema Budaya Indonesia' : 'Tema Kontemporer' }}
                  </p>
                  <h3 class="mt-4 font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-none">{{ active.name }}</h3>
                  <p class="mt-5 max-w-md text-[0.95rem] leading-relaxed opacity-80">{{ active.description }}</p>

                  <ul class="mt-6 flex flex-wrap gap-2" aria-label="Elemen khas">
                    <li
                      v-for="k in active.keywords"
                      :key="k"
                      class="rounded-full px-3.5 py-1.5 text-xs font-medium"
                      :style="{ boxShadow: `inset 0 0 0 1px ${active.palette[1]}44` }"
                    >
                      {{ k }}
                    </li>
                  </ul>

                  <div class="mt-8 flex items-center gap-3" role="group" aria-label="Palet warna">
                    <span v-for="(c, i) in active.palette" :key="c" class="flex items-center gap-2 text-[0.65rem] uppercase tracking-widest opacity-70">
                      <span class="h-7 w-7 rounded-full" :style="{ background: c, boxShadow: `inset 0 0 0 1px ${active.palette[1]}33` }" />
                      <span class="hidden sm:inline">{{ ['Latar', 'Utama', 'Aksen'][i] }}</span>
                    </span>
                  </div>

                  <div class="mt-9 flex flex-wrap gap-3">
                    <RouterLink
                      :to="{ name: 'demo-theme', params: { id: active.id } }"
                      class="btn"
                      :style="{ background: active.palette[1], color: active.palette[0] }"
                    >
                      <Play :size="15" aria-hidden="true" />
                      Lihat Demo {{ active.name }}
                    </RouterLink>
                    <RouterLink
                      :to="{ name: 'catalog', query: { theme: active.id } }"
                      class="btn"
                      :style="{ boxShadow: `inset 0 0 0 1px ${active.palette[1]}66`, color: active.palette[1] }"
                    >
                      {{ designs.length }} desain
                      <ArrowUpRight :size="16" aria-hidden="true" />
                    </RouterLink>
                  </div>
                </div>

                <div class="relative mx-auto w-[62%] max-w-[260px] md:col-span-2 md:w-full">
                  <OrnamentArt
                    :motif="active.motif"
                    :primary="active.palette[1]"
                    :accent="active.palette[2]"
                    :paper="active.palette[0]"
                    class="absolute -left-[30%] -top-[18%] w-[90%] opacity-30"
                  />
                  <div v-if="example" class="relative rotate-3 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.45)]">
                    <InvitationMockup :template="example" />
                  </div>
                  <p class="mt-4 text-center text-[0.65rem] uppercase tracking-[0.22em] opacity-60">
                    Contoh: {{ example?.name }}
                  </p>
                </div>
              </div>
            </Transition>
          </div>
          <p v-if="active.culture" class="mt-4 text-xs leading-relaxed text-ivory/50">
            Motif pada tema ini dipilih dari satu tradisi saja, tanpa dicampur dengan budaya daerah lain.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
