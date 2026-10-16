/**
 * Ritorna true se l'utente ha chiesto "Riduci movimento" nelle preferenze
 * di sistema. Va controllato prima di ogni animazione JS: il CSS si
 * azzera da solo (vedi index.css), GSAP e Lenis no.
 */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** True su dispositivi con puntatore preciso (mouse, trackpad). */
export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
