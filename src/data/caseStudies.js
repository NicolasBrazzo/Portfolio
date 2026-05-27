/**
 * Dati dei progetti.
 * Sostituisci i placeholder con i tuoi progetti reali.
 *
 * Campi base (card):
 * - id          → chiave univoca, usata come slug nell'URL /case-studies/:id
 * - title        → nome del progetto
 * - role         → il tuo ruolo (es. "Frontend Developer", "UI/UX + Dev")
 * - description  → breve descrizione (2-3 righe max)
 * - stack        → array di tecnologie usate
 * - liveUrl      → link al sito live (null se non disponibile)
 * - repoUrl      → link al repo GitHub (null se privato)
 * - image        → path relativo a /public/projects/ (null = placeholder)
 * - featured     → true = mostrato in evidenza
 *
 * Campi pagina di dettaglio:
 * - year         → anno del progetto
 * - duration     → durata stimata del progetto
 * - client       → cliente o "Personale" / "Team"
 * - overview     → testo introduttivo lungo (1-2 paragrafi)
 * - challenge    → contesto/problema affrontato
 * - solution     → approccio e soluzione adottata
 * - features     → array di feature chiave [{ title, description }]
 * - results      → array di risultati/metriche [{ value, label }]
 * - gallery      → array di immagini extra per la galleria
 */

export const caseStudies = [
  {
    id: "project-01",
    title: "ReadIt",
    role: "Full Stack Project",
    description:
      "Progetto nato per incentivare i giovani a leggere di più, trasformando la lettura in un'esperienza coinvolgente, sociale e gratificante attraverso il monitoraggio del progresso quotidiano.",
    stack: ["React", "Tailwind CSS", "Vite", "Figma", "NodeJS", "Supabase"],
    liveUrl: "https://brz-read-it.vercel.app/",
    repoUrl: "https://github.com/NicolasBrazzo/ReadIt",
    image: null,
    featured: true,
    year: "2025",
    duration: "6 settimane",
    client: "Progetto personale",
    overview:
      "ReadIt nasce dall'esigenza di riportare i giovani lettori a un rapporto continuativo con i libri, sfruttando le meccaniche della gamification. L'app permette di tracciare le sessioni di lettura, conquistare obiettivi e condividere i propri progressi con la community.",
    challenge:
      "La lettura sta perdendo terreno tra i giovani perché percepita come attività poco gratificante nel breve periodo. Serviva un prodotto in grado di restituire feedback immediato, mostrare il progresso in modo tangibile e creare un livello sociale leggero ma motivante.",
    solution:
      "Ho progettato un flusso onboarding semplice, una dashboard quotidiana con streak e statistiche di lettura e un sistema di obiettivi a step. L'autenticazione e il database in tempo reale sono gestiti con Supabase, mentre il frontend in React garantisce un'esperienza fluida anche su mobile.",
    features: [
      {
        title: "Tracking quotidiano",
        description:
          "Sessioni di lettura registrate in pochi tap, con statistiche aggregate per settimana e mese.",
      },
      {
        title: "Obiettivi & streak",
        description:
          "Sistema di micro-obiettivi che premia la costanza e mantiene alta la motivazione.",
      },
      {
        title: "Community reading",
        description:
          "Feed sociale per condividere libri in corso, recensioni e consigliare letture.",
      },
    ],
    results: [
      { value: "+40%", label: "Engagement medio giornaliero" },
      { value: "95+", label: "Score Lighthouse Performance" },
      { value: "<1.2s", label: "Time to Interactive" },
    ],
    gallery: [],
  },
  {
    id: "project-02",
    title: "Snippify",
    role: "Team Project",
    description:
      "Snippify è un'applicazione web che permette di creare e condividere snippet di codice in modo semplice e veloce.",
    stack: ["React", "GSAP", "Tailwind CSS", "Vite", "Figma"],
    liveUrl: "https://snippify.andreasabettaprogrammatore.com/",
    repoUrl: "https://github.com",
    image: null,
    featured: true,
    year: "2025",
    duration: "4 settimane",
    client: "Team project",
    overview:
      "Snippify è una piattaforma collaborativa per sviluppatori che permette di salvare, organizzare e condividere snippet di codice. Pensata per essere veloce, leggera e bella da usare ogni giorno, mette al centro il flusso di lavoro del developer.",
    challenge:
      "Gli strumenti esistenti per gestire snippet sono spesso pesanti, poco curati nell'UX o vincolati a un editor specifico. L'obiettivo era costruire un tool web universale con un'identità visiva forte e animazioni che valorizzassero l'interazione senza appesantire.",
    solution:
      "Insieme al team abbiamo definito un design system scalabile, integrato GSAP per microinterazioni fluide e organizzato la libreria di snippet con tag, ricerca e categorie. Il risultato è uno strumento immediato che valorizza la velocità di consultazione.",
    features: [
      {
        title: "Editor con syntax highlighting",
        description:
          "Supporto per i linguaggi più diffusi, formattazione automatica e copy-to-clipboard.",
      },
      {
        title: "Organizzazione smart",
        description:
          "Tag, collezioni e ricerca full-text per ritrovare lo snippet giusto in pochi secondi.",
      },
      {
        title: "Microinterazioni GSAP",
        description:
          "Animazioni curate per transizioni di pagina, hover e feedback delle azioni principali.",
      },
    ],
    results: [
      { value: "3", label: "Sviluppatori nel team" },
      { value: "60+", label: "Componenti UI riutilizzabili" },
      { value: "100%", label: "Responsive su tutti i breakpoint" },
    ],
    gallery: [],
  },
  {
    id: "project-04",
    title: "Volta",
    role: "SAAS Project",
    description:
      "Volta è una piattaforma web per la gestione e l'analisi di dati energetici.",
    stack: ["React", "Node.js", "MongoDB", "Express"],

    liveUrl: "https://nasa-neo-dashboard-brz.vercel.app/",
    repoUrl: "https://github.com/NicolasBrazzo/NASA-NEO-Dashboard",
    image: null,
    featured: false,
    year: "2026",
    duration: "In sviluppo",
    client: "Progetto SAAS",
    overview:
      "Volta è una dashboard SAAS pensata per aziende che vogliono monitorare in tempo reale i propri consumi energetici. Combina grafici interattivi, alert automatici e report esportabili per supportare decisioni data-driven.",
    challenge:
      "I dati energetici sono solitamente frammentati su più sistemi e difficili da interpretare per chi non è del settore. La sfida era costruire un'unica fonte di verità con una UI accessibile, capace di tradurre numeri complessi in insight immediati.",
    solution:
      "Ho progettato un'architettura modulare con backend in Node.js + Express e database MongoDB per gestire grandi volumi di metriche. Il frontend React rende i grafici reattivi e i pannelli configurabili, mentre un sistema di alert avvisa l'utente quando i consumi escono dalle soglie definite.",
    features: [
      {
        title: "Dashboard in tempo reale",
        description:
          "Visualizzazione live dei consumi con grafici interattivi e filtri per periodo.",
      },
      {
        title: "Alert configurabili",
        description:
          "Notifiche automatiche su soglie personalizzate per evitare picchi e sprechi.",
      },
      {
        title: "Report esportabili",
        description:
          "Export PDF e CSV per la condivisione di analisi periodiche con stakeholder.",
      },
    ],
    results: [
      { value: "TBD", label: "Pilot in onboarding" },
      { value: "5", label: "Moduli principali pianificati" },
      { value: "REST", label: "API documentate con OpenAPI" },
    ],
    gallery: [],
  },
];
