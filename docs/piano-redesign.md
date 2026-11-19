# Piano del redesign, sezione per sezione

Mappa di lavoro per portare il sito al nuovo design. Ogni sezione qui sotto è
una sezione del sito: quando arriva "sistema la sezione X", si apre quella e si
tocca solo ciò che elenca.

## Fonti

| Cosa | Dove |
|---|---|
| Regole del design system | `design-system/README.md` |
| Token | `design-system/tokens.json` → blocco `@theme` in `src/index.css` |
| Prototipo | `design-system/prototype/Main.dc.html` (copia del canvas; i numeri di riga qui sotto si riferiscono a questo file) |
| README dei componenti DS | nell'artifact del design system, `project/components/<Nome>/README.md` |

## Regole che valgono ovunque

- Solo token, tramite le variabili del tema: mai hex, px o font scritti a mano.
  Un valore che manca nei token si aggiunge prima al design system.
- Niente emoji, niente numerazioni decorative (`01 /`, `P—01`, `Foto 01`),
  figure ASCII mai incorniciate.
- Titoli in maiuscola solo a inizio frase. Copy nei file di `src/data/`, non nel JSX.
- Spaziatura: solo `1 2 3 4 5 6 8 10 14 18 24 36` della scala Tailwind.
- Contrasto 4,5:1, focus visibile, aree cliccabili da almeno 44px,
  `prefers-reduced-motion` rispettato.
- Una sezione è finita quando: build e lint passano, nessuna classe del vecchio
  tema (`void`, `fg`, `fg-2`, `fg-3`, `accent` come colore di marca, `live`,
  `font-display`, `font-hand`, `u-hand`, `u-outline`, `text-micro`,
  `text-hero`, `text-quote`, `gap-13`, `gap-21`, `gap-34`, `py-144`…) resta nei
  file della sezione, e la sezione è stata guardata a 1440px e a 390px.

## Stato

| Sezione | Stato |
|---|---|
| 0. Fondamenta | tema fatto; primitivi, motore ASCII e hook da fare |
| 1. Cornice e sfondo | da fare |
| 2. Navbar | da fare |
| 3. Hero | da fare |
| 4. Claim | da fare |
| 5. Progetti | da fare |
| 6. Stack | da fare |
| 7. Chi sono | da fare |
| 8. Contatti | da fare |
| 9. Footer | da fare |
| 10. Pagina progetto | da disegnare prima nel canvas |
| 11. Progetto non trovato | da disegnare insieme alla 10 |

Ordine della pagina nel prototipo: Hero, Claim, Progetti, Stack, Chi sono,
Contatti, Footer. Escono dalla home: `HomeMarquee` e `Approach` (il claim li
sostituisce).

---

## 0. Fondamenta

Pezzi condivisi che le sezioni usano. Si costruiscono quando serve la prima
sezione che li chiede, non tutti in anticipo.

**Fatto**
- Tema: `src/index.css` (`@theme static` dai token, variabili shadcn rimappate),
  `src/styles/tokens.css` (solo misure di struttura), `src/styles/fonts.css`
  (Inter Tight, JetBrains Mono).

**shadcn/ui** (da installare alla prima sezione con un pulsante)
- `components.json` scritto a mano: `style: new-york`, `tsx: false`,
  `cssVariables: true`, css `src/index.css`. Niente `shadcn init`: riscrive
  `index.css`.
- Alias `@/` in `vite.config.js` e `jsconfig.json`.
- Dipendenze: `class-variance-authority`, `clsx`, `tailwind-merge`,
  `tw-animate-css`, `radix-ui`.
- `src/lib/cx.js` → `src/lib/utils.js` con `cn()`; `extendTailwindMerge` con i
  font-size custom (`display-xl`, `display-backdrop`, `display`, `numeral`,
  `title`, `name`, `claim`, `heading`, `list`, `body-lg`, `body`, `ui`,
  `mono-display`, `meta`, `label`), altrimenti `cn()` li scambia per colori.
- `<html class="dark">` in `index.html`.
- Componenti da aggiungere: `button`, `input`, `textarea`, `label`.

**Primitivi** (`src/components/ui/`, sostituiscono gli omonimi vecchi)

| Primitivo | DS | Prototipo (CSS) | Note |
|---|---|---|---|
| `Button` | Button | righe 69–79 | shadcn riscritto: varianti `primary` (gradiente `button-top`→`button-bottom`, `shadow-button`) e `ghost`; 48px, `rounded-md`, `text-ui`; non a pillola. Sparisce l'effetto magnetico. |
| `ArrowLink` | ArrowLink | 118–121, 251–254 | varianti `in` (label, `ArrowRight`) e `out` (sans 600, `ArrowUpRight` in lavender). |
| `Label`, `Tag` | Label | 144–145, 187–189 | `u-label` in `ink-muted`; `tone="on"` in `lavender-text`; `Tag` su fondo `lavender`. |
| `BackdropTitle` | BackdropTitle | 82–90, 46–51, 230–235 | `variant`: `back` / `front` / `accent`; sempre `h1`/`h2`. |
| `MediaFrame`, `PhotoSlot` | ProjectRow, Chapter | 97–108, 200–206 | filo di luce sul bordo alto, hover `-translate-y-1` + `shadow-frame-hover`. |
| `GlassPanel` | ContactForm | 255–258 | unico uso del vetro. |
| `CopyChip` | CopyChip | 245–249 | stato "Copiata" per 1,8s. |
| `Spark`, `StatusDot` | — | 65, 233, 239 | `animate-pulse-spark`; `available` solo nei contatti. |
| `Ruler` | Ruler | 207–210 | avanzamento della storia. |

Da eliminare quando nessuna sezione li usa più: `pencil/*`, `Crosshair`,
`Marquee`, `LiveDot`, `Stat`, `SpecList`, `SkillColumn`, `JourneyRuler`,
`SectionHeader`, `useMagnetic`.

**Utility da scrivere** (in `src/index.css`, `@layer utilities`)
- `text-grad-front`, `text-grad-backdrop` (con `animate-sweep`),
  `text-grad-accent`, `text-grad-numeral`, `text-grad-ai`, `edge-light`,
  `bg-nebula`, `bg-beam`, `bg-halo`.
- Bloccate: i gradienti usano hex fuori dai token (`#b9bed2`, `#a6abbe`,
  `#d9dcff` e altri in `bundle.css`). Vanno prima promossi a token.

**Motore ASCII** (`src/lib/ascii/`, JS puro) e componente `AsciiFigure`
- Sorgente nel prototipo: `_run()` da riga 603. Pezzi: `ramp` 609, `mk` 626,
  icone disegnate 650–742, `size` 743, `glyphs` 751, `build` 766,
  `frame` 918, `rotate` 986, `relayout` 1005.
- File: `ramps.js` (rampe di caratteri e colori dai token `ascii-*`, `code-*`,
  `human-*`, `backdrop-*`), `glyphs.js` (atlante con `drawImage`),
  `sample.js` (silhouette → griglia).
- `AsciiFigure` props: `src`, `ramp`, `step`, `mode` (`interactive` |
  `static`), `label` (se c'è: `role="img"`, altrimenti `aria-hidden`).
  Si ferma fuori schermo; con reduced motion compare già composta.

**Hook** (`src/hooks/`)
- `useFitText` (titoli al 98,5% della larghezza, prototipo 894),
  `useParallax` (max 18px, 906), `useDecodeText` (1128), `useCopy`,
  `useStoryScroll` (1034–1096, con GSAP ScrollTrigger già nel repo).

**Asset da scaricare dal canvas** in `src/assets/ascii/`

| Uso | Blob |
|---|---|
| Ritratto hero | `8be26ff574d07a0a4f4d8b4830b1cc2f` |
| Mano robot (sinistra) | `02a6baa27a17b8ac290c3ea7c637eb25` |
| Mano umana (destra) | `50d1fbea975b6fa81f15a11ee09e53d5` |
| Cavallo | `ed5c69689055418c16b3f83c03d0c58c` |

Gli screenshot di ReadIt e Volta sono già in `src/assets/`.

---

## 1. Cornice e sfondo

**Prototipo**: markup 312–313 (`pf-bg`, `pf-beam`), CSS 21–22, script
`sizeBg` 851.

**File**
- `src/components/layout/PageShell.jsx`: resta, cambia lo sfondo.
- `src/components/layout/BackgroundGrid.jsx` → `BackgroundLight.jsx`: campo
  ASCII di sfondo (passo 13px, rampa principale, decorativo) + fascio `beam` +
  `nebula` in alto a sinistra.
- `src/components/layout/SmoothScroll.jsx`: resta com'è.

**Note**: la luce sono radial-gradient morbidi, mai bordi netti; niente
gradienti come fondo di sezione.

---

## 2. Navbar

**Prototipo**: non c'è. Si adatta la navbar esistente alle regole del DS.

**File**
- `src/components/layout/Navbar.jsx`
- `src/constants/site.js` (`NAV_LINKS`, `NAV_COPY`)

**Cosa cambia**
- Logo "NB." → nome in Inter Tight 600 (`text-name` ridotto o `text-ui`
  600), colore `ink`, niente punto colorato.
- Voci: via il campo `index` da `NAV_LINKS`. Stile `u-label` in `ink-muted`,
  attiva in `ink` con sottolineatura `lavender-text`.
- Id delle ancore allineati al prototipo: `progetti`, `stack`, `chi-sono`,
  `contatti` (oggi `lavori`, `competenze`, `percorso`, `contatti`).
- Fondo `bg-ground/70` + blur, bordo inferiore `border-line`.
- Menu mobile: voci in `text-title` con `text-grad-front`, area da 44px;
  hamburger con icone Lucide `Menu` / `X` e `aria-label`.
- `cx` → `cn`.

**Decisioni aperte**
- Il puntino "Disponibile": il DS ammette `available` una sola volta, nei
  contatti. Toglierlo dalla navbar oppure estendere la regola nel DS.
- Nessun pulsante primario in navbar (uno per vista, c'è già nella hero).

---

## 3. Hero

**Prototipo**: markup 314–327, CSS 25–51 e media query 274–300; script
icone 650–742, `rotate` 986, portrait in `mk` 626, `fitTitle` 894.

**File**
- `src/components/sections/home/Hero.jsx` (riscritto da zero).
- Nuovi: `HeroPortrait.jsx`, `HeroSatellites.jsx` in
  `src/components/sections/home/hero/`.
- `src/data/home.js`: `HERO` diventa `{ name, role, roleAccent, title,
  satellites: [...] }`.

**Contenuto**
- "Nicolas Brazzo" (`text-name`), "Web Developer · **Frontend**" (accento in
  `lavender-pale`, punto `nb-dot`).
- Ritratto ASCII interattivo (reagisce al mouse, si compone all'arrivo).
- Sei card satellite con icone ASCII che si scambiano una alla volta ogni 2,4s;
  etichette: Codice, Sviluppo, Ricerca, Design, Web, Mobile, Interazione,
  Terminale, Database.
- Titolo "Portfolio" in `text-display-xl`, adattato con `useFitText`.

**DS**: AsciiFigure, BackdropTitle (`front`).

**Decisioni aperte**
- Le card satellite mostrano "01", "02"… accanto all'etichetta: è
  numerazione decorativa, si toglie.
- Le card satellite hanno un contenitore (`pf-card`): verificare che non sia
  una cornice intorno alla figura ASCII, vietata dal DS.
- Escono dalla hero: angoli, titolo a tre righe con matita, intro, "Scarica il
  CV". Il CV va spostato altrove (contatti?) o tolto.

---

## 4. Claim

Sostituisce `HomeMarquee` e `Approach`.

**Prototipo**: markup 328–339, CSS 52–79; script `revealHands` 1097.

**File**
- Nuovo: `src/components/sections/home/Claim.jsx` (+ `HandsStage.jsx`).
- Da togliere: `HomeMarquee.jsx`, `Approach.jsx`, `MARQUEE` e `APPROACH` in
  `home.js`; `Home.jsx` aggiornato.
- `home.js`: nuovo `CLAIM = { text, ctaPrimary, ctaSecondary }`.

**Contenuto**
- "Partendo dal design realizzo siti web e applicazioni fatte per durare nel
  tempo" in `text-claim`, centrato e bilanciato.
- Mano robot (rampa `code`) a sinistra, mano umana (rampa `human`) a destra,
  `Spark` tra le dita; si rivelano entrando nella vista.
- CTA: "Conosciamoci" primario con `ArrowUpRight` → `#chi-sono`; "Vedi i
  progetti" ghost → `#progetti`.

**DS**: AsciiFigure, Button, Spark.

---

## 5. Progetti

**Prototipo**: markup 340–379, CSS 80–121; parallasse 906.

**File**
- `src/components/sections/home/Projects.jsx`
- `src/components/ui/ProjectRow.jsx` (riscritto sul DS)
- `src/data/home.js` (`PROJECTS_SECTION`), `src/data/projects.js`

**Contenuto**
- Titolo "Progetti selezionati" in `BackdropTitle back`, fit al 98,5%,
  parallasse.
- Lead: "Tre progetti personali progettati e sviluppati da zero, dal frontend
  al back-end."
- Tre righe: ReadIt (Lettura, 2025), HUB (Dashboard, 2026, anteprima in
  arrivo), Volta (Prenotazioni, 2026). Descrizioni e stack come nel prototipo.
- Immagine a sinistra 1,15 : 1, testo a destra; righe separate da
  `border-line`; hover della riga alza la cornice e ingrandisce l'immagine del
  2,5%. Sotto 860px l'immagine va sopra.
- Metadati solo Anno e Stack, valori separati da `·`.
- Link "Apri il caso studio" → `/projects/:id`.

**Dati**: in `projects.js` servono `category` (al posto di `tag`) e
`year`; il campo `role` esce dalla card. ReadIt, HUB e Volta ci sono già.

**DS**: ProjectRow, MediaFrame, BackdropTitle, ArrowLink, Label.

**Decisioni aperte**
- Il prototipo e il README di ProjectRow usano il codice `P—01`; il README
  principale vieta le numerazioni decorative. Proposta: solo la categoria.

---

## 6. Stack

Sostituisce `Skills`.

**Prototipo**: markup 380–415, CSS 122–162; cavallo in `mk` 640,
`revealHorse` 1155, `decode` 1128.

**File**
- `src/components/sections/home/Skills.jsx` → `Stack.jsx`
- `src/components/ui/SkillColumn.jsx` → `ToolTier.jsx`; nuovo `AiTools.jsx`
- `src/data/skills.js`, `SKILLS_SECTION` in `home.js`

**Contenuto**
- Titolo "Stack di sviluppo" in `BackdropTitle back` (secondo di fila: il DS
  ne ammette al massimo due consecutivi).
- Cavallo ASCII (rampa `backdrop`, passo 4) dietro il testo; dove passa sotto
  le parole, opacità 30–40% e `text-shadow` sul `ground`.
- Lead: "Le tecnologie con cui lavoro ogni giorno, quelle che uso con sicurezza
  e quelle che sto imparando."
- Tre livelli separati da `border-line`, nomi in `text-list` separati da `/`
  in `separator`: Uso ogni giorno (`ink-bright`), Con sicurezza, Sto imparando
  (sottolineatura tratteggiata lavanda).
- Colonna "Strumenti AI": Claude, ChatGPT, Lovable, Gemini in
  `text-mono-display` con `text-grad-ai`, decodifica ASCII all'arrivo;
  `aria-label` con i nomi veri sulla lista.

**DS**: ToolList, AsciiFigure, BackdropTitle, Label.

**Decisioni aperte**
- I grigi del secondo e terzo livello (`#b6bbcf`, `#8e94ab`) non sono token:
  usare `ink-soft` e `ink-muted`, oppure aggiungerli al DS.

---

## 7. Chi sono

Sostituisce `Journey`.

**Prototipo**: markup 416–487, CSS 168–222 (mobile 211–222); script
`storyLayout` 1034, `storyTick` 1053.

**File**
- `src/components/sections/home/Journey.jsx` → `Story.jsx`
- Nuovi: `StoryRoad.jsx` (SVG 3820×620), `Chapter.jsx`
- `src/components/ui/JourneyRuler.jsx` → `Ruler.jsx`
- `src/data/journey.js` (riscritto: intro + capitoli con anno, tag, titolo,
  testo o numero, posizione)

**Contenuto**
- Intro: "Chi sono" in `text-display` con `text-grad-front`, due paragrafi,
  suggerimento "Scorri".
- Sette capitoli sulla strada: Primi passi (2022), Il lavoro sbagliato (2023,
  Imprevisto), Il secondo turno (2023–24, numero "3–4h di studio ogni sera"),
  Cambio strada (2024, Svolta), Il prezzo della scelta (2024–25, Imprevisto,
  tre voci con icona), ITS e frontend (2025–oggi), Un team dove crescere
  (prossima tappa, CTA "Conosciamoci" → `#contatti`).
- Desktop: sezione bloccata, scroll orizzontale, la strada si disegna con lo
  scroll, `Ruler` mostra l'avanzamento. Sotto 860px: linea verticale,
  capitoli impilati.
- Nodi vuoti per le tappe, nodi pieni con alone per imprevisti e svolte.
  Il testo non è mai attraversato dalla linea.

**DS**: Chapter, Ruler, Label, Tag, Button.

**Decisioni aperte**
- Cinque slot foto ("Foto 01"…"Foto 05"): servono le foto vere. Senza, lo
  slot resta con `PhotoSlot` ma l'etichetta va cambiata (è numerazione
  decorativa).
- Le posizioni dei capitoli sono assolute in px nel prototipo: vanno nei dati
  come coordinate della strada, non nel JSX.
- `STATS` di `journey.js` esce (il DS vieta le statistiche decorative).

---

## 8. Contatti

**Prototipo**: markup 488–523, CSS 223–268; script `drawAI` 865,
`copyEmail` 553.

**File**
- `src/components/sections/home/Contact.jsx`
- `src/components/ui/Field.jsx`, `CopyButton.jsx` → `CopyChip.jsx`
- `src/constants/site.js` (`EMAIL`, `SOCIAL_LINKS`, `FORMSPREE_ENDPOINT`)
- `CONTACT` in `home.js`

**Contenuto**
- Campo segnale ASCII decorativo dietro il titolo.
- Titolo "Cerchi uno sviluppatore?" (`front`) + "Parliamone" (`accent`) con
  `Spark` come punto finale; il punto vero resta per i lettori di schermo.
- Stato: puntino `available` + "Aperto a ruoli da developer in sede, ibridi o
  da remoto. Posso iniziare 30 giorni dopo il colloquio."
- Email selezionabile + `CopyChip`.
- "Trovami su": GitHub e LinkedIn come `ArrowLink out`, niente loghi.
- Modulo in `GlassPanel`: Nome ed Email affiancati, Messaggio a tutta
  larghezza, "Invia messaggio" primario. Invio a Formspree (non `mailto` come
  nel prototipo); conferma solo a risposta ricevuta.

**DS**: ContactForm, CopyChip, ArrowLink, BackdropTitle (`accent`), Spark,
Label, Button.

**Decisioni aperte**
- Stato di errore del modulo: il DS non ha un colore di errore
  (`--destructive` vuoto). Va aggiunto al DS prima di disegnare l'errore.

---

## 9. Footer

**Prototipo**: markup 524–529, CSS 269–273.

**File**
- `src/components/layout/Footer.jsx`

**Contenuto**
- "© {anno} Nicolas Brazzo" in `u-label` `ink-faint`, "Torna su" con
  `ArrowUp` → `#top`, linea `border-line` sopra, larghezza `max-w-content`.

**Decisioni aperte**
- Oggi il footer ha GitHub e LinkedIn; nel prototipo stanno solo nei
  contatti. Proposta: toglierli dal footer della home, tenerli nella pagina
  progetto dove i contatti non ci sono.

---

## 10. Pagina progetto

**Prototipo**: non c'è. Va disegnata prima come secondo artboard del canvas
(`Project.dc.html`, su ReadIt), poi si scrive il codice.

**File**
- `src/pages/ProjectDetail.jsx`
- `src/components/sections/project/*` (Hero, Overview, Features, Results,
  Gallery, Next)
- `src/data/projectPage.js`, `src/data/projects.js`

**Da riusare**: BackdropTitle (`front` per il nome, `back` per i titoli di
sezione), MediaFrame per hero e galleria, il blocco metadati di ProjectRow,
ToolList per lo stack, `numeral` per i risultati, ArrowLink per sito e GitHub,
il titolo `accent` "Parliamone." in chiusura.

**Da togliere**: etichette `01 / Overview`, `02 / Feature`…; titoli con la
parola `hand` in corsivo.

**Decisioni aperte**
- Durata, Cliente, Ruolo: il DS ammette solo Anno e Stack.
- Risultati: solo numeri veri; servono i dati di ReadIt, HUB e Volta.

---

## 11. Progetto non trovato

Parte di `src/pages/ProjectDetail.jsx` (`NotFound`). Si disegna con la
pagina progetto: label "404", titolo `front`, testo `ink-soft`, pulsante
ghost "Torna alla home".
