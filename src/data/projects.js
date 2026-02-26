/**
 * Dati dei progetti.
 * Sostituisci i placeholder con i tuoi progetti reali.
 *
 * Campi:
 * - id          → chiave univoca
 * - title        → nome del progetto
 * - role         → il tuo ruolo (es. "Frontend Developer", "UI/UX + Dev")
 * - description  → breve descrizione (2-3 righe max)
 * - stack        → array di tecnologie usate
 * - liveUrl      → link al sito live (null se non disponibile)
 * - repoUrl      → link al repo GitHub (null se privato)
 * - image        → path relativo a /public/projects/ (null = placeholder)
 * - featured     → true = mostrato in evidenza
 */

export const projects = [
  {
    id: 'project-01',
    title: 'ReadIt',
    role: 'Full Stack Developer',
    description:
      'Progetto nato per incentivare i giovani a leggere di più, trasformando la lettura in un\'esperienza coinvolgente, sociale e gratificante attraverso il monitoraggio del progresso quotidiano.',
    stack: ['React', 'Tailwind CSS', 'Vite', 'Figma', "NodeJS", "Supabase"],
    liveUrl: 'https://brz-read-it.vercel.app/',
    repoUrl: 'https://github.com',
    image: null,
    featured: true,
  },
  {
    id: 'project-02',
    title: 'Snippify',
    role: 'Frontend Developer & UX/UI Designer',
    description: "Snippify è un'applicazione web che permette di creare e condividere snippet di codice in modo semplice e veloce.",
    stack: ['React', 'GSAP', 'Tailwind CSS', 'Vite', "Figma"],
    liveUrl: 'https://snippify.andreasabettaprogrammatore.com/',
    repoUrl: 'https://github.com',
    image: null,
    featured: true,
  },
  {
    id: 'project-03',
    title: 'Dashboard Analytics',
    role: 'UI/UX Designer & Frontend Developer',
    description:
      'Applicazione web per la visualizzazione di dati in tempo reale. Interfaccia modulare con grafici interattivi, filtri dinamici e un sistema di notifiche in tempo reale via WebSocket.',
    stack: ['React', 'TypeScript', 'Recharts', 'Supabase'],
    liveUrl: null,
    repoUrl: 'https://github.com',
    image: null,
    featured: false,
  },
]
