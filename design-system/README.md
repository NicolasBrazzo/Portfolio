Il sistema visivo del portfolio di Nicolas Brazzo, web developer frontend. Una notte quasi nera, una sola luce lavanda che entra dall'alto a sinistra, e figure fatte di caratteri ASCII: il punto d'incontro tra design e codice. Tutto quello che segue viene dal sito costruito con questo sistema.

## Voce e contenuti

- Scrivi in italiano, in prima persona singolare: "Oggi lavoro come sviluppatore…", "Cerco un team…".
- Frasi brevi e dirette. Un fatto concreto vale più di un aggettivo: "3–4h di studio ogni sera" e non "tanta passione".
- Maiuscola solo a inizio frase, anche nei titoli: "Progetti selezionati", "Il prezzo della scelta".
- Mai emoji, in nessun punto. Al loro posto usa le icone (vedi Iconografia).
- I numeri compaiono solo quando sono informazione: un anno, una durata, un conteggio vero. Niente numerazioni decorative (01 / 02 / 03) né conteggi accanto alle categorie.
- Descrizioni dei progetti in una o due righe. I metadati si limitano ad Anno e Stack, con i valori separati da `·`.
- Le liste di nomi grandi usano `/` come separatore: "React / JavaScript / Tailwind".
- Etichette e link testuali in `label`: maiuscolo, mono, tracking largo ("APRI IL CASO STUDIO").

Esempi reali: "Partendo dal design realizzo siti web e applicazioni fatte per durare nel tempo." · "Ci sono arrivato da autodidatta, e non per la strada più dritta." · "Cerchi uno sviluppatore? Parliamone."

## Colore

- Il sito ha un solo tema, scuro. Lo sfondo è sempre `ground`; non esiste una versione chiara.
- `lavender` è l'unico accento. Usalo per punti, nodi, bagliori e tag, mai per grandi superfici piene. Per link ed etichette accese usa `lavender-text`.
- Gerarchia del testo: `ink-bright` per i nomi in evidenza, `ink` per il testo principale, `ink-soft` per i paragrafi, `ink-muted` per le etichette, `ink-faint` per i metadati. Non andare più scuro di `ink-faint` per un testo.
- La luce è l'identità: `nebula` in alto a sinistra della hero, `beam` come fascio diagonale sfocato, `halo` dietro le figure ASCII. Sono radial-gradient morbidi, mai bordi netti.
- `available` (verde) compare una sola volta, nel puntino di stato dei contatti, sempre accanto al testo che lo spiega.
- Niente gradienti viola-blu come fondo di sezione. I gradienti vivono dentro il testo dei titoli e nelle luci, non sulle superfici.

## Tipografia

- Due famiglie: Inter Tight (`--font-sans`) per tutto il testo, JetBrains Mono (`--font-mono`) per etichette, metadati e ciò che parla da codice. Caricale da Google Fonts: Inter Tight 400/500/600/800, JetBrains Mono 500/700.
- I titoli display (`display-xl`, `display-backdrop`, `display`, `title`, `numeral`) sono sempre in 800 con tracking stretto e colorati con un gradiente, mai con un colore pieno:
  - in primo piano: da `ink-hi` a `#b9bed2` verso il basso;
  - dietro (`display-backdrop`): da lavanda chiara al 50% a lavanda scura al 14%, con un riflesso che scorre in 16 secondi;
  - accento ("Parliamone"): da `#d9dcff` a `lavender` a `lavender-deep`, in diagonale.
- `display-backdrop` si adatta alla larghezza della pagina (98,5%) e si muove in parallasse al massimo di 18px. Usalo al massimo per due sezioni di fila: dopo diventa ripetitivo.
- Paragrafi in `body-lg` o `body` su `ink-soft`, larghezza massima `measure`. Titoli con `text-wrap: balance`, paragrafi con `text-wrap: pretty`.

## ASCII, la firma

Le figure del sito sono fatte di caratteri monospazio disegnati su canvas. Sono l'elemento più riconoscibile del sistema.

- Rampa standard, dal più scuro al più chiaro: `.,:;-~=+*ox%#&$@`. Rampa del codice: `.:-=+<>/{}[]10#@`.
- Quattro rampe di colore, ognuna con il suo significato:
  - `ascii-low`→`ascii-high` per il ritratto, le icone e il campo segnale;
  - `code-low`→`code-high` per ciò che è codice (la mano robot);
  - `human-low`→`human-high` per ciò che è umano (la mano del designer);
  - `backdrop-low`→`backdrop-high` per figure grandi che stanno dietro il testo (il cavallo).
- Passo dei caratteri: 4–7px per le figure grandi, 13px per i campi di sfondo. Più piccolo il passo, più dettaglio.
- Le figure ASCII non hanno mai cornice, bordo o card: stanno direttamente sullo sfondo, con al massimo un `halo` dietro.
- Nelle sezioni di contenuto le figure compaiono già composte e restano ferme. Solo il ritratto della hero reagisce al mouse e si compone all'arrivo.
- Dove una figura passa dietro il testo, abbassane l'opacità al 30–40% in quella zona e dai al testo `text-shadow: 0 0 18px var(--ground)`.
- Il testo può "decodificarsi" da caratteri casuali (`<>/{}[]=+*#%01`) verso la parola finale, una lettera alla volta, ma solo in font mono, così la larghezza non cambia.

## Superfici, bordi e ombre

- Tre materiali soltanto: lo sfondo nudo, la cornice media (`surface`, bordo `edge`, `radius-lg`) e il pannello di vetro (`glass`, bordo `edge`, `radius-xl`, blur 8px).
- Ogni cornice e ogni pannello hanno un filo di luce sul bordo superiore: 1px, gradiente orizzontale trasparente → `rgba(196,202,255,.7)` → trasparente, dal 12–14% al 86–88% della larghezza.
- Ombre: `shadow-frame` a riposo, `shadow-frame-hover` al passaggio insieme a `translateY(-4px)`.
- Le righe di contenuto (progetti, livelli dello stack, footer) si separano con una linea `line` da 1px, non con card.
- Non usare card con bordo colorato a sinistra, né card con ombra per ogni blocco.

## Spaziatura e layout

- Le sezioni sono larghe al massimo `page-max`; il contenuto al massimo `content-max`, con margini laterali `gutter`.
- Padding verticale delle sezioni tra 80px e `space-36`, con clamp().
- Righe dei progetti: immagine a sinistra (proporzione 1,15) e testo a destra, `space-18` di padding verticale.
- Sotto `breakpoint` tutto si impila in una colonna e lo scroll orizzontale della storia diventa una linea verticale.

## Movimento

- Lento e raro: un riflesso che scorre in 16s, un punto di luce che pulsa in 3,2s, il parallasse dei titoli al massimo di 18px.
- Hover: 0,2–0,5s, curva `cubic-bezier(.2,.7,.2,1)` sulle cornici, frecce che si spostano di 4px.
- Rispetta sempre `prefers-reduced-motion`: niente animazioni, figure ASCII già composte, testo già decodificato.

## Iconografia

- Icone a tratto, in stile Lucide: griglia 24px, `stroke-width: 2`, estremi e giunzioni arrotondati, colore `currentColor`.
- 16px dentro pulsanti e link, 18px nelle liste con icona. Nelle liste le icone sono in `lavender`.
- Le frecce hanno un significato preciso: `→` porta avanti nella pagina, `↗` apre o porta fuori (contatti, siti esterni).
- Niente loghi di brand: GitHub e LinkedIn si scrivono come testo con la freccia `↗`.
- Non esiste un logo: il nome si scrive in Inter Tight 600 (`name`).

## Accessibilità

- Testo con contrasto di almeno 4,5:1 su `ground`, `surface` e `glass`; `ink-faint` è il minimo. `separator` è solo decorativo.
- Focus da tastiera visibile su ogni controllo: `outline: 2px solid var(--lavender-text)` con offset di 3px (vedi `focus-ring`).
- Pulsanti e link con area di almeno 44px. Le icone senza testo hanno `aria-label`.
- Le figure ASCII con significato hanno `role="img"` e una descrizione; quelle decorative hanno `aria-hidden="true"`.
