<script setup lang="ts">
import TemplateCard from './TemplateCard.vue'
import type { Template } from '@/types'

withDefaults(
  defineProps<{
    templates: Template[]
    /** true = muncul berurutan saat di-scroll (beranda). false = untuk katalog yang sering berubah. */
    reveal?: boolean
    columns?: string
  }>(),
  { reveal: false, columns: 'sm:grid-cols-2 xl:grid-cols-3' },
)
</script>

<template>
  <TransitionGroup
    name="tgrid"
    tag="ul"
    class="grid grid-cols-1 gap-x-8 gap-y-14"
    :class="columns"
    :data-reveal="reveal ? 'stagger' : undefined"
  >
    <li v-for="t in templates" :key="t.id">
      <TemplateCard :template="t" />
    </li>
  </TransitionGroup>
</template>
