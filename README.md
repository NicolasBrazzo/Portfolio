# Portfolio — Nicolas Brazzo

Portfolio personale: una pagina singola che raccoglie progetti, casi studio e
percorso professionale, costruita con React e animata con GSAP.

**Live** → [brzportfolio.vercel.app](https://brzportfolio.vercel.app)

---

## Stack

| | |
|---|---|
| **Framework** | React 19 + Vite |
| **Stile** | Tailwind CSS |
| **Animazioni** | GSAP (ScrollTrigger) + Lenis per lo scroll fluido |
| **Font** | Bricolage Grotesque, Geist, Geist Mono, Newsreader (self-hosted via Fontsource) |
| **Form** | Formspree |
| **Deploy** | Vercel |

---

## Struttura

Home a sezioni ancorate (hero, approccio, progetti, competenze, percorso,
contatti) e una pagina di dettaglio per ogni progetto su `/projects/:id`.

```
src/
├── components/
│   ├── layout/     # cornice comune: navbar, footer, griglia, scroll fluido
│   ├── sections/   # una sezione per componente (home/, project/)
│   └── ui/         # primitivi riutilizzabili, senza contenuti
├── hooks/          # animazioni condivise (reveal, puntatore, magnetico)
├── data/           # testi e contenuti: il copy si cambia da qui
├── constants/      # configurazione del sito (nav, contatti, social)
├── styles/         # token e font
└── lib/            # gsap, scroll, utility
```

---

## Avvio in locale

```bash
git clone https://github.com/NicolasBrazzo/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Il sito parte su `http://localhost:5173`.

| Comando | Descrizione |
|---|---|
| `npm run dev` | Server di sviluppo con HMR |
| `npm run build` | Build di produzione in `dist/` |
| `npm run preview` | Anteprima locale della build |
| `npm run lint` | Controllo ESLint |

---

## Stato

Nuova direzione visiva: tema scuro, foglio tecnico e tipografia editoriale.
In arrivo: revisione dei testi e nuovi progetti.

---

## Contatti

[Portfolio](https://brzportfolio.vercel.app) ·
[LinkedIn](https://www.linkedin.com/in/nicolas-brazzo-a91509286/) ·
nicolasbrazzo8@gmail.com