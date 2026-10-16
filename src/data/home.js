/**
 * Testi della home. I componenti in components/sections/home leggono
 * solo da qui: per cambiare il copy non serve toccare il JSX.
 *
 * Convenzione per i titoli: { text, hand } — `hand` è la parola in
 * corsivo accento, sottolineata a matita.
 */

export const HERO = {
  corners: {
    left: ['Nicolas Brazzo', 'Frontend developer'],
    center: ['Base', 'Full stack · React / Node'],
    right: ['Portfolio', 'Edizione 2026'],
  },
  /* Tre righe del titolo: la seconda ha la parola a mano + quella a
     contorno, la terza la parola cerchiata a matita. */
  headline: {
    first: 'Costruisco',
    hand: 'interfacce',
    outline: 'vive',
    lead: 'con',
    circled: 'cura',
  },
  note: ['al pixel, e anche', 'dentro al codice'],
  intro: {
    before: 'Sono Nicolas, ',
    strong: 'frontend developer',
    after:
      " con una formazione full stack. Disegno e sviluppo interfacce in React, dal database all'ultimo dettaglio dell'interfaccia.",
  },
  ctaPrimary: 'Vedi i lavori',
  ctaSecondary: 'Scarica il CV',
}

export const MARQUEE = {
  label: 'Ambiti di lavoro',
  items: ['React', 'Interfacce', 'Node & Express', 'Design system', 'Tailwind', 'Figma', 'Motion'],
}

export const APPROACH = {
  index: '[ Approccio ]',
  before: 'Vivo nel punto in cui ',
  hand: 'il design incontra il codice.',
  after: ' Do la stessa attenzione a come una cosa appare e a come è fatta dentro.',
}

export const PROJECTS_SECTION = {
  index: '01 / Lavori',
  title: { text: 'Progetti', hand: 'scelti' },
  aside: 'Tre progetti personali progettati e sviluppati da zero, dal frontend al back-end.',
  cta: 'Apri il caso studio',
  placeholder: 'Immagine in arrivo',
  liveNote: 'Live',
  specLabels: { year: 'Anno', role: 'Ruolo', stack: 'Stack' },
}

export const SKILLS_SECTION = {
  index: '02 / Competenze',
  title: { text: 'Gli', hand: 'attrezzi' },
  aside: 'Le tecnologie con cui lavoro ogni giorno, quelle che uso con sicurezza e quelle che sto imparando.',
}

export const JOURNEY_SECTION = {
  index: '03 / Percorso',
  title: { text: 'Da autodidatta a', hand: 'developer' },
}

export const CONTACT_SECTION = {
  index: '04 / Contatti',
  headline: ['Cerchi uno', 'sviluppatore?'],
  hand: 'Parliamone.',
  intro:
    'Aperto a ruoli da developer in sede, ibridi o da remoto. Posso iniziare 30 giorni dopo il colloquio.',
  copy: 'Copia',
  copied: 'Copiata',
  socialsLabel: 'Trovami su',
  form: {
    name: { label: 'Nome', placeholder: 'Il tuo nome' },
    email: { label: 'Email', placeholder: 'La tua email' },
    message: { label: 'Messaggio', placeholder: 'Di cosa vuoi parlare?' },
    submit: 'Invia messaggio',
    sending: 'Invio in corso…',
    successTitle: 'Grazie per avermi scritto.',
    successText: 'Ho ricevuto il tuo messaggio, ti rispondo il prima possibile.',
    errorGeneric: "Qualcosa è andato storto durante l'invio. Riprova tra qualche istante.",
    errorNetwork: 'Errore di rete. Controlla la connessione e riprova.',
  },
}
