import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { initReveals } from '@/lib/reveal'

/**
 * Menjalankan `setup` di dalam gsap.context yang terikat pada `scope`.
 * Semua tween dan ScrollTrigger yang dibuat di dalamnya dibersihkan otomatis saat unmount.
 * `withReveals` (default true) sekaligus memasang atribut data-reveal / data-split / data-mask / data-parallax.
 */
export function useGsapContext(
  scope: Ref<HTMLElement | null>,
  setup?: (ctx: gsap.Context) => void,
  withReveals = true,
) {
  let ctx: gsap.Context | null = null

  onMounted(() => {
    if (!scope.value) return
    ctx = gsap.context((self) => {
      if (withReveals && scope.value) initReveals(scope.value)
      setup?.(self)
    }, scope.value)
    // Gambar dan font bisa mengubah tinggi halaman; hitung ulang posisi trigger.
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })
}
