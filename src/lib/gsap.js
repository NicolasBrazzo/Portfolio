/**
 * Punto centrale di registrazione dei plugin GSAP.
 * Importa sempre gsap e ScrollTrigger da qui, mai direttamente da 'gsap',
 * così i plugin vengono registrati una sola volta.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
