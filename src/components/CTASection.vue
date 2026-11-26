<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import OrnamentArt from './OrnamentArt.vue'
import { useGsapContext } from '@/composables/useGsapContext'

const root = ref<HTMLElement | null>(null)
useGsapContext(root)
</script>

<template>
  <section ref="root" class="paper-grain relative isolate overflow-hidden bg-champagne py-28 lg:py-44" aria-labelledby="cta-title">
    <OrnamentArt motif="floral" primary="#2A1B12" accent="#B8893C" class="pointer-events-none absolute -left-32 -top-24 -z-10 w-[480px] opacity-[0.12]" data-parallax="0.15" />
    <OrnamentArt motif="leaf" primary="#2A1B12" accent="#B8893C" class="pointer-events-none absolute -bottom-24 -right-20 -z-10 w-[520px] opacity-[0.12]" data-parallax="0.2" />
    <OrnamentArt motif="sparkle" primary="#2A1B12" accent="#B8893C" class="pointer-events-none absolute right-[14%] top-[18%] -z-10 hidden w-14 opacity-60 md:block" data-parallax="0.3" />

    <div class="container-x text-center">
      <p data-reveal class="eyebrow mb-8">Mulai Sekarang</p>
      <h2 id="cta-title" data-split class="display mx-auto max-w-5xl text-[clamp(3rem,8.4vw,8.4rem)]">
        Your Story, Beautifully Invited.
      </h2>
      <p data-reveal="0.1" class="mx-auto mt-8 max-w-lg text-lg text-cocoa/75">Mulai ciptakan undangan yang akan selalu dikenang.</p>
      <div data-reveal="0.2" class="mt-12">
        <RouterLink v-magnetic="0.35" :to="{ name: 'catalog' }" class="btn btn-solid !px-10 !py-5 text-base">
          Temukan Desain Impianmu
          <ArrowUpRight :size="19" aria-hidden="true" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>
