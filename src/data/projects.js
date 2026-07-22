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
    id: "project-01",
    title: "Rivista Notturna",
    role: "Frontend Developer & GSAP Animator",
    description:
      "Rivista Notturna è un progetto nato dallo studio di GSAP e delle animazioni web, con l'obiettivo di creare un'esperienza immersiva per gli utenti.",
    stack: ["React", "Tailwind CSS", "Vite", "GSAP"],
    liveUrl: "https://rivista-notturna.vercel.app/",
    repoUrl: "https://github.com/NicolasBrazzo/Rivista-Notturna",
    image: null,
    featured: true,
  },
  {
    id: "project-02",
    title: "Snippify",
    role: "Frontend Developer & UX/UI Designer",
    description:
      "Snippify è un'applicazione web che permette di creare e condividere snippet di codice in modo semplice e veloce.",
    stack: ["React", "GSAP", "Tailwind CSS", "Vite", "Figma"],
    liveUrl: "https://snippify.andreasabettaprogrammatore.com/",
    repoUrl: null,
    image: null,
    featured: true,
  },
  {
    id: "project-03",
    title: "NASA NEO Dashboard",
    role: "Full stack Project",
    description:
      "Dashboard per la visualizzazione di dati relativi a oggetti celesti vicini alla Terra (Near-Earth Objects).",
    stack: ["Next.js", "Recharts", "Python", "FastAPI"],
    liveUrl: "https://nasa-neo-dashboard-brz.vercel.app/",
    repoUrl: "https://github.com/NicolasBrazzo/NASA-NEO-Dashboard",
    image: null,
    featured: false,
  }
];
