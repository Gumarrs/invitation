<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { ArrowLeft, Check, Eye } from 'lucide-vue-next'
import InvitationMockup from '@/components/InvitationMockup.vue'
import OrnamentArt from '@/components/OrnamentArt.vue'
import TemplateGrid from '@/components/TemplateGrid.vue'
import { templateBySlug, templates, formatRupiah } from '@/data/templates'
import { categoryMap } from '@/data/categories'
import { themeMap } from '@/data/themes'
import { usePreview } from '@/composables/usePreview'
import { useGsapContext } from '@/composables/useGsapContext'

const props = defineProps<{ slug: string }>()
const { open } = usePreview()
const root = ref<HTMLElement | null>(null)
useGsapContext(root)

const tpl = computed(() => templateBySlug(props.slug))
const category = computed(() => (tpl.value ? categoryMap[tpl.value.category] : null))
const theme = computed(() => (tpl.value ? themeMap[tpl.value.theme] : null))
const related = computed(() =>
  tpl.value
    ? templates
        .filter((t) => t.id !== tpl.value!.id && (t.theme === tpl.value!.theme || t.category === tpl.value!.category))
        .slice(0, 4)
    : [],
)

// Dialog pemesanan sederhana (demo: tanpa transaksi nyata)
const ordered = ref(false)

watchEffect(() => {
  document.title = tpl.value ? `${tpl.value.name} — Kirana Invitation` : 'Desain tidak ditemukan — Kirana Invitation'
})
</script>

<template>
  <div ref="root" class="bg-ivory pb-24 pt-28 lg:pt-32">
    <div v-if="!tpl" class="container-x py-24 text-center">
      <h1 class="font-serif text-5xl">Desain tidak ditemukan.</h1>
      <RouterLink :to="{ name: 'catalog' }" class="btn btn-solid mt-8">Kembali ke katalog</RouterLink>
    </div>

    <div v-else class="container-x">
      <RouterLink :to="{ name: 'catalog' }" class="link-underline inline-flex items-center gap-2 pb-1 text-sm font-medium">
        <ArrowLeft :size="16" aria-hidden="true" /> Katalog
      </RouterLink>

      <div class="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="relative lg:col-span-6">
          <div class="paper-grain relative grid place-items-center overflow-hidden px-[18%] py-[14%]" :style="{ background: `${tpl.palette[2]}30` }">
            <OrnamentArt :motif="tpl.motif" :primary="tpl.palette[1]" :accent="tpl.palette[2]" :paper="tpl.palette[0]" class="absolute -right-10 -top-10 w-72 opacity-20" />
            <div class="relative w-full shadow-[0_44px_70px_-28px_rgba(42,27,18,0.6)]">
              <InvitationMockup :template="tpl" />
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 lg:col-start-8 lg:pt-6">
          <p class="eyebrow">{{ category?.name }} · {{ theme?.name }}</p>
          <h1 class="display mt-4 text-[clamp(3rem,6vw,5.6rem)]">{{ tpl.name }}</h1>
          <p class="mt-3 font-serif text-2xl italic text-clay">{{ tpl.tagline }}</p>
          <span v-if="tpl.badge" class="mt-5 inline-block bg-cocoa px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ivory">{{ tpl.badge }}</span>

          <p class="mt-7 leading-relaxed text-cocoa/75">{{ tpl.description }}</p>

          <dl class="mt-8 grid grid-cols-2 gap-y-5 border-y border-cocoa/15 py-6 text-sm">
            <div><dt class="eyebrow">Kategori</dt><dd class="mt-1.5 font-medium">{{ category?.name }}</dd></div>
            <div><dt class="eyebrow">Tema</dt><dd class="mt-1.5 font-medium">{{ theme?.name }}</dd></div>
            <div class="col-span-2">
              <dt class="eyebrow">Palet warna</dt>
              <dd class="mt-2 flex gap-2">
                <span v-for="c in tpl.palette" :key="c" class="h-7 w-7 rounded-full" :style="{ background: c, boxShadow: 'inset 0 0 0 1px rgba(42,27,18,0.2)' }" :title="c" />
              </dd>
            </div>
          </dl>

          <ul class="mt-7 grid gap-3 text-sm">
            <li v-for="f in tpl.features" :key="f" class="flex items-center gap-3"><Check :size="16" class="text-gold-600" aria-hidden="true" />{{ f }}</li>
          </ul>

          <div class="mt-9 flex items-baseline gap-3">
            <span class="text-3xl font-bold">{{ formatRupiah(tpl.price) }}</span>
            <span v-if="tpl.oldPrice" class="text-clay line-through">{{ formatRupiah(tpl.oldPrice) }}</span>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <button v-magnetic="0.25" type="button" class="btn btn-solid" @click="ordered = true">Pesan Desain Ini</button>
            <button type="button" class="btn btn-ghost" @click="open(tpl)"><Eye :size="16" aria-hidden="true" />Preview Besar</button>
          </div>

          <p v-if="ordered" role="status" class="mt-5 border-l-2 border-gold-500 bg-champagne/40 px-4 py-3 text-sm">
            Terima kasih! Ini adalah demo antarmuka, sehingga pesanan belum benar-benar dikirim.
            <button type="button" class="ml-1 underline" @click="ordered = false">Tutup</button>
          </p>
        </div>
      </div>

      <div v-if="related.length" class="mt-28">
        <h2 class="font-serif text-4xl">Desain serupa</h2>
        <div class="mt-10"><TemplateGrid :templates="related" columns="sm:grid-cols-2 lg:grid-cols-4" /></div>
      </div>
    </div>
  </div>
</template>
