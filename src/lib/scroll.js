/**
 * Accesso condiviso all'istanza Lenis creata da <SmoothScroll />.
 * Chi deve scorrere a un'ancora usa scrollToTarget e non si preoccupa
 * di sapere se lo scroll fluido è attivo (reduced motion, test, ecc.).
 */
let lenis = null

export const setLenis = (instance) => {
  lenis = instance
}

export const getLenis = () => lenis

/* Altezza della navbar fissa: le ancore non finiscono sotto la barra */
const NAV_OFFSET = -72

export function scrollToTarget(target, { immediate = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return

  if (lenis) {
    lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.4, immediate })
    return
  }

  const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET
  window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' })
}
