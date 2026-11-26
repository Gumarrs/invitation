import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Satu titik registrasi plugin supaya tidak terdaftar berulang di tiap komponen.
gsap.registerPlugin(ScrollTrigger)

// Mengurangi pekerjaan layout saat scroll di perangkat mobile.
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
