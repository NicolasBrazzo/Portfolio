/**
 * Punto centrale di registrazione dei plugin GSAP.
 * Importa sempre gsap, ScrollTrigger e useGSAP da qui, mai direttamente
 * dai pacchetti, così i plugin vengono registrati una sola volta.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* Curva condivisa con il CSS (--ease-out) */
export const EASE_OUT = 'expo.out'

export { gsap, ScrollTrigger, useGSAP }
