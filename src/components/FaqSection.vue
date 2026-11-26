<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import { faqs } from '@/data/faqs'
import { useGsapContext } from '@/composables/useGsapContext'

const root = ref<HTMLElement | null>(null)
useGsapContext(root)

const openId = ref<string | null>(faqs[0].id)
const toggle = (id: string) => (openId.value = openId.value === id ? null : id)
</script>

<template>
  <section id="faq" ref="root" class="relative bg-ivory py-24 lg:py-36" aria-labelledby="faq-title">
    <div class="container-x grid gap-14 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <div class="lg:sticky lg:top-32">
          <p data-reveal class="eyebrow mb-6">FAQ</p>
          <h2 id="faq-title" data-split class="display text-[clamp(2.4rem,4.6vw,4.2rem)]">Pertanyaan yang sering ditanyakan.</h2>
          <p data-reveal="0.1" class="mt-6 max-w-xs text-sm leading-relaxed text-cocoa/65">
            Tidak menemukan jawabannya? Hubungi kami lewat kontak di bagian bawah halaman.
          </p>
        </div>
      </div>

      <div data-reveal class="lg:col-span-7 lg:col-start-6">
        <dl class="border-b border-cocoa/15">
          <div v-for="f in faqs" :key="f.id" class="border-t border-cocoa/15">
            <dt>
              <button
                type="button"
                class="flex w-full items-center justify-between gap-6 py-6 text-left"
                :aria-expanded="openId === f.id"
                :aria-controls="`faq-${f.id}`"
                @click="toggle(f.id)"
              >
                <span class="font-serif text-2xl leading-snug sm:text-[1.7rem]">{{ f.q }}</span>
                <span
                  class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cocoa/25 transition-transform duration-500 ease-silk"
                  :class="openId === f.id ? 'rotate-45 bg-cocoa text-ivory' : ''"
                  aria-hidden="true"
                >
                  <Plus :size="16" />
                </span>
              </button>
            </dt>
            <dd
              :id="`faq-${f.id}`"
              role="region"
              class="grid transition-[grid-template-rows] duration-500 ease-silk"
              :class="openId === f.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden">
                <p class="max-w-xl pb-7 text-[0.95rem] leading-relaxed text-cocoa/70">{{ f.a }}</p>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
