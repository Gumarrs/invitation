import { gsap, reducedMotion } from './gsap'

const EASE = 'power3.out'

/** Pecah teks menjadi kata-kata yang masing-masing "tertutup" masker agar bisa naik satu per satu. */
function splitWords(el: HTMLElement): HTMLElement[] {
  const text = (el.textContent ?? '').trim()
  el.setAttribute('aria-label', text)
  el.textContent = ''
  const inners: HTMLElement[] = []
  text.split(/\s+/).forEach((word, i, arr) => {
    const wrap = document.createElement('span')
    wrap.setAttribute('aria-hidden', 'true')
    wrap.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.12em;margin-bottom:-0.12em'
    const inner = document.createElement('span')
    inner.style.cssText = 'display:inline-block;will-change:transform'
    inner.textContent = word
    wrap.appendChild(inner)
    el.appendChild(wrap)
    if (i < arr.length - 1) el.appendChild(document.createTextNode(' '))
    inners.push(inner)
  })
  return inners
}

/**
 * Pasang semua reveal berbasis atribut di dalam `scope`.
 * Harus dipanggil di dalam gsap.context supaya ScrollTrigger ikut dibersihkan.
 *
 *  [data-split]               teks naik per kata
 *  [data-reveal]              fade + naik (nilai atribut = delay dalam detik)
 *  [data-reveal="stagger"]    anak-anak langsung muncul berurutan
 *  [data-mask]                gambar terbuka dengan clip-path
 *  [data-parallax="0.2"]      bergeser vertikal mengikuti scroll (fraksi tinggi viewport)
 */
export function initReveals(scope: HTMLElement) {
  if (reducedMotion()) return

  scope.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const inners = splitWords(el)
    el.style.visibility = 'visible'
    gsap.fromTo(
      inners,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )
  })

  scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const mode = el.dataset.reveal
    const targets = mode === 'stagger' ? Array.from(el.children) : [el]
    el.style.visibility = 'visible'
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 36 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: EASE,
        stagger: mode === 'stagger' ? 0.1 : 0,
        delay: mode && mode !== 'stagger' ? Number(mode) || 0 : 0,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      },
    )
  })

  scope.querySelectorAll<HTMLElement>('[data-mask]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.3,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )
    const inner = el.firstElementChild as HTMLElement | null
    if (inner) {
      gsap.fromTo(
        inner,
        { scale: 1.25 },
        {
          scale: 1,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      )
    }
  })

  scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.15
    const dist = window.innerHeight * speed
    gsap.fromTo(
      el,
      { y: -dist },
      {
        y: dist,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    )
  })
}
