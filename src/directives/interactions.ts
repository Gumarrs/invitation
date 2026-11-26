import type { Directive } from 'vue'
import { gsap, reducedMotion } from '@/lib/gsap'

type Cleanup = () => void
const cleanups = new WeakMap<HTMLElement, Cleanup>()

const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** v-magnetic="0.35" — elemen tertarik halus ke arah kursor. Hanya perangkat dengan hover. */
export const vMagnetic: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (reducedMotion() || !canHover()) return
    const strength = binding.value ?? 0.35
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    cleanups.set(el, () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      gsap.killTweensOf(el)
    })
  },
  unmounted(el) {
    cleanups.get(el)?.()
    cleanups.delete(el)
  },
}

/** v-tilt="6" — kemiringan 3D halus (derajat maksimum). */
export const vTilt: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (reducedMotion() || !canHover()) return
    const max = binding.value ?? 6
    gsap.set(el, { transformPerspective: 900 })
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      ry(px * max * 2)
      rx(-py * max * 2)
    }
    const leave = () => {
      rx(0)
      ry(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    cleanups.set(el, () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      gsap.killTweensOf(el)
    })
  },
  unmounted(el) {
    cleanups.get(el)?.()
    cleanups.delete(el)
  },
}
