import { onBeforeUnmount, onMounted, ref } from 'vue'

/** True bila halaman sudah di-scroll melewati `threshold` px. Listener pasif + rAF. */
export function useScrolled(threshold = 40) {
  const scrolled = ref(false)
  let ticking = false

  const update = () => {
    scrolled.value = window.scrollY > threshold
    ticking = false
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

  return scrolled
}
