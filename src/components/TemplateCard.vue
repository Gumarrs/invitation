<script setup lang="ts">
import { computed } from 'vue'
import { Eye, ArrowUpRight } from 'lucide-vue-next'
import InvitationMockup from './InvitationMockup.vue'
import { categoryMap } from '@/data/categories'
import { themeMap } from '@/data/themes'
import { formatRupiah } from '@/data/templates'
import { usePreview } from '@/composables/usePreview'
import type { Template } from '@/types'

const props = defineProps<{ template: Template }>()
const { open } = usePreview()

const category = computed(() => categoryMap[props.template.category])
const theme = computed(() => themeMap[props.template.theme])

const badgeClass: Record<string, string> = {
  Popular: 'bg-gold-400 text-cocoa',
  New: 'bg-cocoa text-ivory',
  'Best Seller': 'bg-rose-dust text-cocoa',
}
</script>

<template>
  <article class="group flex h-full flex-col">
    <div
      class="relative overflow-hidden px-[14%] pb-[14%] pt-[12%] transition-colors duration-700"
      :style="{ background: `${template.palette[2]}26` }"
    >
      <span
        v-if="template.badge"
        class="absolute left-3 top-3 z-10 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em]"
        :class="badgeClass[template.badge]"
      >
        {{ template.badge }}
      </span>

      <button
        type="button"
        class="block w-full text-left"
        :aria-label="`Pratinjau cepat ${template.name}`"
        @click="open(template)"
      >
        <div v-tilt="4">
          <div class="shadow-[0_26px_40px_-18px_rgba(42,27,18,0.45)] transition-transform duration-700 ease-silk group-hover:scale-[1.04]">
            <InvitationMockup :template="template" />
          </div>
        </div>
      </button>
    </div>

    <div class="flex flex-1 flex-col pt-5">
      <p class="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-clay">
        {{ category.name }} · {{ theme.name }}
      </p>
      <h3 class="mt-2 font-serif text-[1.7rem] font-medium leading-tight">
        <RouterLink :to="{ name: 'template', params: { slug: template.slug } }" class="link-underline">
          {{ template.name }}
        </RouterLink>
      </h3>
      <p class="mt-1.5 text-sm leading-snug text-cocoa/65">{{ template.tagline }}</p>

      <div class="mt-4 flex items-baseline gap-2.5">
        <span class="font-sans text-base font-bold">{{ formatRupiah(template.price) }}</span>
        <span v-if="template.oldPrice" class="text-sm text-clay line-through">{{ formatRupiah(template.oldPrice) }}</span>
      </div>

      <div class="mt-auto flex gap-2.5 pt-5">
        <button type="button" class="btn btn-ghost flex-1 !gap-1.5 !px-4 !py-2.5 !text-[0.8rem]" @click="open(template)">
          <Eye :size="15" aria-hidden="true" />
          Preview
        </button>
        <RouterLink
          :to="{ name: 'template', params: { slug: template.slug } }"
          class="btn btn-solid flex-1 !gap-1.5 !px-4 !py-2.5 !text-[0.8rem]"
        >
          Detail
          <ArrowUpRight :size="15" aria-hidden="true" />
        </RouterLink>
      </div>
    </div>
  </article>
</template>
