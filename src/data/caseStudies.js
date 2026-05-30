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
      "Volta è una piattaforma web di prenotazione online per liberi professionisti.",
    stack: ["React", "Express", "Tailwind CSS", "shadcn/ui", "Supabase"],
    liveUrl: "https://frontend-production-0a46.up.railway.app/",
    repoUrl: "https://github.com/NicolasBrazzo/volta",
    image: null,
    featured: false,
    year: "2026",
    duration: "In sviluppo",
    client: "Progetto SAAS",
    overview:
      "Volta è un progetto nato dalla necessità di semplificare la gestione delle prenotazioni per i liberi professionisti, offrendo un'interfaccia intuitiva e funzionalità avanzate per ottimizzare il flusso di lavoro e migliorare l'esperienza dei clienti.",
    challenge:
      "Solitamente i gestionali di prenotazione sono complessi, poco user-friendly e non si adattano alle esigenze specifiche dei professionisti. L'obiettivo era creare una piattaforma facile da usare, personalizzabile e in grado di gestire efficacemente prenotazioni, pagamenti e comunicazioni con i clienti.",
    solution:
      "Ho progettato un'architettura modulare con backend in Node.js + Express e Supabase per database, autenticazione e aggiornamenti in tempo reale. Il frontend React, con Tailwind CSS e shadcn/ui, offre un flusso di prenotazione fluido e reattivo, mentre un sistema di notifiche automatiche tiene allineati professionista e cliente lungo tutto il ciclo dell'appuntamento.",
    features: [
      {
        title: "Agenda e disponibilità",
        description:
          "Calendario interattivo con gestione degli orari, dei servizi e degli slot disponibili in tempo reale.",
      },
      {
        title: "Promemoria automatici",
        description:
          "Notifiche e promemoria via email per ridurre i no-show e tenere informati i clienti su conferme e modifiche.",
      },
      {
        title: "Pagina di prenotazione personalizzabile",
        description:
          "Link pubblico brandizzabile dove i clienti prenotano in autonomia, senza necessità di registrazione.",
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
