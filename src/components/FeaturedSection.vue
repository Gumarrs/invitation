<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import TemplateGrid from './TemplateGrid.vue'
import { templates } from '@/data/templates'
import { useGsapContext } from '@/composables/useGsapContext'

const root = ref<HTMLElement | null>(null)
useGsapContext(root)

// 12 desain unggulan: urut popularitas
const featured = [...templates].sort((a, b) => b.popularity - a.popularity).slice(0, 12)
</script>

<template>
  <section id="unggulan" ref="root" class="relative bg-ivory-50 py-24 lg:py-36" aria-labelledby="unggulan-title">
    <div class="container-x">
      <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p data-reveal class="eyebrow mb-6">Katalog Unggulan</p>
          <h2 id="unggulan-title" data-split class="display text-[clamp(2.6rem,5.6vw,5.2rem)]">Desain paling dicintai.</h2>
        </div>
        <RouterLink data-reveal :to="{ name: 'catalog' }" class="btn btn-ghost w-fit">
          Lihat semua {{ templates.length }} desain <ArrowUpRight :size="16" aria-hidden="true" />
        </RouterLink>
      </div>
      <div class="mt-16">
        <TemplateGrid :templates="featured" reveal columns="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
      </div>
    </div>
  </section>
</template>
