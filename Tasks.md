# Portfolio – Tasks

Checklist completa in ordine di esecuzione. Completare ogni fase prima di passare alla successiva.

---

## Fase 1 – Foundation (token, font, texture)

- [x] **1.1 – Palette aggiornata**
  Sostituire i colori attuali in `src/index.css` (`@theme` + `:root`) con la nuova palette:
  - `--color-bg`: `#0D0D0D` (nero profondo)
  - `--color-surface`: `#161616` (card/surface)
  - `--color-surface-raised`: `#1E1E1E` (hover/raised)
  - `--color-text`: `#F2F2F0`
  - `--color-muted`: `#7A7A7A`
  - `--color-accent`: `#FF5C00` (arancione vivo)
  - `--color-accent-warm`: `#FF8C42` (variante calda)
  - `--color-accent-glow`: `rgba(255, 92, 0, 0.25)` (glow/blur)
  Registrare i colori anche in `@theme` per averli come utility Tailwind.

- [x] **1.2 – Self-host Satoshi**
  - Scaricare i file `.woff2` di Satoshi (variable font se disponibile) da [Fontshare](https://www.fontshare.com/fonts/satoshi).
  - Creare la cartella `public/fonts/`.
  - Copiare i `.woff2` in `public/fonts/`.
  - Aggiungere `@font-face` in `src/index.css` con `font-display: swap`.

- [x] **1.3 – Self-host Instrument Serif**
  - Scaricare i file `.woff2` di Instrument Serif (regular + italic) da [Google Fonts](https://fonts.google.com/specimen/Instrument+Serif) o tramite `fontsource`.
  - Copiare in `public/fonts/`.
  - Aggiungere `@font-face` in `src/index.css`.

- [x] **1.4 – Token tipografici**
  Aggiornare `:root` in `src/index.css`:
  ```css
  --font-sans: "Satoshi", system-ui, sans-serif;
  --font-serif: "Instrument Serif", Georgia, serif;
  ```
  Aggiornare `body` a `font-family: var(--font-sans)`.
  Eliminare i vecchi token `--font-display`, `--font-mono`.

- [x] **1.5 – Noise asset**
  - Copiare il file noise da
    `C:\Users\Acer\.cursor\projects\...\assets\Noise-*.png`
    in `public/noise.png`.
  - Aggiungere utility in `@layer utilities`:
    ```css
    .u-noise::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url('/noise.png') repeat;
      opacity: 0.05;
      mix-blend-mode: overlay;
      pointer-events: none;
      z-index: 1;
    }
    ```

- [x] **1.6 – Utility aggiuntive** (`@layer utilities` in `src/index.css`)
  - `.u-surface` → `background-color: var(--color-surface)`
  - `.u-glow-accent` → `box-shadow: 0 0 32px var(--color-accent-glow)`
  - `.u-border-subtle` → `border: 1px solid rgba(255,255,255,0.07)`
  - `.u-text-accent` → `color: var(--color-accent)`

---

## Fase 2 – Struttura single-page + Navbar

- [x] **2.1 – Semplificare `src/App.jsx`**
  Rimuovere React Router (non necessario per single-page).
  `App` renderizza: `<Navbar />` + le sezioni in sequenza nell'ordine:
  `Hero` → `Projects` → `Skills` → `About` → `Contact`

- [x] **2.2 – Creare `src/components/ui/Container.jsx`**
  Wrapper con `max-width: var(--container-max)`, padding orizzontale `var(--section-padding-x)`, centrato.

- [x] **2.3 – Creare `src/components/ui/Section.jsx`**
  Wrapper di sezione: `<section id={id} className="relative overflow-hidden ...">`.
  Prop `noise` (boolean) → aggiunge `.u-noise`.
  Prop `id` → per gli anchor della navbar.

- [x] **2.4 – Creare `src/components/Navbar.jsx`**
  - Sticky top, sfondo `var(--color-bg)` con `backdrop-blur-sm` su scroll.
  - Link anchor: `#hero`, `#projects`, `#skills`, `#about`, `#contact`.
  - Logo/nome a sinistra (Satoshi bold), link a destra.
  - Hamburger menu (mobile).
  - Indicatore attivo (highlight arancione).

- [x] **2.5 – Creare placeholder sezioni**
  Creare i file vuoti con markup minimo (id + titolo) in `src/sections/`:
  `Hero.jsx`, `Projects.jsx`, `Skills.jsx`, `About.jsx`, `Contact.jsx`

- [x] **2.6 – Helper reduced-motion**
  Creare `src/lib/motion.js`:
  ```js
  export const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ```

- [x] **2.7 – Registrazione GSAP plugins**
  Creare `src/lib/gsap.js`:
  ```js
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)
  export { gsap, ScrollTrigger }
  ```

---

## Fase 3 – Dati (separazione contenuto/UI)

- [x] **3.1 – `src/data/projects.js`**
  Array di oggetti: `{ id, title, role, stack[], description, liveUrl, repoUrl, image }`.
  Inserire almeno 3 progetti reali (o placeholder da rimpiazzare).

- [x] **3.2 – `src/data/skills.js`**
  Array di oggetti: `{ name, category, percent }`.
  Categorie: `'frontend'`, `'design'`, `'tools'`.

---

## Fase 4 – Hero

- [x] **4.1 – Layout Hero**
  - Full-viewport (`min-h-screen`), flex column centrato.
  - Headline oversize: 2 righe, Satoshi ExtraBold.
    1 parola/frase in Instrument Serif italico + colore arancio.
  - Sottotitolo (Satoshi regular, `--color-muted`).
  - CTA primaria: pulsante con border arancio + glow su hover.
  - Badge/pill "disponibile" in alto a sinistra (come nella moodboard).
  - Elemento visivo destra: foto personale o mockup con overlay scuro + glow arancio sui bordi.
  - Noise overlay attivo su questa sezione.

- [x] **4.2 – Animazioni GSAP Hero**
  - On mount: reveal badge → headline (stagger per parola) → sottotitolo → CTA.
  - Fallback: se `prefersReducedMotion()` → nessuna animazione, elementi subito visibili.

- [x] **4.3 – CTA pulsante (componente `src/components/ui/Button.jsx`)**
  Varianti: `primary` (arancio solid), `outline` (border arancio, bg trasparente).

---

## Fase 5 – Projects

- [x] **5.1 – Layout Projects**
  - Titolo sezione con `SectionTitle` (componente creato qui sotto).
  - Grid responsive: 1 col mobile → 2 col tablet → 3 col desktop.
  - Noise OFF su questa sezione (superfici card già texture).

- [x] **5.2 – `src/components/ui/ProjectCard.jsx`**
  - `u-surface` + `u-border-subtle` + `u-glow-accent` su hover.
  - Immagine top (aspect-ratio 16/9).
  - Stack badges (Satoshi medium, uppercase, tracking).
  - Titolo, ruolo, descrizione breve.
  - Link live + repo con icone.

- [x] **5.3 – `src/components/ui/SectionTitle.jsx`**
  - Numero sezione (es. `01`, `02`) in arancio, piccolo, mono tracking wide.
  - Titolo grande Satoshi bold.
  - Sottotitolo opzionale.

- [x] **5.4 – Scroll reveal Projects (GSAP ScrollTrigger)**
  Card rivelate in stagger all'entrata nel viewport.

---

## Fase 6 – Skills

- [x] **6.1 – Layout Skills**
  - Noise ON.
  - Divisi per categoria.
  - Titolo sezione con `SectionTitle`.

- [x] **6.2 – `src/components/ui/SkillBar.jsx`**
  - Nome skill + percentuale numerica.
  - Barra orizzontale (fill arancio) con animazione on-enter.
  - Count-up della percentuale (GSAP `gsap.to` con `snap: 1`).

- [x] **6.3 – Animazione Skills (GSAP ScrollTrigger)**
  Fill barra + count-up attivati al 60% di entrata nel viewport.

---

## Fase 7 – About

- [x] **7.1 – Layout About**
  - 2 colonne su desktop (testo + timeline), 1 colonna mobile.
  - Noise OFF.

- [x] **7.2 – Testo + intro**
  Chi sei, cosa fai, approccio (design system, motion, performance).
  Evidenziare 2–3 parole chiave con Instrument Serif italico + arancio.

- [x] **7.3 – `src/components/ui/Timeline.jsx`**
  - Lista verticale (3–5 step): anno, titolo, descrizione.
  - Dot arancio + line verticale come connettore.
  - Reveal stagger on scroll.

---

## Fase 8 – Contact

- [x] **8.1 – Layout Contact**
  - Noise ON.
  - Headline grande ("Parliamo." / "Let's work together.").
  - CTA `mailto:` con `Button` primario.
  - Link social (GitHub, LinkedIn, ecc.) con icone.
  - Indicazione disponibilità (es. "Aperto a nuovi progetti – 2025").

- [x] **8.2 – Footer**
  - Copyright + link social ripetuti.
  - Firma (Satoshi, piccolo, `--color-muted`).

---

## Fase 9 – Rifiniture e qualità

- [x] **9.1 – Hover/focus-visible**
  Controllare ogni elemento interattivo: focus ring visibile, hover fluido.

- [x] **9.2 – Responsive check** (mobile, tablet, desktop)
  Tutte le sezioni navigabili e leggibili su ogni breakpoint.

- [x] **9.3 – Meta SEO base (`index.html`)**
  - `<title>`, `<meta name="description">`, OpenGraph tag.
  - Lang attributo corretto.

- [x] **9.4 – Performance**
  - Immagini in WebP/AVIF.
  - Lazy loading nelle card progetti.
  - Controllare nessun GSAP leak (cleanup in `useEffect` return).

- [x] **9.5 – `src/index.css` pulizia finale**
  Rimuovere variabili/regole obsolete del vecchio progetto.
