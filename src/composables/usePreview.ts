import { ref } from 'vue'
import type { Template } from '@/types'

// State modul (singleton): modal preview bisa dibuka dari halaman mana pun.
const current = ref<Template | null>(null)

export function usePreview() {
  return {
    current,
    open: (t: Template) => {
      current.value = t
    },
    close: () => {
      current.value = null
    },
  }
}
