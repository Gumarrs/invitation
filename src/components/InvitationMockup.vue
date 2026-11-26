<script setup lang="ts">
import { computed } from 'vue'
import type { Template } from '@/types'
import OrnamentArt from './OrnamentArt.vue'

const props = defineProps<{
  template: Pick<Template, 'palette' | 'motif' | 'mock' | 'name'>
}>()

const bg = computed(() => props.template.palette[0])
const ink = computed(() => props.template.palette[1])
const accent = computed(() => props.template.palette[2])
</script>

<template>
  <div
    class="paper-grain relative aspect-[3/4] w-full select-none overflow-hidden"
    :style="{ background: bg, color: ink, containerType: 'inline-size' }"
    role="img"
    :aria-label="`Pratinjau undangan ${template.name}: ${template.mock.title}, ${template.mock.names}, ${template.mock.date}`"
  >
    <!-- bingkai tipis -->
    <div class="absolute" :style="{ inset: '4cqw', border: `1px solid ${ink}55` }" />
    <div class="absolute" :style="{ inset: '5.6cqw', border: `1px solid ${accent}88` }" />

    <!-- ornamen besar samar di latar -->
    <OrnamentArt
      :motif="template.motif"
      :primary="ink"
      :accent="accent"
      :paper="bg"
      class="absolute -right-[14cqw] -bottom-[10cqw] w-[72cqw] opacity-[0.13]"
    />

    <!-- ornamen utama -->
    <OrnamentArt
      :motif="template.motif"
      :primary="ink"
      :accent="accent"
      :paper="bg"
      class="absolute left-1/2 w-[40cqw] -translate-x-1/2"
      :style="{ top: '11cqw' }"
    />

    <!-- teks -->
    <div class="absolute inset-x-0 flex flex-col items-center text-center" :style="{ top: '56cqw', padding: '0 12cqw' }">
      <p class="font-sans font-semibold uppercase" :style="{ fontSize: '2.7cqw', letterSpacing: '0.32em', color: accent }">
        {{ template.mock.title }}
      </p>
      <p class="font-serif font-medium" :style="{ fontSize: '9.5cqw', lineHeight: 1.02, marginTop: '3.2cqw' }">
        {{ template.mock.names }}
      </p>
      <div class="flex items-center" :style="{ gap: '2cqw', margin: '4.4cqw 0' }">
        <span :style="{ width: '10cqw', height: '1px', background: accent }" />
        <span :style="{ width: '1.6cqw', height: '1.6cqw', background: accent, transform: 'rotate(45deg)' }" />
        <span :style="{ width: '10cqw', height: '1px', background: accent }" />
      </div>
      <p class="font-sans font-medium" :style="{ fontSize: '3.6cqw', letterSpacing: '0.22em' }">
        {{ template.mock.date }}
      </p>
      <p class="font-serif italic" :style="{ fontSize: '4cqw', marginTop: '1.6cqw', opacity: 0.8 }">
        {{ template.mock.place }}
      </p>
    </div>

    <!-- tombol palsu pada undangan -->
    <div
      class="absolute left-1/2 -translate-x-1/2 font-sans font-semibold uppercase"
      :style="{
        bottom: '9cqw',
        fontSize: '2.5cqw',
        letterSpacing: '0.24em',
        padding: '2.2cqw 6cqw',
        borderRadius: '999px',
        background: ink,
        color: bg,
      }"
    >
      Buka Undangan
    </div>
  </div>
</template>
